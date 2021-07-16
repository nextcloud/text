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
	OrderedList,
	Blockquote,
	CodeBlock,
	CodeBlockHighlight,
	HorizontalRule,
	History,
	TrailingNode,
	Placeholder,
} from 'tiptap-extensions'
import { Strong, Italic, Strike, Link } from './marks'
import { Image, PlainTextDocument, ListItem, BulletList } from './nodes'
import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import { translate as t } from '@nextcloud/l10n'

import 'proxy-polyfill'

import { MarkdownSerializer, defaultMarkdownSerializer } from 'prosemirror-markdown'

const loadSyntaxHighlight = async(language) => {
	const languages = [language]
	const modules = {}
	for (let i = 0; i < languages.length; i++) {
		try {
			const lang = await import(/* webpackChunkName: "highlight/[request]" */'highlight.js/lib/languages/' + languages[i])
			modules[languages[i]] = lang.default
		} catch (e) {
			// No matching highlighing found, fallback to none
			return undefined
		}
	}
	if (Object.keys(modules).length === 0 && modules.constructor === Object) {
		return undefined
	}
	return { languages: modules }
}

const createEditor = ({ content, onInit, onUpdate, extensions, enableRichEditing, languages }) => {
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
			new Link({
				openOnClick: true,
			}),
			new Image(),
			new Placeholder({
				emptyNodeClass: 'is-empty',
				emptyNodeText: t('text', 'Add notes, lists or links …'),
				showOnlyWhenEditable: true,
			}),
		]
	} else {
		richEditingExtensions = [
			new PlainTextDocument(),
			new Text(),
			new CodeBlockHighlight({
				...languages,
			}),
		]
	}
	extensions = extensions || []
	return new Editor({
		content,
		onInit,
		onUpdate,
		extensions: [
			...richEditingExtensions,
			new History(),
			new TrailingNode({
				node: 'paragraph',
				notAfter: ['paragraph'],
			  }),
		].concat(extensions),
		useBuiltInExtensions: enableRichEditing,
	})
}

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')
	.use(taskLists, { enable: true, labelAfter: true })

const SerializeException = function(message) {
	this.message = message
}
const createMarkdownSerializer = (_nodes, _marks) => {
	const nodes = Object
		.entries(_nodes)
		.filter(([, node]) => node.toMarkdown)
		.reduce((items, [name, { toMarkdown }]) => ({
			...items,
			[name]: toMarkdown,
		}), {})

	const marks = Object
		.entries(_marks)
		.filter(([, node]) => node.toMarkdown)
		.reduce((items, [name, { toMarkdown }]) => ({
			...items,
			[name]: toMarkdown,
		}), {})
	return {
		serializer: new MarkdownSerializer(
			{ ...defaultMarkdownSerializer.nodes, ...nodes },
			{ ...defaultMarkdownSerializer.marks, ...marks }
		),
		serialize(content, options) {
			return this.serializer.serialize(content, { ...options, tightLists: true })
				.split('\\[').join('[')
				.split('\\]').join(']')
		},
	}
}

const serializePlainText = (tiptap) => {
	const doc = tiptap.getJSON()

	if (doc.content.length !== 1 || typeof doc.content[0].content === 'undefined' || doc.content[0].content.length !== 1) {
		if (doc.content[0].type === 'code_block' && typeof doc.content[0].content === 'undefined') {
			return ''
		}
		throw new SerializeException('Failed to serialize document to plain text')
	}
	const codeBlock = doc.content[0].content[0]
	if (codeBlock.type !== 'text') {
		throw new SerializeException('Failed to serialize document to plain text')
	}
	return codeBlock.text
}

export default createEditor
export { markdownit, createEditor, createMarkdownSerializer, serializePlainText, loadSyntaxHighlight }
