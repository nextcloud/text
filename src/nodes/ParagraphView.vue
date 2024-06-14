<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper class="vue-component" as="p">
		<PreviewOptions v-if="editor.isEditable && isSelected && canConvertToPreview"
			:value.sync="value"
			@open="editor.commands.hideLinkBubble()"
			@update:value="changeViewMode" />
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
		changeViewMode(value) {
			if (value === 'delete-preview') {
				this.deleteNode()
			} else if (value === 'link-preview') {
				this.convertToPreview()
			}
		},
		convertToPreview() {
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
