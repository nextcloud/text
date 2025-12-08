<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		data-text-el="editor-content-wrapper"
		class="editor__content-wrapper">
		<slot />
		<FloatingButtons v-if="showFloatingButtons" />
		<EditorContent
			role="document"
			class="editor__content text-editor__content"
			:editor="editor" />
	</div>
</template>

<script>
import { useIsMobile } from '@nextcloud/vue/composables/useIsMobile'
import { EditorContent } from '@tiptap/vue-2'
import { useEditor } from '../../composables/useEditor.ts'
import { useEditorFlags } from '../../composables/useEditorFlags.ts'
import { useEditorWidth } from '../../composables/useEditorWidth.ts'
import EditorOutline from './EditorOutline.vue'
import FloatingButtons from './FloatingButtons.vue'
import { useOutlineStateMixin } from './Wrapper.provider.js'

export default {
	name: 'ContentContainer',
	components: {
		EditorContent,
		EditorOutline,
		FloatingButtons,
	},
	mixins: [useOutlineStateMixin],
	props: {
		readOnly: {
			type: Boolean,
			required: true,
		},
	},
	setup() {
		const isMobile = useIsMobile()
		const { editor } = useEditor()
		const { isRichEditor, isRichWorkspace } = useEditorFlags()
		const { isFullWidth } = useEditorWidth()
		return { editor, isMobile, isFullWidth, isRichEditor, isRichWorkspace }
	},
	computed: {
		showOutline() {
			return this.$outlineState.visible
		},
		showFloatingButtons() {
			return (
				!this.readOnly
				&& !this.isMobile
				&& !this.isFullWidth
				&& this.isRichEditor
				&& !this.isRichWorkspace
			)
		},
	},
}
</script>

<style scoped lang="scss">
.editor__content {
	max-width: min(var(--text-editor-max-width), 100vw);
	width: min(var(--text-editor-max-width), 100vw);
	margin: 0 auto;
	position: relative;
	:deep([contenteditable]) {
		// drop off obsolete server styles
		margin: 0 !important;
	}
}
</style>
