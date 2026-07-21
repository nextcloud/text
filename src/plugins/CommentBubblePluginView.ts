/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { Plugin } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'

import { autoUpdate, computePosition, offset, shift } from '@floating-ui/dom'
import { VueRenderer } from '@tiptap/vue-3'
import CommentBubbleView from '../components/Comment/CommentBubbleView.vue'

class CommentBubblePluginView {
	#component: VueRenderer | null = null
	#floatingEl: HTMLElement | null = null
	#cleanupAutoUpdate: (() => void) | null = null
	#editor: Editor
	plugin: Plugin
	view: EditorView

	constructor({ view, options, plugin }: { view: EditorView, options: { editor: Editor }, plugin: Plugin }) {
		this.view = view
		this.#editor = options.editor
		this.plugin = plugin
	}

	#closeOnOutsideClick = (event: MouseEvent) => {
		if (this.#floatingEl?.contains(event.target as Node)) {
			return
		}
		// Don't close if clicking a comment-ref (that opens a different thread)
		if ((event.target as HTMLElement).closest('.comment-ref')) {
			return
		}
		this.#editor.commands.hideCommentBubble()
	}

	#createFloating(referenceId: string) {
		if (this.#floatingEl) {
			return
		}
		this.#floatingEl = document.createElement('div')
		this.#floatingEl.style.cssText = 'position: fixed; z-index: 100; visibility: hidden;'

		this.#component = new VueRenderer(CommentBubbleView, {
			props: { editor: this.#editor, referenceId },
			editor: this.#editor,
		})
		this.#floatingEl.appendChild(this.#component.element!)
	}

	#destroyFloating() {
		this.#cleanupAutoUpdate?.()
		this.#cleanupAutoUpdate = null
		this.#component?.destroy()
		this.#component = null
		this.#floatingEl?.remove()
		this.#floatingEl = null
		document.removeEventListener('mousedown', this.#closeOnOutsideClick)
	}

	async #position(referenceEl: Element) {
		if (!this.#floatingEl) {
			return
		}
		const floating = this.#floatingEl
		const contentWrapper = this.view.dom.closest<HTMLElement>('[data-text-el="editor-content-wrapper"]')
		const container = contentWrapper ?? this.view.dom.parentNode as HTMLElement
		if (!container.contains(floating)) {
			container.appendChild(floating)
		}

		const update = async () => {
			const wrapperRect = (contentWrapper ?? this.view.dom.closest('div')!).getBoundingClientRect()
			const refRect = referenceEl.getBoundingClientRect()

			const { x, y } = await computePosition({
				getBoundingClientRect: () => new DOMRect(wrapperRect.right, refRect.top, 0, refRect.height),
			} as Element, floating, {
				placement: 'left',
				strategy: 'fixed',
				middleware: [offset(8), shift({ padding: 8 })],
			})
			floating.style.left = `${x}px`
			floating.style.top = `${y}px`
			floating.style.visibility = 'visible'
		}

		this.#cleanupAutoUpdate?.()
		this.#cleanupAutoUpdate = autoUpdate(referenceEl, floating, update)
	}

	update(view: EditorView) {
		const { active } = this.plugin.getState(view.state)
		if (!active) {
			this.#destroyFloating()
			return
		}

		this.#createFloating(active.referenceId)
		this.#component?.updateProps({
			referenceId: active.referenceId,
		})

		let referenceEl: Element | null
		try {
			const domNode = view.nodeDOM(active.nodeStart)
			referenceEl = domNode instanceof Element
				? domNode
				: (domNode as ChildNode | null)?.parentElement ?? null
		} catch {
			return
		}

		if (referenceEl) {
			this.#position(referenceEl)
			document.addEventListener('mousedown', this.#closeOnOutsideClick)
		}
	}

	destroy() {
		this.#destroyFloating()
	}
}

export default CommentBubblePluginView
