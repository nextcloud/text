/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Node, mergeAttributes } from '@tiptap/core'

/*
*   Create a math node (inline or block)
*   Factory to avoid code duplication
*/
function createMathNode(isBlock = false) {
    return {
        name: isBlock ? 'math_block' : 'math_inline',

        group: isBlock ? 'block' : 'inline',

        inline: !isBlock,

        atom: true,

        addAttributes() {
            return {
                latex: {
                    default: '',
                    parseHTML: element => element.textContent,
                    renderHTML: attributes => {
                        return {
                            'data-latex': attributes.latex,
                        }
                    },
                },
            }
        },

        parseHTML() {
            return [
                {
                    tag: isBlock ? 'div.katex-block' : 'span.katex',
                    getAttrs: element => ({
                        latex: element.textContent,
                    }),
                },
                {
                    tag: isBlock ? 'div[class*="katex"]' : 'span[class*="katex"]',
                    getAttrs: element => ({
                        latex: element.textContent,
                    }),
                },
            ]
        },

        renderHTML({ node, HTMLAttributes }) {
            return [
                isBlock ? 'div' : 'span',
                mergeAttributes(HTMLAttributes, {
                    class: isBlock ? 'katex-block' : 'katex',
                    'data-latex': node.attrs.latex,
                }),
                node.attrs.latex,
            ]
        },

        toMarkdown(state, node) {
            if (isBlock) {
                state.write('$$\n')
                state.text(node.attrs.latex, false)
                state.ensureNewLine()
                state.write('$$')
                state.closeBlock(node)
            } else {
                state.write('$' + node.attrs.latex + '$')
            }
        },
    }
}

export const MathInline = Node.create(createMathNode(false))
export const MathBlock = Node.create(createMathNode(true))

export default MathInline