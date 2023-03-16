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
import axios from '@nextcloud/axios'
import { formatFileSize } from '@nextcloud/files'

import { logger } from '../helpers/logger.js'

export default class AttachmentResolver {

	#session
	#user
	#shareToken
	#currentDirectory
	#attachmentDirectory

	ATTACHMENT_TYPE_IMAGE = 'image'
	ATTACHMENT_TYPE_MEDIA = 'media'

	constructor({ session, user, shareToken, currentDirectory, fileId }) {
		this.#session = session
		this.#user = user
		this.#shareToken = shareToken
		this.#currentDirectory = currentDirectory
		fileId ||= session?.documentId
		this.#attachmentDirectory = `.attachments.${fileId}`
	}

	/*
	 * Resolve a given src.
	 * @param { string } the original src in the node.
	 * @param { bool } choose to fetch the raw image or a preview | default = false
	 * @returns { Array<Object> } - resolved candidates to try.
	 *
	 * Currently returns either one or two urls.
	 */
	async resolve(src, preferRawImage = false) {
		if (this.#session && src.startsWith('text://')) {
			const imageFileName = getQueryVariable(src, 'imageFileName')
			return [{
				type: this.ATTACHMENT_TYPE_IMAGE,
				url: this.#getImageAttachmentUrl(imageFileName, preferRawImage),
			}]
		}

		// Has session and URL points to attachment from current document
		if (this.#session && src.startsWith(`.attachments.${this.#session?.documentId}/`)) {
			const imageFileName = decodeURIComponent(src.replace(`.attachments.${this.#session?.documentId}/`, '').split('?')[0])
			return [
				{
					type: this.ATTACHMENT_TYPE_IMAGE,
					url: this.#getImageAttachmentUrl(imageFileName, preferRawImage),
				},
				{
					type: this.ATTACHMENT_TYPE_MEDIA,
					url: this.#getMediaPreviewUrl(imageFileName),
					name: imageFileName,
				},
			]
		}

		if (isDirectUrl(src)) {
			return [{
				type: this.ATTACHMENT_TYPE_IMAGE,
				url: src,
			}]
		}

		if (hasPreview(src)) { // && this.#mime !== 'image/gif') {
			return [{
				type: this.ATTACHMENT_TYPE_IMAGE,
				url: this.#previewUrl(src),
			}]
		}

		//  Has session and URL points to attachment from a (different) text document
		if (this.#session && src.match(/^\.attachments\.\d+\//)) {
			const imageFileName = this.#relativePath(src)
				.replace(/\.attachments\.\d+\//, '')
			// Try webdav URL, use attachment API as fallback
			return [
				{
					type: this.ATTACHMENT_TYPE_IMAGE,
					url: this.#davUrl(src),
				},
				{
					type: this.ATTACHMENT_TYPE_IMAGE,
					url: this.#getImageAttachmentUrl(imageFileName, preferRawImage),
				},
				{
					type: this.ATTACHMENT_TYPE_MEDIA,
					url: this.#getMediaPreviewUrl(imageFileName),
					name: imageFileName,
				},
			]
		}

		// Doesn't have session and URL points to attachment from (current or different) text document
		if (!this.#session && src.match(/^\.attachments\.\d+\//)) {
			const imageFileName = this.#relativePath(src)
				.replace(/\.attachments\.\d+\//, '')
			const { mimeType, size } = await this.getMetadata(this.#davUrl(src))
			// Without session, use webdav URL for images and mimetype icon for media attachments
			return [
				{
					type: this.ATTACHMENT_TYPE_IMAGE,
					url: this.#davUrl(src),
				},
				{
					type: this.ATTACHMENT_TYPE_MEDIA,
					url: this.getMimeUrl(mimeType),
					metadata: { size },
					name: imageFileName,
				},
			]
		}

		return [{
			type: this.ATTACHMENT_TYPE_IMAGE,
			url: this.#davUrl(src),
		}]
	}

	#getImageAttachmentUrl(imageFileName, preferRawImage = false) {
		if (!this.#session) {
			return this.#davUrl(
				`${this.#attachmentDirectory}/${imageFileName}`
			)
		}

		if (this.#user || !this.#shareToken) {
			return generateUrl('/apps/text/image?documentId={documentId}&sessionId={sessionId}&sessionToken={sessionToken}&imageFileName={imageFileName}&preferRawImage={preferRawImage}', {
				...this.#textApiParams(),
				imageFileName,
				preferRawImage: preferRawImage ? 1 : 0,
			})
		}

		return generateUrl('/apps/text/image?documentId={documentId}&sessionId={sessionId}&sessionToken={sessionToken}&imageFileName={imageFileName}&shareToken={shareToken}&preferRawImage={preferRawImage}', {
			...this.#textApiParams(),
			imageFileName,
			shareToken: this.#shareToken,
			preferRawImage: preferRawImage ? 1 : 0,
		})
	}

	#getMediaPreviewUrl(mediaFileName) {
		if (this.#user || !this.#shareToken) {
			return generateUrl('/apps/text/mediaPreview?documentId={documentId}&sessionId={sessionId}&sessionToken={sessionToken}&mediaFileName={mediaFileName}', {
				...this.#textApiParams(),
				mediaFileName,
			})
		}

		return generateUrl('/apps/text/mediaPreview?documentId={documentId}&sessionId={sessionId}&sessionToken={sessionToken}&mediaFileName={mediaFileName}&shareToken={shareToken}', {
			...this.#textApiParams(),
			mediaFileName,
			shareToken: this.#shareToken,
		})
	}

	getMediaMetadataUrl(mediaFileName) {
		if (this.#user || !this.#shareToken) {
			return generateUrl('/apps/text/mediaMetadata?documentId={documentId}&sessionId={sessionId}&sessionToken={sessionToken}&mediaFileName={mediaFileName}', {
				...this.#textApiParams(),
				mediaFileName,
			})
		}

		return generateUrl('/apps/text/mediaMetadata?documentId={documentId}&sessionId={sessionId}&sessionToken={sessionToken}&mediaFileName={mediaFileName}&shareToken={shareToken}', {
			...this.#textApiParams(),
			mediaFileName,
			shareToken: this.#shareToken,
		})
	}

	#textApiParams() {
		if (this.#session) {
			return {
				documentId: this.#session.documentId,
				sessionId: this.#session.id,
				sessionToken: this.#session.token,
			}
		}

		return {}
	}

	#previewUrl(src) {
		const imageFileId = getQueryVariable(src, 'fileId')
		const path = this.#filePath(src)
		const fileQuery = `file=${encodeURIComponent(path)}`
		const query = fileQuery + '&x=1024&y=1024&a=true'

		if (this.#user && imageFileId) {
			return generateUrl(`/core/preview?fileId=${imageFileId}&${query}`)
		}

		if (this.#user) {
			return generateUrl(`/core/preview.png?${query}`)
		}

		if (this.#shareToken) {
			return generateUrl(`/apps/files_sharing/publicpreview/${this.#shareToken}?${query}`)
		}

		logger.error('No way to authenticate image retrival - need to be logged in or provide a token')
		return src
	}

	#davUrl(src) {
		if (this.#user) {
			const uid = this.#user.uid
			const encoded = encodeURI(this.#filePath(src))
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
		if (src.startsWith('text://')) {
			return [
				this.#attachmentDirectory,
				getQueryVariable(src, 'imageFileName'),
			].join('/')
		}

		return decodeURI(src.split('?')[0])
	}

	#filePath(src) {
		const f = [
			this.#currentDirectory,
			this.#relativePath(src),
		].join('/')

		return pathNormalize(f)
	}

	async getMetadata(src) {
		const headResponse = await axios.head(src)
		const mimeType = headResponse.headers['content-type']
		const size = formatFileSize(headResponse.headers['content-length'])
		return { mimeType, size }
	}

	getMimeUrl(mimeType) {
		return mimeType ? OC.MimeType.getIconUrl(mimeType) : null
	}

}

/**
 * Check if a url can be loaded directly - i.e. is one of
 * - remote url
 * - data url
 * - preview url
 *
 * @param {string} src - the url to check
 */
function isDirectUrl(src) {
	return src.startsWith('http://')
		|| src.startsWith('https://')
		|| src.startsWith('data:')
		|| src.match(/^(\/index.php)?\/core\/preview/)
		|| src.match(/^(\/index.php)?\/apps\/files_sharing\/publicpreview\//)
}

/**
 * Check if the given url has a preview
 *
 * @param {string} src - the url to check
 */
function hasPreview(src) {
	return getQueryVariable(src, 'hasPreview') === 'true'
}

/**
 * Extract the value of a query variable from the given url
 *
 * @param {string} src - the url to extract query variable from
 * @param {string} variable - name of the variable to read out
 */
function getQueryVariable(src, variable) {
	const query = src.split('?')[1]

	if (typeof query === 'undefined') {
		return
	}

	const vars = query.split(/[&#]/)

	if (typeof vars === 'undefined') {
		return
	}

	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=')
		if (decodeURIComponent(pair[0]) === variable) {
			return decodeURIComponent(pair[1])
		}
	}
}
