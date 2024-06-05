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

import MentionSuggestion from './components/Suggestion/Mention/suggestions.js'

import { Editor } from '@tiptap/core'
import { lowlight } from 'lowlight/lib/core.js'
import hljs from 'highlight.js/lib/core'

import { logger } from './helpers/logger.js'
import { FocusTrap, Mention, PlainText, RichText } from './extensions/index.js'
import { PlainTextLowlight } from './nodes/PlainTextLowlight.js'

export const loadSyntaxHighlight = async (language) => {
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

export const createRichEditor = ({ extensions = [], session, relativePath, isEmbedded = false } = {}) => {
	 return _createEditor([
		FocusTrap,
		RichText.configure({
			relativePath,
			isEmbedded,
			extensions: [
				Mention.configure({
					suggestion: MentionSuggestion({
						session,
					}),
				}),
			],
		}),
		...extensions,
	])
}

export const createPlainEditor = ({ language, extensions = [] } = {}) => {
	return _createEditor([
		PlainText,
		PlainTextLowlight
			.configure({ lowlight, defaultLanguage: language }),
		...extensions,
	])
}

const _createEditor = extensions => {
	return new Editor({
		editorProps: { scrollMargin: 50, scrollThreshold: 50 },
		extensions,
	})
}
