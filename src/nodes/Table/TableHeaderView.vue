<!--
  - @copyright Copyright (c) 2022 Max <max@nextcloud.com>
  -
  - @author Max <max@nextcloud.com>
  - @author Grigorii K. Shartsev <me@shgk.me>
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
	<NodeViewWrapper data-text-el="table-header" as="th" :style="textAlign">
		<div>
			<NodeViewContent class="content" />
			<NcActions v-if="isEditable"
				ref="menu"
				data-text-table-actions="header">
				<NcActionButtonGroup>
					<NcActionButton data-text-table-action="align-column-left"
						:aria-label="t('text', 'Left align column')"
						type="radio"
						value="left"
						:model-value="node.attrs.textAlign"
						@click="alignLeft">
						<template #icon>
							<AlignHorizontalLeft />
						</template>
					</NcActionButton>
					<NcActionButton data-text-table-action="align-column-center"
						:aria-label="t('text', 'Center align column')"
						type="radio"
						value="center"
						:model-value="node.attrs.textAlign"
						@click="alignCenter">
						<template #icon>
							<AlignHorizontalCenter />
						</template>
					</NcActionButton>
					<NcActionButton data-text-table-action="align-column-right"
						:aria-label="t('text', 'Right align column')"
						type="radio"
						value="right"
						:model-value="node.attrs.textAlign"
						@click="alignRight">
						<template #icon>
							<AlignHorizontalRight />
						</template>
					</NcActionButton>
				</NcActionButtonGroup>
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
import { NcActions, NcActionButton, NcActionButtonGroup } from '@nextcloud/vue'
import {
	AlignHorizontalCenter,
	AlignHorizontalLeft,
	AlignHorizontalRight,
	Delete,
	TableAddColumnBefore,
	TableAddColumnAfter,
} from '../../components/icons.js'

export default {
	name: 'TableHeaderView',
	components: {
		AlignHorizontalCenter,
		AlignHorizontalLeft,
		AlignHorizontalRight,
		Delete,
		NcActionButton,
		NcActionButtonGroup,
		NcActions,
		NodeViewWrapper,
		NodeViewContent,
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
		alignCenter() {
			this.align('center')
		},
		alignLeft() {
			this.align('left')
		},
		alignRight() {
			this.align('right')
		},
		align(textAlign) {
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos())
				.setCellAttribute('textAlign', textAlign)
				.run()
			while (this.editor.commands.goToNextRow()) {
				this.editor.commands.setCellAttribute('textAlign', textAlign)
			}
			// Set focus back to first row
			this.editor.chain()
				.setTextSelection(this.getPos())
				.focus()
				.run()
			this.$refs.menu.closeMenu(false)
		},
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
