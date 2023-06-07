<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div data-text-el="editor-content-wrapper"
		class="content-wrapper text-editor__content-wrapper"
		:class="{
			'--show-outline': showOutline
		}">
		<div v-if="showOutline" class="text-editor__content-wrapper__left">
			<EditorOutline />
		</div>
		<EditorContent v-if="$editor"
			id="read-only-editor"
			class="editor__content text-editor__content"
			:editor="$editor" />
		<div class="text-editor__content-wrapper__right" />
	</div>
</template>

<script>
import { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/vue-2'
import { EDITOR } from './Editor.provider.js'
import { useOutlineStateMixin, useOutlineActions } from './Editor/Wrapper.provider.js'
import EditorOutline from './Editor/EditorOutline.vue'

export default {
	name: 'BaseReader',
	components: {
		EditorContent,
		EditorOutline,
	},

	mixins: [useOutlineStateMixin, useOutlineActions],

	provide() {
		const val = {}

		Object.defineProperties(val, {
			[EDITOR]: {
				get: () => this.$editor,
			},
		})

		return val
	},

	// extensions is a factory building a list of extensions for the editor
	inject: ['renderHtml', 'extensions'],

	props: {
		content: {
			type: String,
			required: true,
		},
	},

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
		this.$editor.setOptions({ editable: false })
	},

	beforeDestroy() {
		this.$editor.destroy()
	},

	methods: {
		createEditor() {
			return new Editor({
				content: this.htmlContent,
				extensions: this.extensions(),
			})
		},

		updateContent() {
			this.$editor.commands.setContent(this.htmlContent, true)
		},
	},
}
</script>

<style scoped lang="scss">
.editor__content {
	max-width: var(--text-editor-max-width);
	margin: auto;
	position: relative;
	width: 100%;
}

.text-editor__content-wrapper {
	--side-width: calc((100% - var(--text-editor-max-width)) / 2);
	display: grid;
	grid-template-columns: 1fr auto;
	&.--show-outline {
		grid-template-columns: var(--side-width) auto var(--side-width);
	}
	.text-editor__content-wrapper__left,
	.text-editor__content-wrapper__right {
		height: 100%;
		position: relative;
	}
}
</style>
