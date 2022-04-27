import markdownit from '@nextcloud/text-editor/markdownit'
import { typesAvailable } from '@nextcloud/text-editor/markdownit/callouts'
import tableMarkdown from './fixtures/table.md'
import tableHtml from './fixtures/table.html'

describe('markdownit', () => {

	it('renders task lists', () => {
		const rendered = markdownit.render('* [ ] task\n* not a task')
		expect(stripIndent(rendered)).toBe(stripIndent(`
			<ul class="contains-task-list">
			<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> task</li>
			</ul>
			<ul>
			<li>not a task</li>
			</ul>`
			))
	})

	it('renders bullet and task lists separately', () => {
		const rendered = markdownit.render('* not a task\n* [ ] task')
		expect(stripIndent(rendered)).toBe(stripIndent(`
			<ul>
			<li>not a task</li>
			</ul>
			<ul class="contains-task-list">
			<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> task</li>
			</ul>
`))
	})

	it('renders tables', () => {
		const rendered = markdownit.render(tableMarkdown)
		expect(rendered).toBe(tableHtml)
	})

	describe('callouts', () => {
		typesAvailable.forEach((type) => {
			it(`render ${type}`, () => {
				const rendered = markdownit.render(`::: ${type}\nHey there!\n:::`)
				expect(stripIndent(rendered)).toBe(stripIndent(
					`<div data-callout="${type}" class="callout callout-${type}">
						<p>Hey there!</p>
					</div>`
				))
			})
		})
	})

})

function stripIndent(content) {
	return content
		.replace(/\n/g, "")
		.replace(/[\t ]+\</g, "<")
		.replace(/\>[\t ]+\</g, "><")
		.replace(/\>[\t ]+$/g, ">")
}
