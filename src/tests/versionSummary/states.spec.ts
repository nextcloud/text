/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SummaryView } from '../../versionSummary/states.ts'

import { describe, expect, it, vi } from 'vitest'
import { policyOf } from '../../versionSummary/states.ts'

vi.mock('@nextcloud/l10n', async (importOriginal) => ({ ...await importOriginal<object>(), getCanonicalLocale: () => 'de-DE' }))

const generation = (available: boolean, reason: 'no_provider' | 'user_cap' | null = null, retryAfter: number | null = null) => ({ available, reason, retryAfter })

describe('policyOf', () => {
	it('offers the button with what it sends', () => {
		expect(policyOf({ kind: 'ready' })).toEqual({ display: { place: 'start', button: 'enabled', text: 'Both complete versions are sent to the AI provider of this Nextcloud.', said: 'never' } })
	})

	it('says why the button cannot be used, as the answer to a start, and looks again once a limit ends', () => {
		expect(policyOf({ kind: 'unavailable', reason: 'too_large', retryAfter: null }).display)
			.toEqual({ place: 'start', button: 'disabled', text: 'These versions are too long to summarize.', said: 'answer' })
		expect(policyOf({ kind: 'unavailable', reason: 'user_cap', retryAfter: 5000 })).toMatchObject({ looksAt: 5000, looksWhenPageShown: false })
		expect(policyOf({ kind: 'unavailable', reason: 'user_cap', retryAfter: null }).display)
			.toMatchObject({ text: 'You have reached your limit of summaries for this hour.' })
		// An administrator may set up a provider meanwhile
		expect(policyOf({ kind: 'unavailable', reason: 'no_provider', retryAfter: null }).looksWhenPageShown).toBe(true)
	})

	it('offers no button for versions with nothing to summarize', () => {
		expect(policyOf({ kind: 'identical' }).display).toEqual({ place: 'start', button: 'none', text: 'The two versions are identical.', said: 'always' })
		expect(policyOf({ kind: 'looksSame' }).display).toMatchObject({ place: 'start', button: 'none' })
	})

	it('shows a summary under way or there in the card, and looks up only one under way', () => {
		expect(policyOf({ kind: 'queued', position: 1 })).toEqual({ display: { place: 'card' }, underWay: true })
		expect(policyOf({ kind: 'running', progress: null }).underWay).toBe(true)
		expect(policyOf({ kind: 'done', summary: 'Rent goes up.' })).toEqual({ display: { place: 'card' } })
	})

	it.each<[string, SummaryView, string, string | undefined]>([
		['an answer it could not use', { kind: 'failed', code: 'invalid_output', message: null, generation: generation(true) }, 'The AI answer could not be used. Trying again sends both complete versions to the AI provider.', 'tryAgain'],
		['the provider failed', { kind: 'failed', code: 'provider_failed', message: 'Over quota.', generation: generation(true) }, 'The summary could not be created. Over quota. Trying again sends both complete versions to the AI provider.', 'tryAgain'],
		['no provider is left to try again', { kind: 'failed', code: 'provider_failed', message: null, generation: generation(false, 'no_provider') }, 'The summary could not be created. Summaries are not available: no AI provider is set up. Ask your administrator.', undefined],
		['the file changed meanwhile', { kind: 'changed', whileRunning: false }, 'This file changed after you opened the comparison.', 'reload'],
		['a version is gone', { kind: 'versionMissing' }, 'One of these versions no longer exists. Choose another version.', undefined],
		['access is gone', { kind: 'accessLost' }, 'You can no longer open this file.', undefined],
		['summaries are off', { kind: 'disabled' }, 'Summaries were turned off by your administrator.', undefined],
	])('says in a note when %s, with what to do next', (_, view, text, next) => {
		const { display } = policyOf(view)

		expect(display).toMatchObject({ place: 'note', text })
		expect(display.place === 'note' && display.next).toBe(next ?? undefined)
	})

	it('looks again as each refusal says', () => {
		expect(policyOf({ kind: 'failed', code: 'provider_failed', message: null, generation: generation(false, 'user_cap', 7000) })).toMatchObject({ looksAt: 7000, looksWhenPageShown: false })
		expect(policyOf({ kind: 'failed', code: 'provider_failed', message: null, generation: generation(false, 'no_provider') }).looksWhenPageShown).toBe(true)
		expect(policyOf({ kind: 'rateLimited', retryAfter: 9000 }).looksAt).toBe(9000)
		expect(policyOf({ kind: 'changed', whileRunning: true }).looksWhenShownAgain).toBe(true)
		expect(policyOf({ kind: 'versionMissing' }).versionsChanged).toBe(true)
		expect([policyOf({ kind: 'accessLost' }).hiddenBeforeOffer, policyOf({ kind: 'disabled' }).hiddenBeforeOffer]).toEqual([true, true])
	})

	it('gives times in the language of Nextcloud, not of the browser', () => {
		const seconds = new Date(2026, 10, 9, 14, 5).getTime() / 1000
		expect(policyOf({ kind: 'rateLimited', retryAfter: seconds }).display).toMatchObject({ text: 'You asked for several summaries in a short time. Try again after 14:05.' })
	})
})
