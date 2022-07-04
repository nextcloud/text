import { Plugin, PluginKey } from 'prosemirror-state'

const clickHandler = ({ editor, type, onClick }) => {
	return new Plugin({
		props: {
			key: new PluginKey('textLink'),
			handleClick: (view, pos, event) => {
				const $clicked = view.state.doc.resolve(pos)
				const link = $clicked.marks().find(m => m.type.name === type.name)
				if (!link) {
					return false
				}
				if (!link.attrs.href) {
					console.warn('Could not determine href of link.')
					console.debug(link)
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

export { clickHandler }
