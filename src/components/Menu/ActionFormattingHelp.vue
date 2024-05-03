<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NextcloudVueNcActionButton close-after-click
		data-text-action-entry="formatting-help"
		v-on="$listeners">
		<template #icon>
			<Help />
		</template>
		{{ t('text', 'Formatting help') }}
	</NextcloudVueNcActionButton>
</template>

<script>
import { defineComponent } from 'vue'
import { NcActionButton as NextcloudVueNcActionButton } from '@nextcloud/vue'
import { Help } from '../icons.js'

export default defineComponent({
	// This component is used as a direct child of NcActions.
	// Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
	// Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
	// Hotfix - rename the component to NcActionButton because it represents and renders it.
	// eslint-disable-next-line vue/match-component-file-name
	name: 'NcActionButton',
	components: {
		NextcloudVueNcActionButton,
		Help,
	},
})
</script>
