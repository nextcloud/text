import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import underline from './underline.js'
import splitMixedLists from './splitMixedLists.js'
import callouts from './callouts.js'

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')
	.enable('table')
	.use(taskLists, { enable: true, labelAfter: true })
	.use(splitMixedLists)
	.use(underline)
	.use(callouts)

export default markdownit
