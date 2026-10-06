/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import { registerHandler } from '@nextcloud/viewer'
import { openMimetypesMarkdown, openMimetypesPlainText } from './helpers/mime.js'

import 'vite/modulepreload-polyfill'

const tagName = 'text-viewer'
const mimes = new Set([...openMimetypesMarkdown, ...openMimetypesPlainText])

// This script runs on every page: the editor is only loaded, and its element
// defined, the first time the viewer opens a text file
registerHandler({
	id: 'text',
	displayName: t('text', 'Text'),
	tagName,
	enabled: (nodes) => nodes.every((node) => mimes.has(node.mime ?? '')),
	onInit: async () => {
		const [{ defineCustomElement }, { default: TextViewerWrapper }] = await Promise.all([
			import('vue'),
			import('./views/TextViewerWrapper.vue'),
		])
		if (window.customElements.get(tagName) === undefined) {
			window.customElements.define(tagName, defineCustomElement(TextViewerWrapper, { shadowRoot: false }))
		}
	},
	theme: 'default',
	canCompare: true,
})
