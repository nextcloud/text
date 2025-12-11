<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<Wrapper :content-loaded="true" :show-outline-outside="false">
		<MainContainer>
			<ContentContainer :read-only="readOnly" />
		</MainContainer>
	</Wrapper>
</template>

<script>
import { Editor } from '@tiptap/core'
/* eslint-disable-next-line import/no-named-as-default */
import History from '@tiptap/extension-history'
import { provide, watch } from 'vue'
import { provideEditor } from '../../composables/useEditor.ts'
import { editorFlagsKey } from '../../composables/useEditorFlags.ts'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import { PlainTable } from '../../extensions/index.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import markdownit from '../../markdownit/index.js'
import { EDITOR_UPLOAD } from '../Editor.provider.ts'
import ContentContainer from './ContentContainer.vue'
import MainContainer from './MainContainer.vue'
import Wrapper from './Wrapper.vue'

export default {
	name: 'PlainTableContentEditor',
	components: { ContentContainer, MainContainer, Wrapper },

	props: {
		content: {
			type: String,
			default: '',
		},
		readOnly: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['update:content', 'ready', 'create:content'],

	setup(props) {
		const html = markdownit.render(props.content)
		const extensions = [PlainTable, History]

		const editor = new Editor({
			content: html,
			extensions,
			editable: !props.readOnly,
		})

		const { setEditable, setContent } = useEditorMethods(editor)

		watch(
			() => props.content,
			(content) => {
				const html = markdownit.render(content)
				setContent(html)
			},
		)

		watch(
			() => props.readOnly,
			(readOnly) => {
				setEditable(!readOnly)
			},
		)

		provideEditor(editor)
		provide(editorFlagsKey, {
			isPublic: false,
			isRichEditor: false,
			isRichWorkspace: false,
		})
		provide(EDITOR_UPLOAD, false)

		return { editor, setContent }
	},

	created() {
		this.editor.on('create', () => {
			this.$emit('ready')
			this.$parent.$emit('ready')

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
