<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="document-status" :class="{ mobile: isMobile }">
		<div class="status-wrapper">
			<SyncStatus :idle="idle"
				:sync-error="syncError"
				:has-connection-issue="hasConnectionIssue"
				:is-resolving-conflict="isResolvingConflict"
				@reconnect="$emit('reconnect')" />
			<NcNoteCard v-if="lock" type="info">
				<template #icon>
					<Lock :size="20" />
				</template>
				<p>
					{{ t('text', 'This file is opened read-only as it is currently locked by {user}.', { user: lock.displayName }) }}
				</p>
			</NcNoteCard>
		</div>
	</div>
</template>

<script>

import { NcNoteCard } from '@nextcloud/vue'
import Lock from 'vue-material-design-icons/Lock.vue'
import isMobile from '../../mixins/isMobile.js'
import SyncStatus from './DocumentStatus/SyncStatus.vue'

export default {
	name: 'DocumentStatus',

	components: {
		SyncStatus,
		NcNoteCard,
		Lock,
	},

	mixins: [isMobile],

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

}
</script>

<style scoped lang="scss">
	.document-status {
		position: absolute;
		bottom: var(--default-clickable-area);
		z-index: 100000;
		// max-height: 50px;
		margin: auto;
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.document-status.mobile {
		bottom: 0;
	}
	.status-wrapper {
		background-color: var(--color-main-background);
	}
</style>
