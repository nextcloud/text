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
import { generateUrl } from '@nextcloud/router'

class SessionApi {

	#options

	constructor(options) {
		this.#options = options
	}

	open({ fileId }) {
		return axios.put(this.#url('session/create'), {
			fileId,
			filePath: this.#options.filePath,
			token: this.#options.shareToken,
			guestName: this.#options.guestName,
			forceRecreate: this.#options.forceRecreate,
		}).then(response => new Connection(response, this.#options))
	}

	#url(endpoint) {
		const isPublic = !!this.#options.shareToken
		return _endpointUrl(endpoint, isPublic)
	}

}

export class Connection {

	#doc
	#session
	#lock
	#content
	#readOnly
	#options

	constructor(response, options) {
		const { document, session, lock, readOnly, content } = response.data
		this.#doc = document
		this.#session = session
		this.#lock = lock
		this.#readOnly = readOnly
		this.#content = content
		this.#options = options
	}

	get state() {
		return {
			document: { ...this.#doc, readOnly: this.#readOnly },
			session: this.#session,
		}
	}

	fetch() {
		return this.#content
			? Promise.resolve(this.#content)
			: this._fetchDocument()
	}

	get #defaultParams() {
		return {
			documentId: this.#doc.id,
			sessionId: this.#session.id,
			sessionToken: this.#session.token,
			token: this.#options.shareToken,
		}
	}

	sync({ version, autosaveContent, force, manualSave }) {
		return axios.post(this.#url('session/sync'), {
			...this.#defaultParams,
			filePath: this.#options.filePath,
			version,
			autosaveContent,
			force,
			manualSave,
		})
	}

	push({ steps, version }) {
		return axios.post(this.#url('session/push'), {
			...this.#defaultParams,
			filePath: this.#options.filePath,
			steps,
			version,
		})
	}

	// TODO: maybe return a new connection here so connections have immutable state
	update(guestName) {
		return axios.post(this.#url('session'), {
			...this.#defaultParams,
			guestName,
		}).then(({ data }) => {
			this.#session = data
		})
	}

	uploadAttachment(file) {
		const formData = new FormData()
		formData.append('file', file)
		const url = _endpointUrl('attachment/upload')
			+ '?documentId=' + encodeURIComponent(this.#doc.id)
			+ '&sessionId=' + encodeURIComponent(this.#session.id)
			+ '&sessionToken=' + encodeURIComponent(this.#session.token)
			+ '&shareToken=' + encodeURIComponent(this.#options.shareToken || '')
		return axios.post(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}

	insertAttachmentFile(filePath) {
		return axios.post(_endpointUrl('attachment/filepath'), {
			documentId: this.#doc.id,
			sessionId: this.#session.id,
			sessionToken: this.#session.token,
			filePath,
		})
	}

	close() {
		return axios.post(this.#url('session/close'), this.#defaultParams)
	}

	_fetchDocument() {
		// Axios normally tries to parse string responses as json.
		// Just return the plain content here.
		const transformResponse = [(data) => data]
		return axios.post(
			this.#url('session/fetch'),
			this.#defaultParams,
			{ transformResponse }
		).then(response => response.data)
	}

	#url(endpoint) {
		const isPublic = !!this.#defaultParams.token
		return _endpointUrl(endpoint, isPublic)
	}

}

/**
 *
 * @param {string} endpoint - endpoint of the url inside apps/text
 * @param {boolean} isPublic - public url or not
 */
function _endpointUrl(endpoint, isPublic = false) {
	const _baseUrl = generateUrl('/apps/text')
	if (isPublic) {
		return `${_baseUrl}/public/${endpoint}`
	}
	return `${_baseUrl}/${endpoint}`
}

export default SessionApi
