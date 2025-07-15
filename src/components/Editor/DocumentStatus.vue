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
				@reconnect="$emit('reconnect')" />
			<NcNoteCard v-if="lock" type="info" :text="lockText">
				<template #icon>
					<Lock :size="20" />
				</template>
			</NcNoteCard>
		</div>
	</div>
</template>

<script>

import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import Lock from 'vue-material-design-icons/Lock.vue'
import isMobile from '../../mixins/isMobile.js'
import SyncStatus from './DocumentStatus/SyncStatus.vue'
import { t } from '@nextcloud/l10n'

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
	},

	computed: {
		lockText() {
			return t(
				'text',
				'This file is opened read-only as it is currently locked by {user}.',
				{ user: this.lock.displayName },
			)
		},
	},
}
</script>

<style scoped lang="scss">
	.document-status {
		position: sticky;
		bottom: calc(var(--default-grid-baseline) * 2);
		z-index: 100000;
		// max-height: 50px;
		margin-inline: auto;
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
