/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Mocks for browser APIs missing in jsdom

import { vi } from 'vitest'

// Mock ClipboardEvent and DragEvent as long as jsdom is used
// https://github.com/ueberdosis/tiptap/issues/4455

class ClipboardEventMock extends Event {

	constructor(type, eventInitDict) {
		super(type, eventInitDict)
		this.clipboardData = {
			getData: vi.fn(),
			setData: vi.fn(),
		}
	}

}

global.ClipboardEvent = ClipboardEventMock

class DragEventMock extends Event {

	constructor(type, eventInitDict) {
		super(type, eventInitDict)
		this.dataTransfer = {
			getData: vi.fn(),
			setData: vi.fn(),
		}
	}

}
global.DragEvent = DragEventMock

// https://github.com/jsdom/jsdom/issues/3002
Range.prototype.getBoundingClientRect = vi.fn()
Range.prototype.getBoundingClientRect.mockReturnValue({
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
})
Range.prototype.getClientRects = () => ({
	item: vi.fn(),
	length: 0,
	[Symbol.iterator]: vi.fn(),
})
