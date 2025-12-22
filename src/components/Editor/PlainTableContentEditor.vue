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
/* eslint-disable import/no-named-as-default */
import History from '@tiptap/extension-history'
import MainContainer from './MainContainer.vue'
import Wrapper from './Wrapper.vue'
import ContentContainer from './ContentContainer.vue'
import { PlainTable } from '../../extensions/index.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import { EDITOR, IS_PUBLIC, IS_RICH_EDITOR, IS_RICH_WORKSPACE, EDITOR_UPLOAD } from '../Editor.provider.js'
import markdownit from '../../markdownit/index.js'

export default {
	name: 'PlainTableContentEditor',
	components: { ContentContainer, MainContainer, Wrapper },

	provide() {
		const val = {}
		Object.defineProperties(val, {
			[EDITOR]: { get: () => this.$editor },
			[IS_PUBLIC]: { get: () => false },
			[IS_RICH_EDITOR]: { get: () => false },
			[IS_RICH_WORKSPACE]: { get: () => false },
			[EDITOR_UPLOAD]: { get: () => false },
		})
		return val
	},

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

	computed: {
		editor() {
			return this.$editor
		},
	},

	created() {
		const html = markdownit.render(this.content)
		const extensions = [PlainTable, History]

		this.$editor = new Editor({
			content: html,
			extensions,
			editable: !this.readOnly,
		})

		this.$editor.on('create', () => {
			this.$emit('ready')
			this.$parent.$emit('ready')

			try {
				const markdown = createMarkdownSerializer(this.$editor.schema).serialize(this.$editor.state.doc)
				this.emit('create:content', {
					json: this.$editor.state.doc,
					markdown,
				})
			} catch (error) {
				console.error('Error serializing table:', error)
			}
		})

		this.$editor.on('update', ({ editor }) => {
			try {
				const markdown = createMarkdownSerializer(editor.schema).serialize(editor.state.doc)
				this.emit('update:content', {
					json: editor.state.doc,
					markdown,
				})
			} catch (error) {
				console.error('Error serializing table:', error)
			}
		})
	},

	updated() {
		this.$editor.setEditable(!this.readOnly)
	},

	beforeDestroy() {
		this.$editor.destroy()
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

<style scoped>

</style>
