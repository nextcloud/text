<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NodeViewWrapper data-text-el="preview"
		class="preview"
		as="div"
		contenteditable="false">
		<NodeViewContent />
		<NcReferenceList :text="node.attrs.href"
			:limit="1"
			:interactive="!extension.options.isEmbedded"
			:display-fallback="true" />
	</NodeViewWrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import { NcReferenceList } from '@nextcloud/vue/dist/Components/NcRichText.js'

export default {
	name: 'Preview',
	components: {
		NodeViewWrapper,
		NodeViewContent,
		NcReferenceList,
	},
	props: nodeViewProps,
}
</script>

<style lang="scss" scoped>
// Hide the link element inside previews. We cannot hide full node view content
// as the preview options (prosemirror decorations) are inside it.
[data-text-el='preview'] [data-node-view-content] :deep(a) {
	display: none;
}

.preview {
	position: relative;
}

:deep(div.widgets--list a.widget-default) {
	color: var(--color-main-text);
	padding: 0;
	text-decoration: none;
	max-width: calc(100vw - 156px);
}

:deep(.widget-default--details) {
	overflow:hidden;
	p {
		margin-bottom: 4px !important;
	}
}

/* Top align with preview image:
 * - unset center alignment
 * - margin-top of widget-default
 */
:deep(.preview-options-container) {
	top: unset;
	transform: unset;
	margin-top: calc(var(--default-grid-baseline, 4px) * 3) !important;
}
</style>
