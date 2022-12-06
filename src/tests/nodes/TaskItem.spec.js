import TaskList from './../../nodes/TaskList'
import TaskItem from './../../nodes/TaskItem'
import Markdown from './../../extensions/Markdown'
import { getExtensionField } from '@tiptap/core'
import { createCustomEditor, markdownThroughEditor, markdownThroughEditorHtml } from '../helpers'

describe('TaskItem extension', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(TaskItem, 'toMarkdown', TaskItem)
		expect(typeof toMarkdown).toEqual('function')
	})

	it('exposes the toMarkdown function in the prosemirror schema', () => {
		const editor = createCustomEditor({
			extensions: [Markdown, TaskList, TaskItem]
		})
		const taskItem = editor.schema.nodes.taskItem
		expect(taskItem.spec.toMarkdown).toBeDefined()
	})

})
