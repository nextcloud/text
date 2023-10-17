import { registerFileListHeaders, registerDavProperty } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { FilesWorkspaceHeader } from './helpers/files.js'
import { linkTo } from '@nextcloud/router'

__webpack_nonce__ = window.btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = linkTo('text', 'js/') // eslint-disable-line

const workspaceAvailable = loadState('text', 'workspace_available')

registerDavProperty('nc:rich-workspace', { nc: 'http://nextcloud.org/ns' })
registerDavProperty('nc:rich-workspace-file', { nc: 'http://nextcloud.org/ns' })

if (workspaceAvailable) {
	registerFileListHeaders(FilesWorkspaceHeader)
}
