<!--
  - @copyright Copyright (c) 2022
  -
  - @license AGPL-3.0-or-later
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
	<NodeViewWrapper ref="content"
		:as="domElement"
		v-bind="node.attrs"
		tabindex="-1">
		<a aria-hidden="true"
			class="anchor-link"
			:href="href"
			:title="t('text', 'Permalink')"
			@click.stop="click">{{ linkSymbol }}</a>
		<NodeViewContent />
	</NodeViewWrapper>
</template>

<script>
import Vue from 'vue'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import { useEditorMixin } from '../components/EditorWrapper.provider.js'

export default Vue.extend({
	name: 'HeadingView',
	components: {
		NodeViewWrapper,
		NodeViewContent,
	},
	mixins: [useEditorMixin],
	props: {
		node: {
			type: Object,
			required: true,
		},
		extension: {
			type: Object,
			required: true,
		},
	},

	computed: {
		href() {
			return `#${this.node.attrs.id}`
		},
		domElement() {
			const hasLevel = this.extension.options.levels.includes(this.node.attrs.level)
			const level = hasLevel ? this.node.attrs.level : this.extension.options.levels[0]
			return `h${level}`
		},
		linkSymbol() {
			return this.extension.options.linkSymbol
		},
		t: () => window.t,
	},

	methods: {
		click() {
			this.$refs.content.$el.scrollIntoView()
			window.location.hash = this.href
		},
	},
})
</script>

<style scoped lang="scss">
div.ProseMirror {
	/* Anchor links */
	h1, h2, h3, h4, h5, h6 {
		.anchor-link {
			opacity: 0;
			padding: 0;
			left: -18px;
			font-size: max(1em, 16px);
			position: absolute;
			text-decoration: none;
			transition-duration: .15s;
			transition-property: opacity;
			transition-timing-function: cubic-bezier(.4,0,.2,1);
		}

		&:hover .anchor-link {
			opacity: 0.25;
		}
	}

	// Shrink clickable area of anchor permalinks while editing
	&.ProseMirror-focused[contenteditable="true"] {
		h1,h2,h3,h4,h5,h6 {
			.anchor-link {
				width: fit-content;
			}
		}
	}
}
</style>
