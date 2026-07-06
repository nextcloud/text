/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@nextcloud/files'
import type { Editor } from '@tiptap/core'
import type { FileStat, ResponseDataDetailed } from 'webdav'

import {
	defaultRootPath,
	getClient,
	getDefaultPropfind,
	resultToNode,
} from '@nextcloud/files/dav'
import { generateUrl } from '@nextcloud/router'
import { ref } from 'vue'
import { buildFilePicker } from '../helpers/filePicker.js'

/**
 *
 * @param options options
 * @param options.editor the editor
 * @param options.relativePath relative path of the file
 */
export function useLinkFile({
	editor,
	relativePath,
}: {
	editor: Editor
	relativePath?: string
}) {
	const parentPath = (relativePath ?? '/').split('/').slice(0, -1).join('/')
	const startPath = ref(parentPath)
	const setLink = (url: string, text: string) => {
		editor.chain().insertOrSetLink(text, { href: url }).focus().run()
	}

	/**
	 * Open dialog and ask user which file to link to
	 */
	const linkFile = async () => {
		const node = await pickFile(startPath.value)
		if (!node) {
			return
		}
		const url = new URL(generateUrl(`/f/${node.id}`), window.origin)
		setLink(url.href, node.displayname)
		startPath.value
			= node.path + (node.type === 'folder' ? `/${node.basename}/` : '')
	}

	return { linkFile }
}

/**
 * Pick a file with the file picker and return the node
 *
 * @param startPath path to start the file picker on
 */
async function pickFile(startPath: string): Promise<Node | undefined> {
	let filePicker
	try {
		filePicker = buildFilePicker(startPath)
	} catch {
		return
	}
	const file = await filePicker.pick()
	const client = getClient()
	const result = (await client.stat(`${defaultRootPath}${file}`, {
		details: true,
		data: getDefaultPropfind(),
	})) as ResponseDataDetailed<FileStat>
	return resultToNode(result.data)
}
