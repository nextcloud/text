/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import 'proxy-polyfill'

import { Editor } from '@tiptap/core'
import hljs from 'highlight.js/lib/core'
import { createLowlight } from 'lowlight'

import { FocusTrap, PlainText, RichText } from './extensions/index.js'
import { logger } from './helpers/logger.js'

const lowlight = createLowlight()

const loadSyntaxHighlight = async (language) => {
	const list = hljs.listLanguages()
	logger.debug('Supported languages', { list })
	if (!lowlight.listLanguages().includes(language)) {
		try {
			logger.debug('Loading language', language)
			// eslint-disable-next-line n/no-missing-import
			const syntax = await import(
				/* webpackChunkName: "highlight/[request]" */ `../node_modules/highlight.js/lib/languages/${language}.js`
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

const createRichEditor = ({
	extensions = [],
	connection,
	relativePath,
	isEmbedded = false,
} = {}) => {
	return new Editor({
		editorProps,
		extensions: [
			RichText.configure({ connection, relativePath, isEmbedded }),
			FocusTrap,
			...extensions,
		],
	})
}

const createPlainEditor = ({ language, extensions = [] } = {}) => {
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

const serializePlainText = (doc) => {
	return doc.textContent
}

export {
	createPlainEditor,
	createRichEditor,
	loadSyntaxHighlight,
	serializePlainText,
}
