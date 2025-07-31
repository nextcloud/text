<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<form
		:title="t('text', 'Enter your name so other people can see who is editing')"
		class="guest-name-dialog"
		@submit.prevent="setGuestName()">
		<label>
			<AvatarWrapper :client="client" :size="32" />
		</label>
		<input
			v-model="guestNameEntry"
			type="text"
			:aria-label="t('text', 'Edit guest name')"
			:placeholder="t('text', 'Guest')" />
		<input
			type="submit"
			class="icon-confirm"
			:aria-label="t('text', 'Save guest name')"
			value="" />
	</form>
</template>

<script>
import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import AvatarWrapper from './AvatarWrapper.vue'

export default {
	name: 'GuestNameDialog',
	components: {
		AvatarWrapper,
	},
	props: {
		client: {
			type: Object,
			required: true,
		},
		guestName: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			guestNameEntry: this.guestName,
		}
	},
	computed: {
		avatarUrl() {
			const size = 32
			const avatarUrl = generateUrl('/avatar/guest/{user}/{size}', {
				user: this.guestName,
				size,
			})
			return window.location.protocol + '//' + window.location.host + avatarUrl
		},
	},
	methods: {
		setGuestName() {
			this.$emit('set-guest-name', this.guestNameEntry)
		},
		t,
	},
}
</script>

<style scoped lang="scss">
form.guest-name-dialog {
	display: flex;
	align-items: center;
	padding: 6px;

	&:deep(img) {
		margin: 0 !important;
	}

	input[type='text'] {
		flex-grow: 1;
	}
	label {
		padding-right: 3px;
		height: 32px;
	}
}
</style>
