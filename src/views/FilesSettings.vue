<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div id="files-setting-richworkspace">
		<input id="showRichWorkspacesToggle"
			v-model="showWorkspace"
			class="checkbox"
			type="checkbox"
			@change="toggle">
		<label for="showRichWorkspacesToggle">{{ t('text', 'Show folder description') }}</label>
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
