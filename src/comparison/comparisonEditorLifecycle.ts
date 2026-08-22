/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { EditorState, Plugin } from '@tiptap/pm/state'
import type { Editor } from '@tiptap/vue-3'

const INITIALIZATION_ERROR = 'Comparison editor plugin initialization failed'
const stateOnlyEditors = new WeakSet<Editor>()

/**
 * Register one comparison editor created without a view.
 *
 * @param editor State-only comparison editor
 */
export function registerStateOnlyComparisonEditor(editor: Editor) {
	if (editor.options.element !== null || editor.contentComponent !== null || editor.appContext !== null) {
		throw new Error(INITIALIZATION_ERROR)
	}
	stateOnlyEditors.add(editor)
}

/**
 * Register one comparison plugin against the live mounted state.
 *
 * @param editor Mounted comparison editor
 * @param plugin Comparison plugin
 */
export function registerMountedPlugin(editor: Editor, plugin: Plugin): EditorState {
	const previousPlugins = new Set(editor.view.state.plugins)
	let nextState: EditorState
	try {
		nextState = editor.registerPlugin(plugin, (newPlugin) => [
			...editor.view.state.plugins.filter((item) => item.spec.key !== newPlugin.spec.key),
			newPlugin,
		])
	} catch (error) {
		throw new Error(INITIALIZATION_ERROR, { cause: error })
	}
	if ([...previousPlugins].some((item) => !nextState.plugins.includes(item))
		|| nextState.plugins.filter((item) => item === plugin).length !== 1
		|| nextState !== editor.view.state
		|| editor.state !== nextState) {
		throw new Error(INITIALIZATION_ERROR)
	}
	return nextState
}

/**
 * Consume the one-shot state-only registration before the visible mount.
 *
 * @param editor State-only comparison editor
 */
export function consumeStateOnlyComparisonEditor(editor: Editor) {
	if (!stateOnlyEditors.delete(editor)) {
		throw new Error(INITIALIZATION_ERROR)
	}
}
