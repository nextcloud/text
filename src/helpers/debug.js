/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Setup OCA.Text.debugYjs() and expose editor component in OCA.Text.editorComponents
 */

if (!window.OCA.Text) {
	window.OCA.Text = {}
}

const editorComponents = window.OCA.Text.editorComponents ?? new Set()
window.OCA.Text.editorComponents = editorComponents

/**
 * Print debug info for all editor components as a warning.
 */
export function debugYjs() {
	const intro = 'Editor Yjs debug data. Copy the objects above that start with "fileId".'
	const introChrome = '- In Chrome, select "Copy" at the end of the line.'
	const introFirefox = '- In Firefox, right-click on the object and select "Copy object".'
	const styleBold = 'font-weight: bold;'
	const styleItalic = 'font-weight: normal; font-style: italic;'

	for (const editorComponent of editorComponents.values()) {
		console.warn(JSON.stringify(editorComponent.debugData(), null, ' '))
	}

	console.warn('%c%s\n%c%s\n%s', styleBold, intro, styleItalic, introChrome, introFirefox)
}

if (!window.OCA.Text.debugYjs) {
	window.OCA.Text.debugYjs = debugYjs
}

/**
 * Expose editor component in OCA.Text.editorComponents
 * @param {object} component - the editor component to include in debug output
 */
export function exposeForDebugging(component) {
	editorComponents.add(component)
}

/**
 * Drop editor component from OCA.Text.editorComponents
 * @param {object} component - the editor component to remove from debug output
 */
export function removeFromDebugging(component) {
	editorComponents.delete(component)
}
