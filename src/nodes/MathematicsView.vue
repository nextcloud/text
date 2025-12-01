<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper :as="isBlock ? 'div' : 'span'" :class="wrapperClass">
		<span ref="mathEl" @click="onMathClick"></span>
		<ShowMathModal
			v-if="showModal"
			:show="showModal"
			:latex="node.attrs.latex"
			:is-block="isBlock"
			@close="onClose"
			@save="onSave" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper } from '@tiptap/vue-2'
import katex from 'katex'
import ShowMathModal from '../components/Math/ShowMathModal.vue'

export default {
	name: 'MathematicsView',
	components: { NodeViewWrapper, ShowMathModal },
	props: {
		node: {
			type: Object,
			required: true,
		},
		editor: {
			type: Object,
			required: true,
		},
		updateAttributes: {
			type: Function,
			required: true,
		},
		deleteNode: {
			type: Function,
			required: true,
		},
	},

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
		renderMath() {
			if (this.$refs.mathEl) {
				katex.render(this.node.attrs.latex, this.$refs.mathEl, {
					displayMode: this.isBlock,
					throwOnError: false,
				})
			}
		},

		onMathClick() {
			if (!this.editor.isEditable) return
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
