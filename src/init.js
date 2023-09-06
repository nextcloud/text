import { registerFileListHeaders, registerDavProperty } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { FilesWorkspaceHeader } from './helpers/files.js'

const workspaceAvailable = loadState('text', 'workspace_available')

registerDavProperty('nc:rich-workspace', { nc: 'http://nextcloud.org/ns' })
registerDavProperty('nc:rich-workspace-file', { nc: 'http://nextcloud.org/ns' })

if (workspaceAvailable) {
	registerFileListHeaders(FilesWorkspaceHeader)
}
