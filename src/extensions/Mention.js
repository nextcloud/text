import { mergeAttributes, Node } from '@tiptap/core'
import TipTapMention from '@tiptap/extension-mention'

export default TipTapMention.extend({
    parseHTML() {
        return [
          {
            tag: `span[data-type="${this.name}"]`,
            getAttrs: element => (element.getAttribute('data-type') === this.name) && (element.hasAttribute('data-id')) && null,
          },
        ]
    },
    
    renderHTML({ node, HTMLAttributes }) {
        return [
          'span',
          mergeAttributes({ 'data-type': this.name }, this.options.HTMLAttributes, HTMLAttributes),
          this.options.renderLabel({
            options: this.options,
            node,
          }),
        ]
    },

    toMarkdown(state, node, parent, index) {
		state.write(' ')
		state.write(`@[${node.attrs.id}](mention://user/${node.attrs.id})`)
		state.write(' ')
	},
});