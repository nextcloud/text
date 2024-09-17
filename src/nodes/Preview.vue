<!--
  - @copyright Copyright (c) 2024 Max <max@nextcloud.com>
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
 * 7px .preview padding
 * + widget margin-top
 */
:deep([data-text-preview-options]) {
	top: calc(-7px - var(--default-grid-baseline, 4px) * 3);
}
</style>
