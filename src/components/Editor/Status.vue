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
		<div v-if="$isMobile" v-tooltip="lastSavedStatusTooltip" :class="saveStatusClass" />
		<div v-else
			v-tooltip="lastSavedStatusTooltip"
			class="save-status"
			:aria-label="t('text', 'Document save status')"
			:class="lastSavedStatusClass">
			{{ lastSavedStatus }}
		</div>
		<SessionList :sessions="sessions">
			<p slot="lastSaved" class="last-saved">
				{{ t('text', 'Last saved') }}: {{ lastSavedString }}
			</p>
			<GuestNameDialog v-if="$isPublic && !currentSession.userId" :session="currentSession" />
		</SessionList>
	</div>
</template>

<script>

import { ERROR_TYPE } from './../../services/SyncService.js'
import { Tooltip } from '@nextcloud/vue'
import {
	useIsMobileMixin,
	useIsPublicMixin,
} from '../Editor.provider.js'

export default {
	name: 'Status',

	components: {
		SessionList: () => import(/* webpackChunkName: "editor-collab" */'./SessionList.vue'),
		GuestNameDialog: () => import(/* webpackChunkName: "editor-guest" */'./GuestNameDialog.vue'),
	},

	directives: {
		Tooltip,
	},

	mixins: [useIsMobileMixin, useIsPublicMixin],

	props: {
		hasConnectionIssue: {
			type: Boolean,
			require: true,
		},
		dirty: {
			type: Boolean,
			require: true,
		},
		lastSavedString: {
			type: String,
			default: '',
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
				return this.$isMobile
					? t('text', 'Offline')
					: t('text', 'Offline, changes will be saved when online')
			}
			return this.dirtyStateIndicator ? t('text', 'Saving …') : t('text', 'Saved')
		},
		lastSavedStatusClass() {
			return this.syncError && this.lastSavedString !== '' ? 'error' : ''
		},
		dirtyStateIndicator() {
			return this.dirty || this.hasUnsavedChanges
		},
		lastSavedStatusTooltip() {
			let message = t('text', 'Last saved {lastSave}', { lastSave: this.lastSavedString })
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
				return 'save-error'
			}
			return this.dirtyStateIndicator ? 'saving-status' : 'saved-status'
		},
		currentSession() {
			return Object.values(this.sessions).find((session) => session.isCurrent)
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
		display: inline-flex;
		padding: 0;
		text-overflow: ellipsis;
		color: var(--color-text-lighter);
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
		padding: 0;
		text-overflow: ellipsis;
		color: var(--color-text-lighter);
		background-color: var(--color-main-background);
		width: 38px !important;
		height: 38px !important;
		z-index: 2;
	}

	.saved-status {
		border: 2px solid #04AA6D;
		border-radius: 50%;
	}

	.saving-status {
		border: 2px solid #f3f3f3;
		border-top: 2px solid #3498db;
		border-radius: 50%;
		animation: spin 2s linear infinite;
	}

	.last-saved {
		padding: 6px;
	}
</style>
