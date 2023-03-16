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
import markdownit from '../../../markdownit/index.js'

import { searchProvider, getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'

export default () => createSuggestions({
	listComponent: LinkPickerList,
	command: ({ editor, range, props }) => {
		const raw = '- [ ] Clean bedroom\n' +
			'- [ ] Take out trash\n' +
			'- [ ] Wash dishes\n' +
			'- [ ] Vacuum living room\n' +
			'- [ ] Mop kitchen\n\n'
		const html = markdownit.render(raw)
		console.debug('hhhhhhhh RAW', raw)
		console.debug('hhhhhhhh PROCESSED', html)
		editor
			.chain()
			.focus()
			.insertContentAt(range, html)
			.run()

		const raw2 = '- Clean bedroom\n' +
			'- Take out trash\n' +
			'- Wash dishes\n' +
			'- Vacuum living room\n' +
			'- Mop kitchen'
		const html2 = markdownit.render(raw2)
		console.debug('hhhhhhhh RAW', raw2)
		console.debug('hhhhhhhh PROCESSED', html2)
		editor
			.chain()
			.focus()
			.insertContentAt(range, html2)
			.run()

		getLinkWithPicker(props.providerId, true)
			.then(link => {
				editor
					.chain()
					.focus()
					.insertContentAt(range, link + ' ')
					.run()
			})
			.catch(error => {
				console.error('Link picker promise rejected:', error)
			})
	},
	items: ({ query }) => {
		return searchProvider(query)
			.map(p => {
				return {
					label: p.title,
					icon: p.icon_url,
					providerId: p.id,
				}
			})
	},
})
