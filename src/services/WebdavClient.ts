/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Node } from '@nextcloud/files'
import { getClient, getDefaultPropfind, resultToNode } from '@nextcloud/files/dav'
import type { FileStat, ResponseDataDetailed } from 'webdav'

export const client = getClient()

export const fetchNode = async (node: Node): Promise<Node> => {
	const propfindPayload = getDefaultPropfind()
	const result = (await client.stat(`${node.root}${node.path}`, {
		details: true,
		data: propfindPayload,
	})) as ResponseDataDetailed<FileStat>
	return resultToNode(result.data)
}
