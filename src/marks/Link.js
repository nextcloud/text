/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getMarkRange, isMarkActive, markInputRule } from '@tiptap/core'
import TipTapLink from '@tiptap/extension-link'
import { defaultMarkdownSerializer } from 'prosemirror-markdown'
import { linkClicking } from '../plugins/links.js'
import { domHref, parseHref } from './../helpers/links.js'

const PROTOCOLS_TO_LINK_TO = ['http:', 'https:', 'mailto:', 'tel:']

const extractHrefFromMatch = (match) => {
	return { href: match.groups.href }
}

const extractHrefFromMarkdownLink = (match) => {
	/**
	 * Removes the last capture group from the match to satisfy
	 * Tiptap markInputRule expectation of having the content as
	 * the last capture group in the match.
	 *
	 * https://github.com/ueberdosis/tiptap/blob/%40tiptap/core%402.0.0-beta.75/packages/core/src/inputRules/markInputRule.ts#L11
	 */
	match.pop()
	return extractHrefFromMatch(match)
}

const Link = TipTapLink.extend({
	addOptions() {
		return {
			...this.parent?.(),
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
			isWikiLink: {
				default: false,
				parseHTML: (element) =>
					element.getAttribute('data-wiki-link') === 'true',
				renderHTML: (attrs) =>
					attrs.isWikiLink ? { 'data-wiki-link': 'true' } : {},
			},
		}
	},

	inclusive: false,

	parseHTML: [
		{
			tag: 'a[href]',
			getAttrs: (dom) => ({
				href: parseHref(dom),
				title: dom.getAttribute('title'),
			}),
		},
	],

	renderHTML(options) {
		const { mark } = options
		let href
		try {
			const url = new URL(mark.attrs.href, window.location)
			href = PROTOCOLS_TO_LINK_TO.includes(url.protocol)
				? domHref(mark, this.options.relativePath)
				: '#'
		} catch (error) {
			href = '#'
		}
		return [
			'a',
			{
				...mark.attrs,
				href,
				'data-text-el': 'text-only-link',
				'data-md-href': mark.attrs.href,
				rel: 'noopener noreferrer nofollow',
			},
			0,
		]
	},

	addInputRules() {
		const linkInputRegex = /(?:^|\s)\[([\w|\s|-]+)\]\((?<href>.+?)\)$/gm
		return [
			markInputRule({
				find: linkInputRegex,
				type: this.type,
				getAttributes: extractHrefFromMarkdownLink,
			}),
		]
	},

	addCommands() {
		return {
			...this.parent?.(),
			insertOrSetLink:
				(text, attrs) =>
				({ state, chain, commands }) => {
					// Check if any text is selected,
					// if not insert the link using the given text property
					if (state.selection.empty) {
						if (isMarkActive(state, this.name)) {
							// get current href to check what to replace, assumes there's only one link mark on the anchor
							let href = ''
							state.selection.$anchor.marks().forEach((item) => {
								if (item.attrs.href && item.type.name === 'link') {
									href = item.attrs.href
								}
							})
							commands.deleteRange(
								getMarkRange(
									state.selection.$anchor,
									state.schema.marks.link,
									{ href },
								),
							)
							return chain().insertContent({
								type: 'text',
								marks: [
									{
										type: 'link',
										attrs,
									},
								],
								text,
							})
						}
						return chain().insertContent({
							type: 'paragraph',
							content: [
								{
									type: 'text',
									marks: [
										{
											type: 'link',
											attrs,
										},
									],
									text,
								},
							],
						})
					} else {
						return commands.setLink(attrs)
					}
				},
		}
	},

	addKeyboardShortcuts() {
		return {
			'Mod-k': () => {
				const { empty } = this.editor.state.selection
				if (empty) {
					console.debug('empty selection')
					return false
				}
				console.debug('toggle link for selection')
				return this.editor.commands.toggleLink({ href: '' })
			},
		}
	},

	addProseMirrorPlugins() {
		const plugins = this.parent()
			// remove upstream link click handle plugin
			.filter(({ key }) => {
				return (
					!key.startsWith('handleClickLink')
					&& !key.startsWith('textHandleClickLink')
				)
			})

		// Custom click handler plugins
		return [...plugins, linkClicking()]
	},

	// @ts-expect-error - toMarkdown is a custom field not part of the official Tiptap API
	toMarkdown: {
		open(state, mark, parent, index) {
			if (!mark.attrs.isWikiLink) {
				return defaultMarkdownSerializer.marks.link.open(
					state,
					mark,
					parent,
					index,
				)
			}
			const href = mark.attrs.href
			// Collect the display text of this mark's span to decide the form
			let innerText = ''
			parent.descendants((child, _pos) => {
				if (!mark.isInSet(child.marks)) {
					return false
				}
				if (child.isText) {
					innerText += child.text
				}
			})
			return innerText === href ? `[[` : `[[${href}|`
		},
		close(state, mark, _parent, _index) {
			if (!mark.attrs.isWikiLink) {
				return defaultMarkdownSerializer.marks.link.close(
					state,
					mark,
					_parent,
					_index,
				)
			}
			return ']]'
		},
		mixable: true,
		expelEnclosingWhitespace: false,
	},
})

export default Link
