/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import LinkBubbleView from '../components/Link/LinkBubbleView.vue'
import { domHref } from '../helpers/links.js'

class LinkBubblePluginView {
	#component = null
	#editor = null

	constructor({ view, options, plugin }) {
		this.options = options
		this.view = view
		this.plugin = plugin
		this.#editor = this.options.editor
	}

	addEventListeners() {
		this.view.dom.addEventListener('dragstart', this.closeOnExternalEvents)
		document.addEventListener('mousedown', this.closeOnExternalEvents)
		document.addEventListener('scroll', this.closeOnExternalEvents, {
			capture: true,
		})
	}

	removeEventListeners() {
		this.view.dom.removeEventListener('dragstart', this.closeOnExternalEvents)
		document.removeEventListener('mousedown', this.closeOnExternalEvents)
		document.removeEventListener('scroll', this.closeOnExternalEvents, {
			capture: true,
		})
	}

	closeOnExternalEvents = (event) => {
		// Only hide when targetting something outside of the popup
		if (this.tippy?.popper?.contains(event.target)) {
			return
		}

		// Cypress fires unexpected scroll events, which breaks testing the link bubble
		if (window.Cypress && event.type === 'scroll') {
			return
		}

		this.#editor.commands.hideLinkBubble()
	}

	createTooltip() {
		const editorElement = this.options.editor.options.element
		const editorIsAttached = !!editorElement.parentElement

		if (this.tippy || !editorIsAttached) {
			return
		}

		this.#component ||= new VueRenderer(LinkBubbleView, {
			parent: this.options.editor.contentComponent,
			propsData: {
				editor: this.options.editor,
				href: null,
			},
		})

		this.tippy = tippy(editorElement, {
			duration: 100,
			getReferenceClientRect: null,
			content: this.#component.element,
			interactive: true,
			trigger: 'manual',
			placement: 'bottom',
			hideOnClick: 'toggle',
			popperOptions: {
				strategy: 'fixed',
			},
		})
	}

	update(view, oldState) {
		const { active } = this.plugin.getState(view.state)
		if (view.composing) {
			return
		}
		this.createTooltip()
		if (active?.mark) {
			setTimeout(() => {
				this.updateTooltip(view, active)
			}, 100)
		} else {
			this.removeEventListeners()
			setTimeout(() => {
				this.tippy?.hide()
			}, 100)
		}
	}

	updateTooltip(view, { mark, nodeStart }) {
		let referenceEl
		try {
			referenceEl = view.nodeDOM(nodeStart)
		} catch (e) {
			// Prevent throwing error at rerouting in `openLink()`
			return
		}
		if (Object.prototype.toString.call(referenceEl) === '[object Text]') {
			referenceEl = referenceEl.parentElement
		}

		this.#component?.updateProps({
			href: domHref(mark),
		})

		const clientRect = referenceEl?.getBoundingClientRect()
		if (clientRect) {
			this.tippy?.setProps({
				getReferenceClientRect: () => clientRect,
			})
		}

		this.tippy?.show()
		this.addEventListeners()
	}

	destroy() {
		this.tippy?.destroy()
	}
}

export default LinkBubblePluginView
