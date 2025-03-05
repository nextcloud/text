<!--
  - SPDX-FileCopyrightText: 2022-2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcNoteCard v-if="hasWarning || idle" :type="card.type || 'warning'">
		<p v-if="card.message">
			{{ card.message }}
			<a v-if="card.action" class="button primary" @click="card.action">{{ card.actionLabel }}</a>
		</p>
	</NcNoteCard>
</template>

<script>

import { ERROR_TYPE, IDLE_TIMEOUT } from '../../../services/SyncService.js'
import { NcNoteCard } from '@nextcloud/vue'

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
		card() {
			if (this.isLoadingError) {
				return {
					message: this.syncError.data.data.error,
					action: this.isPreconditionFailed ? this.reload : false,
					actionLabel: t('text', 'Reload'),
				}
			}
			if (this.hasSyncCollission) {
				return {
					message: t('text', 'Document has been changed outside of the editor. The changes cannot be applied'),
				}
			}
			if (this.hasConnectionIssue) {
				return {
					message: t('text', 'Document could not be loaded. Please check your internet connection.'),
					action: this.reconnect,
					actionLabel: t('text', 'Reconnect'),
				}
			}
			if (this.idle) {
				return {
					type: 'info',
					message: t('text', 'Document idle for {timeout} minutes, click to continue editing', { timeout: IDLE_TIMEOUT }),
					action: this.reconnect,
					actionLabel: t('text', 'Reconnect'),
				}
			}
			return {}
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
