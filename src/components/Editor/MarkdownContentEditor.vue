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
	<Wrapper :content-loaded="true">
		<MainContainer>
			<MenuBar v-if="!readOnly" :autohide="false" />
			<ReadonlyBar v-else />
			<ContentContainer />
		</MainContainer>
	</Wrapper>
</template>

<script>
import Wrapper from './Wrapper.vue'
import MainContainer from './MainContainer.vue'
import MenuBar from '../Menu/MenuBar.vue'
import { useOutlineActions, useOutlineStateMixin } from './Wrapper.provider.js'
import { Editor } from '@tiptap/core'
import { EDITOR, IS_RICH_EDITOR, useLinkClickHook } from '../Editor.provider.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import markdownit from '../../markdownit/index.js'
import { RichText } from '../../extensions/index.js'
import ReadonlyBar from '../Menu/ReadonlyBar.vue'
import ContentContainer from './ContentContainer.vue'

export default {
	name: 'MarkdownContentEditor',
	components: { ContentContainer, ReadonlyBar, MenuBar, MainContainer, Wrapper },
	mixins: [useOutlineStateMixin, useOutlineActions, useLinkClickHook],
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[IS_RICH_EDITOR]: {
				get: () => true,
			},
			[EDITOR]: {
				get: () => this.$editor,
			},
		})

		return val
	},

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

	computed: {
		htmlContent() {
			return this.renderHtml(this.content)
		},
		showOutline() {
			return this.$outlineState.visible
		},
	},

	watch: {
		content() {
			this.updateContent()
		},
	},

	created() {
		this.$editor = this.createEditor()
		this.$editor.setOptions({ editable: !this.readOnly })
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
				}),
			]
		},
		createEditor() {
			return new Editor({
				content: this.htmlContent,
				extensions: this.extensions(),
				onUpdate: ({ editor }) => {
					const markdown = (createMarkdownSerializer(this.$editor.schema)).serialize(editor.state.doc)
					this.$root.$emit('update:content', {
						json: editor.state.doc,
						markdown,
					})
				},
			})
		},

		updateContent() {
			this.$editor.commands.setContent(this.htmlContent, true)
		},
	},
}
</script>

<style scoped>

</style>
