import TipTapHeading from '@tiptap/extension-heading'
import debounce from 'debounce'
import { v4 as uuidv4 } from 'uuid'

import store from '../store/index.js'

const regexSpaces = /\s+/g
const regexInvalidCaracters = /[^\p{Letter}\p{Mark}\w\s-]/gu

const slugify = (str) => String(str)
	.toLowerCase()
	.replace(regexInvalidCaracters, '')
	.trim()
	.replace(regexSpaces, '-')

const setHeadings = (val) => store.dispatch('setHeadings', val)

const Heading = TipTapHeading.extend({
	addAttributes() {
		return {
			...this.parent(),
			id: {
				default: undefined,
				rendered: true,
			},
			uuid: {
				default: undefined,
				rendered: false,
			},
		}
	},
	addKeyboardShortcuts() {
		return this.options.levels.reduce((items, level) => ({
			...items,
			[`Mod-Shift-${level}`]: () => this.editor.commands.toggleHeading({ level }),
		}), {})
	},

	onDestroy() {
		setHeadings([])

		if (this.parent) {
			this.parent()
		}
	},

	onUpdate: debounce(function onUpdate({ editor }) {
		const counter = new Map()
		const headings = []
		const tr = editor.state.tr

		const getId = text => {
			const id = slugify(text)

			if (counter.has(id)) {
				const next = counter.get(id)

				// increment counter
				counter.set(id, next + 1)

				return `${id}--${next}`
			}

			// define counter
			counter.set(id, 1)

			return id
		}

		editor.state.doc.descendants((node, position) => {
			if (node.type.name === 'heading') {
				const text = node.textContent
				const id = getId(text)
				const uuid = node.attrs.uuid ?? uuidv4()

				if (node.attrs.id !== id || !node.attrs.uuid) {
					const attrs = {
						...node.attrs,
						uuid,
						id,
					}

					tr.setNodeMarkup(position, undefined, attrs)
				}

				headings.push(Object.freeze({
					level: node.attrs.level,
					position,
					text,
					id,
					uuid,
				}))
			}
		})

		tr.setMeta('addToHistory', false)
		tr.setMeta('preventUpdate', true)

		editor.view.dispatch(tr)

		setHeadings(headings)

	}, 900),

})

export default Heading
