<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<EditorWrapper contentLoaded>
		<MainContainer>
			<ContentContainer :readOnly="readOnly" />
		</MainContainer>
	</EditorWrapper>
</template>

<script>
import { Editor } from '@tiptap/core'
import { UndoRedo } from '@tiptap/extensions'
import { provide, watch } from 'vue'
import ContentContainer from './ContentContainer.vue'
import EditorWrapper from './EditorWrapper.vue'
import MainContainer from './MainContainer.vue'
import { provideEditor } from '../../composables/useEditor.ts'
import { editorFlagsKey } from '../../composables/useEditorFlags.ts'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import { editorWidthKey } from '../../composables/useEditorWidth.ts'
import { FocusTrap, PlainTable } from '../../extensions/index.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import { logger } from '../../helpers/logger.ts'

export default {
	name: 'PlainTableContentEditor',
	components: { ContentContainer, MainContainer, EditorWrapper },

	props: {
		content: {
			type: String,
			required: true,
		},

		readOnly: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['create:content', 'ready', 'update:content'],

	setup(props) {
		const extensions = [PlainTable, UndoRedo, FocusTrap]
		const editor = new Editor({ extensions })

		const { setEditable, setContent } = useEditorMethods(editor)
		watch(
			() => props.content,
			(content) => {
				setContent(content)
			},
		)

		setEditable(!props.readOnly)
		watch(
			() => props.readOnly,
			(readOnly) => {
				setEditable(!readOnly)
			},
		)

		provideEditor(editor)
		provide(editorFlagsKey, {
			isPublic: false,
			isRichEditor: true,
			isRichWorkspace: false,
			hasTableOfContents: false,
		})
		provide(editorWidthKey, null)
		return { editor, setContent }
	},

	created() {
		// Set content after the setup function
		// as it may render other vue components such as preview toggle
		// which breaks the context of the setup function.
		this.setContent(this.content, { addToHistory: false })
		this.editor.on('create', () => {
			this.$emit('ready')

			// Emit initial content
			try {
				const markdown = createMarkdownSerializer(this.editor.schema).serialize(this.editor.state.doc)
				this.$emit('create:content', {
					json: this.editor.state.doc,
					markdown,
				})
			} catch (error) {
				logger.error('Error serializing table:', error)
			}
		})
		this.editor.on('update', ({ editor }) => {
			try {
				const markdown = createMarkdownSerializer(editor.schema).serialize(editor.state.doc)
				this.$emit('update:content', {
					json: editor.state.doc,
					markdown,
				})
			} catch (error) {
				logger.error('Error serializing table:', error)
			}
		})
	},

	beforeUnmount() {
		this.editor.destroy()
	},
}
</script>

<style lang="scss">
@use './../../css/prosemirror';
@use './../../css/print';
</style>
