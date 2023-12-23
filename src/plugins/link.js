import { Plugin, PluginKey } from '@tiptap/pm/state'

import { logger } from '../helpers/logger.js'

const clickHandler = ({ editor, type, onClick }) => {
	return new Plugin({
		key: new PluginKey('textHandleClickLink'),
		props: {
			handleClick: (view, pos, event) => {
				// Only regard left clicks without Ctrl
				if (event.button !== 0 || event.ctrlKey) {
					return false
				}

				// Derive link from position of click instead of using `getAttribute()` (like Tiptap handleClick does)
				// In Firefox, `getAttribute()` doesn't work in read-only mode
				const $clicked = view.state.doc.resolve(pos)
				const link = $clicked.marks().find(m => m.type.name === type.name)
				if (!link) {
					return false
				}

				if (!link.attrs.href) {
					logger.warn('Could not determine href of link.')
					logger.debug('Link', { link })
					return false
				}

				event.stopPropagation()
				return onClick?.(event, link.attrs)
			},
		},
	})
}

const clickPreventer = () => {
	return new Plugin({
		key: new PluginKey('textAvoidClickLink'),
		props: {
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

export { clickHandler, clickPreventer }
