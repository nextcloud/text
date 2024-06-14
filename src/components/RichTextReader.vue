<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<BaseReader :content="content" @click-link="(e, a) => $emit('click-link', e, a)" />
</template>

<script>
import BaseReader from './BaseReader.vue'
import { RichText } from './../extensions/index.js'
import markdownit from './../markdownit/index.js'

export default {
	name: 'RichTextReader',
	components: { BaseReader },

	provide: {
		renderHtml(content) {
			return markdownit.render(content)
		},
		extensions() {
			return [
				RichText.configure({
					editing: false,
				}),
			]
		},
	},

	props: {
		content: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss">
	@import './../css/prosemirror';
	@import './../css/print';
</style>
