/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Extension } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'
import type { Connection } from './composables/useConnection'

import { Editor } from '@tiptap/core'
import hljs from 'highlight.js/lib/core'
import { createLowlight } from 'lowlight'
import { FocusTrap, PlainText, RichText } from './extensions/index.js'
import { logger } from './helpers/logger'

import 'proxy-polyfill'

const lowlight = createLowlight()

/**
 *
 * @param language
 */
async function loadSyntaxHighlight(language: string) {
	const list = hljs.listLanguages()
	logger.debug('Supported languages', { list })
	if (!lowlight.listLanguages().includes(language)) {
		try {
			logger.debug('Loading language ' + language)
			// eslint-disable-next-line n/no-missing-import
			const syntax = await import(
				`../node_modules/highlight.js/lib/languages/${language}.js`
			)
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
 * @param root0
 * @param root0.extensions
 * @param root0.connection
 * @param root0.relativePath
 * @param root0.isEmbedded
 * @param root0.mentionSearch
 * @param root0.openLink
 * @param root0.noLazyImages
 */
function createRichEditor({
	extensions = [],
	connection,
	relativePath,
	isEmbedded = false,
	mentionSearch = undefined,
	openLink = undefined,
	noLazyImages = false,
}: {
	extensions?: Extension[]
	connection?: Connection
	relativePath?: string
	isEmbedded?: boolean
	mentionSearch?: (query: string) => Promise<Record<string, string>>
	openLink?: (href: string) => void
	noLazyImages?: boolean
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
				noLazyImages,
			}),
			FocusTrap,
			...extensions,
		],
	})
}

/**
 *
 * @param root0
 * @param root0.language
 * @param root0.extensions
 */
function createPlainEditor({
	language = 'plaintext',
	extensions = [],
}: { language?: string; extensions?: Extension[] } = {}) {
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
 * @param doc
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
