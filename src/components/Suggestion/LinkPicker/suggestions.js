/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import createSuggestions from '../suggestions.js'
import LinkPickerList from './LinkPickerList.vue'
import { searchProvider, getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'
import menuEntries from './../../Menu/entries.js'
import { getIsActive } from '../../Menu/utils.js'
import markdownit from '../../../markdownit/index.js'
import shouldInterpretAsMarkdown from '../../../markdownit/shouldInterpretAsMarkdown.js'

const suggestGroupFormat = t('text', 'Formatting')
const suggestGroupPicker = t('text', 'Smart picker')

const filterOut = (e) => {
	return ['undo', 'redo', 'outline', 'emoji-picker'].indexOf(e.key) > -1
}

const important = ['task-list', 'table']

const isValidUrl = (url) => {
	try {
		return Boolean(new URL(url))
	} catch (e) {
		return false
	}
}

const sortImportantFirst = (list) => {
	return [
		...list.filter(e => important.indexOf(e.key) > -1),
		...list.filter(e => important.indexOf(e.key) === -1),
	]
}

const formattingSuggestions = (query) => {
	return sortImportantFirst(
		[
			...menuEntries.find(e => e.key === 'headings').children,
			...menuEntries.find(e => e.key === 'lists').children,
			...menuEntries.filter(e => e.action && !filterOut(e)),
			...menuEntries.find(e => e.key === 'callouts').children,
			{
				...menuEntries.find(e => e.key === 'emoji-picker'),
				action: (command) => command.insertContent(':'),
			},
		].filter(e => e?.label?.toLowerCase?.()?.includes(query.toLowerCase()))
			.map(e => ({ ...e, suggestGroup: suggestGroupFormat })),
	)
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
			.then(link => {
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
			.catch(error => {
				console.error('Smart picker promise rejected', error)
			})
	},
	items: ({ editor, query }) => {
		return [
			...searchProvider(query)
				.map(p => {
					return {
						suggestGroup: suggestGroupPicker,
						label: p.title,
						icon: p.icon_url,
						providerId: p.id,
					}
				}).filter(e => e?.label?.toLowerCase?.()?.includes(query.toLowerCase())),
			...formattingSuggestions(query)
				.filter(({ action, isActive }) => {
					const canRunState = action(editor?.can())
					const isActiveState = isActive && getIsActive({ isActive }, editor)
					return canRunState && !isActiveState
				}),
		]
	},
})
