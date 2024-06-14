<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcModal v-if="active" :name="fileName" @close="close">
		<Editor :file-id="fileId"
			:relative-path="relativePath"
			:active="active"
			:share-token="shareToken"
			:mime="mimeType" />
	</NcModal>
</template>

<script>
import { NcModal } from '@nextcloud/vue'

export default {
	name: 'PublicFilesEditor',
	components: {
		NcModal,
		Editor: () => import(/* webpackChunkName: "editor" */'./Editor.vue'),
	},
	props: {
		fileId: {
			type: Number,
			default: null,
		},
		relativePath: {
			type: String,
			default: null,
		},
		active: {
			type: Boolean,
			default: false,
		},
		shareToken: {
			type: String,
			default: null,
		},
		mimeType: {
			type: String,
			default: null,
		},
	},
	computed: {
		fileName() {
			return this.relativePath.substring(this.relativePath.lastIndexOf('/') + 1)
		},
	},
	methods: {
		close() {
			this.$emit('close')
		},
	},
}
</script>
