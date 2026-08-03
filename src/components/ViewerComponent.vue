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

	data() {
		return {
			hasToggledInteractiveEmbedding: false,
			isLoaded: false,
		}
	},

	computed: {
		/** @return {boolean} */
		useSourceView() {
			return (
				this.source
				&& (!this.fileid
					|| this.isEmbedded
					|| this.isEncrypted)
				&& !this.hasToggledInteractiveEmbedding
			)
		},

		isEncrypted() {
			return this.$attrs.e2EeIsEncrypted || false
		},
	},

	watch: {
		/**
		 * Watch for active prop changes to handle the preloading race condition.
		 *
		 * The Viewer preloads adjacent files (next/prev) for faster navigation.
		 * When a component finishes loading while in "preloaded" state (not yet active),
		 * it emits 'update:loaded', but the Viewer isn't listening yet because the
		 * component isn't active. When the user navigates to that file and it becomes
		 * active, the Viewer is still showing the spinner waiting for the event.
		 *
		 * This watcher re-emits 'update:loaded' when transitioning from inactive to active
		 * if the content has already loaded.
		 */
		active: {
			handler(newVal, oldVal) {
				if (newVal === true && oldVal === false && this.isLoaded) {
					this.onLoaded()
				}
			},
			immediate: false,
		},
	},

	mounted() {
		if (!this.useSourceView) {
			this.onLoaded()
		}
	},

	methods: {
		async onLoaded() {
			this.isLoaded = true
			// Only emit if already active to handle preloading race condition.
			// If not active yet, the active watcher will call this when it becomes active.
			if (this.active) {
				this.onLoadedHandler()
			}
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
