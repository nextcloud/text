import { findChildren } from 'prosemirror-utils'
import markdownit from './../../src/markdownit/index.js'
import testData from '../fixtures/Table.md'
import createEditor from './../../src/tests/createEditor.js'
import EditableTable from './../../src/nodes/EditableTable.js'
import Markdown, { createMarkdownSerializer } from './../../src/extensions/Markdown.js'

describe('ListItem extension integrated in the editor', () => {

	const editor = createEditor({
		content: '',
		extensions: [
			Markdown,
			EditableTable,
		],
	})

	for (const spec of testData.split(/#+\s+/)) {
		const [description, ...rest] = spec.split(/\n/)
		const [input, output] = rest.join('\n').split(/\n\n---\n\n/)
		if (!description) {
			continue
		}
		it(description, () => {
			expect(spec).to.include('\n')
			/* eslint-disable no-unused-expressions */
			expect(input).to.be.ok
			expect(output).to.be.ok
			/* eslint-enable no-unused-expressions */
			loadMarkdown(input)
			runCommands()
			expectMarkdown(output.replace(/\n*$/, ''))
		})
	}

	const loadMarkdown = (markdown) => {
		editor.commands.setContent(markdownit.render(markdown))
	}

	const runCommands = () => {
		let found
		while ((found = findCommand())) {
			const name = found.node.text
			editor.commands.setTextSelection(found.pos)
			editor.commands[name]()
			const updated = findCommand()
			if (updated) {
				editor.commands.setTextSelection(updated.pos)
				editor.commands.insertContent('did ')
			}
		}
	}

	const findCommand = () => {
		const doc = editor.state.doc
		return findChildren(doc, child => {
			return child.isText && Object.prototype.hasOwnProperty.call(editor.commands, child.text)
		})[0]
	}

	const expectMarkdown = (markdown) => {
		expect(getMarkdown().replace(/\n$/, '')).to.equal(markdown)
	}

	const getMarkdown = () => {
		const serializer = createMarkdownSerializer(editor.schema)
		return serializer.serialize(editor.state.doc)
	}
})
