/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Ref, ShallowRef } from 'vue'
import type { ComparedEnds } from '../comparison/versionEnds.ts'
import type { Answer, SummaryView } from './states.ts'

import axios, { isAxiosError } from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { getViewer } from '@nextcloud/viewer'
import { onScopeDispose, ref, shallowRef } from 'vue'
import { invalidateFileVersions } from '../comparison/versions.ts'
import { logger } from '../helpers/logger.ts'
import { policyOf, refusalView, viewOf } from './states.ts'

/** What the comparison loaded, which a summary must match */
export interface SummaryTexts {
	fromHash: string
	toHash: string
	/** Whether both are valid UTF-8 */
	utf8: boolean
	/** Whether the comparison shows no difference between them */
	looksSame: boolean
}

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
	/** Look again at once, or start again what the server did not take */
	retryNow: () => void
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
	/** A start got no answer, or the server was busy: the next try starts again */
	let startAgain = false
	/** How far the server's clock is ahead of the browser's, in milliseconds */
	let skew = 0

	/**
	 * Learn the server's time from an answer, which limits are given in.
	 *
	 * @param headers The headers of the answer.
	 */
	function clock(headers: unknown) {
		const date = Date.parse(String((headers as Record<string, unknown> | undefined)?.date ?? ''))
		if (!Number.isNaN(date)) {
			skew = date - Date.now()
		}
	}

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
		retryNow: () => {
			// A start's answer says what happens next
			if (!starting) {
				tryAgain()
			}
		},
	}

	async function lookup() {
		clearTimeout(entry.timer)
		const request = ++latest
		try {
			const { data, headers } = await axios.get(url, { params, timeout: TIMEOUT_MS })
			if (request !== latest || entry.disposed) {
				return
			}
			clock(headers)
			entry.connectionLost.value = false
			apply(data.ocs.data)
		} catch (error) {
			if (request !== latest || entry.disposed) {
				return
			}
			refuse(error)
		}
		schedule()
	}

	async function generate() {
		clearTimeout(entry.timer)
		startAgain = false
		const request = ++latest
		entry.userStarted.value = true
		const before = entry.view.value
		entry.view.value = { kind: 'queued', position: null }
		starting = true
		try {
			const { data, headers } = await axios.post(url, params, { timeout: TIMEOUT_MS })
			if (request !== latest || entry.disposed) {
				return
			}
			clock(headers)
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
			startAgain = entry.connectionLost.value
		} finally {
			starting = false
		}
		schedule()
	}

	function apply(answer: Answer) {
		entry.ends.value = answer.ends
		entry.fileName.value = answer.fileName
		const previous = entry.view.value.kind
		entry.view.value = viewOf(answer, policyOf(entry.view.value).underWay === true, texts.looksSame)
		if (entry.view.value.kind !== previous) {
			entry.attempt = 0
		}
	}

	function refuse(error: unknown) {
		const status = isAxiosError(error) ? error.response?.status : undefined
		const body = isAxiosError(error) ? (error.response?.data as { ocs?: { data?: { error?: string, retryAfter?: number | null } } })?.ocs?.data : undefined
		const reason = body?.error
		// No answer, a server error or a save holding the file says nothing of the summary: ask again
		if (status === undefined || (status >= 500 && (reason === undefined || reason === 'busy'))) {
			logger.warn('No answer from the server for a summary of changes', { error })
			entry.connectionLost.value = true
			return
		}
		entry.connectionLost.value = false
		clock(isAxiosError(error) ? error.response?.headers : undefined)
		const view = refusalView(status, reason, body?.retryAfter ?? null, policyOf(entry.view.value).underWay === true, Date.now() + skew)
		const policy = policyOf(view)
		// What the user was never offered is hidden rather than explained
		if (policy.hiddenBeforeOffer && entry.view.value.kind === 'loading') {
			entry.view.value = { kind: 'hidden' }
			return
		}
		if (policy.versionsChanged) {
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
		const policy = policyOf(entry.view.value)
		if (entry.connectionLost.value || policy.underWay) {
			const delay = DELAYS[Math.min(entry.attempt, DELAYS.length - 1)]!
			entry.attempt++
			entry.timer = setTimeout(lookUnlessHidden, delay * 1000)
		} else if (typeof policy.looksAt === 'number') {
			// By the server's clock; capped, so a far-off time cannot overflow the timer
			const wait = Math.min(Math.max(policy.looksAt * 1000 - (Date.now() + skew), 1000), 3_600_000)
			entry.timer = setTimeout(lookUnlessHidden, wait)
		}
	}

	/** A page hidden since the timer was set looks once it is shown; a start's answer schedules the next look */
	function lookUnlessHidden() {
		if (!document.hidden && !starting) {
			tryAgain()
		}
	}

	/** Look, or start again what the server did not take */
	function tryAgain() {
		if (startAgain) {
			generate()
		} else {
			lookup()
		}
	}

	function onVisible() {
		if (document.hidden || entry.disposed || starting) {
			return
		}
		const policy = policyOf(entry.view.value)
		if (entry.connectionLost.value || policy.underWay || policy.looksWhenPageShown) {
			tryAgain()
		} else {
			schedule()
		}
	}
	document.addEventListener('visibilitychange', onVisible)
	entry.stopWatching = () => document.removeEventListener('visibilitychange', onVisible)
	entry.resume = () => {
		if (policyOf(entry.view.value).looksWhenShownAgain && !starting) {
			lookup()
		} else {
			schedule()
		}
	}

	if (texts.fromHash === texts.toHash) {
		entry.view.value = { kind: 'identical' }
	} else if (!texts.utf8) {
		entry.view.value = { kind: 'unavailable', reason: 'unsupported_encoding', retryAfter: null }
	} else {
		lookup()
	}
	return entry
}
