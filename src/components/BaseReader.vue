<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div data-text-el="editor-content-wrapper" class="editor__content-wrapper">
		<EditorContent
			id="read-only-editor"
			class="editor__content text-editor__content"
			:editor="editor" />
		<EditorOutline v-if="showOutline" class="editor__outline" />
	</div>
</template>

<script>
import { useIsMobile } from '@nextcloud/vue/composables/useIsMobile'
import { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/vue-2'
import { inject, watch } from 'vue'
import { provideEditor } from '../composables/useEditor.ts'
import { useEditorFlags } from '../composables/useEditorFlags.ts'
import { useEditorMethods } from '../composables/useEditorMethods.ts'
import EditorOutline from './Editor/EditorOutline.vue'

export default {
	name: 'BaseReader',
	components: {
		EditorOutline,
		EditorContent,
	},

	props: {
		content: {
			type: String,
			required: true,
		},
	},

	setup(props) {
		// extensions is a factory building a list of extensions for the editor
		const extensions = inject('extensions')
		const editor = new Editor({ extensions: extensions() })
		provideEditor(editor)

		const isMobile = useIsMobile()
		const { isRichEditor } = useEditorFlags()
		const { setContent, setEditable } = useEditorMethods(editor)
		watch(
			() => props.content,
			(content) => {
				console.warn({ content })
				setContent(content)
			},
		)
		setEditable(false)

		// Render the initial content last as it may render Vue components
		// that break the vue context of this setup function.
		setContent(props.content, { addToHistory: false })
		return { editor, isMobile, isRichEditor }
	},

	computed: {
		showOutline() {
			return (
				!this.isMobile
				&& this.isRichEditor
			)
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
	margin: 0 auto;
	position: relative;
}
</style>
