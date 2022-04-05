/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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
 *
 */

import TiptapBulletList from '@tiptap/extension-bullet-list'
import { listInputRule } from '../commands'

/* We want to allow for `* [ ]` as an input rule for bullet lists.
 * Therefore the list input rules need to check the input
 * until the first char after the space.
 * Only there we know the user is not trying to create a task list.
 */
const BulletList = TiptapBulletList.extend({

	addInputRules() {
		return [
			listInputRule(
				/^\s*([-+*])\s([^\s[])$/,
				this.type
			),
		]
	},

})

export default BulletList
