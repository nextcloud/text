import BulletList from './../../src/nodes/BulletList'
import ListItem from './../../src/nodes/ListItem'
import Markdown from './../../src/extensions/Markdown';
import { findChildren, findChildrenByType } from 'prosemirror-utils'
import createEditor from './../../src/tests/createEditor'

describe('ListItem extension integrated in the editor', () => {

	const editor = createEditor({
		extensions: [Markdown, BulletList, ListItem]
	})

	it('has attrs', () => {
		editor.commands.setContent('<p><ul><li>Test</li></ul></p>')
		const li = findListItem(editor)
		expect(li.attrs).to.deep.eq({done: null, type: 0})
	})

	it('creates todo lists', () => {
		editor.commands.setContent('Test')
		editor.commands.todo_item()
		const li = findListItem(editor)
		expect(li.attrs).to.deep.eq({done: false, type: 1})
	})

	it('removes the list when toggling todo off', () => {
		editor.commands.setContent('Test')
		editor.commands.todo_item()
		editor.commands.todo_item()
		expect(findListItem(editor)).to.eq(undefined)
	})

	it('turns a bullet list into a todo list', () => {
		editor.commands.setContent('Test')
		editor.commands.bulletListItem()
		editor.commands.todo_item()
		const li = findListItem(editor)
		expect(li.attrs).to.deep.eq({done: false, type: 1})
	})

	it('only toggles one list item', () => {
		editor.commands.setContent('<p><ul><li>Todo</li><li>Not to do</li></ul></p>')
		const { pos } = findTexts(editor, 'Todo')[0]
		editor.commands.setTextSelection(pos)
		editor.commands.todo_item()
		const todo = findListItem(editor, 0)
		const li = findListItem(editor, 1)
		expect(todo.attrs).to.deep.eq({done: false, type: 1}, editor.getHTML())
		expect(li.attrs).to.deep.eq({done: null, type: 0}, editor.getHTML())
	})

})

function findListItem(editor, index = 0) {
		const doc = editor.state.doc
		const type = editor.schema.nodes.listItem
		return findChildrenByType(doc, type)[index]?.node;
}

function findTexts(editor, text) {
		const doc = editor.state.doc
		return findChildren(doc, child => {
			return child.isText && child.text === text
		})
}
