import { t } from '@nextcloud/l10n'
import { registerHandler } from '@nextcloud/viewer'
import { defineCustomElement } from 'vue'
import { logger } from './helpers/logger.ts'
import { openMimetypesMarkdown, openMimetypesPlainText } from './helpers/mime.js'

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import 'vite/modulepreload-polyfill'

const tagname = 'oca-text-viewer'
const allMimes = new Set([...openMimetypesMarkdown, ...openMimetypesPlainText])

async function registerTextCustomElement() {
	const { default: TextViewerWrapper } = await import('./views/TextViewerWrapper.vue')
	if (window.customElements.get(tagname) === undefined) {
		window.customElements.define(tagname, defineCustomElement(TextViewerWrapper, { shadowRoot: false }))
	}
}

registerTextCustomElement().catch((error) => logger.error('Failed to register text viewer element', { error }))

registerHandler({
	id: 'text',
	displayName: t('text', 'Text'),
	tagname,
	enabled: (nodes) => nodes.every((node) => allMimes.has(node.mime ?? '')),
	theme: 'default',
})

logger.debug('Text viewer handler registered', { tagname, mimes: [...allMimes] })
