<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
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
	<form :title="t('text', 'Enter your name so other people can see who is editing')" class="guest-name-dialog" @submit.prevent="setGuestName()">
		<label><AvatarWrapper :session="session" :size="32" /></label>
		<input v-model="guestName"
			type="text"
			:aria-label="t('text', 'Edit guest name')"
			:placeholder="t('text', 'Guest')">
		<input type="submit"
			class="icon-confirm"
			:aria-label="t('text', 'Save guest name')"
			value="">
	</form>
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import AvatarWrapper from './AvatarWrapper.vue'
import { useSyncServiceMixin } from '../Editor.provider.js'

export default {
	name: 'GuestNameDialog',
	components: {
		AvatarWrapper,
	},
	mixins: [
		useSyncServiceMixin,
	],
	props: {
		session: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			guestName: '',
			guestNameBuffered: '',
		}
	},
	computed: {
		avatarUrl() {
			const size = 32
			const avatarUrl = generateUrl(
				'/avatar/guest/{user}/{size}',
				{
					user: this.guestNameBuffered,
					size,
				})
			return window.location.protocol + '//' + window.location.host + avatarUrl
		},
	},
	beforeMount() {
		this.guestName = this.$syncService.guestName
		this.updateBufferedGuestName()
	},
	methods: {
		setGuestName() {
			const previousGuestName = this.$syncService.guestName
			this.$syncService.updateSession(this.guestName).then(() => {
				localStorage.setItem('nick', this.guestName)
				this.updateBufferedGuestName()
			}).catch((e) => {
				this.guestName = previousGuestName
			})
		},
		updateBufferedGuestName() {
			this.guestNameBuffered = this.guestName
		},
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

		input[type=text] {
			flex-grow: 1;
		}
		label {
			padding-right: 3px;
			height: 32px;
		}
	}
</style>
