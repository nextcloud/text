import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import { domHref } from '../helpers/links.js'
import LinkBubbleView from '../components/Link/LinkBubbleView.vue'

import { getViewerVue } from '../ViewerVue.js'

class LinkBubblePluginView {

	#component = null

	constructor({ view, options, plugin }) {
		this.options = options
		this.view = view
		this.plugin = plugin

		// When editor is used in Viewer component, it should render comopnent using Viewer's Vue constructor,
		// Otherwise there are VNodes with different Vue constructors in a single Virtual DOM which is not fully supported by Vue
		const ViewerVue = getViewerVue()
		const LinkBubbleViewConstructor = ViewerVue ? ViewerVue.extend(LinkBubbleView) : LinkBubbleView
		this.#component = new VueRenderer(LinkBubbleViewConstructor, {
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
		if (view.composing && !active.clicked) {
			return
		}
		if (active === oldActive) {
			return
		}
		const hasBubbleFocus = this.#component.element.contains(document.activeElement)
		const hasEditorFocus = view.hasFocus() || hasBubbleFocus
		const shouldShow = active.mark && (active.clicked || hasEditorFocus)
		this.updateTooltip(view, shouldShow, active.mark, active.nodeStart)
	}

	updateTooltip(view, shouldShow, mark, nodeStart) {
		this.createTooltip()

		if (!shouldShow) {
			this.hide()
			return
		}

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
