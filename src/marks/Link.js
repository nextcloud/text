/*
 * @copyright Copyright (c) 2019 Azul <azul@riseup.net>
 *
 * @author Azul <azul@riseup.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
import { mergeAttributes, Node, nodePasteRule } from '@tiptap/core'
import TipTapLink from '@tiptap/extension-link'
import { domHref, parseHref, openLink } from './../helpers/links.js'
import { clickHandler, clickPreventer, pasteHandler } from '../plugins/link.js'
import { find } from 'linkifyjs'
import LinkView from '../nodes/Link.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

const Link = Node.create({
	name: 'link',
	group: 'inline',
	inline: true,
	content: 'text*',
	atom: true,

	addOptions() {
		return {
			openOnClick: true,
			linkOnPaste: true,
			autolink: true,
			protocols: [],
			HTMLAttributes: {
				target: '_blank',
				rel: 'noopener noreferrer nofollow',
				class: null,
			},
			validate: undefined,
		}
	},

	addAttributes() {
		return {
			href: {
				default: null,
			},
			title: {
				default: null,
			},
			updateTitle: {
				default: false,
			},
		}
	},

	parseHTML: [
		{
			tag: 'a[href]',
			getAttrs: dom => ({
				href: parseHref(dom),
				title: dom.getAttribute('title'),
			}),
		},
	],

	renderHTML(options) {
		const { node, HTMLAttributes } = options

		return [
			'a',
			mergeAttributes(HTMLAttributes, {
				href: node.attrs.href,
				rel: 'noopener noreferrer nofollow',
			}),
			0,
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(LinkView)
	},

	toMarkdown: (state, node) => {
		state.write('[')
		state.renderContent(node)
		state.write('](')
		state.text(node.attrs.href, false)
		state.write(')')
		state.closeBlock(node)
	},

	addCommands() {
		return {
			setLink: attributes => ({ chain }) => {
				debugger
				return chain()
					.setNode(this.name, attributes)
					// .setMeta('preventAutolink', true)
					.run()
			},

			toggleLink: attributes => ({ chain }) => {
				debugger
				return chain()
					.toggleWrap(this.name, attributes)
					// .setMeta('preventAutolink', true)
					.run()
			},

			unsetLink: () => ({ chain }) => {
				debugger
				this.editor
					.chain()
					.setNode('text', null)
					.run()
			},
		}
	},

	addPasteRules() {
		return [
			nodePasteRule({
				find: text => find(text)
					.filter(link => {
						if (this.options.validate) {
							return this.options.validate(link.value)
						}

						return true
					})
					.filter(link => link.isLink)
					.map(link => ({
						text: link.value,
						index: link.start,
						data: link,
					})),
				type: this.type,
				getAttributes: match => ({
					href: match.data?.href,
				}),
			}),
		]
	},

	addProseMirrorPlugins() {
		const plugins = [
			pasteHandler(),
		]

		if (!this.options.openOnClick) {
			return plugins
		}

		// add custom click handler
		return [
			...plugins,
			clickHandler({
				editor: this.editor,
				type: this.type,
				onClick: this.options.onClick,
			}),
			clickPreventer(),

		]
	},
})

const LinkMark = TipTapLink.extend({

	addOptions() {
		return {
			...this.parent?.(),
			onClick: openLink,
			relativePath: null,
		}
	},

	addAttributes() {
		return {
			href: {
				default: null,
			},
			title: {
				default: null,
			},
		}
	},

	inclusive: false,

	parseHTML: [
		{
			tag: 'a[href]',
			getAttrs: dom => ({
				href: parseHref(dom),
				title: dom.getAttribute('title'),
			}),
		},
	],

	renderHTML(options) {
		const { mark } = options

		return ['a', {
			...mark.attrs,
			href: domHref(mark, this.options.relativePath),
			rel: 'noopener noreferrer nofollow',
		}, 0]
	},

	addProseMirrorPlugins() {
		const plugins = this.parent()
			// remove original handle click
			.filter(({ key }) => {
				return !key.startsWith('handleClickLink')
			})

		if (!this.options.openOnClick) {
			return plugins
		}

		// add custom click handler
		return [
			...plugins,
			clickHandler({
				editor: this.editor,
				type: this.type,
				onClick: this.options.onClick,
			}),
			clickPreventer(),
		]
	},
})

export default Link
