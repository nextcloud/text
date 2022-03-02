import { TaskList, TaskItem } from './../../nodes'
import Markdown from './../../extensions/Markdown'
import { getExtensionField } from '@tiptap/core'
import createEditor from './../createEditor'

describe('TaskItem extension', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(TaskItem, 'toMarkdown', TaskItem)
		expect(typeof toMarkdown).toEqual('function')
	})

	it('exposes the toMarkdown function in the prosemirror schema', () => {
		const editor = createEditor({
			extensions: [Markdown, TaskList, TaskItem]
		})
		const taskItem = editor.schema.nodes.taskItem
		expect(taskItem.spec.toMarkdown).toBeDefined()
	})

})
