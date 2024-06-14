/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue'

global.t = jest.fn().mockImplementation((app, text) => text)
global.n = jest.fn().mockImplementation((app, text) => text)

jest.mock('@nextcloud/auth', () => ({
	getCurrentUser: jest.fn().mockImplementation(() => ({
		uid: 'user1',
		displayName: 'User 1',
		isAdmin: false,
	})),
	getRequestToken: jest.fn().mockImplementation(() => '123456abcdef'),
	onRequestTokenUpdate: jest.fn().mockImplementation(() => {}),
}))

jest.mock('@nextcloud/files', () => ({
	formatFileSize: (size) => size,
	Header: class {},
}))
jest.mock('@nextcloud/dialogs', () => ({
	FilePickerType: {},
	getFilePickerBuilder: () => {},
}))

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
		getIconUrl: jest.fn(),
	},
	L10N: {
		translate: global.t,
	}
}

global.OCA = {}
global._oc_webroot = ''


Vue.prototype.t = global.t
Vue.prototype.n = global.n
Vue.prototype.OC = OC
Vue.prototype.OCA = OCA

// Mock ClipboardEvent and DragEvent as long as jsdom is used
// https://github.com/ueberdosis/tiptap/issues/4455
class ClipboardEventMock extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    this.clipboardData = {
      getData: jest.fn(),
      setData: jest.fn(),
    };
  }
}
global.ClipboardEvent = ClipboardEventMock;

class DragEventMock extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    this.dataTransfer = {
      getData: jest.fn(),
      setData: jest.fn(),
    };
  }
}
global.DragEvent = DragEventMock;
