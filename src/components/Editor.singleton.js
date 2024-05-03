/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Get instance of Editor component
 * Using singleton approach here to avoid duplicate yjs import error
 * @return {Promise<*>}
 */
export default async function getEditorInstance() {
	if (!window._nc_text_editor_instance) {
		if (window._nc_text_editor_importing) {
			return await new Promise((resolve) => {
				const intervalId = setInterval(() => {
					if (!window._nc_text_editor_instance) {
						return
					}
					resolve(window._nc_text_editor_instance)
					clearInterval(intervalId)
				}, 200)
			})
		} else {
			window._nc_text_editor_importing = true
		}
		const Editor = await import(/* webpackChunkName: "editor" */'./Editor.vue')
		const { default: Vue } = await import('vue')
		Vue.prototype.t = window.t
		Vue.prototype.OCA = window.OCA
		const EditorConstructor = Vue.extend(Editor.default)
		window._nc_text_editor_instance = EditorConstructor
	}
	return window._nc_text_editor_instance
}
