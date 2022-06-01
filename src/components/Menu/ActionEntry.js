/*
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import ActionSingle from './ActionSingle.vue'
import ActionList from './ActionList.vue'

export default {
	name: 'ActionEntry',
	functional: true,
	render(h, ctx) {
		const { actionEntry } = ctx.props
		const { data, props, listeners } = ctx
		const { key } = data

		const params = {
			data,
			key,
			props,
			on: listeners,
		}

		if (actionEntry.component) {
			return h(actionEntry.component, params)
		}

		return actionEntry.children
			? h(ActionList, params)
			: h(ActionSingle, params)
	},
}
