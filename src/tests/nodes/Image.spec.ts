/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Plugin } from '@tiptap/pm/state'

import { getExtensionField } from '@tiptap/core'
import { describe, expect, it } from 'vitest'
import Image from '../../nodes/Image.ts'

describe('Image plugins', () => {
	it('omits attachment extraction when attachment events are disabled', () => {
		const extension = Image.configure({ emitAttachmentEvents: false })
		const addPlugins = getExtensionField(extension, 'addProseMirrorPlugins', { options: extension.options }) as () => Plugin[]

		expect(addPlugins()).toHaveLength(1)
	})
})
