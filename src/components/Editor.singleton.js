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
		window._nc_text_editor_instance = Editor.default
	}
	return window._nc_text_editor_instance
}
