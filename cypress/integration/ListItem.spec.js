import BulletList from './../../src/nodes/BulletList'
import ListItem from './../../src/nodes/ListItem'
import Markdown from './../../src/extensions/Markdown'
import markdownit from './../../src/markdownit'
import { createMarkdownSerializer } from './../../src/extensions/Markdown';
import { findChildren, findChildrenByType } from 'prosemirror-utils'
import createEditor from './../../src/tests/createEditor'
import testData from '../fixtures/ListItem.md'

describe('ListItem extension integrated in the editor', () => {

	const editor = createEditor({
		content: '',
		extensions: [Markdown, BulletList, ListItem],
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

	function expectMarkdown(markdown) {
		const stripped = markdown.replace(/\t*/g, '')
		expect(getMarkdown()).to.equal(stripped)
	}

	function getMarkdown() {
		const serializer = createMarkdownSerializer(editor.schema)
		return serializer.serialize(editor.state.doc)
	}
})
