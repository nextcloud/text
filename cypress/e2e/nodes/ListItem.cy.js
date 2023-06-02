/* eslint-disable import/no-named-as-default */
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
/* eslint-enable import/no-named-as-default */
import TaskList from './../../../src/nodes/TaskList.js'
import TaskItem from './../../../src/nodes/TaskItem.js'
import BulletList from './../../../src/nodes/BulletList.js'
import Markdown, { createMarkdownSerializer } from './../../../src/extensions/Markdown.js'
import { findChildren } from './../../../src/helpers/prosemirrorUtils.js'
import { createCustomEditor } from './../../support/components.js'
import testData from '../../fixtures/ListItem.md'
import markdownit from './../../../src/markdownit/index.js'

describe('ListItem extension integrated in the editor', () => {

	const editor = createCustomEditor({
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
		const stripped = markdown.replace(/\t*/g, '')
		editor.commands.setContent(markdownit.render(stripped))
	}

	const runCommands = () => {
		let found
		while ((found = findCommand())) {
			const { node, pos } = found
			const name = node.text
			editor.commands.setTextSelection(pos)
			editor.commands[name]()
			editor.commands.insertContent('did ')
		}
	}

	const findCommand = () => {
		const doc = editor.state.doc
		return findChildren(doc, child => {
			return child.isText && Object.prototype.hasOwnProperty.call(editor.commands, child.text)
		})[0]
	}

	const expectMarkdown = (markdown) => {
		const stripped = markdown.replace(/\t*/g, '')
		expect(getMarkdown()).to.equal(stripped)
	}

	const getMarkdown = () => {
		const serializer = createMarkdownSerializer(editor.schema)
		return serializer.serialize(editor.state.doc)
	}
})
