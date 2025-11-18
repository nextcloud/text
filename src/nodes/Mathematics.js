/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Node, mergeAttributes, InputRule } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import MathematicsView from './MathematicsView.vue'

/**
 * Create a math node (inline or block)
 * Factory to avoid code duplication
 *
 * @param {boolean} isBlock - Whether this is a block-level math node
 * @return {object} Node configuration object
 */
function createMathNode(isBlock = false) {

    return {
        name: isBlock ? 'math_block' : 'math_inline',

        group: isBlock ? 'block' : 'inline',

        inline: !isBlock,

        atom: true,

        addNodeView() {
            return VueNodeViewRenderer(MathematicsView)
        },
        
        addAttributes() {
            return {
                latex: {
                    default: '',
                    parseHTML: element => {
                        // Extract clean LaTeX from annotation tag if this is KaTeX HTML
                        const annotation = element.querySelector ? element.querySelector('annotation') : null
                        if (annotation) {
                            return annotation.textContent.trim()
                        }
                        // Fallback to data attribute or text content
                        return element.getAttribute('data-latex') || element.textContent
                    },
                    renderHTML: attributes => {
                        return {
                            'data-latex': attributes.latex,
                        }
                    },
                },
            }
        },

        addCommands() {
            return {
                [isBlock ? 'insertMathBlock' : 'insertMathInline']: (latex = '') => ({ state, commands }) => {
                    // Get selected text if any
                    const { from, to } = state.selection
                    const selectedText = state.doc.textBetween(from, to, ' ')

                    // Use selected text as latex if no latex provided
                    const mathLatex = latex || selectedText || ''

                    return commands.insertContent({
                        type: isBlock ? 'math_block' : 'math_inline',
                        attrs: { latex: mathLatex }
                    })
                }
            }
        },

        parseHTML() {
            if (isBlock) {
                return [
                    {
                        tag: 'p.katex-block',
                        priority: 100,
                        // Consume all child content to prevent nested parsing
                        contentMatch: null,
                    },
                ]
            } else {
                return [
                    {
                        tag: 'span.katex',
                        priority: 50,
                        getAttrs: element => {
                            // ONLY match top-level inline katex (not nested inside block math)
                            const parent = element.parentElement
                            if (!parent || parent.tagName !== 'P') {
                                return false
                            }
                            // Make sure parent is not katex-block
                            if (parent.classList && parent.classList.contains('katex-block')) {
                                return false
                            }
                            return {}
                        },
                        // Consume all child content to prevent nested parsing
                        contentMatch: null,
                    },
                ]
            }
        },

        renderHTML({ node, HTMLAttributes }) {
            return [
                isBlock ? 'div' : 'span',
                mergeAttributes(HTMLAttributes, {
                    class: isBlock ? 'katex-display' : 'katex',
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

        addInputRules() {
            return [
                new InputRule({
                    find: isBlock
                        ? /\$\$([^$]+)\$\$$/
                        : /(?<!\$)\$([^\s$](?:[^$]*[^\s$])?)\$$/,
                    handler: ({ state, range, match }) => {
                        const { tr } = state
                        const start = range.from
                        const end = range.to
                        const latex = match[1].trim()

                        if (latex) {
                            tr.replaceWith(
                                start,
                                end,
                                this.type.create({ latex })
                            )
                        }
                    },
                }),
            ]
        },
    }
}

export const MathInline = Node.create(createMathNode(false))
export const MathBlock = Node.create(createMathNode(true))

export default MathInline