<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcModal v-if="active" :name="fileName" @close="close">
		<EditorReloader
			:fileId
			:relativePath
			:active
			:shareToken
			autofocus
			:mime="mimeType" />
	</NcModal>
</template>

<script>
import NcModal from '@nextcloud/vue/components/NcModal'

export default {
	name: 'PublicFilesEditor',
	components: {
		NcModal,
		EditorReloader: () => import('./EditorReloader.vue'),
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

	emits: ['close'],

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
