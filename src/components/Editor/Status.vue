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
	<div class="text-editor__session-list">
		<div v-tooltip="lastSavedStatusTooltip" class="save-status" :class="saveStatusClass">
			<SavingIndicator :saving="saveStatusClass === 'saving'"
				:error="saveStatusClass === 'error'" />
		</div>
	</div>
</template>

<script>

import SavingIndicator from '../SavingIndicator.vue'
import { ERROR_TYPE } from './../../services/SyncService.js'
import moment from '@nextcloud/moment'
import { Tooltip } from '@nextcloud/vue'
import {
	useIsMobileMixin,
	useIsPublicMixin,
} from '../Editor.provider.js'
import refreshMoment from '../../mixins/refreshMoment.js'

export default {
	name: 'Status',

	components: {
		SavingIndicator,
		SessionList: () => import(/* webpackChunkName: "editor-collab" */'./SessionList.vue'),
		GuestNameDialog: () => import(/* webpackChunkName: "editor-guest" */'./GuestNameDialog.vue'),
	},

	directives: {
		Tooltip,
	},

	mixins: [useIsMobileMixin, useIsPublicMixin, refreshMoment],

	props: {
		hasConnectionIssue: {
			type: Boolean,
			require: true,
		},
		dirty: {
			type: Boolean,
			require: true,
		},
		document: {
			type: Object,
			default: null,
		},
		syncError: {
			type: Object,
			default: null,
		},
		sessions: {
			type: Object,
			default: () => { return {} },
		},
	},

	computed: {
		lastSavedStatus() {
			if (this.hasConnectionIssue) {
				return t('text',
					this.$isMobile
						? 'Offline'
						: 'Offline, changes will be saved when online'
				)
			}
			return this.dirtyStateIndicator ? t('text', 'Saving …') : t('text', 'Saved')
		},
		dirtyStateIndicator() {
			return this.dirty || this.hasUnsavedChanges
		},
		lastSavedStatusTooltip() {
			let message = t('text', 'Last saved {lastSaved}', { lastSaved: this.lastSavedString })
			if (this.hasSyncCollission) {
				message = t('text', 'The document has been changed outside of the editor. The changes cannot be applied.')
			}
			if (this.dirty || this.hasUnsavedChanges) {
				message += ' - ' + t('text', 'Unsaved changes')
			}
			return { content: message, placement: 'bottom' }
		},

		hasUnsavedChanges() {
			return this.document && this.document.lastSavedVersion < this.document.currentVersion
		},
		hasSyncCollission() {
			return this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
		},
		saveStatusClass() {
			if (this.syncError && this.lastSavedString !== '') {
				return 'error'
			}
			return this.dirtyStateIndicator ? 'saving' : 'saved'
		},
		currentSession() {
			return Object.values(this.sessions).find((session) => session.isCurrent)
		},
		lastSavedString() {
			// Make this a dependent of refreshMoment so it will be recomputed
			/* eslint-disable-next-line no-unused-expressions */
			this.refreshMoment
			return moment(this.document.lastSavedVersionTime * 1000).fromNow()
		},
	},

}
</script>

<style scoped lang="scss">
	.text-editor__session-list {
		display: flex;

		input, div {
			vertical-align: middle;
			margin-left: 3px;
		}
	}

	.save-status {
		--color-text-white: white;
		display: inline-flex;
		padding: 0;
		text-overflow: ellipsis;
		color: var(--color-text-white);
		position: relative;
		top: 9px;
		min-width: 85px;
		max-height: 36px;

		&.error {
			background-color: var(--color-error);
			color: var(--color-main-background);
			border-radius: 3px;
		}
	}
</style>

<style lang="scss">
	.saved-status,.saving-status {
		display: inline-flex;
		justify-content: center;
		padding: 0;
		height: 44px;
		width: 44px;

		&:hover {
			background-color: var(--color-background-hover);
		}
	}

	.last-saved {
		padding: 6px;
	}
</style>
