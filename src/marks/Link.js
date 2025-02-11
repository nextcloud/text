/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapLink from '@tiptap/extension-link'
import { domHref, parseHref } from './../helpers/links.js'
import { linkClicking } from '../plugins/links.js'
import { markInputRule, getMarkRange, isMarkActive } from '@tiptap/core'

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
		let href
		try {
			const url = new URL(mark.attrs.href, window.location)
			href = PROTOCOLS_TO_LINK_TO.includes(url.protocol)
				? domHref(mark, this.options.relativePath)
				: '#'
		} catch (error) {
			href = '#'
		}
		return ['a', {
			...mark.attrs,
			href,
			'data-md-href': mark.attrs.href,
			rel: 'noopener noreferrer nofollow',
		}, 0]
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
			insertOrSetLink: (text, attrs) => ({ state, chain, commands }) => {
				// Check if any text is selected,
				// if not insert the link using the given text property
				if (state.selection.empty) {
					if (isMarkActive(state, this.name)) {

						// get current href to check what to replace, assumes there's only one link mark on the anchor
						let href = ''
						state.selection.$anchor.marks().forEach(item => {
							if (item.attrs.href && item.type.name === 'link') {
								href = item.attrs.href
							}
						})
						commands.deleteRange(getMarkRange(state.selection.$anchor, state.schema.marks.link, { href }))
					}
					return chain().insertContent({
						type: 'text',
						marks: [{
							type: 'link',
							attrs,
						}],
						text,
					})
				} else {
					return commands.setLink(attrs)
				}
			},
		}
	},

	addProseMirrorPlugins() {
		const plugins = this.parent()
			// remove upstream link click handle plugin
			.filter(({ key }) => {
				return !key.startsWith('handleClickLink') && !key.startsWith('textHandleClickLink')
			})

		// Custom click handler plugins
		return [
			...plugins,
			linkClicking(),
		]

	},
})

export default Link
