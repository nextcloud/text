/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import Link from '../../marks/Link.ts'
import Strong from '../../marks/Strong.js'
import { findLinkSpans } from '../../plugins/linkPill.ts'
import { linkBubbleKey } from '../../plugins/links.ts'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('linkPill plugin', () => {
	it('finds one end per link, merging text nodes of the same link', () => {
		const editor = createCustomEditor(
			'<p><a href="https://example.org/">Te<strong>st</strong></a> <a href="https://example.com/">two</a></p>',
			[Link, Strong],
		)
		const spans = findLinkSpans(editor.state.doc)
		expect(spans).toHaveLength(2)
		expect(spans[0]).toMatchObject({ nodeStart: 1, end: 5 })
		expect(spans[0].mark.attrs.href).toBe('https://example.org/')
		expect(spans[1]).toMatchObject({ nodeStart: 6, end: 9 })
		editor.destroy()
	})

	it('skips anchor links', () => {
		const editor = createCustomEditor('<p><a href="#heading">Test</a></p>', [Link])
		expect(findLinkSpans(editor.state.doc)).toHaveLength(0)
		expect(editor.view.dom.querySelectorAll('.link-pill')).toHaveLength(0)
		editor.destroy()
	})

	it('renders pill after link', () => {
		const editor = createCustomEditor(
			'<p><a href="https://example.org/">Test</a> text</p>',
			[Link],
		)
		const pills = editor.view.dom.querySelectorAll('.link-pill')
		expect(pills).toHaveLength(1)
		expect(pills[0].previousSibling?.nodeName).toBe('A')

		const dispatch = vi.spyOn(editor.view, 'dispatch')
		pills[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
		expect(dispatch).toHaveBeenCalledTimes(1)
		const active = dispatch.mock.calls[0][0].getMeta(linkBubbleKey).active
		expect(active.nodeStart).toBe(1)
		expect(active.mark.attrs.href).toBe('https://example.org/')
		editor.destroy()
	})
})
