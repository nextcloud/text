<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<DragHandle
		:editor="editor"
		class="floating-buttons"
		:class="{ heading: isHeadingNode }"
		:on-node-change="onNodeChange">
		<NcButton
			variant="tertiary-no-background"
			size="small"
			:title="t('text', 'Insert below')"
			@click="onOpenSmartPicker">
			<template #icon>
				<PlusIcon :size="16" />
			</template>
		</NcButton>
		<NcButton
			variant="tertiary-no-background"
			size="small"
			class="drag-button"
			:title="t('text', 'Click for options, hold to drag')">
			<template #icon>
				<DragVerticalIcon :size="16" />
			</template>
		</NcButton>
	</DragHandle>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { DragHandle } from '@tiptap/extension-drag-handle-vue-2'
import DragVerticalIcon from 'vue-material-design-icons/DragVertical.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { useEditor } from '../../composables/useEditor.ts'

export default {
	name: 'FloatingButtons',

	components: {
		DragHandle,
		DragVerticalIcon,
		NcButton,
		PlusIcon,
	},

	setup() {
		const { editor } = useEditor()
		return { editor }
	},

	data() {
		return {
			node: null,
			pos: -1,
		}
	},

	computed: {
		isHeadingNode() {
			return this.node?.type === this.editor.schema.nodes.heading
		},
	},

	methods: {
		onNodeChange({ node, pos }) {
			this.node = node
			this.pos = pos
		},
		onOpenSmartPicker() {
			if (!this.node || this.pos === -1) {
				return
			}

			// Node has no children or just text children and no text content
			const { schema } = this.editor
			const emptyNode =
				this.node.textContent.trim() === ''
				&& (this.node.children.length === 0
					|| this.node.children.every((n) => n.type === schema.nodes.text))

			// Insert at the end of the node
			const pos = emptyNode ? this.pos + 1 : this.pos + this.node.nodeSize
			this.editor.chain().insertContentAt(pos, '/').focus().run()
		},
		t,
	},
}
</script>

<style scoped lang="scss">
.floating-buttons {
	display: flex;

	&.heading {
		margin-right: 16px;
	}
}

.drag-button {
	cursor: grab;

	:deep(span),
	:deep(svg) {
		cursor: grab !important;
	}
}
</style>
