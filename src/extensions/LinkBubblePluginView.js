import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import { domHref } from '../helpers/links.js'
import LinkBubbleView from '../components/Link/LinkBubbleView.vue'

class LinkBubblePluginView {

	component = null
	preventHide = false
	updateDebounceTimer = undefined
	updateDelay = 250

	constructor({ editor, view }) {
		this.editor = editor
		this.view = view

		this.component = new VueRenderer(LinkBubbleView, {
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
		this.hide()
	}

	pointerdownHandler = () => {
		this.preventHide = true
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
		if (this.preventHide) {
			this.preventHide = false
			return
		}

		if (event?.relatedTarget && this.component.element.parentNode?.contains(event.relatedTarget)) {
			return
		}

		this.hide()
	}

	tippyBlurHandler = (event) => {
		this.blurHandler({ event })
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
			content: this.component.element,
			interactive: true,
			trigger: 'manual',
			placement: 'bottom',
			hideOnClick: 'toggle',
			popperOptions: {
				strategy: 'fixed',
			},
		})

		// maybe we have to hide tippy on its own blur event as well
		if (this.tippy.popper.firstChild) {
			(this.tippy.popper.firstChild).addEventListener('blur', this.tippyBlurHandler)
		}
	}

	update(view, oldState) {
		const { composing } = view
		const selectionChanged = !oldState?.selection.eq(view.state.selection)
		const docChanged = !oldState?.doc.eq(view.state.doc)
		const isSame = !selectionChanged && !docChanged

		if (composing || isSame) {
			return
		}

		if (this.updateDebounceTimer) {
			clearTimeout(this.updateDebounceTimer)
		}

		this.updateDebounceTimer = window.setTimeout(() => {
			this.updateFromSelection(view)
		}, this.updateDelay)
	}

	updateFromSelection(view) {
		const { state } = view
		const { selection } = state

		// support for CellSelections
		const { ranges } = selection
		const from = Math.min(...ranges.map(range => range.$from.pos))

		const resolved = view.state.doc.resolve(from)
		const nodeStart = resolved.pos - resolved.textOffset
		const linkNode = this.linkNodeFromSelection(view)

		const isLink = linkNode?.marks.some(m => m.type.name === 'link')
		const hasBubbleFocus = this.component.element.contains(document.activeElement)
		const hasEditorFocus = view.hasFocus() || hasBubbleFocus
		const shouldShow = isLink && hasEditorFocus

		this.updateTooltip(view, shouldShow, linkNode, nodeStart)
	}

	updateFromClick(view, clickedLinkPos) {
		const nodeStart = clickedLinkPos.pos - clickedLinkPos.textOffset
		const linkNode = clickedLinkPos.parent.maybeChild(clickedLinkPos.index())

		const shouldShow = linkNode?.marks.some(m => m.type.name === 'link')

		this.updateTooltip(this.editor.view, shouldShow, linkNode, nodeStart)
	}

	updateTooltip = (view, shouldShow, linkNode, nodeStart) => {
		this.createTooltip()

		if (!shouldShow || !linkNode) {
			this.hide()
			return
		}

		let referenceEl = view.nodeDOM(nodeStart)
		if (Object.prototype.toString.call(referenceEl) === '[object Text]') {
			referenceEl = referenceEl.parentElement
		}
		const clientRect = referenceEl?.getBoundingClientRect()

		this.component.updateProps({
			href: domHref(linkNode.marks.find(m => m.type.name === 'link')),
		})

		this.tippy?.setProps({
			getReferenceClientRect: () => clientRect,
		})

		this.show()
	}

	show() {
		this.component.element.addEventListener('pointerdown', this.pointerdownHandler, { capture: true })
		this.tippy?.show()
	}

	hide() {
		this.component.element.removeEventListener('pointerdown', this.pointerdownHandler, { capture: true })
		this.tippy?.hide()
	}

	destroy() {
		if (this.tippy?.popper.firstChild) {
			(this.tippy.popper.firstChild).removeEventListener('blur', this.tippyBlurHandler)
		}
		this.tippy?.destroy()
		this.component.element.removeEventListener('pointerdown', this.pointerdownHandler, { capture: true })
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

		if (!node?.isText || !node.marks.some(m => m.type.name === 'link')) {
			// Selected node is not a text node with link mark
			return
		}

		return node
	}

}

export default LinkBubblePluginView
