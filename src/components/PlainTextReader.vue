<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<BaseReader :content="content" />
</template>

<script>
import escapeHtml from 'escape-html'
import { PlainText } from './../extensions/index.js'
import BaseReader from './BaseReader.vue'

export default {
	name: 'PlainTextReader',
	components: { BaseReader },

	provide: {
		renderHtml(content) {
			return '<pre>' + escapeHtml(content) + '</pre>'
		},
		extensions: () => [PlainText],
	},

	props: {
		content: {
			type: String,
			required: true,
		},
	},
}
</script>
