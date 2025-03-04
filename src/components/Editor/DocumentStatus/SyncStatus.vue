<!--
  - SPDX-FileCopyrightText: 2022-2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcNoteCard v-if="type" :type="type">
		<p v-if="message">
			{{ message }}
			<a v-if="button" class="button primary" @click="button.action">{{ button.text }}</a>
		</p>
	</NcNoteCard>
</template>

<script>

import { ERROR_TYPE, IDLE_TIMEOUT } from '../../../services/SyncService.js'
import { NcNoteCard } from '@nextcloud/vue'

const MESSAGES = {
	changedOutside: t('text', 'Document has been changed outside of the editor. The changes cannot be applied'),
	couldNotBeLoaded: t('text', 'Document could not be loaded. Please check your internet connection.'),
	idle: t('text', 'Document idle for {timeout} minutes, click to continue editing', { timeout: IDLE_TIMEOUT }),
}

export default {
	name: 'SyncStatus',

	components: {
		NcNoteCard,
	},

	props: {
		idle: {
			type: Boolean,
			default: false,
		},
		syncError: {
			type: Object,
			default: null,
		},
		hasConnectionIssue: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			IDLE_TIMEOUT,
		}
	},

	computed: {
		type() {
			return ( this.hasWarning && 'warning' ) || ( this.idle && 'info' )
		},
		message() {
			return (this.isLoadingError && this.syncError.data.data.error)
				|| (this.hasSyncCollission && MESSAGES.changedOutside)
				|| (this.hasConnectionIssue && MESSAGES.couldNotBeLoaded)
				|| (this.idle && MESSAGES.idle)
		},
		button() {
			// Display reload button on PRECONDITION_FAILED response
			if (this.isPreconditionFailed) {
				return {
					text: t('text', 'Reload'),
					action: this.reload
				}
			}
			if (this.hasConnectionIssue || this.idle ) {
				return {
					text: t('text', 'Reconnect'),
					action: this.reconnect
				}
			}
		},
		hasSyncCollission() {
			return this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
		},
		isLoadingError() {
			return this.syncError && this.syncError.type === ERROR_TYPE.LOAD_ERROR
		},
		isPreconditionFailed() {
			return this.isLoadingError && this.syncError.data.status === 412
		},
		hasWarning() {
			return this.syncError || this.hasConnectionIssue
		},
	},

	methods: {
		reconnect() {
			this.$emit('reconnect')
		},
		reload() {
			window.location.reload()
		},
	},

}

</script>

<style scoped lang="scss">
	.document-status {
		.notecard {
			margin-bottom: 0;
		}
	}
	.document-status.mobile {
		.notecard {
			border-radius: 0;
		}
	}
</style>
