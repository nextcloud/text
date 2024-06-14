/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapItalic from '@tiptap/extension-italic'
import Link from './Link.js'
import Strike from './Strike.js'
import Strong from './Strong.js'
import Underline from './Underline.js'

const Italic = TipTapItalic.extend({
	name: 'em',
})

export {
	Strong,
	Italic,
	Strike,
	Link,
	Underline,
}
