<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->
<template>
	<div id="files-setting-richworkspace">
		<input id="showRichWorkspacesToggle"
			v-model="showWorkspace"
			class="checkbox"
			type="checkbox"
			@change="toggle">
		<label for="showRichWorkspacesToggle">{{ t('text', 'Show rich workspaces') }}</label>
	</div>
</template>

<script>
import { emit } from '@nextcloud/event-bus'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

export default {
	name: 'FilesSettings',
	data() {
		return {
			showWorkspace: OCA.Text.RichWorkspaceEnabled,
		}
	},
	methods: {
		toggle() {
			// FIXME: save to app config
			if (this.showWorkspace) {
				emit('Text::showRichWorkspace')
				axios.post(generateUrl('/apps/text/settings'), {
					key: 'workspace_enabled',
					value: '1',
				})
			} else {
				emit('Text::hideRichWorkspace')
				axios.post(generateUrl('/apps/text/settings'), {
					key: 'workspace_enabled',
					value: '0',
				})
			}
		},
	},
}
</script>
