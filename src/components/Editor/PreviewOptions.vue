<!--
  - @copyright Copyright (c) 2024 Max Wiehle <max@nextcloud.com>
  -
  - @author Max <max@nextcloud.com>
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
	<NcActions data-text-preview-options="select"
		@open="$emit('open')">
		<template #icon>
			<DotsVerticalIcon :size="20" />
		</template>
		<NcActionCaption :name="t('text', 'Preview options')" />
		<NcActionRadio data-text-preview-option="text-only"
			close-after-click
			name="preview-option"
			value="text-only"
			:checked="value === 'text-only'"
			@change="e => $emit('update:value', e.currentTarget.value)">
			{{ t('text', 'Text only') }}
		</NcActionRadio>
		<NcActionRadio data-text-preview-option="link-preview"
			close-after-click
			name="preview-option"
			value="link-preview"
			:checked="value === 'link-preview'"
			@change="e => $emit('update:value', e.currentTarget.value)">
			{{ t('text', 'Show link preview') }}
		</NcActionRadio>
		<NcActionSeparator />
		<NcActionButton @click="e => $emit('update:value', 'delete-preview')">
			<template #icon>
				<DeleteIcon :size="20" />
			</template>
			{{ t('text','Remove link') }}
		</NcActionButton>
	</NcActions>
</template>

<script>
import { NcActions, NcActionButton, NcActionRadio, NcActionCaption, NcActionSeparator } from '@nextcloud/vue'
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
	name: 'PreviewOptions',
	components: {
		DotsVerticalIcon,
		NcActions,
		NcActionButton,
		NcActionCaption,
		NcActionRadio,
		NcActionSeparator,
		DeleteIcon,
	},
	props: {
		value: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>

[data-text-preview-options] {
	position: absolute;
	left: -44px;
}

</style>
