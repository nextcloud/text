import MarkdownIt from 'markdown-it'
import taskLists from '@hedgedoc/markdown-it-task-lists'
import markdownitMentions from '@quartzy/markdown-it-mentions'
import underline from './underline.js'
import splitMixedLists from './splitMixedLists.js'
import callouts from './callouts.js'
import keepSyntax from './keepSyntax.js'

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')
	.enable('table')
	.use(taskLists, { enable: true, labelAfter: true })
	.use(splitMixedLists)
	.use(underline)
	.use(callouts)
	.use(keepSyntax)
	.use(markdownitMentions)

export default markdownit
