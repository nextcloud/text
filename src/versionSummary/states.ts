/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { VersionEntry } from '../comparison/versionEnds.ts'

import { getCanonicalLocale, t } from '@nextcloud/l10n'

type UnavailableReason = 'no_provider' | 'instance_cap' | 'user_cap' | 'too_large' | 'unsupported_encoding'

/** Whether a summary could be started now, and why not */
interface Generation {
	available: boolean
	reason: UnavailableReason | 'no_changes' | null
	retryAfter: number | null
}

/** What the summary of a pair shows */
export type SummaryView
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
		/** Too many starts in a short time, until `retryAfter` (seconds since the epoch) */
		| { kind: 'rateLimited', retryAfter: number }
		/** The file changed, while a summary of the texts compared was under way */
		| { kind: 'changed', whileRunning: boolean }
		| { kind: 'versionMissing' }
		| { kind: 'accessLost' }
		| { kind: 'disabled' }

/** The summary of a pair, as the server answers a lookup or a start */
export interface Answer {
	state: 'absent' | 'queued' | 'running' | 'done' | 'failed' | 'changed'
	summary: string | null
	error: { code: string, message: string | null } | null
	queuePosition: number | null
	progress: number | null
	ends: { from: VersionEntry, to: VersionEntry }
	fileName: string
	generation: Generation
}

/** Where a view shows, and what it says */
export type Display
	= | { place: 'none' }
		/**
		 * In the header, before there is a summary: the button and a note, which
		 * screen readers hear always, only as the answer to a start, or never
		 */
		| { place: 'start', button: 'enabled' | 'disabled' | 'none', text: string, said: 'always' | 'answer' | 'never' }
		| { place: 'card' }
		| { place: 'note', type: 'info' | 'warning' | 'error', text: string, next?: 'tryAgain' | 'reload' }

/** Everything a kind of view does */
export interface ViewPolicy {
	display: Display
	/** A summary is being made: it is looked up every few seconds, and a file saved meanwhile changed it while running */
	underWay?: boolean
	/** When a limit ends and it is looked up again, in seconds since the epoch by the server's clock */
	looksAt?: number | null
	/** Looked up again when the page is shown: an administrator may have set up a provider */
	looksWhenPageShown?: boolean
	/** Looked up again when a comparison shows the pair again, as after reloading it */
	looksWhenShownAgain?: boolean
	/** Hidden rather than explained while nothing was shown yet: the user was never offered this pair */
	hiddenBeforeOffer?: boolean
	/** The versions the pickers list are out of date */
	versionsChanged?: boolean
}

/** Trying again after a refusal that said nothing of the provider */
const UNKNOWN_GENERATION: Generation = { available: true, reason: null, retryAfter: null }
/** The window of the server's rate limit on starts, `UserRateLimit` of `VersionSummaryController::generate()` */
const RATE_LIMIT_SECONDS = 120

/**
 * What a view of the summary shows and does.
 *
 * @param view The view.
 */
export function policyOf(view: SummaryView): ViewPolicy {
	switch (view.kind) {
		case 'loading':
		case 'hidden':
			return { display: { place: 'none' } }
		case 'ready':
			return { display: { place: 'start', button: 'enabled', text: t('text', 'Both complete versions are sent to the AI provider of this Nextcloud.'), said: 'never' } }
		case 'unavailable':
			return {
				display: { place: 'start', button: 'disabled', text: unavailableNote(view.reason, view.retryAfter), said: 'answer' },
				looksAt: view.retryAfter,
				looksWhenPageShown: view.reason === 'no_provider',
			}
		case 'identical':
			return { display: { place: 'start', button: 'none', text: t('text', 'The two versions are identical.'), said: 'always' } }
		case 'looksSame':
			return { display: { place: 'start', button: 'none', text: t('text', 'The two versions look the same. Only their Markdown source differs.'), said: 'always' } }
		case 'queued':
		case 'running':
			return { display: { place: 'card' }, underWay: true }
		case 'done':
			return { display: { place: 'card' } }
		case 'failed': {
			const text = view.code === 'invalid_output'
				? t('text', 'The AI answer could not be used.')
				: [t('text', 'The summary could not be created.'), view.message].filter(Boolean).join(' ')
			const { available, reason, retryAfter } = view.generation
			return {
				display: available
					? { place: 'note', type: 'error', text: `${text} ${t('text', 'Trying again sends both complete versions to the AI provider.')}`, next: 'tryAgain' }
					: { place: 'note', type: 'error', text: `${text} ${unavailableNote(reason ?? 'no_provider', retryAfter)}` },
				looksAt: retryAfter,
				looksWhenPageShown: reason === 'no_provider',
			}
		}
		case 'rateLimited':
			return {
				display: { place: 'note', type: 'warning', text: t('text', 'You asked for several summaries in a short time. Try again after {time}.', { time: timeOf(view.retryAfter) }) },
				looksAt: view.retryAfter,
			}
		case 'changed':
			return {
				display: {
					place: 'note',
					type: 'warning',
					text: view.whileRunning
						? t('text', 'This file was saved while the summary was being made. The summary still finishes for the versions you compared. Reload to compare the latest saved version.')
						: t('text', 'This file changed after you opened the comparison.'),
					next: 'reload',
				},
				looksWhenShownAgain: true,
			}
		case 'versionMissing':
			return { display: { place: 'note', type: 'warning', text: t('text', 'One of these versions no longer exists. Choose another version.') }, versionsChanged: true }
		case 'accessLost':
			return { display: { place: 'note', type: 'error', text: t('text', 'You can no longer open this file.') }, hiddenBeforeOffer: true }
		case 'disabled':
			return { display: { place: 'note', type: 'info', text: t('text', 'Summaries were turned off by your administrator.') }, hiddenBeforeOffer: true }
	}
}

/**
 * The view of the server's answer. Where the comparison shows no difference,
 * a stored summary is shown but none is offered.
 *
 * @param answer The answer.
 * @param wasUnderWay Whether a summary was under way before.
 * @param looksSame Whether the comparison shows no difference.
 */
export function viewOf(answer: Answer, wasUnderWay: boolean, looksSame: boolean): SummaryView {
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
			return { kind: 'failed', code: answer.error?.code ?? 'provider_failed', message: answer.error?.message ?? null, generation: answer.generation }
		case 'changed':
			return { kind: 'changed', whileRunning: wasUnderWay }
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
			return { kind: 'unavailable', reason: answer.generation.reason ?? 'no_provider', retryAfter: answer.generation.retryAfter }
	}
}

/**
 * The view of a refused request.
 *
 * @param status The HTTP status.
 * @param reason The server's reason, if it gave one.
 * @param retryAfter When it can be tried again, in seconds since the epoch.
 * @param wasUnderWay Whether a summary was under way before.
 * @param serverNow The server's time, in milliseconds.
 */
export function refusalView(status: number, reason: string | undefined, retryAfter: number | null, wasUnderWay: boolean, serverNow: number): SummaryView {
	switch (reason) {
		case 'disabled':
			return { kind: 'disabled' }
		case 'version_missing':
			return { kind: 'versionMissing' }
		case 'not_found':
			return { kind: 'accessLost' }
		case 'texts_changed':
			return { kind: 'changed', whileRunning: wasUnderWay }
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
		return { kind: 'rateLimited', retryAfter: Math.ceil(serverNow / 1000) + RATE_LIMIT_SECONDS }
	}
	if (status === 404) {
		return { kind: 'accessLost' }
	}
	return { kind: 'failed', code: reason ?? 'provider_failed', message: null, generation: UNKNOWN_GENERATION }
}

/**
 * Why no summary can be started now.
 *
 * @param reason The server's reason.
 * @param retryAfter When it can be tried again, in seconds since the epoch.
 */
function unavailableNote(reason: string, retryAfter: number | null): string {
	switch (reason) {
		case 'instance_cap':
			return retryAfter
				? t('text', 'This Nextcloud has reached its limit of summaries for this hour. Try again after {time}.', { time: timeOf(retryAfter) })
				: t('text', 'This Nextcloud has reached its limit of summaries for this hour.')
		case 'user_cap':
			return retryAfter
				? t('text', 'You have reached your limit of summaries for this hour. Try again after {time}.', { time: timeOf(retryAfter) })
				: t('text', 'You have reached your limit of summaries for this hour.')
		case 'too_large':
			return t('text', 'These versions are too long to summarize.')
		case 'unsupported_encoding':
			return t('text', 'Summaries are only available for files saved as UTF-8.')
		default:
			return t('text', 'Summaries are not available: no AI provider is set up. Ask your administrator.')
	}
}

/**
 * A time of day in the user's language.
 *
 * @param seconds Seconds since the epoch.
 */
function timeOf(seconds: number) {
	return new Date(seconds * 1000).toLocaleTimeString(getCanonicalLocale(), { timeStyle: 'short' })
}
