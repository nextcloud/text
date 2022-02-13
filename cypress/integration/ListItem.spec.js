import BulletList from './../../src/nodes/BulletList'
import ListItem from './../../src/nodes/ListItem'
import Markdown from './../../src/extensions/Markdown'
import markdownit from './../../src/markdownit'
import { createMarkdownSerializer } from './../../src/extensions/Markdown';
import { findChildren, findChildrenByType } from 'prosemirror-utils'
import createEditor from './../../src/tests/createEditor'

describe('ListItem extension integrated in the editor', () => {

	const editor = createEditor({
		content: '',
		extensions: [Markdown, BulletList, ListItem],
	})

	it('has attrs', () => {
		loadMarkdown(`* Test`)
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: null, type: 0},)
		expectMarkdown(`* Test`)
	})

	it('creates todo lists', () => {
		loadMarkdown(`Test`)
		editor.commands.todo_item()
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: false, type: 1})
		expectMarkdown(`* [ ] Test`)
	})

	it('removes the list when toggling todo off', () => {
		loadMarkdown(`Test`)
		editor.commands.todo_item()
		editor.commands.todo_item()
		expect(findListItem()).to.eq(undefined)
		expectMarkdown(`Test`)
	})

	it('creates a bullet list', () => {
		loadMarkdown(`Test`)
		editor.commands.bulletListItem()
		expectMarkdown(`* Test`)
	})

	it('only toggles one list item', () => {
		loadMarkdown(`* Todo
			* Not to do`)
		for (const { pos } of findTexts('Todo')) {
			editor.commands.setTextSelection(pos)
			editor.commands.todo_item()
		}
		expectMarkdown(`* [ ] Todo
			* Not to do`)
	})

	it('toggles two separate list item', () => {
		loadMarkdown(`* Todo
			* Not to do
			* Todo`)
		for (const { pos } of findTexts('Todo')) {
			editor.commands.setTextSelection(pos)
			editor.commands.todo_item()
		}
		expectMarkdown(`* [ ] Todo
			* Not to do
			* [ ] Todo`)
	})

	function loadMarkdown(markdown) {
		const stripped = markdown.replace(/\t*/g, '')
		editor.commands.setContent(markdownit.render(stripped))
	}

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
		const stripped = markdown.replace(/\t*/g, '')
		expect(getMarkdown()).to.equal(stripped)
	}

	function getMarkdown() {
		const serializer = createMarkdownSerializer(editor.schema)
		return serializer.serialize(editor.state.doc)
	}
})

