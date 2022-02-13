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
		loadMarkdown(`* todo\\_item`)
		runCommands()
		const li = findListItem()
		expect(li.attrs).to.deep.eq({done: false, type: 1})
		expectMarkdown(`* [ ] todo\\_item`)
	})

	it('removes the list when toggling todo off', () => {
		loadMarkdown(`* [ ] todo\\_item`)
		runCommands()
		expect(findListItem()).to.eq(undefined)
		expectMarkdown(`todo\\_item`)
	})

	it('creates a bullet list', () => {
		loadMarkdown(`bulletListItem`)
		runCommands()
		expectMarkdown(`* bulletListItem`)
	})

	it('only toggles one list item', () => {
		loadMarkdown(`* todo\\_item
			* Not to do`)
		runCommands()
		expectMarkdown(`* [ ] todo\\_item
			* Not to do`)
	})

	it('toggles two separate list item', () => {
		loadMarkdown(`* todo\\_item
			* Not to do
			* todo\\_item`)
		runCommands()
		expectMarkdown(`* [ ] todo\\_item
			* Not to do
			* [ ] todo\\_item`)
	})

	function loadMarkdown(markdown) {
		const stripped = markdown.replace(/\t*/g, '')
		editor.commands.setContent(markdownit.render(stripped))
	}

	function runCommands() {
		for (const { node, pos } of findCommands()) {
			const command = node.text
			editor.commands.setTextSelection(pos)
			editor.commands[command]()
		}
	}

	function findCommands() {
		const doc = editor.state.doc
		return findChildren(doc, child => {
			return child.isText && editor.commands.hasOwnProperty(child.text)
		})
	}

	function findListItem(index = 0) {
		const doc = editor.state.doc
		const type = editor.schema.nodes.listItem
		return findChildrenByType(doc, type)[index]?.node;
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
