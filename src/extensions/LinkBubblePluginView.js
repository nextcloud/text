import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import { domHref } from '../helpers/links.js'
import LinkBubbleView from '../components/Link/LinkBubbleView.vue'

import { getViewerVue } from '../ViewerVue.js'

const updateDelay = 250

class LinkBubblePluginView {

	#component = null
	#preventHide = false
	#hadUpdateFromClick = false
	#updateDebounceTimer = undefined

	constructor({ editor, view }) {
		this.editor = editor
		this.view = view

		// When editor is used in Viewer component, it should render comopnent using Viewer's Vue constructor,
		// Otherwise there are VNodes with different Vue constructors in a single Virtual DOM which is not fully supported by Vue
		const ViewerVue = getViewerVue()
		const LinkBubbleViewConstructor = ViewerVue ? ViewerVue.extend(LinkBubbleView) : LinkBubbleView
		this.#component = new VueRenderer(LinkBubbleViewConstructor, {
			parent: this.editor.contentComponent,
			propsData: {
				editor: this.editor,
				href: null,
			},
		})

		this.view.dom.addEventListener('dragstart', this.dragOrScrollHandler)
		this.view.dom.addEventListener('click', this.clickHandler)
		document.addEventListener('scroll', this.dragOrScrollHandler, { capture: true })
		this.editor.on('focus', this.focusHandler)
		this.editor.on('blur', this.blurHandler)
	}

	dragOrScrollHandler = () => {
		// this.hide()
	}

	pointerdownHandler = () => {
		this.#preventHide = true
	}

	// Required for read-only mode on Firefox. For some reason, editor selection doesn't get
	// updated when clicking a link in read-only mode on Firefox.
	clickHandler = (event) => {
		// Only regard left clicks without Ctrl/Meta
		if (event.button !== 0 || event.ctrlKey || event.metaKey) {
			return false
		}

		// Only regard clicks that resolve to a prosemirror position
		const { pos } = this.editor.view.posAtCoords({ left: event.clientX, top: event.clientY })
		if (!pos) {
			return false
		}

		// Derive link from position of click instead of using `getAttribute()` (like Tiptap handleClick does)
		// In Firefox, `getAttribute()` doesn't work in read-only mode as clicking on links doesn't update selection/cursor.
		const clickedPos = this.editor.view.state.doc.resolve(pos)

		// we use `setTimeout` to make sure `selection` is already updated
		setTimeout(() => this.updateFromClick(this.editor.view, clickedPos))
	}

	focusHandler = () => {
		// we use `setTimeout` to make sure `selection` is already updated
		setTimeout(() => this.update(this.editor.view))
	}

	blurHandler = ({ event }) => {
		if (this.#preventHide) {
			this.#preventHide = false
			return
		}

		if (event?.relatedTarget && this.tippy?.popper.firstChild.contains(event.relatedTarget)) {
			return
		}

		this.hide()
	}

	tippyBlurHandler = () => {
		this.hide()
	}

	keydownHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault()
			this.hide()
		}
	}

	createTooltip() {
		const { element: editorElement } = this.editor.options
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

		this.tippy.popper.firstChild?.addEventListener('pointerdown', this.pointerdownHandler, { capture: true })
		// Hide tippy on its own blur event as well
		this.tippy.popper.firstChild?.addEventListener('blur', this.tippyBlurHandler)
	}

	update(view, oldState) {
		const { composing } = view
		const selectionChanged = !oldState?.selection.eq(view.state.selection)
		const docChanged = !oldState?.doc.eq(view.state.doc)
		const isSame = !selectionChanged && !docChanged

		if (composing || isSame) {
			return
		}

		if (this.#updateDebounceTimer) {
			clearTimeout(this.#updateDebounceTimer)
		}

		this.#updateDebounceTimer = window.setTimeout(() => {
			this.updateFromSelection(view)
		}, updateDelay)
	}

	updateFromSelection(view) {
		// Don't update directly after updateFromClick. Prevents race condition in read-only documents in Chrome.
		if (this.#hadUpdateFromClick) {
			return
		}

		const { state } = view
		const { selection } = state
		console.info({ head: selection.head, anchor: selection.anchor })

		// support for CellSelections
		const { ranges } = selection
		const from = Math.min(...ranges.map(range => range.$from.pos))

		const resolved = view.state.doc.resolve(from)
		const nodeStart = resolved.pos - resolved.textOffset
		const linkNode = this.linkNodeFromSelection(view)

		const hasBubbleFocus = this.#component.element.contains(document.activeElement)
		const hasEditorFocus = view.hasFocus() || hasBubbleFocus

		const shouldShow = !!linkNode && hasEditorFocus

		this.updateTooltip(view, shouldShow, linkNode, nodeStart)
	}

	updateFromClick(view, clickedLinkPos) {
		const nodeStart = clickedLinkPos.pos - clickedLinkPos.textOffset
		const clickedNode = clickedLinkPos.parent.maybeChild(clickedLinkPos.index())
		const shouldShow = this.isLinkNode(clickedNode)

		this.#hadUpdateFromClick = true
		setTimeout(() => {
			this.#hadUpdateFromClick = false
		}, 200)
		this.updateTooltip(this.editor.view, shouldShow, clickedNode, nodeStart)
	}

	updateTooltip = (view, shouldShow, linkNode, nodeStart) => {
		this.createTooltip()

		if (!shouldShow || !linkNode) {
			// Here it seems to fail
			this.hide()
			return
		}

		let referenceEl = view.nodeDOM(nodeStart)
		if (Object.prototype.toString.call(referenceEl) === '[object Text]') {
			referenceEl = referenceEl.parentElement
		}
		const clientRect = referenceEl?.getBoundingClientRect()

		this.#component.updateProps({
			href: domHref(linkNode.marks.find(m => m.type.name === 'link')),
		})

		this.tippy?.setProps({
			getReferenceClientRect: () => clientRect,
		})

		this.show()
	}

	show() {
		this.tippy?.show()
		this.view.dom.addEventListener('keydown', this.keydownHandler)
	}

	hide() {
		this.view.dom.removeEventListener('keydown', this.keydownHandler)
		setTimeout(() => {
			this.tippy?.hide()
		}, 100)
	}

	destroy() {
		this.tippy?.popper.firstChild?.removeEventListener('blur', this.tippyBlurHandler)
		this.tippy?.popper.firstChild?.removeEventListener('pointerdown', this.pointerdownHandler, { capture: true })
		this.tippy?.destroy()
		this.view.dom.removeEventListener('dragstart', this.dragOrScrollHandler)
		this.view.dom.removeEventListener('click', this.clickHandler)
		document.removeEventListener('scroll', this.dragOrScrollHandler, { capture: true })
		this.editor.off('focus', this.focusHandler)
		this.editor.off('blur', this.blurHandler)
	}

	linkNodeFromSelection = (view) => {
		const { state } = view
		const { selection } = state

		// support for CellSelections
		const { ranges } = selection
		const from = Math.min(...ranges.map(range => range.$from.pos))
		const to = Math.max(...ranges.map(range => range.$to.pos))

		const resolved = view.state.doc.resolve(from)
		const node = resolved.parent.maybeChild(resolved.index())
		const nodeStart = resolved.pos - resolved.textOffset
		const nodeEnd = nodeStart + node?.nodeSize

		if (to > nodeEnd) {
			// Selection spans further than one text node
			return
		}

		return this.isLinkNode(node) ? node : null
	}

	isLinkNode(node) {
		const linkMark = node?.marks.find(m => m.type.name === 'link')
		if (!linkMark) {
			return false
		}

		// Don't open link bubble for anchor links
		if (linkMark.attrs.href.startsWith('#')) {
			return false
		}

		return true
	}

}

export default LinkBubblePluginView
