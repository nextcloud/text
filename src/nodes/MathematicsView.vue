<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper
		:as="isBlock ? 'div' : 'span'"
		:data-type="isBlock ? 'block-math' : 'inline-math'"
		:data-latex="node.attrs.latex"
		:class="wrapperClass">
		<span ref="mathEl" @click="onMathClick" />
		<ShowMathModal
			v-if="showModal"
			:show="showModal"
			:latex="node.attrs.latex"
			:isBlock="isBlock"
			@close="onClose"
			@save="onSave" />
	</NodeViewWrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import ShowMathModal from '../components/Math/ShowMathModal.vue'

import '../css/katex.scss'

export default {
	name: 'MathematicsView',
	components: { NodeViewWrapper, ShowMathModal },
	props: nodeViewProps,

	data() {
		return {
			showModal: false,
		}
	},

	computed: {
		isBlock() {
			return this.node.type.name === 'blockMath'
		},

		wrapperClass() {
			return this.isBlock ? 'katex-display' : 'katex'
		},
	},

	mounted() {
		this.renderMath()
		// Auto-open modal for empty formulas (when inserted from menu)
		if (!this.node.attrs.latex && this.editor.isEditable) {
			this.showModal = true
		}
	},

	updated() {
		this.renderMath()
	},

	methods: {
		async renderMath() {
			const { default: katex } = await import('katex')
			if (this.$refs.mathEl) {
				katex.render(this.node.attrs.latex, this.$refs.mathEl, {
					displayMode: this.isBlock,
					throwOnError: false,
				})
			}
		},

		onMathClick() {
			if (!this.editor.isEditable) {
				return
			}
			this.showModal = true
		},

		onClose() {
			// Delete the node if it's empty (user cancelled without entering anything)
			if (!this.node.attrs.latex) {
				this.deleteNode()
			}
			this.showModal = false
		},

		onSave(newLatex) {
			this.updateAttributes({ latex: newLatex })
			this.showModal = false
		},
	},
}
</script>
