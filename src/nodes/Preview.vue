<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NodeViewWrapper
		data-text-el="preview"
		class="preview"
		as="div"
		contenteditable="false">
		<NodeViewContent />
		<div class="link-preview-header">
			<PreviewOptions
				v-if="isEditable"
				:href="node.attrs.href"
				type="link-preview"
				@toggle="unsetPreview"
				@delete="deleteNode" />
		</div>
		<NcReferenceList
			:text="node.attrs.href"
			:limit="1"
			:interactive="!extension.options.isEmbedded"
			:display-fallback="true" />
	</NodeViewWrapper>
</template>

<script>
import { NcReferenceList } from '@nextcloud/vue/dist/Components/NcRichText.js'
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'
import PreviewOptions from '../components/Editor/PreviewOptions.vue'

export default {
	name: 'Preview',

	components: {
		NodeViewWrapper,
		NodeViewContent,
		NcReferenceList,
		PreviewOptions,
	},

	props: nodeViewProps,

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

	methods: {
		unsetPreview() {
			this.editor
				.chain()
				.focus()
				.setTextSelection(this.getPos() + 1)
				.unsetPreview()
				.run()
		},
	},
}
</script>

<style lang="scss" scoped>
[data-text-el='preview'] [data-node-view-content] {
	display: none;
}

.preview {
	position: relative;
}

:deep(div.widgets--list a.widget-default) {
	color: var(--color-main-text);
	margin: 0;
	padding: 0;
	text-decoration: none;
	max-width: calc(100vw - 156px);
}

:deep(.widget-default--details) {
	overflow: hidden;
	p {
		margin-bottom: 4px !important;
	}
}

// Align in upper right corner of preview image
.link-preview-header {
	position: absolute;
	right: 12px;
	// margin-top and border of preview a.widget-default container + 8px
	top: calc((var(--default-grid-baseline, 4px) * 3) + 2px + 10px);

	background-color: var(--color-main-background);
	z-index: 1;
}
</style>
