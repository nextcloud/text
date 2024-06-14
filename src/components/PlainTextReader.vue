<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<BaseReader :content="content" />
</template>

<script>
/* eslint-disable import/no-named-as-default */
import CodeBlock from '@tiptap/extension-code-block'
import escapeHtml from 'escape-html'
import BaseReader from './BaseReader.vue'
import { PlainText } from './../extensions/index.js'

export default {
	name: 'PlainTextReader',
	components: { BaseReader },

	provide: {
		renderHtml(content) {
			return '<pre>' + escapeHtml(content) + '</pre>'
		},
		extensions: () => [PlainText, CodeBlock],
	},

	props: {
		content: {
			type: String,
			required: true,
		},
	},

}
</script>
