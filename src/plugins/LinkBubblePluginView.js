import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import { domHref } from '../helpers/links.js'
import LinkBubbleView from '../components/Link/LinkBubbleView.vue'

class LinkBubblePluginView {

	#component = null

	constructor({ view, options, plugin }) {
		this.options = options
		this.view = view
		this.plugin = plugin

		this.#component = new VueRenderer(LinkBubbleView, {
			parent: this.options.parent,
			propsData: {
				editor: this.options.editor,
				href: null,
			},
		})

		this.view.dom.addEventListener('dragstart', this.dragOrScrollHandler)
		document.addEventListener('scroll', this.dragOrScrollHandler, { capture: true })
	}

	dragOrScrollHandler = (event) => {
		// Cypress fires unexpected scroll events, which breaks testing the link bubble
		if (window.Cypress) {
			return
		}
		this.hide()
	}

	createTooltip() {
		const editorElement = this.options.editor.options.element
		const editorIsAttached = !!editorElement.parentElement

		if (this.tippy || !editorIsAttached) {
			return
		}

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
		const { active: oldActive } = this.plugin.getState(oldState)
		if (view.composing) {
			return
		}
		if (active === oldActive) {
			return
		}
		this.createTooltip()
		if (active?.mark) {
			this.updateTooltip(view, active)
		} else {
			this.hide()
		}
	}

	updateTooltip(view, { mark, nodeStart }) {
		let referenceEl = view.nodeDOM(nodeStart)
		if (Object.prototype.toString.call(referenceEl) === '[object Text]') {
			referenceEl = referenceEl.parentElement
		}
		const clientRect = referenceEl?.getBoundingClientRect()

		this.#component.updateProps({
			href: domHref(mark),
		})

		this.tippy?.setProps({
			getReferenceClientRect: () => clientRect,
		})

		this.show()
	}

	show() {
		this.tippy?.show()
	}

	hide() {
		setTimeout(() => {
			this.tippy?.hide()
		}, 100)
	}

	destroy() {
		this.tippy?.destroy()
		this.view.dom.removeEventListener('dragstart', this.dragOrScrollHandler)
		document.removeEventListener('scroll', this.dragOrScrollHandler, { capture: true })
	}

}

export default LinkBubblePluginView
