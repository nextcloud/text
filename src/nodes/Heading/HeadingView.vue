<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper :id="node.attrs.id"
		ref="container"
		:as="domElement">
		<a aria-hidden="true"
			class="heading-anchor"
			:href="href"
			:title="t('text', 'Link to this section')"
			:contenteditable="false"
			@click.stop="click">{{ linkSymbol }}</a>
		<NodeViewContent as="span" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import { useEditorMixin } from '../../components/Editor.provider.js'

export default {
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
	data() {
		return {
			content: null,
		}
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
	},

	methods: {
		click() {
			this.$refs.container.$el.scrollIntoView()
			window.location.hash = this.href
		},
	},
}
</script>

<style lang="scss">
div.ProseMirror {
	/* Anchor links */
	h1,h2,h3,h4,h5,h6 {
		position: relative;
		.heading-anchor[contenteditable="false"] {
			// Shrink clickable area of anchor permalinks to not overlay the heading
			width: 1em;
			opacity: 0;
			padding: 0;
			left: -1em;
			bottom: 0;
			font-size: max(1em, 16px);
			position: absolute;
			text-decoration: none;
			transition-duration: .15s;
			transition-property: opacity;
			transition-timing-function: cubic-bezier(.4,0,.2,1);
		}

		&:hover .heading-anchor {
			opacity: 0.5!important;
		}

		&:focus-visible {
			outline: none;
		}
	}
}
</style>
