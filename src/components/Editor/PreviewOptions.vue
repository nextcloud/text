<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div contenteditable="false" class="preview-options-container">
		<NcActions data-text-preview-options="select"
			class="preview-options"
			:open.sync="open"
			@open="onOpen">
			<template #icon>
				<DotsVerticalIcon :size="20" />
			</template>
			<NcActionCaption :name="t('text', 'Preview options')" />
			<NcActionRadio data-text-preview-option="text-only"
				name="preview-option"
				value="text-only"
				:checked="type === 'text-only'"
				@change="e => toggle(e.currentTarget.value)">
				{{ t('text', 'Text only') }}
			</NcActionRadio>
			<NcActionRadio data-text-preview-option="link-preview"
				name="preview-option"
				value="link-preview"
				:checked="type === 'link-preview'"
				@change="e => toggle(e.currentTarget.value)">
				{{ t('text', 'Show link preview') }}
			</NcActionRadio>
			<NcActionSeparator />
			<NcActionButton v-if="href"
				close-after-click
				@click="openLink">
				<template #icon>
					<OpenIcon :size="20" />
				</template>
				{{ t('text','Open in new tab') }}
			</NcActionButton>
			<NcActionButton close-after-click @click="deleteNode">
				<template #icon>
					<DeleteIcon :size="20" />
				</template>
				{{ t('text','Remove link') }}
			</NcActionButton>
		</NcActions>
	</div>
</template>

<script>
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionRadio from '@nextcloud/vue/components/NcActionRadio'
import NcActionCaption from '@nextcloud/vue/components/NcActionCaption'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import OpenIcon from 'vue-material-design-icons/OpenInNew.vue'

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
		OpenIcon,
	},

	props: {
		type: {
			type: String,
			required: true,
		},
		href: {
			type: String,
			required: false,
			default: '',
		},
	},

	data() {
		return {
			open: false,
		}
	},

	methods: {
		onOpen() {
			this.$emit('open')
		},
		toggle(type) {
			this.open = false
			this.$emit('toggle', type)
		},
		deleteNode() {
			this.$emit('delete')
		},
		openLink() {
			if (!this.href) return
			window.open(this.href, '_blank').focus()
		},
	},
}
</script>

<style lang="scss" scoped>
div[contenteditable=false] {
	padding: 0;
	margin: 0;
}

.preview-options-container {
	position: absolute;
	width: 0 !important;
	left: -44px;
	top: 50%;
	transform: translate(0, -50%);
}

// Inside details, button needs to be shifted further
.details-content .preview-options-container {
	left: calc(-44px - 24px);
}

</style>
