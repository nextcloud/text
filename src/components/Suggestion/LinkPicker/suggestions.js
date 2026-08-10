/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import {
	getLinkWithPicker,
	searchProvider,
} from '@nextcloud/vue/components/NcRichText'
import LinkPickerList from './LinkPickerList.vue'
import { logger } from '../../../helpers/logger.ts'
import markdownit from '../../../markdownit/index.js'
import shouldInterpretAsMarkdown from '../../../markdownit/shouldInterpretAsMarkdown.js'
import { getIsActive } from '../../Menu/utils.js'
import createSuggestions from '../suggestions.js'
import { getMenuEntries } from './../../Menu/entries.ts'

const suggestGroupImportant = t('text', 'Suggestions')
const suggestGroupFormat = t('text', 'Formatting')
const suggestGroupPicker = t('text', 'Smart picker')

const important = ['task-list', 'table', 'callout-info']
const excludedFormatting = ['undo', 'redo', 'outline', 'emoji-picker']

const isImportant = (item) => important.includes(item.key) || important.includes(item.providerId)

/**
 *
 * @param {string} url to check
 */
function isValidUrl(url) {
	try {
		return Boolean(new URL(url))
	} catch {
		return false
	}
}

/**
 *
 * @param {string} query to filter by
 * @param {object} editor the editor instance
 */
function formattingItems(query, editor) {
	const menuEntries = getMenuEntries(false, false)
	return [
		...menuEntries.find((e) => e.key === 'headings').children,
		...menuEntries.find((e) => e.key === 'lists').children,
		...menuEntries.filter((e) => e.action && !excludedFormatting.includes(e.key)),
		...menuEntries.find((e) => e.key === 'blocks').children,
		{
			...menuEntries.find((e) => e.key === 'emoji-picker'),
			action: (command) => command.insertContent(':'),
		},
	]
		.filter((e) => e?.label?.toLowerCase?.()?.includes(query.toLowerCase()))
		.filter(({ action, isActive }) => {
			const canRunState = action(editor?.can())
			const isActiveState
				= isActive && getIsActive({ isActive }, editor)
			return canRunState && !isActiveState
		})
}

/**
 * @param {string} query to filter by
 */
function pickerItems(query) {
	return searchProvider(query)
		.map((p) => {
			let label = p.title
			if (p.id === 'files') {
				// Rename "Files" to "Link a file", less ambiguous
				label = t('text', 'Link a file')
			}
			return {
				label,
				icon: p.icon_url,
				providerId: p.id,
				order: p.order,
			}
		})
		.filter((e) => e?.label?.toLowerCase?.()?.includes(query.toLowerCase()))
}

export default () => createSuggestions({
	listComponent: LinkPickerList,
	command: ({ editor, range, props }) => {
		if (props.action) {
			const commandChain = editor.chain().deleteRange(range)
			props.action(commandChain)
			commandChain.run()
			return
		}
		getLinkWithPicker(props.providerId, true)
			.then((link) => {
				const isUrl = isValidUrl(link)
				if (!isUrl) {
					const isMarkdown = shouldInterpretAsMarkdown(link)
					// Insert markdown content (e.g. from `text_templates` app)
					const content = isMarkdown ? markdownit.render(link) : link
					editor
						.chain()
						.focus()
						.insertContentAt(range, content + ' ')
						.run()
					return
				}

				editor
					.chain()
					.focus()
					.deleteRange(range)
					.insertPreview(link)
					.run()
			})
			.catch((error) => {
				logger.error('Smart picker promise rejected', error)
			})
	},
	items: ({ editor, query }) => {
		const pickers = pickerItems(query)
		const formatting = formattingItems(query, editor)
		return [
			// pickers with order -1, then important pickers, then important formatting
			...[
				...pickers.filter((e) => e.order === -1),
				...pickers.filter((e) => e.order !== -1 && isImportant(e)),
				...formatting.filter(isImportant),
			].map((e) => ({ ...e, suggestGroup: suggestGroupImportant })),

			// Smart picker: remaining (non-important) pickers
			...pickers
				.filter((e) => e.order !== -1 && !isImportant(e))
				.map((e) => ({ ...e, suggestGroup: suggestGroupPicker })),

			// Formatting: remaining (non-important) formatting entries
			...formatting
				.filter((e) => !isImportant(e))
				.map((e) => ({ ...e, suggestGroup: suggestGroupFormat })),
		]
	},
})
