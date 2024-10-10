/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import MentionSuggestion from './components/Suggestion/Mention/suggestions.js'

import 'proxy-polyfill'

import { Editor } from '@tiptap/core'
import { lowlight } from 'lowlight/lib/core.js'
import hljs from 'highlight.js/lib/core'

import { logger } from './helpers/logger.js'
import { FocusTrap, Mention, PlainText, RichText } from './extensions/index.js'
// eslint-disable-next-line import/no-named-as-default
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

const loadSyntaxHighlight = async (language) => {
	const list = hljs.listLanguages()
	logger.debug('Supported languages', { list })
	if (!lowlight.listLanguages().includes(language)) {
		try {
			logger.debug('Loading language', language)
			// eslint-disable-next-line n/no-missing-import
			const syntax = await import(/* webpackChunkName: "highlight/[request]" */`../node_modules/highlight.js/lib/languages/${language}.js`)
			lowlight.registerLanguage(language, syntax.default)
		} catch (error) {
			// fallback to none
			logger.debug('No matching highlighing found', { error })
		}
	}
}

const createEditor = ({ language, onCreate = () => {}, onUpdate = () => {}, extensions, enableRichEditing, session, relativePath, isEmbedded = false }) => {
	let defaultExtensions
	if (enableRichEditing) {
		defaultExtensions = [
			RichText.configure({
				relativePath,
				isEmbedded,
				component: this,
				extensions: [
					Mention.configure({
						suggestion: MentionSuggestion({
							session,
						}),
					}),
				],
			}),
			FocusTrap,
		]
	} else {
		defaultExtensions = [
			PlainText,
			CodeBlockLowlight.configure({
				lowlight,
				defaultLanguage: language,
				exitOnTripleEnter: false,
			}),
		]
	}

	return new Editor({
		onCreate,
		onUpdate,
		editorProps: {
			scrollMargin: 50,
			scrollThreshold: 50,
		},
		extensions: defaultExtensions.concat(extensions || []),
	})
}

const serializePlainText = (doc) => {
	return doc.textContent
}

export default createEditor
export { createEditor, serializePlainText, loadSyntaxHighlight }
