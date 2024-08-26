<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<NcActions data-text-preview-options="select"
			class="preview-options"
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
	</div>
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

div[data-text-preview-options] {
	position: absolute;
	left: -44px;
}

// Inside details, button needs to be shifted further
.details-content div[data-text-preview-options] {
	left: calc(-44px - 24px);
}

</style>
