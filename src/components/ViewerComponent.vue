<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<EditorReloader
		v-if="!useSourceView"
		:fileId="fileid"
		:relativePath="filename"
		:active="active || isEmbedded"
		:autofocus
		:shareToken
		:class="{ 'text-editor--embedding': isEmbedded }"
		:mime />
	<SourceView
		v-else
		:fileid
		:filename
		:isEncrypted
		:mime
		:source
		v-bind="$attrs"
		@loaded="onLoaded"
		@edit="toggleEdit" />
</template>

<script>
import { getSharingToken } from '@nextcloud/sharing/public'
import { defineComponent } from 'vue'
import EditorReloader from './EditorReloader.vue'
import SourceView from './SourceView.vue'

export default defineComponent({
	name: 'ViewerComponent',
	components: {
		SourceView,
		EditorReloader,
	},

	provide() {
		return {
			isEmbedded: this.isEmbedded,
		}
	},

	inheritAttrs: false,
	props: {
		filename: {
			type: String,
			default: null,
		},

		fileid: {
			type: Number,
			default: null,
		},

		active: {
			type: Boolean,
			default: false,
		},

		autofocus: {
			type: Boolean,
			// This is a public interface for Viewer we cannot change for now.
			// eslint-disable-next-line vue/no-boolean-default
			default: true,
		},

		shareToken: {
			type: String,
			default: () => getSharingToken(),
		},

		mime: {
			type: String,
			default: null,
		},

		source: {
			type: String,
			default: undefined,
		},

		isEmbedded: {
			type: Boolean,
			default: false,
		},

		onLoadedHandler: {
			type: Function,
			default: () => {},
		},
	},

	emits: ['update:loaded'],

	data() {
		return {
			hasToggledInteractiveEmbedding: false,
		}
	},

	computed: {
		/** @return {boolean} */
		useSourceView() {
			return (
				this.source
				&& (this.fileVersion
					|| !this.fileid
					|| this.isEmbedded
					|| this.isEncrypted)
				&& !this.hasToggledInteractiveEmbedding
			)
		},

		isEncrypted() {
			return this.$attrs.e2EeIsEncrypted || false
		},
	},

	mounted() {
		if (!this.useSourceView) {
			this.onLoaded()
		}
	},

	methods: {
		async onLoaded() {
			this.$emit('update:loaded', true)
			this.onLoadedHandler()
		},

		toggleEdit() {
			this.hasToggledInteractiveEmbedding = true
		},

		t,
	},
})
</script>

<style lang="scss" scoped>
.text-editor:not(.viewer__file--hidden) {
	top: 0;
	width: 100%;
	max-width: 100%;
	height: 100%;
	left: 0;
	margin: 0 auto;
	position: relative;
	background-color: var(--color-main-background);

	&.text-editor--embedding {
		min-height: 400px;
	}
}
</style>

<style lang="scss">
@media only screen and (max-width: 512px) {
	// on mobile, modal-container has top: 50px
	.text-editor {
		top: auto;
	}
}

body .toastify.dialogs {
	// Move the dialogs below the toolbar / status
	margin-top: calc(45px + var(--default-clickable-area));
}

.viewer[data-handler='text'] .modal-wrapper .modal-container {
	bottom: 0;
}
</style>
