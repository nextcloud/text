/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Extension } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'
import type { Connection } from './composables/useConnection.ts'

import { Editor } from '@tiptap/core'
import hljs from 'highlight.js/lib/core'
import { createLowlight } from 'lowlight'
import { FocusTrap, PlainText, RichText } from './extensions/index.js'
import { logger } from './helpers/logger.ts'

import 'proxy-polyfill'

const lowlight = createLowlight()

/**
 * @param language to load the syntax highlighting for
 */
async function loadSyntaxHighlight(language: string) {
	const list = hljs.listLanguages()
	logger.debug('Supported languages', { list })
	if (!lowlight.listLanguages().includes(language)) {
		try {
			logger.debug('Loading language ' + language)
			const syntax = await import(`../node_modules/highlight.js/lib/languages/${language}.js`)
			lowlight.register(language, syntax.default)
		} catch (error) {
			// fallback to none
			logger.debug('No matching highlighing found', { error })
		}
	}
}

const editorProps = {
	scrollMargin: 50,
	scrollThreshold: 50,
}

/**
 *
 * @param options for the editor
 * @param options.extensions additional tiptap extensions
 * @param options.connection to the server api
 * @param options.relativePath to the file
 * @param options.isEmbedded wether the editor is embedded as a preview
 * @param options.mentionSearch hook to perform searches for mentions
 * @param options.openLink hook called when opening a link
 */
function createRichEditor({
	extensions = [],
	connection,
	relativePath,
	isEmbedded = false,
	mentionSearch = undefined,
	openLink = undefined,
}: {
	extensions?: Extension[]
	connection?: Connection
	relativePath?: string
	isEmbedded?: boolean
	mentionSearch?: (query: string) => Promise<Record<string, string>>
	openLink?: (href: string) => void
} = {}) {
	return new Editor({
		editorProps,
		extensions: [
			RichText.configure({
				connection,
				relativePath,
				isEmbedded,
				mentionSearch,
				openLink,
			}),
			FocusTrap,
			...extensions,
		],
	})
}

/**
 *
 * @param options for the editor
 * @param options.language for syntax highlighting, default: plaintext
 * @param options.extensions additional tiptap extensions
 */
function createPlainEditor({
	language = 'plaintext',
	extensions = [],
}: { language?: string, extensions?: Extension[] } = {}) {
	return new Editor({
		editorProps,
		extensions: [
			PlainText.configure({
				// Options to be passed through to `CodeBlockPlainText`
				lowlight,
				defaultLanguage: language,
			}),
			FocusTrap,
			...extensions,
		],
	})
}

/**
 *
 * @param doc prosemirror document to serialize
 */
function serializePlainText(doc: Node) {
	return doc.textContent
}

export {
	createPlainEditor,
	createRichEditor,
	loadSyntaxHighlight,
	serializePlainText,
}
