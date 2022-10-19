import MarkdownIt from 'markdown-it'
import taskLists from '@hedgedoc/markdown-it-task-lists'
import markdownitMentions from '@quartzy/markdown-it-mentions'
import underline from './underline.js'
import splitMixedLists from './splitMixedLists.js'
import callouts from './callouts.js'
import keepSyntax from './keepSyntax.js'
import implicitFigures from 'markdown-it-image-figures'

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')
	.enable('table')
	.use(taskLists, { enable: true, labelAfter: true })
	.use(splitMixedLists)
	.use(underline)
	.use(callouts)
	.use(keepSyntax)
	.use(markdownitMentions)
	.use(implicitFigures)

// Issue #3370: To preserve softbreaks within md files we preserve all whitespaces, so we must not introduce additional new lines after a <br> element
markdownit.renderer.rules.hardbreak = (tokens, idx, options) => (options.xhtmlOut ? '<br />' : '<br>')

export default markdownit
