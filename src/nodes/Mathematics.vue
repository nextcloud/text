<template>
    <NodeViewWrapper :as="isBlock ? 'div' : 'span'" :class="wrapperClass">
      <span
        ref="mathEl"
        :contenteditable="false"
        @click="onMathClick">
      </span>
    </NodeViewWrapper>
  </template>

  <script>
  import katex from 'katex'
  import { NodeViewWrapper } from '@tiptap/vue-2'

  export default {
    name: 'MathematicsView',
    components: { NodeViewWrapper },
    props: ['node', 'editor', 'updateAttributes', 'deleteNode'],

    computed: {
      isBlock() {
        return this.node.type.name === 'math_block'
      },
      wrapperClass() {
        return this.isBlock ? 'katex-display' : 'katex'
      }
    },

    mounted() {
      this.renderMath()
    },

    updated() {
      this.renderMath()
    },

    methods: {
      renderMath() {
        if (this.$refs.mathEl) {
          katex.render(this.node.attrs.latex, this.$refs.mathEl, {
            displayMode: this.isBlock,
            throwOnError: false
          })
        }
      },

      onMathClick() {
        // TODO: Add editing functionality later
        console.log('Math clicked:', this.node.attrs.latex)
      }
    }
  }
  </script>
  