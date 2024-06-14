/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable import/no-named-as-default */
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
/* eslint-enable import/no-named-as-default */
import TaskList from './../../../src/nodes/TaskList.js'
import TaskItem from './../../../src/nodes/TaskItem.js'
import BulletList from './../../../src/nodes/BulletList.js'
import Markdown from './../../../src/extensions/Markdown.js'
import { createCustomEditor } from './../../support/components.js'
import { loadMarkdown, runCommands, expectMarkdown } from './helpers.js'

// https://github.com/import-js/eslint-plugin-import/issues/1739
/* eslint-disable-next-line import/no-unresolved */
import testData from '../../fixtures/ListItem.md?raw'

describe('ListItem extension integrated in the editor', () => {

	const editor = createCustomEditor({
		content: '',
		extensions: [
			Markdown,
			BulletList,
			OrderedList,
			ListItem,
			TaskList,
			TaskItem,
		],
	})

	for (const spec of testData.split(/#+\s+/)) {
		const [description, ...rest] = spec.split(/\n/)
		const [input, output] = rest.join('\n').split(/\n\n---\n\n/)
		if (!description) {
			continue
		}
		it(description, () => {
			expect(spec).to.include('\n')
			/* eslint-disable no-unused-expressions */
			expect(input).to.be.ok
			expect(output).to.be.ok
			/* eslint-enable no-unused-expressions */
			loadMarkdown(editor, input)
			runCommands(editor)
			expectMarkdown(editor, output.replace(/\n*$/, ''))
		})
	}
})
