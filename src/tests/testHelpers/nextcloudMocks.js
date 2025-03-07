/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { vi } from 'vitest'

global.t = vi.fn().mockImplementation((app, text) => text)
global.n = vi.fn().mockImplementation((app, text) => text)

vi.mock('@nextcloud/auth', () => ({
	getCurrentUser: vi.fn().mockImplementation(() => ({
		uid: 'user1',
		displayName: 'User 1',
		isAdmin: false,
	})),
	getRequestToken: vi.fn().mockImplementation(() => '123456abcdef'),
	onRequestTokenUpdate: vi.fn().mockImplementation(() => {}),
}))

vi.mock('@nextcloud/files', () => ({
	formatFileSize: (size) => size,
	Header: class {},
}))

vi.mock('@nextcloud/dialogs', () => ({
	FilePickerType: {},
	getFilePickerBuilder: () => {},
}))

vi.mock('@nextcloud/capabilities', async () => {
	const getCapabilities = vi.fn(() => ({ }))
	return { getCapabilities }
})

global.OC = {
	requestToken: '123',
	coreApps: [
		'core',
	],
	config: {
		modRewriteWorking: true,
	},
	dialogs: {
	},
	isUserAdmin() {
		return true
	},
	getLanguage() {
		return 'en-GB'
	},
	getLocale() {
		return 'en_GB'
	},

	MimeType: {
		getIconUrl: vi.fn(),
	},
	L10N: {
		translate: global.t,
	},
}

global.OCA = {}
global._oc_webroot = ''
