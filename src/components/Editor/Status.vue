<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="text-editor__session-list">
		<div
			:title="lastSavedStatusTooltip"
			class="save-status"
			:class="saveStatusClass">
			<NcButton
				variant="tertiary"
				:aria-label="t('text', 'Save document')"
				@click="onClickSave">
				<template #icon>
					<NcSavingIndicatorIcon
						:saving="saveStatusClass === 'saving'"
						:error="saveStatusClass === 'error'" />
				</template>
			</NcButton>
		</div>
		<SessionList v-if="networkOnline && !hasConnectionIssue">
			<p slot="lastSaved" class="last-saved">
				{{ t('text', 'Last saved') }}: {{ lastSavedString }}
			</p>
		</SessionList>
		<OfflineState v-else :offline-since="offlineSince" />
	</div>
</template>

<script>
import { t } from '@nextcloud/l10n'
import moment from '@nextcloud/moment'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcSavingIndicatorIcon from '@nextcloud/vue/components/NcSavingIndicatorIcon'
import { useNetworkState } from '../../composables/useNetworkState.ts'
import { useSaveService } from '../../composables/useSaveService.ts'
import refreshMoment from '../../mixins/refreshMoment.js'
import { ERROR_TYPE } from '../../services/SyncService.ts'
import { useIsMobileMixin } from '../Editor.provider.ts'
import OfflineState from './OfflineState.vue'

export default {
	name: 'Status',

	components: {
		NcButton,
		NcSavingIndicatorIcon,
		OfflineState,
		SessionList: () => import('./SessionList.vue'),
	},

	mixins: [useIsMobileMixin, refreshMoment],

	props: {
		hasConnectionIssue: {
			type: Boolean,
			required: true,
		},
		dirty: {
			type: Boolean,
			required: true,
		},
		document: {
			type: Object,
			default: null,
		},
		syncError: {
			type: Object,
			default: null,
		},
	},

	setup() {
		const { networkOnline, offlineSince } = useNetworkState()
		const { saveService } = useSaveService()
		return { networkOnline, offlineSince, saveService }
	},

	computed: {
		lastSavedStatus() {
			if (this.hasConnectionIssue) {
				return this.$isMobile
					? t('text', 'Offline')
					: t('text', 'Offline, changes will be saved when online')
			}
			return this.dirtyStateIndicator
				? t('text', 'Saving …')
				: t('text', 'Saved')
		},
		dirtyStateIndicator() {
			return this.dirty
		},
		lastSavedStatusTooltip() {
			let message = t('text', 'Last saved {lastSave}', {
				lastSave: this.lastSavedString,
			})
			if (this.hasSyncCollission) {
				message = t(
					'text',
					'The document has been changed outside of the editor. The changes cannot be applied.',
				)
			}
			if (this.dirty) {
				message += ' - ' + t('text', 'Unsaved changes')
			}
			return message
		},

		hasSyncCollission() {
			return (
				this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
			)
		},
		saveStatusClass() {
			if (
				(this.dirtyStateIndicator && !this.networkOnline)
				|| (this.syncError && this.lastSavedString !== '')
			) {
				return 'error'
			}
			return this.dirtyStateIndicator ? 'saving' : 'saved'
		},
		lastSavedString() {
			// Make this a dependent of refreshMoment, so it will be recomputed
			/* eslint-disable-next-line no-unused-expressions */
			this.refreshMoment
			const timestamp = this.document?.lastSavedVersionTime
			return timestamp ? moment(timestamp * 1000).fromNow() : ''
		},
	},

	methods: {
		onClickSave() {
			if (this.dirtyStateIndicator) {
				this.saveService.forceSave()
			}
		},
		t,
	},
}
</script>

<style scoped lang="scss">
.text-editor__session-list {
	display: flex;

	input,
	div {
		vertical-align: middle;
		margin-left: 3px;
	}
}

.save-status {
	border-radius: 50%;
	color: var(--color-text-lighter);
	display: inline-flex;
	justify-content: center;
	padding: 0;
	height: var(--default-clickable-area);
	width: var(--default-clickable-area);

	&:hover {
		background-color: var(--color-background-hover);
	}
}

.last-saved {
	padding: 6px;
}
</style>
