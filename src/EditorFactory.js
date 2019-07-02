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
import { Editor, Text } from 'tiptap'
import {
	HardBreak,
	Heading,
	Code,
	Link,
	BulletList,
	OrderedList,
	ListItem,
	Blockquote,
	CodeBlock,
	CodeBlockHighlight,
	HorizontalRule,
	History
} from 'tiptap-extensions'
import { Strong, Italic, Strike } from './marks'
import { Image, PlainTextDocument } from './nodes'
import MarkdownIt from 'markdown-it'

import { MarkdownSerializer, defaultMarkdownSerializer } from 'prosemirror-markdown'

const loadSyntaxHighlight = async(languages) => {
	let modules = {}
	for (let i = 0; i < languages.length; i++) {
		const lang = await import('highlight.js/lib/languages/' + languages[i])
		modules[languages[i]] = lang.default
	}
	if (Object.keys(modules).length === 0 && modules.constructor === Object) {
		return undefined
	}
	return { languages: modules }
}

const createEditor = async({ content, onUpdate, extensions, enableRichEditing, languages }) => {
	const highlight = await loadSyntaxHighlight(languages)
	let richEditingExtensions = []
	if (enableRichEditing) {
		richEditingExtensions = [
			new Heading(),
			new Code(),
			new Strong(),
			new Italic(),
			new Strike(),
			new HardBreak(),
			new HorizontalRule(),
			new BulletList(),
			new OrderedList(),
			new Blockquote(),
			new CodeBlock(),
			new ListItem(),
			new Link(),
			new Image()
		]
	} else {
		richEditingExtensions = [
			new PlainTextDocument(),
			new Text(),
			new CodeBlockHighlight({
				...highlight
			})
		]
	}
	extensions = extensions || []
	return new Editor({
		content: content,
		onUpdate: onUpdate,
		extensions: [
			...richEditingExtensions,
			new History()
		].concat(extensions),
		useBuiltInExtensions: enableRichEditing
	})
}

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')

const createMarkdownSerializer = (_nodes, _marks) => {
	const nodes = Object
		.entries(_nodes)
		.filter(([, node]) => node.toMarkdown)
		.reduce((items, [name, { toMarkdown }]) => ({
			...items,
			[name]: toMarkdown
		}), {})

	const marks = Object
		.entries(_marks)
		.filter(([, node]) => node.toMarkdown)
		.reduce((items, [name, { toMarkdown }]) => ({
			...items,
			[name]: toMarkdown
		}), {})
	return new MarkdownSerializer(
		{ ...defaultMarkdownSerializer.nodes, ...nodes },
		{ ...defaultMarkdownSerializer.marks, ...marks }
	)
}

const serializePlainText = (tiptap) => {
	const doc = tiptap.getHTML().replace(/<[^>]*>?/gm, '')
	return new DOMParser().parseFromString(doc, 'text/html').body.textContent
}

export default createEditor
export { markdownit, createEditor, createMarkdownSerializer, serializePlainText }
