<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		data-text-el="editor-content-wrapper"
		class="content-wrapper text-editor__content-wrapper"
		:class="{
			'--show-outline': showOutline,
		}">
		<div v-if="showOutline" class="text-editor__content-wrapper__left">
			<EditorOutline />
		</div>
		<slot />
		<FloatingButtons v-if="showFloatingButtons" />
		<EditorContent
			role="document"
			class="editor__content text-editor__content"
			:editor="editor" />
		<div class="text-editor__content-wrapper__right" />
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
	max-width: min(var(--text-editor-max-width), calc(100vw - 16px));
	margin: 0 auto;
	position: relative;
	width: 100%;
	:deep([contenteditable]) {
		// drop off obsolete server styles
		margin: 0 !important;
	}
}

.text-editor__content-wrapper {
	--side-width: calc((100% - var(--text-editor-max-width)) / 2);
	display: grid;
	grid-template-columns: 1fr auto;
	overflow: auto;
	flex: 1;
	&.--show-outline {
		grid-template-columns: var(--side-width) auto var(--side-width);
	}
	.text-editor__content-wrapper__left,
	.text-editor__content-wrapper__right {
		height: 100%;
		position: relative;
	}
}

.is-rich-workspace {
	.text-editor__content-wrapper {
		--side-width: var(--text-editor-max-width);
		grid-template-columns: var(--side-width) auto;
		.text-editor__content-wrapper__left,
		.text-editor__content-wrapper__right {
			display: none;
		}
	}
}
</style>
