export const EDITOR = Symbol('tiptap:editor')
export const SYNC_SERVICE = Symbol('sync:service')

export const useEditorMixin = {
	inject: {
		$editor: { from: EDITOR, default: null },
	},
}
export const useSyncServiceMixin = {
	inject: {
		$syncService: { from: SYNC_SERVICE, default: null },
	},
}
