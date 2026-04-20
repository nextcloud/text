/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapItalic from '@tiptap/extension-italic'
import Code from './Code.ts'
import Highlight from './Highlight.ts'
import Link from './Link.ts'
import Strike from './Strike.js'
import Strong from './Strong.js'
import Underline from './Underline.js'

const Italic = TipTapItalic.extend({
	name: 'em',
})

export { Code, Highlight, Italic, Link, Strike, Strong, Underline }
