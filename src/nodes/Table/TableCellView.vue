<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper data-text-el="table-cell" as="td" :style="textAlign">
		<div class="container">
			<NodeViewContent class="content" />
			<NcActions v-if="isEditable"
				data-text-table-actions="row">
				<NcActionButton data-text-table-action="add-row-before"
					close-after-click
					@click="addRowBefore">
					<template #icon>
						<TableAddRowBefore />
					</template>
					{{ t('text', 'Add row before') }}
				</NcActionButton>
				<NcActionButton data-text-table-action="add-row-after"
					close-after-click
					@click="addRowAfter">
					<template #icon>
						<TableAddRowAfter />
					</template>
					{{ t('text', 'Add row after') }}
				</NcActionButton>
				<NcActionButton data-text-table-action="remove-row"
					close-after-click
					@click="deleteRow">
					<template #icon>
						<Delete />
					</template>
					{{ t('text', 'Delete this row') }}
				</NcActionButton>
			</NcActions>
		</div>
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import { NcActions, NcActionButton } from '@nextcloud/vue'
import { TableAddRowBefore, TableAddRowAfter, Delete } from '../../components/icons.js'

export default {
	name: 'TableCellView',
	components: {
		NcActionButton,
		NcActions,
		NodeViewWrapper,
		NodeViewContent,
		TableAddRowBefore,
		TableAddRowAfter,
		Delete,
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
	data() {
		return {
			isEditable: false,
		}
	},
	computed: {
		textAlign() {
			return { 'text-align': this.node.attrs.textAlign }
		},
	},
	beforeMount() {
		this.isEditable = this.editor.isEditable
		this.editor.on('update', ({ editor }) => {
			this.isEditable = editor.isEditable
		})
	},
	methods: {
		deleteRow() {
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos())
				.deleteRow()
				.run()
		},
		addRowBefore() {
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos())
				.addRowBefore()
				.run()
		},
		addRowAfter() {
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos())
				.addRowAfter()
				.run()
		},
	},
}
</script>

<style scoped lang="scss">
td {
	position: relative;

	.container {
		display: flex;
		flex-wrap: wrap;
	}

	.content {
		flex: 1 1 0;
		margin: 0;
	}

	.action-item {
		position: absolute;
		right: -48px;
		flex: 0 1 auto;
		display: none;
		top: 2px;
	}

	&:last-child {
		.action-item {
			display: block;
			opacity: 50%;
		}

		&:hover, &:active, &:focus, &:focus-within {
			.action-item {
				opacity: 100%;
			}
		}
	}

}

</style>
