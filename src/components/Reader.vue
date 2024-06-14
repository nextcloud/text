<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<RichTextReader v-if="isRichEditor"
		:content="content" />
	<PlainTextReader v-else
		:content="content" />
</template>

<script>
import PlainTextReader from './PlainTextReader.vue'
import RichTextReader from './RichTextReader.vue'

export default {
	name: 'Reader',
	components: { PlainTextReader, RichTextReader },
	props: {
		content: {
			type: String,
			required: true,
		},
		isRichEditor: {
			type: Boolean,
			default: true,
		},
	},
}
</script>

<style lang="scss">

	#read-only-editor {
		overflow: scroll;
	}

	.thumbnailContainer #read-only-editor  {
		width: 100%;

		.ProseMirror {
			height: auto;
			margin: 0 0 0 0;
			padding: 0;
		}
	}

</style>
