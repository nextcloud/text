/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Node } from '@nextcloud/files'
import type { FileStat, ResponseDataDetailed } from 'webdav'

import { getClient, getDefaultPropfind, resultToNode } from '@nextcloud/files/dav'

export const client = getClient()

/**
 * Get a node from the server
 *
 * @param node to get
 */
export async function fetchNode(node: Node): Promise<Node> {
	const propfindPayload = getDefaultPropfind()
	const result = (await client.stat(`${node.root}${node.path}`, {
		details: true,
		data: propfindPayload,
	})) as ResponseDataDetailed<FileStat>
	return resultToNode(result.data)
}
