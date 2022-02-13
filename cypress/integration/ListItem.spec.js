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
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: null, type: 0})
	})

	it('creates todo lists', () => {
		editor.commands.setContent('Test')
		editor.commands.todo_item()
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: false, type: 1})
	})

	it('removes the list when toggling todo off', () => {
		editor.commands.setContent('Test')
		editor.commands.todo_item()
		editor.commands.todo_item()
		expect(findListItem()).to.eq(undefined)
	})

	it('turns a bullet list into a todo list', () => {
		editor.commands.setContent('Test')
		editor.commands.bulletListItem()
		editor.commands.todo_item()
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: false, type: 1})
	})

	it('only toggles one list item', () => {
		editor.commands.setContent('<p><ul><li>Todo</li><li>Not to do</li></ul></p>')
		for (const { pos } of findTexts('Todo')) {
			editor.commands.setTextSelection(pos)
			editor.commands.todo_item()
		}
		const todo = findListItem(0)
		const li = findListItem(1)
		expect(todo.attrs).to.deep.eq({done: false, type: 1}, editor.getHTML())
		expect(li.attrs).to.deep.eq({done: null, type: 0}, editor.getHTML())
	})

	it('toggles two separate list item', () => {
		editor.commands.setContent('<p><ul><li>Todo</li><li>Not to do</li><li>Todo</li></ul></p>')
		for (const { pos } of findTexts('Todo')) {
			editor.commands.setTextSelection(pos)
			editor.commands.todo_item()
		}
		const todo = findListItem(0)
		const li = findListItem(1)
		const other_todo = findListItem(2)
		expect(todo.attrs).to.deep.eq({done: false, type: 1}, editor.getHTML())
		expect(li.attrs).to.deep.eq({done: null, type: 0}, editor.getHTML())
		expect(other_todo.attrs).to.deep.eq({done: false, type: 1}, editor.getHTML())
	})

	function findListItem(index = 0) {
			const doc = editor.state.doc
			const type = editor.schema.nodes.listItem
			return findChildrenByType(doc, type)[index]?.node;
	}

	function findTexts(text) {
			const doc = editor.state.doc
			return findChildren(doc, child => {
				return child.isText && child.text === text
			})
	}

})

