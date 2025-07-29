/**
 * SPDX-FileCopyrightText: 2023 Amir Hossein Hashemi
 * SPDX-License-Identifier: MIT
 */

import {
	Extension,
	combineTransactionSteps,
	findChildrenInRange,
	getChangedRanges,
} from '@tiptap/core'
import { Plugin, PluginKey, Transaction } from '@tiptap/pm/state'

const RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'
const LTR = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6'
	+ '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C'
	+ '\uFE00-\uFE6F\uFEFD-\uFFFF'

/* eslint-disable no-misleading-character-class */
const RTL_REGEX = new RegExp('^[^' + LTR + ']*[' + RTL + ']')
const LTR_REGEX = new RegExp('^[^' + RTL + ']*[' + LTR + ']')

/**
 * @param text Text string
 *
 *Source: https://github.com/facebook/lexical/blob/429e3eb5b5a244026fa4776650aabe3c8e17536b/packages/lexical/src/LexicalUtils.ts#L163
 */
export function getTextDirection(text: string): 'ltr' | 'rtl' | null {
	if (text.length === 0) {
		return null
	}
	if (RTL_REGEX.test(text)) {
		return 'rtl'
	}
	if (LTR_REGEX.test(text)) {
		return 'ltr'
	}
	return null
}

const validDirections = ['ltr', 'rtl', 'auto'] as const

type Direction = (typeof validDirections)[number]

/**
 * @param object Property object
 * @param object.types List of node types to consider
 */
function TextDirectionPlugin({ types }: { types: string[] }) {
	return new Plugin({
		key: new PluginKey('textDirection'),
		appendTransaction: (transactions, oldState, newState) => {
			const docChanges = transactions.some(
				(transaction) => transaction.docChanged,
			)
			if (!docChanges) {
				return
			}

			let modified = false
			const { tr } = newState
			const transform = combineTransactionSteps(
				oldState.doc,
				transactions as Transaction[],
			)
			const changes = getChangedRanges(transform)

			tr.setMeta('addToHistory', false)

			changes.forEach(({ newRange }) => {
				const nodes = findChildrenInRange(newState.doc, newRange, (node) =>
					types.includes(node.type.name),
				)

				nodes.forEach(({ node, pos }) => {
					if (node.attrs.dir !== null && node.textContent.length > 0) {
						return
					}
					const newTextDirection = getTextDirection(node.textContent)
					if (node.attrs.dir === newTextDirection) {
						return
					}

					const marks = tr.storedMarks || []
					tr.setNodeAttribute(pos, 'dir', newTextDirection)
					// `tr.setNodeAttribute` resets the stored marks so we'll restore them
					for (const mark of marks) {
						tr.addStoredMark(mark)
					}
					modified = true
				})
			})

			return modified ? tr : null
		},
	})
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		textDirection: {
			/**
			 * Set the text direction attribute
			 */
			setTextDirection: (direction: Direction) => ReturnType
			/**
			 * Unset the text direction attribute
			 */
			unsetTextDirection: () => ReturnType
		}
	}
}

export interface TextDirectionOptions {
	types: string[]
	defaultDirection: Direction | null
}

export const TextDirection = Extension.create<TextDirectionOptions>({
	name: 'textDirection',

	addOptions() {
		return {
			types: [],
			defaultDirection: null,
		}
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					dir: {
						default: null,
						parseHTML: (element) =>
							element.dir || this.options.defaultDirection,
						renderHTML: (attributes) => {
							if (attributes.dir === this.options.defaultDirection) {
								return {}
							}
							return { dir: attributes.dir }
						},
					},
				},
			},
		]
	},

	addCommands() {
		return {
			setTextDirection:
				(direction: Direction) =>
					({ commands }) => {
						if (!validDirections.includes(direction)) {
							return false
						}

						return this.options.types.every((type) =>
							commands.updateAttributes(type, { dir: direction }),
						)
					},

			unsetTextDirection:
				() =>
					({ commands }) => {
						return this.options.types.every((type) =>
							commands.resetAttributes(type, 'dir'),
						)
					},
		}
	},

	addKeyboardShortcuts() {
		return {
			'Mod-Alt-l': () => this.editor.commands.setTextDirection('ltr'),
			'Mod-Alt-r': () => this.editor.commands.setTextDirection('rtl'),
		}
	},

	addProseMirrorPlugins() {
		return [
			TextDirectionPlugin({
				types: this.options.types,
			}),
		]
	},
})

export default TextDirection
