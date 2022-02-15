import markdownit from './../markdownit'

describe('markdownit', () => {

	it('renders task lists', () => {
		const rendered = markdownit.render('* [ ] task\n* not a task')
		expect(rendered).toBe(stripIndent(`
			<ul class="contains-task-list">
			<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> task</li>
			</ul>
			<ul>
			<li>not a task</li>
			</ul>
`))
	})

	it('renders bullet and task lists separately', () => {
		const rendered = markdownit.render('* not a task\n* [ ] task')
		expect(rendered).toBe(stripIndent(`
			<ul>
			<li>not a task</li>
			</ul>
			<ul class="contains-task-list">
			<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> task</li>
			</ul>
`))
	})

})

function stripIndent(content) {
	return content.replace(/\t/g, '').replace('\n','')
}
