/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonSession } from '../../comparison/session.ts'

import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, h, nextTick } from 'vue'
import ComparisonDocument from '../../components/ComparisonDocument.vue'
import * as compare from '../../comparison/compare.ts'
import { createComparisonSession } from '../../comparison/session.ts'
import { logger } from '../../helpers/logger.ts'

afterEach(() => {
	vi.restoreAllMocks()
	document.body.replaceChildren()
})

/**
 * Show one side of a session in an app of its own, as each pane of the viewer does.
 *
 * @param session The session shared by both sides.
 * @param side The side to show.
 */
function mountSide(session: ComparisonSession, side: 'before' | 'after') {
	const el = document.createElement('div')
	document.body.append(el)
	const app = createApp({ render: () => h(ComparisonDocument, { session, side }) })
	app.mount(el)
	return { el, app }
}

/**
 * Give an element a scroll position to mirror: jsdom has no layout.
 *
 * @param element The element scrolling.
 */
function scrollable(element: HTMLElement) {
	let top = 0
	Object.defineProperty(element, 'scrollTop', {
		get: () => top,
		set: (value: number) => {
			top = value
		},
	})
	return element
}

describe('createComparisonSession', () => {
	it('steps through the changes, wrapping around at either end', () => {
		const session = createComparisonSession('One\n\nTwo\n\nThree', 'Uno\n\nTwo\n\nTres')

		expect(session.status.value).toBe('Change 1 of 2')
		session.move(1)
		expect(session.status.value).toBe('Change 2 of 2')
		session.move(1)
		expect(session.status.value).toBe('Change 1 of 2')
		session.move(-1)
		expect(session.status.value).toBe('Change 2 of 2')

		session.destroy()
	})

	it('moves off a current change once it is hidden as formatting-only', async () => {
		const session = createComparisonSession('Plain text\n\nOld content', '**Plain** text\n\nNew content')
		const formatting = session.visibleChanges.value.find(({ category }) => category === 'formatting')!
		session.select(formatting.id)

		session.hideFormatting.value = true
		await nextTick()

		expect(session.formattingCount).toBe(1)
		expect(session.visibleChanges.value).toHaveLength(1)
		expect(session.currentId.value).toBe(session.visibleChanges.value[0]!.id)

		session.destroy()
	})

	it('keeps the documents of two separate apps scrolling together', async () => {
		const session = createComparisonSession('One\n\nTwo', 'One\n\nThree')
		const before = mountSide(session, 'before')
		const after = mountSide(session, 'after')
		await nextTick()
		const [left, right] = [before.el, after.el].map((el) => scrollable(el.querySelector<HTMLElement>('.text-comparison__document-scroller')!))

		left!.scrollTop = 120
		left!.dispatchEvent(new Event('scroll'))
		expect(right!.scrollTop).toBe(120)

		before.app.unmount()
		after.app.unmount()
		session.destroy()
	})

	it('stops mirroring onto a document that is gone', async () => {
		const session = createComparisonSession('One\n\nTwo', 'One\n\nThree')
		const before = mountSide(session, 'before')
		const after = mountSide(session, 'after')
		await nextTick()
		const left = scrollable(before.el.querySelector<HTMLElement>('.text-comparison__document-scroller')!)
		const right = scrollable(after.el.querySelector<HTMLElement>('.text-comparison__document-scroller')!)

		after.app.unmount()
		left.scrollTop = 80
		left.dispatchEvent(new Event('scroll'))

		expect(right.scrollTop).toBe(0)

		before.app.unmount()
		session.destroy()
	})

	it('keeps its editors when a document is shown again', async () => {
		const session = createComparisonSession('Old', 'New')
		mountSide(session, 'after').app.unmount()

		const again = mountSide(session, 'after')
		await nextTick()

		expect(session.editors.after.isDestroyed).toBe(false)
		expect(again.el.querySelector('.ProseMirror')?.textContent).toBe('New')

		again.app.unmount()
		session.destroy()
	})

	it('releases its editors when destroyed', () => {
		const session = createComparisonSession('Old', 'New')

		session.destroy()

		expect(session.editors.before.isDestroyed).toBe(true)
		expect(session.editors.after.isDestroyed).toBe(true)
	})

	it('reports a comparison it cannot make', () => {
		vi.spyOn(logger, 'warn').mockImplementation(() => {})
		vi.spyOn(compare, 'compareDocuments').mockImplementation(() => {
			throw new Error('forced failure')
		})

		const session = createComparisonSession('Old', 'New')

		expect(session.failed).toBe(true)
		expect(session.visibleChanges.value).toEqual([])
		session.destroy()
	})
})
