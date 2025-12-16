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
		<TocContainer v-if="useTableOfContents" />
	</div>
</template>

<script>
import { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/vue-2'
import { inject, watch } from 'vue'
import { provideEditor } from '../composables/useEditor.ts'
import { useEditorFlags } from '../composables/useEditorFlags.ts'
import { useEditorMethods } from '../composables/useEditorMethods.ts'
import TocContainer from './Editor/TableOfContents/TocContainer.vue'

export default {
	name: 'BaseReader',
	components: {
		EditorContent,
		TocContainer,
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

		const { useTableOfContents } = useEditorFlags()
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
		return { editor, useTableOfContents }
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
