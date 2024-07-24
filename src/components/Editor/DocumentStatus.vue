<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="document-status">
		<NcNoteCard v-if="hasWarning" type="warning">
			<p v-if="isLoadingError">
				{{ syncError.data.data.error }}
				<!-- Display reload button on PRECONDITION_FAILED response type -->
				<a v-if="syncError.data.status === 412" class="button primary" @click="reload">{{ t('text', 'Reload') }}</a>
			</p>
			<p v-else-if="hasSyncCollission">
				{{ t('text', 'Document has been changed outside of the editor. The changes cannot be applied') }}
			</p>
			<p v-else-if="hasConnectionIssue">
				{{ t('text', 'Document could not be loaded. Please check your internet connection.') }}
				<a class="button primary" @click="reconnect">{{ t('text', 'Reconnect') }}</a>
			</p>
		</NcNoteCard>
		<NcNoteCard v-else-if="idle" type="info">
			<p>
				{{ t('text', 'Document idle for {timeout} minutes, click to continue editing', { timeout: IDLE_TIMEOUT }) }}
				<a class="button primary" @click="reconnect">{{ t('text', 'Reconnect') }}</a>
			</p>
		</NcNoteCard>
		<NcNoteCard v-if="lock" type="info">
			<template #icon>
				<Lock :size="20" />
			</template>
			<p>
				{{ t('text', 'This file is opened read-only as it is currently locked by {user}.', { user: lock.displayName }) }}
			</p>
		</NcNoteCard>

		<CollisionResolveDialog v-if="isResolvingConflict" :sync-error="syncError" />
	</div>
</template>

<script>

import { ERROR_TYPE, IDLE_TIMEOUT } from './../../services/SyncService.js'
import Lock from 'vue-material-design-icons/Lock.vue'
import { NcNoteCard } from '@nextcloud/vue'
import CollisionResolveDialog from '../CollisionResolveDialog.vue'

export default {
	name: 'DocumentStatus',

	components: {
		CollisionResolveDialog,
		Lock,
		NcNoteCard,
	},

	props: {
		idle: {
			type: Boolean,
			require: true,
		},
		lock: {
			type: Object,
			default: null,
		},
		syncError: {
			type: Object,
			default: null,
		},

		hasConnectionIssue: {
			type: Boolean,
			require: true,
		},
		isResolvingConflict: {
			type: Boolean,
			require: true,
		},
	},

	data() {
		return {
			IDLE_TIMEOUT,
		}
	},

	computed: {
		hasSyncCollission() {
			return this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
		},
		isLoadingError() {
			return this.syncError && this.syncError.type === ERROR_TYPE.LOAD_ERROR
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
		position: sticky;
		top: 16px;
		z-index: 100000;
		// max-height: 50px;
		max-width: var(--text-editor-max-width);
		margin: auto;
		background-color: var(--color-main-background);
	}
</style>
