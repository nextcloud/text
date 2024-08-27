<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<Wrapper :content-loaded="true"
		:show-outline-outside="showOutlineOutside"
		@outline-toggled="outlineToggled">
		<MainContainer>
			<template v-if="showMenuBar">
				<MenuBar v-if="!readOnly" :autohide="false" />
				<slot v-else name="readonlyBar">
					<ReadonlyBar />
				</slot>
			</template>
			<ContentContainer />
		</MainContainer>
	</Wrapper>
</template>

<script>
import Wrapper from './Wrapper.vue'
import MainContainer from './MainContainer.vue'
import MenuBar from '../Menu/MenuBar.vue'
import { Editor } from '@tiptap/core'
/* eslint-disable import/no-named-as-default */
import History from '@tiptap/extension-history'
import { getCurrentUser } from '@nextcloud/auth'
import { ATTACHMENT_RESOLVER, EDITOR, IS_RICH_EDITOR } from '../Editor.provider.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import AttachmentResolver from '../../services/AttachmentResolver.js'
import markdownit from '../../markdownit/index.js'
import { RichText } from '../../extensions/index.js'
import ReadonlyBar from '../Menu/ReadonlyBar.vue'
import ContentContainer from './ContentContainer.vue'

export default {
	name: 'MarkdownContentEditor',
	components: { ContentContainer, ReadonlyBar, MenuBar, MainContainer, Wrapper },
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[EDITOR]: {
				get: () => this.$editor,
			},
			[ATTACHMENT_RESOLVER]: {
				get: () => this.$attachmentResolver ?? null,
			},
			[IS_RICH_EDITOR]: {
				get: () => true,
			},
		})

		return val
	},

	props: {
		fileId: {
			type: Number,
			default: null,
		},
		content: {
			type: String,
			required: true,
		},
		readOnly: {
			type: Boolean,
			default: false,
		},
		relativePath: {
			type: String,
			default: '',
		},
		shareToken: {
			type: String,
			default: null,
		},
		showMenuBar: {
			type: Boolean,
			default: true,
		},
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:content'],

	computed: {
		htmlContent() {
			return this.renderHtml(this.content)
		},
	},

	watch: {
		content() {
			this.updateContent()
		},
	},

	created() {
		this.$editor = this.createEditor()
		this.$editor.setEditable(!this.readOnly)
		if (this.fileId) {
			this.$attachmentResolver = new AttachmentResolver({
				currentDirectory: this.relativePath?.match(/.*\//),
				user: getCurrentUser(),
				shareToken: this.shareToken,
				fileId: this.fileId,
			})
		}
	},

	updated() {
		this.$editor.setEditable(!this.readOnly)
	},

	beforeDestroy() {
		this.$editor.destroy()
	},

	methods: {
		renderHtml(content) {
			return markdownit.render(content)
		},
		extensions() {
			return [
				RichText.configure({
					component: this,
					extensions: [
						History,
					],
				}),
			]
		},
		createEditor() {
			return new Editor({
				content: this.htmlContent,
				extensions: this.extensions(),
				onUpdate: ({ editor }) => {
					const markdown = (createMarkdownSerializer(this.$editor.schema)).serialize(editor.state.doc)
					this.emit('update:content', {
						json: editor.state.doc,
						markdown,
					})
				},
				onCreate: ({ editor }) => {
					this.$emit('ready')
					this.$parent.$emit('ready')
				},
			})
		},

		updateContent() {
			this.$editor.commands.setContent(this.htmlContent, true)
		},

		outlineToggled(visible) {
			this.emit('outline-toggled', visible)
		},

		/**
		 * Wrapper to emit events on our own and the parent component
		 *
		 * The parent might be either the root component of src/editor.js or Viewer.vue which collectives currently uses
		 *
		 * Ideally this would be done in a generic way in the src/editor.js API abstraction, but it seems
		 * that there is no proper way to pass any received event along in vue, the only option I've found
		 * in https://github.com/vuejs/vue/issues/230 feels too hacky to me, so we just emit twice for now
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
@import './../../css/prosemirror';
@import './../../css/print';
</style>
