import Underline from './../../marks/Underline';
import { getExtensionField } from '@tiptap/core'
import createEditor from './../createEditor'

describe('Underline extension unit', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(Underline, 'toMarkdown', Underline)
		expect(toMarkdown).toEqual({
			open: '__',
			close: '__',
			mixable: true,
			expelEnclosingWhitespace: true,
		})
	})
})

describe('Underline extension integrated in the editor', () => {

	it('is not active by default', () => {
		const editor = createEditor({
			content: '<p>Test</p>',
			extensions: [Underline],
		})
		expect(editor.isActive('underline')).toBe(false)
	})

	it('is active within <u> tags', () => {
		const editor = createEditor({
			content: '<p><u>Test</u></p>',
			extensions: [Underline],
		})
		expect(editor.isActive('underline')).toBe(true)
	})

})
