<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper data-text-el="table-row" as="tr">
		<NodeViewContent class="table-row-cells" />
		<td v-if="isEditable" class="row-actions">
			<NcActions v-if="isDataRow" data-text-table-actions="row" size="small">
				<NcActionButton
					data-text-table-action="add-row-before"
					closeAfterClick
					@click="addRowBefore">
					<template #icon>
						<TableAddRowBefore />
					</template>
					{{ t('text', 'Add row before') }}
				</NcActionButton>
				<NcActionButton
					data-text-table-action="add-row-after"
					closeAfterClick
					@click="addRowAfter">
					<template #icon>
						<TableAddRowAfter />
					</template>
					{{ t('text', 'Add row after') }}
				</NcActionButton>
				<NcActionButton
					data-text-table-action="remove-row"
					closeAfterClick
					@click="deleteRow">
					<template #icon>
						<TrashCan />
					</template>
					{{ t('text', 'Delete this row') }}
				</NcActionButton>
			</NcActions>
		</td>
	</NodeViewWrapper>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
import {
	TableAddRowAfter,
	TableAddRowBefore,
	TrashCan,
} from '../../components/icons.js'

export default {
	name: 'TableRowView',
	components: {
		NcActionButton,
		NcActions,
		NodeViewWrapper,
		NodeViewContent,
		TableAddRowAfter,
		TableAddRowBefore,
		TrashCan,
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

		node: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			isEditable: false,
		}
	},

	computed: {
		isDataRow() {
			return this.node.type.name === 'tableRow'
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
			this.editor
				.chain()
				.focus()
				.setTextSelection(this.getPos() + 1)
				.deleteRow()
				.run()
		},

		addRowBefore() {
			this.editor
				.chain()
				.focus()
				.setTextSelection(this.getPos() + 1)
				.addRowBefore()
				.run()
		},

		addRowAfter() {
			this.editor
				.chain()
				.focus()
				.setTextSelection(this.getPos() + 1)
				.addRowAfter()
				.run()
		},

		t,
	},
}
</script>

<style scoped lang="scss">
.table-row-cells {
	display: contents;
}

td.row-actions {
	position: sticky;
	right: 0;
	z-index: 4;
	background-color: var(--color-main-background);
	width: calc(var(--clickable-area-small) + var(--default-grid-baseline));
	padding: 0;
	// Required to prevent focus outline from being cut off
	padding-right: 2px;
	padding-left: var(--default-grid-baseline);
	vertical-align: middle;
	border: none;
	border-radius: 0;

	.action-item {
		opacity: 0.5;
	}

	&:hover,
	&:active,
	&:focus,
	&:focus-within {
		.action-item {
			opacity: 1;
		}
	}
}
</style>
