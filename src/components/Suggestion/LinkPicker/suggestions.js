/*
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
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
 */

import createSuggestions from '../suggestions.js'
import LinkPickerList from './LinkPickerList.vue'
import { searchProvider, getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'
import menuEntries from './../../Menu/entries.js'
import { getIsActive } from '../../Menu/utils.js'
import markdownit from '../../../markdownit/index.js'

const suggestGroupFormat = t('text', 'Formatting')
const suggestGroupPicker = t('text', 'Smart picker')

const filterOut = (e) => {
	return ['undo', 'redo', 'outline', 'emoji-picker'].indexOf(e.key) > -1
}

const important = ['task-list', 'table']

const hasMarkdownSyntax = (content) => {
	// Regular expressions for common Markdown patterns
	const markdownPatterns = [
		/\*\*.*?\*\*/, // Bold: **text**
		/\*.*?\*/, // Italics: *text*
		/\[.*?\(.*?\)/, // Links: [text](url)
		/^#{1,6}\s.*$/, // Headings: # text
		/^\s*[-+*]\s.*/m, // Unordered list: - item
		/^\s\d\..*/m, // Ordered list: 1. item
		/^>+\s.*/, // Blockquote: > text
		/`.*?`/, // Code: `code`
	]

	return markdownPatterns.some(pattern => pattern.test(content))
}

const isValidMarkdown = (content) => {
	try {
		markdownit.parse(content)
		return true
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
				let content = link

				if (hasMarkdownSyntax(content) && isValidMarkdown(content)) {
					content = markdownit.render(content)
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
