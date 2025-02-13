<!--
  - @copyright Copyright (c) 2022 Max <max@nextcloud.com>
  -
  - @author Max <max@nextcloud.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
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
	</div>
</template>

<script>

import { ERROR_TYPE, IDLE_TIMEOUT } from './../../services/SyncService.js'
import Lock from 'vue-material-design-icons/Lock.vue'
import { NcNoteCard } from '@nextcloud/vue'

export default {
	name: 'DocumentStatus',

	components: {
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
		position: absolute;
		bottom: var(--default-clickable-area);
		z-index: 100000;
		// max-height: 50px;
		margin: auto;
		background-color: var(--color-main-background);
		display: flex;
		width: 100%;
		justify-content: center;
	}
</style>
