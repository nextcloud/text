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
			<NcActionButton close-after-click="true" @click="deleteNode">
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
		type: {
			type: String,
			required: true,
		},
		offset: {
			type: Number,
			required: true,
		},
		nodeSize: {
			type: Number,
			required: true,
		},
		$editor: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			open: false,
		}
	},

	methods: {
		onOpen() {
			this.$editor.commands.hideLinkBubble()
		},
		toggle(type) {
			this.open = false
			const chain = this.$editor.chain().focus()
				.setTextSelection(this.offset + 1)
			if (type === 'text-only') {
				chain.unsetPreview().run()
				return
			}
			chain.setPreview().run()
		},
		deleteNode() {
			this.$editor.commands.deleteRange({
				from: this.offset,
				to: this.offset + this.nodeSize,
			})
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

</style>
