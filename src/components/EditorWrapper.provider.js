export const EDITOR = Symbol('tiptap:editor')
export const useEditorMixin = {
	inject: {
		$editor: { from: EDITOR, default: null },
	},
}
