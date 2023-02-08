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

import { searchProvider, getLinkWithPicker } from '@nextcloud/vue-richtext'

export default () => createSuggestions({
	listComponent: LinkPickerList,
	command: ({ editor, range, props }) => {
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
