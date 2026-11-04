/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Ref, ShallowRef } from 'vue'
import type { ComparedEnds, VersionEntry } from '../comparison/versionEnds.ts'

import axios, { isAxiosError } from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { getViewer } from '@nextcloud/viewer'
import { onScopeDispose, ref, shallowRef } from 'vue'
import { invalidateFileVersions } from '../comparison/versions.ts'
import { logger } from '../helpers/logger.ts'

type UnavailableReason = 'no_provider' | 'instance_cap' | 'user_cap' | 'too_large' | 'unsupported_encoding'

/** Whether a summary could be started now, and why not */
interface Generation {
	available: boolean
	reason: UnavailableReason | null
	retryAfter: number | null
}

/** What the summary of a pair shows */
type SummaryView
	= | { kind: 'loading' }
		| { kind: 'hidden' }
		| { kind: 'ready' }
		| { kind: 'unavailable', reason: UnavailableReason, retryAfter: number | null }
		| { kind: 'identical' }
		/** The texts differ, but the comparison shows no difference */
		| { kind: 'looksSame' }
		| { kind: 'queued', position: number | null }
		| { kind: 'running', progress: number | null }
		| { kind: 'done', summary: string }
		| { kind: 'failed', code: string, message: string | null, generation: Generation }
		| { kind: 'rateLimited' }
		/** The file changed, while a summary of the texts compared was under way */
		| { kind: 'changed', whileRunning: boolean }
		| { kind: 'versionMissing' }
		| { kind: 'accessLost' }
		| { kind: 'disabled' }

/** What the comparison loaded, which a summary must match */
export interface SummaryTexts {
	fromHash: string
	toHash: string
	/** Whether both are valid UTF-8 */
	utf8: boolean
	/** Whether the comparison shows no difference between them */
	looksSame: boolean
}

interface Answer {
	state: 'absent' | 'queued' | 'running' | 'done' | 'failed' | 'changed'
	summary: string | null
	error: { code: string, message: string | null } | null
	queuePosition: number | null
	progress: number | null
	ends: { from: VersionEntry, to: VersionEntry }
	fileName: string
	generation: { available: boolean, reason: string | null, retryAfter: number | null }
}

/** Trying again after a refusal that said nothing of the provider */
const UNKNOWN_GENERATION: Generation = { available: true, reason: null, retryAfter: null }

export interface PairSummary {
	view: ShallowRef<SummaryView>
	ends: ShallowRef<Answer['ends'] | undefined>
	/** Name of the file, as the server knows it */
	fileName: Ref<string>
	/** The last request failed for want of a connection */
	connectionLost: Ref<boolean>
	collapsed: Ref<boolean>
	/** The view is the outcome of something the user started */
	userStarted: Ref<boolean>
	generate: () => Promise<void>
	lookupNow: () => void
}

interface Entry extends PairSummary {
	users: number
	timer?: ReturnType<typeof setTimeout>
	attempt: number
	/** Dropped: late answers change nothing */
	disposed: boolean
	stopWatching: () => void
	/** Look again as needed, once a view shows it again */
	resume: () => void
}

/** Seconds between two lookups of a summary under way, growing to the last */
const DELAYS = [2, 3, 5, 8, 10]
/** A request that hangs longer counts as a lost connection */
const TIMEOUT_MS = 30_000

const entries = new Map<string, Entry>()
let watchingViewer = false
/** How long a pair's state waits for the element of the next view, which mounts its summary only once loaded */
const HANDOVER_MS = 1000

function drop(key: string, entry: Entry) {
	entries.delete(key)
	entry.disposed = true
	clearTimeout(entry.timer)
	entry.stopWatching()
}

/**
 * The summary of the changes between the two texts a comparison loaded,
 * shared by every element showing that comparison: one lookup when the
 * comparison opens, one poller while a summary is under way, kept while the
 * view changes and dropped when the viewer closes or no view shows it.
 *
 * @param ends The ends compared.
 * @param texts What identifies the texts loaded.
 */
export function useVersionSummary(ends: ComparedEnds, texts: SummaryTexts): PairSummary {
	if (!watchingViewer) {
		watchingViewer = true
		getViewer().addEventListener('close', () => {
			for (const [key, entry] of entries) {
				drop(key, entry)
			}
		})
	}
	const key = [ends.fileId, ends.from, ends.to, texts.fromHash, texts.toHash].join(':')
	let entry = entries.get(key)
	if (!entry) {
		entry = createEntry(ends, texts)
		entries.set(key, entry)
	}
	if (entry.users++ === 0) {
		// A lookup may have answered while no view showed it
		entry.resume()
	}

	const shared = entry
	onScopeDispose(() => {
		shared.users--
		setTimeout(() => {
			if (shared.users === 0 && entries.get(key) === shared) {
				drop(key, shared)
			}
		}, HANDOVER_MS)
	})
	return shared
}

function createEntry(ends: ComparedEnds, texts: SummaryTexts): Entry {
	const url = generateOcsUrl('apps/text/version-summaries/{fileId}', { fileId: ends.fileId })
	const params = { from: ends.from, to: ends.to, fromHash: texts.fromHash, toHash: texts.toHash }

	/** The request whose answer counts: a newer one makes older answers stale */
	let latest = 0
	/** A start is on its way; its answer says what happens next */
	let starting = false

	const entry: Entry = {
		view: shallowRef<SummaryView>({ kind: 'loading' }),
		ends: shallowRef(),
		fileName: ref(''),
		connectionLost: ref(false),
		collapsed: ref(false),
		userStarted: ref(false),
		users: 0,
		attempt: 0,
		disposed: false,
		stopWatching: () => {},
		resume: () => {},
		generate,
		lookupNow: () => {
			// A start's answer says what happens next
			if (!starting) {
				lookup()
			}
		},
	}

	async function lookup(first = false) {
		clearTimeout(entry.timer)
		const request = ++latest
		try {
			const { data } = await axios.get(url, { params, timeout: TIMEOUT_MS })
			if (request !== latest || entry.disposed) {
				return
			}
			entry.connectionLost.value = false
			apply(data.ocs.data)
		} catch (error) {
			if (request !== latest || entry.disposed) {
				return
			}
			refuse(error, first)
		}
		schedule()
	}

	async function generate() {
		clearTimeout(entry.timer)
		const request = ++latest
		entry.userStarted.value = true
		const before = entry.view.value
		entry.view.value = { kind: 'queued', position: null }
		starting = true
		try {
			const { data } = await axios.post(url, params, { timeout: TIMEOUT_MS })
			if (request !== latest || entry.disposed) {
				return
			}
			entry.connectionLost.value = false
			apply(data.ocs.data)
		} catch (error) {
			if (request !== latest || entry.disposed) {
				return
			}
			// Without an answer nothing may have started, and the next lookup says;
			// a refusal says why nothing started
			entry.view.value = before
			refuse(error)
		} finally {
			starting = false
		}
		schedule()
	}

	function apply(answer: Answer) {
		entry.ends.value = answer.ends
		entry.fileName.value = answer.fileName
		const previous = entry.view.value.kind
		entry.view.value = viewOf(answer, previous === 'queued' || previous === 'running', texts.looksSame)
		if (entry.view.value.kind !== previous) {
			entry.attempt = 0
		}
	}

	// On opening, what the user was never offered is hidden rather than explained
	function refuse(error: unknown, first = false) {
		if (!isAxiosError(error) || !error.response) {
			logger.warn('Could not reach the server for a summary of changes', { error })
			entry.connectionLost.value = true
			return
		}
		entry.connectionLost.value = false
		const status = error.response.status
		const body = (error.response.data as { ocs?: { data?: { error?: string, retryAfter?: number | null } } })?.ocs?.data
		const reason = body?.error
		const previous = entry.view.value.kind
		const view = refusalView(status, reason, body?.retryAfter ?? null, previous === 'queued' || previous === 'running')
		if (first && (view.kind === 'accessLost' || view.kind === 'disabled')) {
			entry.view.value = { kind: 'hidden' }
			return
		}
		if (view.kind === 'versionMissing') {
			invalidateFileVersions(ends.fileId)
		}
		entry.view.value = view
	}

	/** Look again while a summary is under way, the connection is gone, or a limit ends */
	function schedule() {
		clearTimeout(entry.timer)
		// A hidden page looks again once it is shown
		if (entry.users === 0 || entry.disposed || document.hidden) {
			return
		}
		const view = entry.view.value
		const retryAfter = view.kind === 'unavailable' ? view.retryAfter : view.kind === 'failed' ? view.generation.retryAfter : null
		if (entry.connectionLost.value || view.kind === 'queued' || view.kind === 'running') {
			const delay = DELAYS[Math.min(entry.attempt, DELAYS.length - 1)]!
			entry.attempt++
			entry.timer = setTimeout(lookUnlessHidden, delay * 1000)
		} else if (retryAfter !== null) {
			// Capped, so a far-off time cannot overflow the timer
			const wait = Math.min(Math.max(retryAfter * 1000 - Date.now(), 1000), 3_600_000)
			entry.timer = setTimeout(lookUnlessHidden, wait)
		}
	}

	/** A page hidden since the timer was set looks once it is shown; a start's answer schedules the next look */
	function lookUnlessHidden() {
		if (!document.hidden && !starting) {
			lookup()
		}
	}

	function onVisible() {
		if (document.hidden || entry.disposed || starting) {
			return
		}
		const view = entry.view.value.kind
		if (entry.connectionLost.value || view === 'queued' || view === 'running') {
			lookup()
		} else {
			schedule()
		}
	}
	document.addEventListener('visibilitychange', onVisible)
	entry.stopWatching = () => document.removeEventListener('visibilitychange', onVisible)
	entry.resume = schedule

	if (texts.fromHash === texts.toHash) {
		entry.view.value = { kind: 'identical' }
	} else if (!texts.utf8) {
		entry.view.value = { kind: 'unavailable', reason: 'unsupported_encoding', retryAfter: null }
	} else {
		lookup(true)
	}
	return entry
}

// Where the comparison shows no difference, a stored summary is shown but none is offered
function viewOf(answer: Answer, wasRunning: boolean, looksSame: boolean): SummaryView {
	switch (answer.state) {
		case 'queued':
			return { kind: 'queued', position: answer.queuePosition }
		case 'running':
			return { kind: 'running', progress: answer.progress }
		case 'done':
			return { kind: 'done', summary: answer.summary ?? '' }
		case 'failed':
			if (looksSame) {
				return { kind: 'looksSame' }
			}
			return { kind: 'failed', code: answer.error?.code ?? 'provider_failed', message: answer.error?.message ?? null, generation: answer.generation as Generation }
		case 'changed':
			return { kind: 'changed', whileRunning: wasRunning }
		default:
			if (looksSame) {
				return { kind: 'looksSame' }
			}
			if (answer.generation.available) {
				return { kind: 'ready' }
			}
			if (answer.generation.reason === 'no_changes') {
				return { kind: 'identical' }
			}
			return { kind: 'unavailable', reason: (answer.generation.reason ?? 'no_provider') as UnavailableReason, retryAfter: answer.generation.retryAfter }
	}
}

function refusalView(status: number, reason: string | undefined, retryAfter: number | null, wasRunning: boolean): SummaryView {
	switch (reason) {
		case 'disabled':
			return { kind: 'disabled' }
		case 'version_missing':
			return { kind: 'versionMissing' }
		case 'not_found':
			return { kind: 'accessLost' }
		case 'texts_changed':
			return { kind: 'changed', whileRunning: wasRunning }
		case 'no_changes':
			return { kind: 'identical' }
		case 'too_large':
		case 'unsupported_encoding':
		case 'no_provider':
		case 'instance_cap':
		case 'user_cap':
			return { kind: 'unavailable', reason, retryAfter }
	}
	if (status === 429) {
		return { kind: 'rateLimited' }
	}
	if (status === 404) {
		return { kind: 'accessLost' }
	}
	return { kind: 'failed', code: reason ?? 'provider_failed', message: null, generation: UNKNOWN_GENERATION }
}
