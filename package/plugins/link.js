import { Plugin, PluginKey } from 'prosemirror-state'

const clickHandler = ({ editor, type, onClick }) => {
	return new Plugin({
		props: {
			key: new PluginKey('textLink'),
			handleClick: (view, pos, event) => {
				const attrs = editor.getAttributes(type)
				const link = event.target.closest('a')
				if (link && attrs.href && onClick) {
					return onClick(event, attrs)
				}
				return false
			},
		},
	})
}

export { clickHandler }
