/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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
import axios from '@nextcloud/axios'
import { endpointUrl } from '../helpers/index.js'
import { SyncService } from './SyncService.js'

class SessionApi {

	#defaultParams

	/** @param {SyncService} authority - authentication params for the requests */
	constructor(authority) {
		const { document, session, options } = authority
		this.#defaultParams = {
			documentId: document.id,
			sessionId: session.id,
			sessionToken: session.token,
			token: options.shareToken,
			filePath: options.filePath,
		}
	}

	_isPublic() {
		return !!this.#defaultParams.token
	}

	sync({ version, autosaveContent, force, manualSave }) {
		return axios.post(endpointUrl('session/sync', this._isPublic()), {
			...this.#defaultParams,
			version,
			autosaveContent,
			force,
			manualSave,
		})
	}

	push({ steps, version }) {
		return axios.post(endpointUrl('session/push', this._isPublic()), {
			...this.#defaultParams,
			steps,
			version,
		})
	}

}

export default SessionApi
