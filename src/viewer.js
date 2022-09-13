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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import ViewerComponent from './components/ViewerComponent.vue'
import { logger } from './helpers/logger.js'
import { openMimetypesMarkdown, openMimetypesPlainText } from './helpers/mime.js'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

if (typeof OCA.Viewer === 'undefined') {
	logger.error('Viewer app is not installed')
} else {
	OCA.Viewer.registerHandler({
		id: 'text',
		mimes: [...openMimetypesMarkdown, ...openMimetypesPlainText],
		component: ViewerComponent,
		group: null,
		theme: 'default',
	})
}
