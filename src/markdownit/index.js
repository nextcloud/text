import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')
	.use(taskLists, { enable: true, labelAfter: true })

export default markdownit
