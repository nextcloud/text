/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createCollaborativeEditor, createEditor, createMarkdownContentEditor } from './createEditor.ts'
import { createTable } from './createTable.ts'

import 'vite/modulepreload-polyfill'

const apiVersion = '1.4'

window.OCA.Text = {
	...window.OCA.Text,
}

window.OCA.Text.apiVersion = apiVersion
window.OCA.Text.createEditor = createEditor
window.OCA.Text.createCollaborativeEditor = createCollaborativeEditor
window.OCA.Text.createMarkdownContentEditor = createMarkdownContentEditor
window.OCA.Text.createTable = createTable
