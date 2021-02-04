/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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

import { Bold, Italic as TipTapItalic, Strike as TipTapStrike, Link as TipTapLink } from 'tiptap-extensions'
import { Plugin } from 'tiptap'
import { getMarkAttrs } from 'tiptap-utils'
import { domHref, parseHref } from './../helpers/links'
import { markdownit } from './../EditorFactory'

/**
 * This file maps prosemirror mark names to tiptap classes,
 * so we can reuse the prosemirror-markdown default parser for now
 */

class Strong extends Bold {

	get name() {
		return 'strong'
	}

}

class Italic extends TipTapItalic {

	get name() {
		return 'em'
	}

}

class Strike extends TipTapStrike {

	get schema() {
		return {
			parseDOM: [
				{
					tag: 's',
				},
				{
					tag: 'del',
				},
				{
					tag: 'strike',
				},
				{
					style: 'text-decoration',
					getAttrs: value => value === 'line-through',
				},
			],
			toDOM: () => ['s', 0],
			toMarkdown: {
				open: '~~',
				close: '~~',
				mixable: true,
				expelEnclosingWhitespace: true,
			},
		}
	}

}

class Link extends TipTapLink {

	get schema() {
		return {
			attrs: {
				href: {
					default: null,
				},
			},
			inclusive: false,
			parseDOM: [
				{
					tag: 'a[href]',
					getAttrs: dom => ({
						href: parseHref(dom),
					}),
				},
			],
			toDOM: node => ['a', {
				...node.attrs,
				href: domHref(node),
				title: node.attrs.href,
				rel: 'noopener noreferrer nofollow',
			}, 0],
		}
	}

	get plugins() {
		if (!this.options.openOnClick) {
			return []
		}

		return [
			new Plugin({
				props: {
					handleClick: (view, pos, event) => {
						const { schema } = view.state
						const attrs = getMarkAttrs(view.state, schema.marks.link)

						const isLink = event.target instanceof HTMLAnchorElement || event.target.parentElement instanceof HTMLAnchorElement
						if (attrs.href && isLink) {
							const linkElement = event.target.parentElement instanceof HTMLAnchorElement ? event.target.parentElement : event.target
							event.stopPropagation()
							const htmlHref = linkElement.href
							if (event.button === 0 && !event.ctrlKey && htmlHref.startsWith(window.location.origin)) {
								const query = OC.parseQueryString(htmlHref)
								const fragment = OC.parseQueryString(htmlHref.split('#').pop())
								if (query.dir && fragment.relPath) {
									const filename = fragment.relPath.split('/').pop()
									const path = `${query.dir}/${filename}`
									document.title = `${filename} - ${OC.theme.title}`
									if (window.location.pathname.match(/apps\/files\/$/)) {
										// The files app still lacks a popState handler
										// to allow for using the back button
										// OC.Util.History.pushState('', htmlHref)
									}
									OCA.Viewer.open({ path })
									return
								}
							}

							if (!markdownit.validateLink(htmlHref)) {
								console.error('Invalid link', htmlHref)
								return
							}

							window.open(htmlHref)
						}
					},
				},
			}),
		]
	}

}

/** Strike is currently unsupported by prosemirror-markdown */

export {
	Strong,
	Italic,
	Strike,
	Link,
}
