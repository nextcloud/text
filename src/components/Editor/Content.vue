<!--
  - @copyright Copyright (c) 2022 Max <max@nextcloud.com>
  -
  - @author Max <max@nextcloud.com>
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
  -
  -->

<template>
	<div data-text-el="editor-content-wrapper"
		class="content-wrapper text-editor__content-wrapper">
		<slot />
		<EditorContent tabindex="0"
			role="document"
			class="editor__content text-editor__content"
			:editor="$editor" />
	</div>
</template>

<script>
import { EditorContent } from '@tiptap/vue-2'
import { useEditorMixin } from './../EditorWrapper.provider.js'

export default {
	name: 'Content',
	components: {
		EditorContent,
	},
	mixins: [useEditorMixin],
}
</script>

<style scoped lang="scss">
	.editor__content {
		max-width: var(--text-editor-max-width);
		margin: auto;
		position: relative;
	}

	.ie {
		.editor__content::v-deep(.ProseMirror) {
			padding-top: 50px;
		}
	}

</style>
