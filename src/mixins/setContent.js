/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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

import escapeHtml from 'escape-html'
import markdownit from './../markdownit/index.js'

export default {
	methods: {
		setContent(content, { isRich, addToHistory = true } = {}) {
			const html = isRich
				? markdownit.render(content) + '<p/>'
				: `<pre>${escapeHtml(content)}</pre>`
			this.$editor.chain()
				.setContent(html, addToHistory)
				.command(({ tr }) => {
					tr.setMeta('addToHistory', addToHistory)
					return true
				})
				.run()
		},

	},
}
