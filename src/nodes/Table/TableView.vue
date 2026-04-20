<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper
		data-text-el="table-view"
		class="table-wrapper"
		:class="{ focused: isFocused }">
		<NcActions
			v-if="isEditable"
			force-menu
			size="small"
			data-text-table-actions="settings"
			class="table-settings">
			<template #icon>
				<TableSettings />
			</template>
			<NcActionButton
				data-text-table-action="delete"
				close-after-click
				@click="deleteNode">
				<template #icon>
					<TrashCan />
				</template>
				{{ t('text', 'Delete this table') }}
			</NcActionButton>
		</NcActions>
		<NodeViewContent class="content" as="table" />
		<NcButton
			v-if="isEditable"
			class="table-add-column"
			size="small"
			:aria-label="t('text', 'Add column after')"
			:title="t('text', 'Add column after')"
			@click="addColumnAfter">
			<template #icon>
				<TableAddColumnAfter />
			</template>
		</NcButton>
		<NcButton
			v-if="isEditable"
			class="table-add-row"
			size="small"
			:aria-label="t('text', 'Add row below')"
			:title="t('text', 'Add row below')"
			@click="addRowAfter">
			<template #icon>
				<TableAddRowAfter />
			</template>
		</NcButton>
		<div class="clearfix" />
	</NodeViewWrapper>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcButton from '@nextcloud/vue/components/NcButton'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-2'
import {
	TableAddColumnAfter,
	TableAddRowAfter,
	TableSettings,
	TrashCan,
} from '../../components/icons.js'

export default {
	name: 'TableView',
	components: {
		TableAddColumnAfter,
		TableAddRowAfter,
		NcActionButton,
		NcActions,
		NcButton,
		NodeViewWrapper,
		NodeViewContent,
		TableSettings,
		TrashCan,
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
		node: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isEditable: false,
			isFocused: false,
		}
	},
	beforeMount() {
		this.isEditable = this.editor.isEditable
		this.editor.on('selectionUpdate', ({ editor }) => {
			const startOfCurrentNode = this.getPos()
			const endOfCurrentNode = startOfCurrentNode + this.node.nodeSize
			const { from, to } = editor.state.selection
			this.isFocused = from >= startOfCurrentNode && to <= endOfCurrentNode
		})
		this.editor.on('update', ({ editor }) => {
			this.isEditable = editor.isEditable
		})
	},
	methods: {
		addColumnAfter() {
			const headerRowNode = this.node.firstChild
			this.editor
				.chain()
				.focus()
				.setTextSelection(this.getPos() + headerRowNode.nodeSize - 1)
				.addColumnAfter()
				.setTextSelection(this.getPos() + headerRowNode.nodeSize)
				.run()
		},
		addRowAfter() {
			const lastRowNode = this.node.lastChild
			this.editor
				.chain()
				.focus()
				.setTextSelection(
					this.getPos() + this.node.nodeSize - lastRowNode.nodeSize + 1,
				)
				.addRowAfter()
				.setTextSelection(this.getPos() + this.node.nodeSize + 1)
				.run()
		},
		t,
	},
}
</script>

<style scoped lang="scss">
.table-wrapper {
	position: relative;
	overflow-x: auto;

	&.focused,
	&:hover {
		.table-add-column,
		.table-add-row {
			visibility: visible;
		}
	}

	.table-settings {
		padding-left: 3px;
		opacity: 0.5;
		position: absolute;
		top: calc((var(--default-clickable-area) - var(--clickable-area-small)) / 2);
		right: calc(var(--clickable-area-small) + 4px);

		&:hover {
			opacity: 1;
		}
	}

	.table-add-column {
		visibility: hidden;
		padding-left: 3px;
		opacity: 0.5;
		position: absolute;
		top: var(--default-clickable-area);
		right: 0;
		bottom: calc(var(--clickable-area-small) + 8px);
		margin-top: 0 !important;

		&:hover {
			opacity: 1;
		}
	}

	.table-add-row {
		visibility: hidden;
		padding-left: 3px;
		opacity: 0.5;
		position: absolute;
		left: 0;
		bottom: 4px;
		// Needs to be in sync with table width in `prosemirror.css`
		width: calc(100% - (2 * var(--clickable-area-small)) - 8px) !important;

		&:hover {
			opacity: 1;
		}
	}
}

.clearfix {
	clear: both;
}

table {
	float: left;
}
</style>
