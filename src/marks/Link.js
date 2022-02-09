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

import TipTapLink from '@tiptap/extension-link'
import { Plugin } from 'prosemirror-state'
import { domHref, parseHref } from './../helpers/links'
import markdownit from './../markdownit'

const Link = TipTapLink.extend({

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

	addProseMirrorPlugins() {
		if (!this.options.openOnClick) {
			return []
		}
		return [
			new Plugin({
				props: {
					handleClick: (view, pos, event) => {
						const attrs = this.editor.getAttributes('link')

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
	},
})

export default Link
