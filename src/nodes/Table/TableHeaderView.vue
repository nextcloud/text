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
	<NodeViewWrapper data-text-el="table-header" as="th">
		<div>
			<NodeViewContent class="content" />
			<NcActions v-if="editor.isEditable"
				data-text-table-actions="header">
				<NcActionButton data-text-table-action="add-column-before"
					close-after-click
					@click="addColumnBefore">
					<template #icon>
						<TableAddColumnBefore />
					</template>
					{{ t('text', 'Add column before') }}
				</NcActionButton>
				<NcActionButton data-text-table-action="add-column-after"
					close-after-click
					@click="addColumnAfter">
					<template #icon>
						<TableAddColumnAfter />
					</template>
					{{ t('text', 'Add column after') }}
				</NcActionButton>
				<NcActionButton data-text-table-action="remove-column"
					close-after-click
					@click="deleteColumn">
					<template #icon>
						<Delete />
					</template>
					{{ t('text', 'Delete this column') }}
				</NcActionButton>
			</NcActions>
		</div>
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import NcActions from '@nextcloud/vue/dist/Components/NcActions.js'
import NcActionButton from '@nextcloud/vue/dist/Components/NcActionButton.js'
import { Delete, TableAddColumnBefore, TableAddColumnAfter } from '../../components/icons.js'

export default {
	name: 'TableHeaderView',
	components: {
		NcActionButton,
		NcActions,
		NodeViewWrapper,
		NodeViewContent,
		Delete,
		TableAddColumnBefore,
		TableAddColumnAfter,
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
	computed: {
		t: () => window.t,
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

	.content {
		margin: 0;
		padding-top: 0.75em;
		flex-grow: 1;
	}

	.action-item {
		opacity: 50%;
	}

	&:hover, &:active, &:focus, &:focus-within {
		.action-item {
			opacity: 100%;
		}
	}
}

</style>
