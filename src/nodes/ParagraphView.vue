<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
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
	<NodeViewWrapper class="vue-component" as="p">
		<PreviewOptions v-if="editor.isEditable && isSelected && canConvertToPreview"
			:value.sync="value"
			@open="editor.commands.hideLinkBubble()"
			@update:value="convertToPreview" />
		<NodeViewContent class="paragraph-content" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'
import PreviewOptions from '../components/Editor/PreviewOptions.vue'
import { getCurrentUser } from '@nextcloud/auth'

export default {
	name: 'ParagraphView',
	components: {
		NodeViewWrapper,
		NodeViewContent,
		PreviewOptions,
	},
	props: nodeViewProps,
	data() {
		return {
			canConvertToPreview: null,
			isSelected: false,
			isLoggedIn: getCurrentUser(),
			value: 'text-only',
		}
	},
	watch: {
		node: {
			handler() {
				if (this.isSelected) {
					this.canConvertToPreview = this.checkAvailability()
				}
			},
		},
		isSelected: {
			handler(value) {
				if (value) {
					this.canConvertToPreview = this.checkAvailability()
				}
			},
		},
	},
	mounted() {
		this.editor.on('selectionUpdate', this.checkSelection)
	},
	beforeUnmount() {
		this.editor.off('selectionUpdate', this.checkSelection)
	},
	methods: {
		convertToPreview(...args) {
			console.info(...args)
			this.editor.chain()
				.focus()
				.setTextSelection(this.getPos() + 1)
				.setPreview()
				.run()
		},
		checkAvailability() {
			return this.editor
				.can()
				.setPreview()
		},
		checkSelection() {
			const { selection } = this.editor.state
			const start = selection.$from.parent
			const end = selection.$to.parent
			this.isSelected = (this.node === start) && (this.node === end)
		},
	},
}
</script>
<style lang="scss" scoped>

.vue-component {
	position: relative;
}

/* center around current line */
:deep([data-text-preview-options]) {
	top: 50%;
	transform: translate(0, -50%);
}

</style>
