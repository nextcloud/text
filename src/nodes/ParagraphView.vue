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
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<NodeViewWrapper class="vue-component" as="p">
		<PreviewOptions v-if="editor.isEditable && canConvertToPreview"
			:value.sync="value"
			@open="editor.commands.hideLinkBubble()"
			@update:value="convertToPreview" />
		<NodeViewContent class="paragraph-content" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'
import PreviewOptions from '../components/Editor/PreviewOptions.vue'
import { useEditorMixin } from '../components/Editor.provider.js'
import { getCurrentUser } from '@nextcloud/auth'
import debounce from 'debounce'

export default {
	name: 'ParagraphView',
	components: {
		NodeViewWrapper,
		NodeViewContent,
		PreviewOptions,
	},
	mixins: [useEditorMixin],
	props: nodeViewProps,
	data() {
		return {
			canConvertToPreview: null,
			isLoggedIn: getCurrentUser(),
			value: 'text-only',
		}
	},
	watch: {
		node: {
			handler() {
				this.debouncedUpdateText()
			},
		},
	},
	beforeCreate() {
		this.debouncedUpdateText = debounce(() => {
			this.canConvertToPreview = this.checkAvailability()
		}, 500)
	},
	created() {
		this.canConvertToPreview = this.checkAvailability()
	},
	beforeUnmount() {
		this.debouncedUpdateText?.cancel()
	},
	methods: {
		convertToPreview(...args) {
			console.info(...args)
			this.$editor.chain()
				.focus()
				.setTextSelection(this.getPos() + 1)
				.setPreview()
				.run()
		},
		checkAvailability() {
			return this.editor
				.can()
				.chain()
				.setTextSelection(this.getPos() + 1)
				.setPreview()
				.run()
		},
	},
}
</script>
<style lang="scss" scoped>

.vue-component {
	position: relative;
}

/* center around current line */
:deep([data-text-preview-options]) {
	top: 50%;
	transform: translate(0, -50%);
}

</style>
