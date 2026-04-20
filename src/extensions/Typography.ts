/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { textInputRule } from '@tiptap/core'
import { Typography as TiptapTypography } from '@tiptap/extension-typography'

export const emDash = () =>
	textInputRule({
		find: /(?<![<])-- $/,
		replace: '— ',
	})

export const leftRightArrow = () =>
	textInputRule({
		find: /<->$/,
		replace: '↔',
	})

export const leftArrow = () =>
	textInputRule({
		find: /<- $/,
		replace: '← ',
	})

export const rightArrow = () =>
	textInputRule({
		find: /(?<![<-])->$/,
		replace: '→',
	})

export const leftRightDoubleArrow = () =>
	textInputRule({
		find: /<=>$/,
		replace: '⇔',
	})

export const leftDoubleArrow = () =>
	textInputRule({
		find: /<= $/,
		replace: '⇐ ',
	})

export const rightDoubleArrow = () =>
	textInputRule({
		find: /(?<![<=])=>$/,
		replace: '⇒',
	})

export const leftRightLongArrow = () =>
	textInputRule({
		find: /<-->$/,
		replace: '⟷',
	})

export const leftLongArrow = () =>
	textInputRule({
		find: /<-- $/,
		replace: '⟵ ',
	})

export const rightLongArrow = () =>
	textInputRule({
		find: /(?<!<)-->$/,
		replace: '⟶',
	})

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
