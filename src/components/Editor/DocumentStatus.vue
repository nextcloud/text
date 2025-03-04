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
