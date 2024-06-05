/**
 * SPDX-FileCopyrightText: 2024 Max <max@nextcloud.com>
 * SPDX-License-Identifier: @license AGPL-3.0-or-later
 *
 */

import { defaultMarkdownSerializer } from '@tiptap/pm/markdown'

export const extractNodesToMarkdown = (nodes) => {
	const defaultNodes = convertNames(defaultMarkdownSerializer.nodes)
	const nodesToMarkdown = extractToMarkdown(nodes)
	return { ...defaultNodes, ...nodesToMarkdown }
}

export const extractMarksToMarkdown = (marks) => {
	const defaultMarks = convertNames(defaultMarkdownSerializer.marks)
	const marksToMarkdown = extractToMarkdown(marks)
	return { ...defaultMarks, ...marksToMarkdown }
}

export const extractToPlaintext = (marks) => {
	const blankMark = { open: '', close: '', mixable: true, expelEnclosingWhitespace: true }
	const defaultMarks = convertNames(defaultMarkdownSerializer.marks)
	const markEntries = Object.entries({ ...defaultMarks, ...marks })
		.map(([name, _mark]) => [name, blankMark])
	return Object.fromEntries(markEntries)
}

const convertNames = (object) => {
	const convert = (name) => {
		return name.replace(/_(\w)/g, (_m, letter) => letter.toUpperCase())
	}
	return Object.fromEntries(
		Object.entries(object)
			.map(([name, value]) => [convert(name), value]),
	)
}

const extractToMarkdown = (nodesOrMarks) => {
	const nodeOrMarkEntries = Object
		.entries(nodesOrMarks)
		.map(([name, nodeOrMark]) => [name, nodeOrMark.spec.toMarkdown])
		.filter(([, toMarkdown]) => toMarkdown)

	return Object.fromEntries(nodeOrMarkEntries)
}
