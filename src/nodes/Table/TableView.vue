<!--
  - @copyright Copyright (c) 2022 Max <max@nextcloud.com>
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
