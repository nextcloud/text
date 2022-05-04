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
	<EditorContent v-if="editor" id="read-only-editor" :editor="editor" />
</template>

<script>
import { EditorContent } from '@tiptap/vue-2'
import escapeHtml from 'escape-html'
import { createEditor } from '../EditorFactory.js'
import markdownit from './../markdownit/index.js'

export default {
	name: 'ReadOnlyEditor',
	components: { EditorContent },
	props: {
		content: {
			type: String,
			required: true,
		},
		isRichEditor: {
			type: Boolean,
			default: true,
		},
	},
	data: () => {
		return {
			editor: null,
		}
	},
	mounted() {
		this.editor = createEditor({
			content: this.isRichEditor ? markdownit.render(this.content) : '<pre>' + escapeHtml(this.content) + '</pre>',
			enableRichEditing: this.isRichEditor,
		})
		this.editor.setOptions({ editable: false })
	},
	beforeDestroy() {
		this.editor.destroy()
	},
}
</script>

<style lang="scss">

	#read-only-editor {
		@import './../../css/prosemirror';
		overflow: scroll;
	}

	.thumbnailContainer #read-only-editor  {
		width: 100%;

		.ProseMirror {
			height: auto;
			margin: 0 0 0 0;
			padding: 0;
		}
	}

</style>
<style lang="scss">
	@import './../../css/prosemirror';
</style>
