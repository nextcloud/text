import BulletList from './../../src/nodes/BulletList'
import ListItem from './../../src/nodes/ListItem'
import Markdown from './../../src/extensions/Markdown'
import { createMarkdownSerializer } from './../../src/extensions/Markdown';
import { findChildren, findChildrenByType } from 'prosemirror-utils'
import createEditor from './../../src/tests/createEditor'

describe('ListItem extension integrated in the editor', () => {

	const editor = createEditor({
		content: '',
		extensions: [Markdown, BulletList, ListItem],
	})

	it('has attrs', () => {
		editor.commands.setContent('<p><ul><li>Test</li></ul></p>')
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: null, type: 0})
		expectMarkdown(`
			* Test`)
	})

	it('creates todo lists', () => {
		editor.commands.setContent('Test')
		editor.commands.todo_item()
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: false, type: 1})
		expectMarkdown(`* [ ] Test`)
	})

	it('removes the list when toggling todo off', () => {
		editor.commands.setContent('Test')
		editor.commands.todo_item()
		editor.commands.todo_item()
		expect(findListItem()).to.eq(undefined)
		expectMarkdown(`Test`)
	})

	it('creates a bullet list', () => {
		editor.commands.setContent('<p>Test</p>')
		editor.commands.bulletListItem()
		expectMarkdown(`* Test`)
	})

	it('turns a bullet list into a todo list', () => {
		editor.commands.setContent('<p>Test</p>')
		editor.commands.bulletListItem()
		editor.commands.todo_item()
		expectMarkdown(`* [ ] Test`)
	})

	it('only toggles one list item', () => {
		editor.commands.setContent('<p><ul><li>Todo</li><li>Not to do</li></ul></p>')
		for (const { pos } of findTexts('Todo')) {
			editor.commands.setTextSelection(pos)
			editor.commands.todo_item()
		}
		expectMarkdown(`
			* [ ] Todo
			* Not to do`)
	})

	it('toggles two separate list item', () => {
		editor.commands.setContent('<p><ul><li>Todo</li><li>Not to do</li><li>Todo</li></ul></p>')
		for (const { pos } of findTexts('Todo')) {
			editor.commands.setTextSelection(pos)
			editor.commands.todo_item()
		}
		expectMarkdown(`
			* [ ] Todo
			* Not to do
			* [ ] Todo`)
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

	function expectMarkdown(markdown) {
		expect(getMarkdown()).to.equal(markdown.replace(/\t*/g, ''))
	}

	function getMarkdown() {
		const serializer = createMarkdownSerializer(editor.schema)
		return serializer.serialize(editor.state.doc)
	}
})

