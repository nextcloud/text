<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div id="files-setting-richworkspace">
		<NcCheckboxRadioSwitch :checked.sync="showWorkspace" @update:checked="toggle">
			{{ t('text', 'Show folder description') }}
		</NcCheckboxRadioSwitch>
	</div>
</template>

<script>
import { emit } from '@nextcloud/event-bus'
import axios from '@nextcloud/axios'
import { NcCheckboxRadioSwitch } from '@nextcloud/vue'
import { generateUrl } from '@nextcloud/router'

export default {
	name: 'FilesSettings',
	components: {
		NcCheckboxRadioSwitch,
	},
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
