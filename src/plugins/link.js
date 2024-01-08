import { Plugin, PluginKey } from '@tiptap/pm/state'

import { logger } from '../helpers/logger.js'
import { isValidUrl, resolveLink } from '../helpers/links.js'

const clickHandler = ({ editor, type, onClick }) => {
	return new Plugin({
		props: {
			key: new PluginKey('textLink'),
			handleClick: (view, pos, event) => {
				const $clicked = view.state.doc.resolve(pos)
				// FIXME: Adapt to link node
				const link = $clicked.marks().find(m => m.type.name === type.name)
				if (!link) {
					return false
				}
				if (!link.attrs.href) {
					logger.warn('Could not determine href of link.')
					logger.debug('Link', { link })
					return false
				}
				// We use custom onClick handler only for left clicks
				if (event.button === 0 && !event.ctrlKey) {
					event.stopPropagation()
					return onClick?.(event, link.attrs)
				}
			},
		},
	})
}

const clickPreventer = () => {
	return new Plugin({
		props: {
			key: new PluginKey('textAvoidLinkClick'),
			handleDOMEvents: {
				click: (view, event) => {
					if (!view.editable) {
						event.preventDefault()
						return false
					}
				},
			},
		},
	})
}

const pasteHandler = () => {
	return new Plugin({
		props: {
			key: new PluginKey('linkPasteHandler'),
			handlePaste(view, event, slice) {
				if (slice.content.childCount > 1) {
					return false
				}

				let handle = false

				// https://discuss.prosemirror.net/t/urls-in-prosemirror/3453
				slice.content.descendants((node, pos, parent) => {
					// check that we're dealing with text and that it matches our expected url pattern
					if (node.type.name === 'text' && isValidUrl(node.text)) {
						handle = true

						// New node type for embeds
						// const newNode = view.state.config.schema.nodes.apm_inline_frame.create({ src: node.text })
						const schema = view.state.schema
						/* resolveLink(node.text).then((result) => {
							// FIXME: Better way of  when request takes longer (like a placeholder and replace afterwards)
							// https://prosemirror.net/examples/upload/
							// Mabe store as [](http) and have a placeholder in the link mark for empty text?
							const openGraphObject = result?.openGraphObject
							// const newNode = schema.text(openGraphObject?.name ?? node.text, [schema.marks.link.create({ href: node.text })])
							const text = openGraphObject?.name ?? node.text
							const newNode = schema.nodes.link.create({ href: node.text }, [
								schema.text(text),
							])

							view.dispatch(view.state.tr.replaceSelectionWith(newNode, false))
						}) */

						const newNode = schema.nodes.link.create({ href: node.text, updateTitle: true }, [
							schema.text(node.text),
						])

						view.dispatch(view.state.tr.replaceSelectionWith(newNode, false))
					}
				})

				return handle

			},
		},
	})
}

export { clickHandler, clickPreventer, pasteHandler }
