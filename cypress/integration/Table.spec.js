import Table from '@nextcloud/text-editor/nodes/Table'
import TableCell from '@nextcloud/text-editor/nodes/TableCell'
import TableHeader from '@nextcloud/text-editor/nodes/TableHeader'
import TableRow from '@nextcloud/text-editor/nodes/TableRow'
import TableHeadRow from '@nextcloud/text-editor/nodes/TableHeadRow'
import Markdown from '@nextcloud/text-editor/extensions/Markdown'
import markdownit from '@nextcloud/text-editor/markdownit'
import { createMarkdownSerializer } from '@nextcloud/text-editor/extensions/Markdown';
import { findChildren, findChildrenByType } from 'prosemirror-utils'
import createEditor from './../../src/tests/createEditor'
import testData from '../fixtures/Table.md'

describe('ListItem extension integrated in the editor', () => {

	const editor = createEditor({
		content: '',
		extensions: [
			Markdown,
			Table,
			TableCell,
			TableHeader,
			TableHeadRow,
			TableRow,
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
		editor.commands.setContent(markdownit.render(markdown))
	}

	function runCommands() {
		let found
		while (found = findCommand()) {
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

	function findCommand() {
		const doc = editor.state.doc
		return findChildren(doc, child => {
			return child.isText && editor.commands.hasOwnProperty(child.text)
		})[0]
	}

	function expectMarkdown(markdown) {
		expect(getMarkdown().replace(/\n$/, '')).to.equal(markdown)
	}

	function getMarkdown() {
		const serializer = createMarkdownSerializer(editor.schema)
		return serializer.serialize(editor.state.doc)
	}
})
