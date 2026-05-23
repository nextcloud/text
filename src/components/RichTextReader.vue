<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<BaseReader
		:content="content"
		@clickLink="(e, a) => $emit('click-link', e, a)" />
</template>

<script>
import BaseReader from './BaseReader.vue'
import { RichText } from './../extensions/index.js'

export default {
	name: 'RichTextReader',
	components: { BaseReader },

	provide: {
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
@use './../css/prosemirror';
@use './../css/print';
</style>
