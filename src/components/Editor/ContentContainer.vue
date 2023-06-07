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
		class="content-wrapper text-editor__content-wrapper"
		:class="{
			'--show-outline': showOutline
		}">
		<div v-if="showOutline" class="text-editor__content-wrapper__left">
			<EditorOutline />
		</div>
		<slot />
		<EditorContent tabindex="0"
			role="document"
			class="editor__content text-editor__content"
			:editor="$editor" />
		<div class="text-editor__content-wrapper__right" />
	</div>
</template>

<script>
import { EditorContent } from '@tiptap/vue-2'
import { useEditorMixin } from '../Editor.provider.js'
import { useOutlineStateMixin } from './Wrapper.provider.js'
import EditorOutline from './EditorOutline.vue'

export default {
	name: 'ContentContainer',
	components: {
		EditorContent,
		EditorOutline,
	},
	mixins: [useEditorMixin, useOutlineStateMixin],
	computed: {
		showOutline() {
			return this.$outlineState.visible
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

	.ie {
		.editor__content:deep(.ProseMirror) {
			padding-top: 50px;
		}
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

	.is-rich-workspace {
		.text-editor__content-wrapper {
			--side-width: var(--text-editor-max-width);
			grid-template-columns: var(--side-width) auto;
			.text-editor__content-wrapper__left,
			.text-editor__content-wrapper__right {
				display: none;
			}
		}
	}
</style>
