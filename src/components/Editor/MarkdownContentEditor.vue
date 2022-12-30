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
			<MenuBar v-if="!readOnly" />
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
import { EDITOR, IS_RICH_EDITOR } from '../Editor.provider.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import markdownit from '../../markdownit/index.js'
import { Mention, RichText } from '../../extensions/index.js'
import MentionSuggestion from '../Suggestion/Mention/suggestions.js'
import ReadonlyBar from '../Menu/ReadonlyBar.vue'
import ContentContainer from './ContentContainer.vue'

export default {
	name: 'MarkdownContentEditor',
	components: { ContentContainer, ReadonlyBar, MenuBar, MainContainer, Wrapper },
	mixins: [useOutlineStateMixin, useOutlineActions],
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

	inject: {
		onLink: {
			from: 'editor:hook:onLinkClick',
		},
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
					link: {
						onClick: (event, attrs) => {
							this.onLink(attrs)
							this.$emit('click-link', event, attrs)
							return true
						},
					},
					extensions: [
						Mention.configure({
							suggestion: MentionSuggestion({
								session: null,
								params: {
									items: async ({ query }) => {
										return [
											{
												id: 'admin',
												label: 'administrator',
											},
										]
									},
									emitMention({ props }) {
										console.error(props)
										alert('emit mention')
									},
								},
							}),
						}),
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
					this.$root.$emit('update:content', {
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
