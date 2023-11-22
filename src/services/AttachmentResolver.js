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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { generateUrl, generateRemoteUrl } from '@nextcloud/router'
import pathNormalize from 'path-normalize'

import store from '../store/index.js'

const setAttachmentList = (val) => store.dispatch('text/setAttachmentList', val)
const findAttachment = store.getters['text/findAttachment']

export default class AttachmentResolver {

	#session
	#user
	#shareToken
	#currentDirectory
	#documentId
	#initAttachmentListPromise

	ATTACHMENT_TYPE_IMAGE = 'image'
	ATTACHMENT_TYPE_MEDIA = 'media'

	constructor({ session, user, shareToken, currentDirectory, fileId }) {
		this.#session = session
		this.#user = user
		this.#shareToken = shareToken
		this.#currentDirectory = currentDirectory
		this.#documentId = fileId ?? session?.documentId
		this.#initAttachmentListPromise = this.#updateAttachmentList()
	}

	async #updateAttachmentList() {
		return setAttachmentList({ documentId: this.#documentId, shareToken: this.#shareToken })
	}

	/*
	 * Resolve a given image/attachment src.
	 * @param { string } src - the original src in the node.
	 * @param { bool } fallback - fetch again attachmentsList if not found | defaul = true
	 */
	async resolve(src, fallback = true) {
		let attachment

		// Native attachment
		const directoryRegexp = /^\.attachments\.\d+\//
		if (src.match(directoryRegexp)) {
			const imageFileName = decodeURIComponent(src.replace(directoryRegexp, '').split('?')[0])

			// Wait until attachment list got fetched (initialized by constructor)
			await this.#initAttachmentListPromise
			attachment = findAttachment(imageFileName)

			if (fallback && !attachment) {
				// Update attachments list. Needed if attachments gets added to the session
				await this.#updateAttachmentList()
				attachment = findAttachment(imageFileName)
			}

			if (attachment) {
				return attachment
			}

		}

		// Direct URLs
		if (isDirectUrl(src)) {
			return {
				isImage: true,
				previewUrl: src,
				fullUrl: src,
			}
		}

		// Fallback: Return DAV url (e.g. for relative paths to images)
		return {
			isImage: true,
			previewUrl: this.#davUrl(src),
			fullUrl: this.#davUrl(src),
		}
	}

	#davUrl(src) {
		if (this.#user) {
			const uid = this.#user.uid
			const encoded = this.#filePath(src).split('/').map(encodeURIComponent).join('/')
			return generateRemoteUrl(`dav/files/${uid}${encoded}`)
		}

		const path = this.#filePath(src).split('/')
		const basename = path.pop()
		const dirname = path.join('/')

		return generateUrl('/s/{token}/download?path={dirname}&files={basename}', {
			token: this.#shareToken,
			basename,
			dirname,
		})
	}

	/**
	 * Return the relativePath to a file specified in the url
	 *
	 * @param {string} src - url to extract path from
	 */
	#relativePath(src) {
		return decodeURI(src.split('?')[0])
	}

	#filePath(src) {
		const f = [
			this.#currentDirectory,
			this.#relativePath(src),
		].join('/')

		return pathNormalize(f)
	}

}

/**
 * Check if src is a direct URL.
 * Full URLs only work for images on the same Nextcloud instance (due to CORS restrictions).
 *
 * @param {string} src - the url to check
 */
function isDirectUrl(src) {
	return src.startsWith('http://')
		|| src.startsWith('https://')
		|| src.startsWith('data:')
}
