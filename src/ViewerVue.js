/**
 * @type {import('Vue').VueConstructor|null}
 */
let ViewerVue = null

/**
 * @param {import('Vue').VueConstructor} VueConstructor - Vue constructor from Viewer
 */
export const setViewerVue = (VueConstructor) => {
	ViewerVue = VueConstructor
}

/**
 * @return {import('Vue').VueConstructor|null}
 */
export const getViewerVue = () => ViewerVue
