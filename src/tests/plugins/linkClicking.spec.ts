/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import Link from '../../marks/Link.ts'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('linkClicking plugin', () => {
	function setup(content: string) {
		const openLink = vi.fn()
		const editor = createCustomEditor(content, [Link.configure({ openLink })])
		document.body.appendChild(editor.view.dom)
		const link = editor.view.dom.querySelector('a')!
		return { editor, openLink, link }
	}

	function click(el: Element, init: MouseEventInit = {}) {
		el.dispatchEvent(
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				button: 0,
				...init,
			}),
		)
	}

	afterEach(() => {
		document.getSelection()?.removeAllRanges()
		document.body.replaceChildren()
	})

	it('opens the link on left click', () => {
		const { editor, openLink, link } = setup(
			'<p><a href="https://example.org/">Test</a></p>',
		)
		click(link)
		expect(openLink).toHaveBeenCalledWith('https://example.org/')
		editor.destroy()
	})

	it('opens the link on ctrl click', () => {
		const { editor, openLink, link } = setup(
			'<p><a href="https://example.org/">Test</a></p>',
		)
		click(link, { ctrlKey: true })
		expect(openLink).toHaveBeenCalledWith('https://example.org/')
		editor.destroy()
	})

	it('does not open the link when text is selected', () => {
		const { editor, openLink, link } = setup(
			'<p><a href="https://example.org/">Test</a></p>',
		)
		const range = document.createRange()
		range.selectNodeContents(link)
		document.getSelection()?.addRange(range)
		click(link)
		expect(openLink).not.toHaveBeenCalled()
		editor.destroy()
	})

	it('does not open anchor links', () => {
		const { editor, openLink, link } = setup(
			'<p><a href="#heading">Test</a></p>',
		)
		click(link)
		expect(openLink).not.toHaveBeenCalled()
		editor.destroy()
	})
})
