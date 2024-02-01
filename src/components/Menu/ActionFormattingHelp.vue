<!--
  - @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
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
