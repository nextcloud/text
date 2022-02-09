import { BulletList, ListItem } from './../../nodes'
import Markdown from './../../extensions/Markdown'
import { getExtensionField } from '@tiptap/core'
import createEditor from './../createEditor'

describe('ListItem extension', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(ListItem, 'toMarkdown', ListItem)
		expect(typeof toMarkdown).toEqual('function')
	})

	it('exposes the toMarkdown function in the prosemirror schema', () => {
		const editor = createEditor({
			extensions: [Markdown, BulletList, ListItem]
		})
		const listItem = editor.schema.nodes.listItem
		expect(listItem.spec.toMarkdown).toBeDefined()
	})

})
