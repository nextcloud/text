import TipTapHeading from '@tiptap/extension-heading'
import { Plugin } from 'prosemirror-state'

// Same style as used by gitlab and github, both support unicode letters (incl. mark)
const slugify = (str) => String(str).toLowerCase().replace(/[^\p{Letter}\p{Mark}\w\s-]/gu, '').trim().replace(/\s+/g, '-')

const uniqueSlug = (slug, slugs) => {
	let uniq = slug
	let idx = 1
	while (Object.prototype.hasOwnProperty.call(slugs, uniq)) {
		uniq = `${slug}-${idx}`
		idx += 1
	}
	slugs[uniq] = true
	return uniq
}

const HeadingWithAnchor = TipTapHeading.extend({

	addKeyboardShortcuts() {
		return this.options.levels.reduce((items, level) => ({
			...items,
			[`Mod-Shift-${level}`]: () => this.editor.commands.toggleHeading({ level }),
		}), {})
	},

	addStorage() {
		return {
			slugs: {}, // used for the parseHTML function
		}
	},

	addAttributes() {
		return {
			...this.parent?.(),
			tabindex: {
				default: -1,
			},
			id: {
				default: null,
				parseHTML: (element) => {
					return uniqueSlug(slugify(element.innerText), this.storage.slugs)
				},
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				appendTransaction(transactions, oldState, newState) {
					const slugs = {}
					const tr = newState.tr
					let modified = false

					newState.doc.descendants(
						(node, pos) => {
							if (node.type.name === TipTapHeading.name) {
								if (node.textContent.length > 0) {
									const slug = uniqueSlug(slugify(node.textContent), slugs)
									if (node.attrs?.id !== slug) {
										tr.setNodeMarkup(pos, undefined, { ...node.attrs, id: slug })
										modified = true
									}
								}
								return false
							}
							return true
						}
					)
					return modified ? tr : null
				},
			}),
		]
	},
})

export { slugify, HeadingWithAnchor }
export default HeadingWithAnchor
