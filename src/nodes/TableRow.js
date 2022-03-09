import { TableRow } from '@tiptap/extension-table-row'

export default TableRow.extend({
	content: 'tableCell*',
	addAttributes() {
		return {}
	},
})
