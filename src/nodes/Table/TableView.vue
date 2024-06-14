<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper data-text-el="table-view" class="table-wrapper">
		<NcActions v-if="isEditable"
			force-menu
			data-text-table-actions="settings"
			class="table-settings">
			<template #icon>
				<TableSettings />
			</template>
			<NcActionButton data-text-table-action="delete"
				close-after-click
				@click="deleteNode">
				<template #icon>
					<Delete />
				</template>
				{{ t('text', 'Delete this table') }}
			</NcActionButton>
		</NcActions>
		<NodeViewContent class="content" as="table" />
		<div class="clearfix" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import { NcActions, NcActionButton } from '@nextcloud/vue'
import { TableSettings, Delete } from '../../components/icons.js'

export default {
	name: 'TableView',
	components: {
		NcActionButton,
		NcActions,
		NodeViewWrapper,
		NodeViewContent,
		TableSettings,
		Delete,
	},
	props: {
		editor: {
			type: Object,
			required: true,
		},
		deleteNode: {
			type: Function,
			required: true,
		},
	},
	data() {
		return {
			isEditable: false,
		}
	},
	beforeMount() {
		this.isEditable = this.editor.isEditable
		this.editor.on('update', ({ editor }) => {
			this.isEditable = editor.isEditable
		})
	},
}
</script>

<style scoped lang="scss">
.table-wrapper {
	position: relative;
	overflow-x: auto;
}

.clearfix {
	clear: both;
}

table {
	float: left;
}

.table-settings {
	padding-left: 3px;
	opacity: .5;
	position: absolute;
	top: 0;
	right: 3px;

	&:hover {
		opacity: 1;
	}
}
</style>
