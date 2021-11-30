import BulletList from './../../src/nodes/BulletList'
import ListItem from './../../src/nodes/ListItem'
import Markdown from './../../src/extensions/Markdown';
import { findChildrenByType } from 'prosemirror-utils'
import createEditor from './../../src/tests/createEditor'

describe('ListItem extension integrated in the editor', () => {

	it('has attrs', () => {
		const editor = createEditor({
			content: '<p><ul><li>Test</li></ul></p>',
			extensions: [Markdown, BulletList, ListItem]
		})
		const li = findListItem(editor)
		expect(li.attrs).to.deep.eq({done: null, type: 0})
	})

	it('creates todo lists', () => {
		const editor = createEditor({
			content: '<p>Test</p>',
			extensions: [Markdown, BulletList, ListItem]
		})
		editor.chain().todo_item().run()
		const li = findListItem(editor)
		expect(li.attrs).to.deep.eq({done: false, type: 1})
	})

	it('removes the list when toggling todo off', () => {
		const editor = createEditor({
			content: '<p>Test</p>',
			extensions: [Markdown, BulletList, ListItem]
		})
		editor.chain().todo_item().run()
		editor.chain().todo_item().run()
		expect(findListItem(editor)).to.eq(undefined)
	})

	it('turns a bullet list into a todo list', () => {
		const editor = createEditor({
			content: '<p>Test</p>',
			extensions: [Markdown, BulletList, ListItem]
		})
		editor.chain().bulletListItem().run()
		editor.chain().todo_item().run()
		const li = findListItem(editor)
		expect(li.attrs).to.deep.eq({done: false, type: 1})
	})

	it('only toggles one list item', () => {
		const editor = createEditor({
			content: '<p><ul><li>Todo</li><li>Not to do</li></ul></p>',
			extensions: [Markdown, BulletList, ListItem]
		})
		editor.chain().todo_item().run()
		const todo = findListItem(editor, 0)
		const li = findListItem(editor, 1)
		expect(todo.attrs).to.deep.eq({done: false, type: 1})
		expect(li.attrs).to.deep.eq({done: null, type: 0})
	})

})

function findListItem(editor, index = 0) {
		const doc = editor.state.doc
		const type = editor.schema.nodes.listItem
		return findChildrenByType(doc, type)[index]?.node;
}
