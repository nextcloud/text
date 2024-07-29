<!--
  - @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -->

<template>
	<Wrapper :content-loaded="true"
		:show-outline-outside="showOutlineOutside"
		@outline-toggled="outlineToggled">
		<MainContainer>
			<MenuBar v-if="!readOnly" :autohide="false" />
			<slot v-else name="readonlyBar">
				<ReadonlyBar />
			</slot>
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
import { ATTACHMENT_RESOLVER, EDITOR, IS_RICH_EDITOR, useLinkClickHook } from '../Editor.provider.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import AttachmentResolver from '../../services/AttachmentResolver.js'
import markdownit from '../../markdownit/index.js'
import { RichText } from '../../extensions/index.js'
import ReadonlyBar from '../Menu/ReadonlyBar.vue'
import ContentContainer from './ContentContainer.vue'

export default {
	name: 'MarkdownContentEditor',
	components: { ContentContainer, ReadonlyBar, MenuBar, MainContainer, Wrapper },
	mixins: [useLinkClickHook],
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
					link: this?.$linkHookClick
						? {
							onClick: (event, attrs) => {
								return this?.$linkHookClick?.(event, attrs)
							},
						}
						: undefined,
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

<style scoped>

</style>
