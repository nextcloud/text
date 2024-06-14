/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { registerFileListHeaders, registerDavProperty } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { addMenuRichWorkspace, FilesWorkspaceHeader } from './helpers/files.js'
// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

const workspaceAvailable = loadState('text', 'workspace_available')

registerDavProperty('nc:rich-workspace', { nc: 'http://nextcloud.org/ns' })
registerDavProperty('nc:rich-workspace-file', { nc: 'http://nextcloud.org/ns' })

if (workspaceAvailable) {
	addMenuRichWorkspace()
	registerFileListHeaders(FilesWorkspaceHeader)
}
