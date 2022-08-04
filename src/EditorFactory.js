/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
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

/* eslint-disable import/no-named-as-default */
import Placeholder from '@tiptap/extension-placeholder'
/* eslint-enable import/no-named-as-default */

import TrailingNode from './nodes/TrailingNode.js'
import EditableTable from './nodes/EditableTable.js'
import MentionSuggestion from './components/Suggestion/Mention/suggestions.js'
import EmojiSuggestion from './components/Suggestion/Emoji/suggestions.js'

import 'proxy-polyfill'

import { Editor } from '@tiptap/core'
import { translate as t } from '@nextcloud/l10n'
import { lowlight } from 'lowlight/lib/core.js'
import hljs from 'highlight.js'

import { logger } from './helpers/logger.js'
import { Emoji, Markdown, Mention, PlainText, RichText } from './extensions/index.js'

const loadSyntaxHighlight = async (language) => {
	const list = hljs.listLanguages()
	logger.debug('Supported languages', { list })
	if (!lowlight.listLanguages().includes(language)) {
		try {
			logger.debug('Loading language', language)
			// eslint-disable-next-line n/no-missing-import
			const syntax = await import(/* webpackChunkName: "highlight/[request]" */`../node_modules/highlight.js/lib/languages/${language}`)
			lowlight.registerLanguage(language, syntax.default)
		} catch (error) {
			// fallback to none
			logger.debug('No matching highlighing found', { error })
		}
	}
}

const createEditor = ({ content, onCreate, onUpdate, extensions, enableRichEditing, session, relativePath }) => {
	let richEditingExtensions = []
	if (enableRichEditing) {
		richEditingExtensions = [
			Markdown,
			RichText.configure({
				relativePath,
				extensions: [
					EditableTable,
					Mention.configure({
						HTMLAttributes: {
							class: 'mention',
						},
						suggestion: MentionSuggestion({
							session,
						}),
					}),
				],
			}),
			Emoji.configure({
				suggestion: EmojiSuggestion(),
			}),
			Placeholder.configure({
				emptyNodeClass: 'is-empty',
				placeholder: t('text', 'Add notes, lists or links …'),
				showOnlyWhenEditable: true,
			}),
			TrailingNode,
		]
	} else {
		richEditingExtensions = [PlainText]
	}
	extensions = extensions || []
	return new Editor({
		content: content + '<p/>',
		onCreate,
		onUpdate,
		editorProps: {
			scrollMargin: 50,
			scrollThreshold: 50,
		},
		extensions: [
			...richEditingExtensions,
		].concat(extensions),
	})
}

const SerializeException = function(message) {
	this.message = message
}

const serializePlainText = (tiptap) => {
	const doc = tiptap.getJSON()

	if (doc.content.length !== 1 || typeof doc.content[0].content === 'undefined' || doc.content[0].content.length !== 1) {
		if (doc.content[0].type === 'codeBlock' && typeof doc.content[0].content === 'undefined') {
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
export { createEditor, serializePlainText, loadSyntaxHighlight }
