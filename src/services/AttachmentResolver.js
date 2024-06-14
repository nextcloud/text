/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

	constructor({ session, user, shareToken, currentDirectory, fileId }) {
		this.#session = session
		this.#user = user
		this.#shareToken = shareToken
		this.#currentDirectory = currentDirectory
		this.#documentId = fileId ?? session.documentId
		this.#initAttachmentListPromise = this.#updateAttachmentList()
	}

	async #updateAttachmentList() {
		return setAttachmentList({ documentId: this.#documentId, session: this.#session, shareToken: this.#shareToken })
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
				name: this.#name(src),
				previewUrl: src,
				fullUrl: src,
			}
		}

		// Fallback: Return DAV url (e.g. for relative paths to images)
		return {
			isImage: true,
			name: this.#name(src),
			previewUrl: this.#davUrl(src),
			fullUrl: this.#davUrl(src),
		}
	}

	#name(src) {
		return src.split('/').pop()
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
