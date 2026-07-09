/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ExtendedRegExpMatchArray } from '@tiptap/core'
import type { LinkOptions } from '@tiptap/extension-link'
import type { Mark, Node } from '@tiptap/pm/model'
import type { MarkdownSerializerState } from 'prosemirror-markdown'

import { getMarkRange, isMarkActive, markInputRule } from '@tiptap/core'
import TipTapLink, { isAllowedUri } from '@tiptap/extension-link'
import { defaultMarkdownSerializer } from 'prosemirror-markdown'
import { domHref, parseHref } from '../helpers/links.js'
import { logger } from '../helpers/logger.ts'
import { linkClicking } from '../plugins/links.ts'

export const PROTOCOLS_TO_LINK_TO = ['http:', 'https:', 'mailto:', 'tel:']

/**
 *
 * @param match to extract href from
 */
function extractHrefFromMatch(match: ExtendedRegExpMatchArray) {
	return { href: match.groups?.href }
}

/**
 *
 * @param match with multiple capture groups
 */
function extractHrefFromMarkdownLink(match: ExtendedRegExpMatchArray) {
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
	openLink?: (href: string) => void
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
			 *
			 * @param text The text in the link
			 * @param attrs The link attributes
			 * @param attrs.href The actual url
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
			openLink: undefined,
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
			isWikiLink: {
				default: false,
				parseHTML: (element) => element.getAttribute('data-wiki-link') === 'true',
				renderHTML: (attrs) => attrs.isWikiLink ? { 'data-wiki-link': 'true' } : {},
			},
			referenceLabel: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-md-reference-label'),
				renderHTML: (attrs) => attrs.referenceLabel
					? { 'data-md-reference-label': attrs.referenceLabel }
					: {},
			},
			referenceType: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-md-reference-type'),
				renderHTML: (attrs) => attrs.referenceType
					? { 'data-md-reference-type': attrs.referenceType }
					: {},
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
				? domHref(mark)
				: '#'
		} catch {
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
		const linkInputRegex = /(?:^|\s)\[([^[\]]+)\]\((?<href>.+?)\)$/gm
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
				(text, attrs) => ({ state, commands }) => {
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
					logger.debug('empty selection')
					return false
				}
				logger.debug('toggle link for selection')
				return this.editor.commands.toggleLink({ href: '' })
			},
		}
	},

	addProseMirrorPlugins() {
		const plugins = (this.parent?.() ?? [])
			// remove upstream link click handle plugin
			.filter((plugin) => !plugin.props.handleClick)

		// Add our own click handler plugin
		return [...plugins, linkClicking(this.options.openLink)]
	},

	toMarkdown: {
		open(
			state: MarkdownSerializerState,
			mark: Mark,
			parent: Node,
			index: number,
		) {
			if (!mark.attrs.isWikiLink) {
				const open = defaultMarkdownSerializer.marks.link.open
				return typeof open === 'function'
					? open(state, mark, parent, index)
					: open
			}
			const href = mark.attrs.href as string
			// Collect the display text of this mark's span to decide the form
			let innerText = ''
			parent.descendants((child) => {
				if (!mark.isInSet(child.marks)) {
					return false
				}
				if (child.isText) {
					innerText += child.text
				}
			})
			return innerText === href ? '[[' : `[[${href}|`
		},
		close(
			state: MarkdownSerializerState,
			mark: Mark,
			_parent: Node,
			_index: number,
		) {
			if (mark.attrs.isWikiLink) {
				return ']]'
			}
			if (mark.attrs.referenceLabel && mark.attrs.referenceType) {
				const label = mark.attrs.referenceLabel as string
				const type = mark.attrs.referenceType as
					| 'shortcut'
					| 'collapsed'
					| 'full'
				switch (type) {
					case 'shortcut':
						return ']'
					case 'collapsed':
						return '][]'
					case 'full':
						return `][${label}]`
				}
			}
			const close = defaultMarkdownSerializer.marks.link.close
			return typeof close === 'function'
				? close(state, mark, _parent, _index)
				: close
		},
		mixable: true,
		expelEnclosingWhitespace: false,
	},
})

export default Link
