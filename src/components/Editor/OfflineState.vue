<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="offline-state">
		<NcButton
			:title="label"
			:aria-label="label"
			:disabled="true"
			variant="tertiary"
			class="offline-button">
			<template #icon>
				<CloudOffIcon :size="20" />
			</template>
		</NcButton>
	</div>
</template>

<script>
import moment from '@nextcloud/moment'
import NcButton from '@nextcloud/vue/components/NcButton'
import CloudOffIcon from 'vue-material-design-icons/CloudOffOutline.vue'
import refreshMoment from '../../mixins/refreshMoment.js'

export default {
	name: 'OfflineState',

	components: {
		CloudOffIcon,
		NcButton,
	},

	mixins: [refreshMoment],

	props: {
		// 0 if there is a different connection issue than the browser being offline
		offlineSince: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		label() {
			if (this.offlineSince) {
				return t('text', 'Offline since {time}.', { time: this.offlineTime })
			}
			return t('text', 'Not connected to the cloud.')
		},
		offlineTime() {
			// Make this a dependent of refreshMoment, so it will be recomputed
			/* eslint-disable-next-line no-unused-expressions */
			this.refreshMoment
			return moment(this.offlineSince).fromNow()
		},
	},
}
</script>

<style scoped lang="scss">
.offline-state {
	height: var(--default-clickable-area);
	width: calc(var(--default-clickable-area) + 10px);
}

.offline-button {
	padding-inline: var(--default-grid-baseline);
	width: calc(var(--default-clickable-area) + 10px) !important;

	&.button-vue:disabled {
		opacity: unset;
		filter: unset;
	}
}
</style>
