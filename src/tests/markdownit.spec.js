import markdownit from './../markdownit'
import { typesAvailable } from '../markdownit/callouts'

describe('markdownit', () => {

	it('render image figures', () => {
		expect(markdownit.render('[![moon](moon.jpg)](/uri)\n')).toBe('<figure><a href=\"/uri\"><img src=\"moon.jpg\" alt=\"moon\" /></a></figure>\n')
	})

	it('renders task lists', () => {
		const rendered = markdownit.render('* [ ] task\n* not a task')
		expect(stripIndent(rendered)).toBe(stripIndent(`
			<ul class="contains-task-list" data-bullet="*">
			<li class="task-list-item "><input class="task-list-item-checkbox" type="checkbox" disabled="" id="task-item-0" />task</li>
			</ul>
			<ul data-bullet="*">
			<li>not a task</li>
			</ul>`
			))
	})

	it('exposes bullet list markup', () => {
		['*', '-'].forEach(bullet => {
			const rendered = markdownit.render(`${bullet} first\n${bullet} second`)
			expect(stripIndent(rendered)).toBe(stripIndent(`
				<ul data-bullet="${bullet}">
				<li>first</li>
				<li>second</li>
				</ul>`
			))
		})
	})

	it('renders bullet and task lists separately', () => {
		const rendered = markdownit.render('* not a task\n* [ ] task')
		expect(stripIndent(rendered)).toBe(stripIndent(`
			<ul data-bullet="*">
			<li>not a task</li>
			</ul>
			<ul class="contains-task-list" data-bullet="*">
			<li class="task-list-item "><input class="task-list-item-checkbox" type="checkbox" disabled="" id="task-item-1" />task</li>
			</ul>
`))
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
