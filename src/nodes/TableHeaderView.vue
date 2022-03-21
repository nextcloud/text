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
	<NodeViewWrapper as="th">
		<div>
			<NodeViewContent class="content" />
			<Actions>
				<ActionButton icon="icon-add_col_before"
					:close-after-click="true"
					@click="addColumnBefore">
					Add new column before this
				</ActionButton>
				<ActionButton icon="icon-add_col_after"
					:close-after-click="true"
					@click="addColumnAfter">
					Add new column after this
				</ActionButton>
				<ActionButton icon="icon-delete"
					:close-after-click="true"
					@click="deleteColumn">
					Remove this column
				</ActionButton>
			</Actions>
		</div>
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'

export default {
	name: 'TableHeaderView',
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
		getPos: {
			type: Function,
			required: true,
		},
	},
	methods: {
		deleteColumn() {
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos())
				.deleteColumn()
				.run()
		},
		addColumnBefore() {
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos())
				.addColumnBefore()
				.run()
		},
		addColumnAfter() {
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos())
				.addColumnAfter()
				.run()
		},
	},
}
</script>

<style scoped lang="scss">
th {

	div {
		display: flex;
		flex-wrap: wrap;
	}

	.content {
		flex: 1 1 0;
		margin: 0;
		min-height: 44px;
		line-height: 44px;
	}

	.action-item {
		flex: 0 1 auto;
		opacity: 50%;
	}

	&:hover, &:active, &:focus, &:focus-within {
		.action-item {
			opacity: 100%;
		}
	}
}

</style>
