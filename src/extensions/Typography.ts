/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { textInputRule } from '@tiptap/core'
import { Typography as TiptapTypography } from '@tiptap/extension-typography'

/**
 *
 */
export function emDash() {
	return textInputRule({
		find: /(?<![<])-- $/,
		replace: '— ',
	})
}

/**
 *
 */
export function leftRightArrow() {
	return textInputRule({
		find: /<->$/,
		replace: '↔',
	})
}

/**
 *
 */
export function leftArrow() {
	return textInputRule({
		find: /<- $/,
		replace: '← ',
	})
}

/**
 *
 */
export function rightArrow() {
	return textInputRule({
		find: /(?<![<-])->$/,
		replace: '→',
	})
}

/**
 *
 */
export function leftRightDoubleArrow() {
	return textInputRule({
		find: /<=>$/,
		replace: '⇔',
	})
}

/**
 *
 */
export function leftDoubleArrow() {
	return textInputRule({
		find: /<= $/,
		replace: '⇐ ',
	})
}

/**
 *
 */
export function rightDoubleArrow() {
	return textInputRule({
		find: /(?<![<=])=>$/,
		replace: '⇒',
	})
}

/**
 *
 */
export function leftRightLongArrow() {
	return textInputRule({
		find: /<-->$/,
		replace: '⟷',
	})
}

/**
 *
 */
export function leftLongArrow() {
	return textInputRule({
		find: /<-- $/,
		replace: '⟵ ',
	})
}

/**
 *
 */
export function rightLongArrow() {
	return textInputRule({
		find: /(?<!<)-->$/,
		replace: '⟶',
	})
}

const Typography = TiptapTypography.extend({
	addOptions() {
		const options = { ...this.parent?.() }
		options.emDash = false
		options.leftArrow = false
		options.rightArrow = false
		return options
	},

	addInputRules() {
		const rules = this.parent?.() || []
		rules.push(emDash())
		rules.push(leftArrow())
		rules.push(rightArrow())
		rules.push(leftRightArrow())
		rules.push(leftRightDoubleArrow())
		rules.push(leftDoubleArrow())
		rules.push(rightDoubleArrow())
		rules.push(leftRightLongArrow())
		rules.push(leftLongArrow())
		rules.push(rightLongArrow())
		return rules
	},
})

export default Typography
