<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<BaseReader :content="content" />
</template>

<script>
import { PlainText } from './../extensions/index.js'
import BaseReader from './BaseReader.vue'

export default {
	name: 'PlainTextReader',
	components: { BaseReader },

	provide: {
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
