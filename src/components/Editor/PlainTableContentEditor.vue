<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<Wrapper :content-loaded="true">
		<MainContainer>
			<ContentContainer :read-only="readOnly" />
		</MainContainer>
	</Wrapper>
</template>

<script>
import { Editor } from '@tiptap/core'
import MainContainer from './MainContainer.vue'
import Wrapper from './Wrapper.vue'
/* eslint-disable import/no-named-as-default */
import { UndoRedo } from '@tiptap/extensions'
import { provide, watch } from 'vue'
import { provideEditor } from '../../composables/useEditor.ts'
import { editorFlagsKey } from '../../composables/useEditorFlags.ts'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import { editorWidthKey } from '../../composables/useEditorWidth.ts'
import { FocusTrap, PlainTable } from '../../extensions/index.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import { EDITOR_UPLOAD } from '../Editor.provider.ts'
import ContentContainer from './ContentContainer.vue'

export default {
	name: 'PlainTableContentEditor',
	components: { ContentContainer, MainContainer, Wrapper },

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
	emits: ['update:content'],

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
			useTableOfContents: false,
		})
		provide(editorWidthKey, null)
		provide(EDITOR_UPLOAD, false)
		return { editor, setContent }
	},

	created() {
		// Set content after the setup function
		// as it may render other vue components such as preview toggle
		// which breaks the context of the setup function.
		this.setContent(this.content, { addToHistory: false })
		this.editor.on('create', () => {
			this.$emit('ready')
			this.$parent.$emit('ready')

			// Emit initial content
			try {
				const markdown = createMarkdownSerializer(
					this.editor.schema,
				).serialize(this.editor.state.doc)
				this.emit('create:content', {
					json: this.editor.state.doc,
					markdown,
				})
			} catch (error) {
				console.error('Error serializing table:', error)
			}
		})
		this.editor.on('update', ({ editor }) => {
			try {
				const markdown = createMarkdownSerializer(editor.schema).serialize(
					editor.state.doc,
				)
				this.emit('update:content', {
					json: editor.state.doc,
					markdown,
				})
			} catch (error) {
				console.error('Error serializing table:', error)
			}
		})
	},

	beforeDestroy() {
		this.editor.destroy()
	},

	methods: {
		/**
		 * Wrapper to emit events on our own and the parent component
		 *
		 * @param {string} event The event name
		 * @param {any} data The data to pass along
		 */
		emit(event, data) {
			this.$emit(event, data)
			this.$parent?.$emit(event, data)
		},
	},
}
</script>

<style lang="scss">
@use './../../css/prosemirror';
@use './../../css/print';
</style>
