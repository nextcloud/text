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
	<NodeViewWrapper>
		<NodeViewContent class="content" as="table" />
		<Actions :force-menu="true"
			class="table-settings"
			default-icon="icon-table_settings">
			<ActionButton icon="icon-delete"
				:close-after-click="true"
				@click="deleteNode">
				{{ t('text', 'Delete this table') }}
			</ActionButton>
		</Actions>
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'

export default {
	name: 'TableView',
	components: {
		ActionButton,
		Actions,
		NodeViewWrapper,
		NodeViewContent,
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
	computed: {
		t: () => window.t,
	},
}
</script>

<style scoped lang="scss">

table {
	float: left;
}

.table-settings {
	padding-left: 3px;
	opacity: .5;

	&:hover {
		opacity: 1;
	}
}
</style>
