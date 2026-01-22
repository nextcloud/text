<!--
  - SPDX-FileCopyrightText: 2022-2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcNoteCard v-if="hasWarning || idle" :type="card.type || 'warning'">
		<div v-if="card.message" class="notecard-content">
			<div>
				{{ card.message }}
			</div>
			<NcButton
				v-if="card.action"
				variant="primary"
				class="notecard-button"
				@click="card.action">
				{{ card.actionLabel }}
			</NcButton>
		</div>
	</NcNoteCard>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import { ERROR_TYPE } from '../../../services/SyncService.ts'

export default {
	name: 'SyncStatus',

	components: {
		NcButton,
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
					message: t(
						'text',
						'The file was overwritten. Your current changes cannot be auto-saved. Please choose how to proceed.',
					),
				}
			}
			if (this.hasConnectionIssue) {
				return {
					message: t(
						'text',
						'The document could not be loaded. Please check your internet connection.',
					),
					action: this.reconnect,
					actionLabel: t('text', 'Reconnect'),
				}
			}
			if (this.idle) {
				return {
					type: 'info',
					message: t('text', "You've been disconnected from the server."),
					action: this.reconnect,
					actionLabel: t('text', 'Reconnect'),
				}
			}
			return {}
		},
		hasSyncCollission() {
			return (
				this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
			)
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
		padding-block: 0;
	}

	.notecard-content {
		display: flex;
		align-items: center;
		gap: var(--default-grid-baseline);
	}

	.notecard-button {
		min-width: fit-content;
	}
}

.document-status.mobile {
	.notecard {
		border-radius: 0;
		margin-block: 0;
	}
}
</style>
