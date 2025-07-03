<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
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
		<EditorContent
			id="read-only-editor"
			class="editor__content text-editor__content"
			:editor="editor" />
		<div class="text-editor__content-wrapper__right" />
	</div>
</template>

<script>
import { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/vue-2'
import { provideEditor } from '../composables/useEditor.ts'
import {
	useOutlineStateMixin,
	useOutlineActions,
} from './Editor/Wrapper.provider.js'
import EditorOutline from './Editor/EditorOutline.vue'
import { useEditorMethods } from '../composables/useEditorMethods.ts'
import { inject, watch } from 'vue'

export default {
	name: 'BaseReader',
	components: {
		EditorContent,
		EditorOutline,
	},

	mixins: [useOutlineStateMixin, useOutlineActions],

	props: {
		content: {
			type: String,
			required: true,
		},
	},

	setup(props) {
		// extensions is a factory building a list of extensions for the editor
		const extensions = inject('extensions')
		const renderHtml = inject('renderHtml')
		const editor = new Editor({
			content: renderHtml(props.content),
			extensions: extensions(),
		})
		provideEditor(editor)
		watch(
			() => props.content,
			(content) => {
				console.warn({ content })
				editor.commands.setContent(renderHtml(content), true)
			},
		)
		const { setEditable } = useEditorMethods(editor)
		setEditable(false)
		return { editor }
	},

	computed: {
		showOutline() {
			return this.$outlineState.visible
		},
	},

	beforeDestroy() {
		this.editor?.destroy()
	},
}
</script>

<style scoped lang="scss">
.editor__content {
	max-width: var(--text-editor-max-width);
	margin: auto;
	position: relative;
	width: 100%;
}

.text-editor__content-wrapper {
	--side-width: calc((100% - var(--text-editor-max-width)) / 2);
	display: grid;
	grid-template-columns: 1fr auto;
	&.--show-outline {
		grid-template-columns: var(--side-width) auto var(--side-width);
	}
	.text-editor__content-wrapper__left,
	.text-editor__content-wrapper__right {
		height: 100%;
		position: relative;
	}
}
</style>
