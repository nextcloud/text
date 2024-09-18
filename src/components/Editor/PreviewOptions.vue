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
		editor: {
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
			this.editor.commands.hideLinkBubble()
		},
		toggle(type) {
			this.open = false
			const chain = this.editor.chain().focus()
				.setTextSelection(this.offset + 1)
			if (type === 'text-only') {
				chain.unsetPreview().run()
				return
			}
			chain.setPreview().run()
		},
		deleteNode() {
			this.editor.commands.deleteRange({
				from: this.offset,
				to: this.offset + this.nodeSize
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
