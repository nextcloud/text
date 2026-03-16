/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ExtendedRegExpMatchArray } from '@tiptap/core'
import { getMarkRange, isMarkActive, markInputRule } from '@tiptap/core'
import type { LinkOptions } from '@tiptap/extension-link'
import TipTapLink, { isAllowedUri } from '@tiptap/extension-link'
import { domHref, parseHref } from '../helpers/links.js'
import { linkClicking } from '../plugins/links.js'

const PROTOCOLS_TO_LINK_TO = ['http:', 'https:', 'mailto:', 'tel:']

const extractHrefFromMatch = (match: ExtendedRegExpMatchArray) => {
	return { href: match.groups?.href }
}

const extractHrefFromMarkdownLink = (match: ExtendedRegExpMatchArray) => {
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

export interface RelativePathLinkOptions extends LinkOptions {
	relativePath?: string
}

const parentDefaults: LinkOptions = {
	openOnClick: true,
	enableClickSelection: false,
	linkOnPaste: true,
	autolink: true,
	protocols: [],
	defaultProtocol: 'http',
	HTMLAttributes: {
		target: '_blank',
		rel: 'noopener noreferrer nofollow',
		class: null,
	},
	isAllowedUri: (url, ctx) => !!isAllowedUri(url, ctx.protocols),
	validate: (url) => !!url,
	shouldAutoLink: (url) => {
		// URLs with explicit protocols (e.g., https://) should be auto-linked
		// But not if @ appears before :// (that would be userinfo like user:pass@host)
		const hasProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(url)
		const hasMaybeProtocol = /^[a-z][a-z0-9+.-]*:/i.test(url)

		if (hasProtocol || (hasMaybeProtocol && !url.includes('@'))) {
			return true
		}
		// Strip userinfo (user:pass@) if present, then extract hostname
		const urlWithoutUserinfo = url.includes('@') ? url.split('@').pop()! : url
		const hostname = urlWithoutUserinfo.split(/[/?#:]/)[0]

		// Don't auto-link IP addresses without protocol
		if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
			return false
		}
		// Don't auto-link single-word hostnames without TLD (e.g., "localhost")
		if (!/\./.test(hostname)) {
			return false
		}
		return true
	},
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		text_link: {
			/**
			 * Set a link mark or insert the link (when nothing is selected)
			 * @param text The text in the link
			 * @param attrs The link attributes
			 * @example editor.commands.insertOrSetLink('hello', { href: 'https://tiptap.dev' })
			 */
			insertOrSetLink: (
				text: string,
				attrs: {
					href: string
				},
			) => ReturnType
		}
	}
}

const Link = TipTapLink.extend<RelativePathLinkOptions>({
	addOptions() {
		return {
			...this.parent?.(),
			relativePath: undefined,
			...parentDefaults,
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

	parseHTML() {
		return [
			{
				tag: 'a[href]',
				getAttrs: (dom: HTMLElement) => ({
					href: parseHref(dom),
					title: dom.getAttribute('title'),
				}),
			},
		]
	},

	renderHTML(options) {
		const { mark } = options
		let href
		try {
			const url = new URL(mark.attrs.href, window.location.href)
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
				({ state, commands }) => {
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
							const range = getMarkRange(
								state.selection.$anchor,
								state.schema.marks.link,
								{ href },
							)
							if (range) {
								commands.deleteRange(range)
							}
							return commands.insertContent({
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
						return commands.insertContent({
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
		const plugins = (this.parent?.() ?? [])
			// remove upstream link click handle plugin
			.filter((plugin) => !plugin.props.handleClick)

		// Add our own click handler plugin
		return [...plugins, linkClicking()]
	},
})

export default Link
