import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import TaskList from './../../src/nodes/TaskList'
import TaskItem from './../../src/nodes/TaskItem'
import BulletList from './../../src/nodes/BulletList'
import Markdown from './../../src/extensions/Markdown'
import markdownit from './../../src/markdownit'
import { createMarkdownSerializer } from './../../src/extensions/Markdown';
import { findChildren, findChildrenByType } from 'prosemirror-utils'
import createEditor from './../../src/tests/createEditor'
import testData from '../fixtures/ListItem.md'

describe('ListItem extension integrated in the editor', () => {

	const editor = createEditor({
		content: '',
		extensions: [
			Markdown,
			BulletList,
			OrderedList,
			ListItem,
			TaskList,
			TaskItem,
		],
	})

	for (const spec of testData.split(/#+\s+/)){
		const [description, ...rest] = spec.split(/\n/)
		const [input, output] = rest.join('\n').split(/\n\n---\n\n/)
		if (!description) {
			continue
		}
		it(description, () => {
			expect(spec).to.include('\n')
			expect(input).to.be.ok
			expect(output).to.be.ok
			loadMarkdown(input)
			runCommands()
			expectMarkdown(output.replace(/\n*$/, ''))
		})
	}

	function loadMarkdown(markdown) {
		const stripped = markdown.replace(/\t*/g, '')
		editor.commands.setContent(markdownit.render(stripped))
	}

	function runCommands() {
		let found
		while (found = findCommand()) {
			const { node, pos } = found
			const name = node.text
			editor.commands.setTextSelection(pos)
			editor.commands[name]()
			editor.commands.insertContent('did ')
		}
	}

	function findCommand() {
		const doc = editor.state.doc
		return findChildren(doc, child => {
			return child.isText && editor.commands.hasOwnProperty(child.text)
		})[0]
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
