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
	<form v-tooltip="t('text', 'Enter your name so other users can see who is editing')" class="guest-name-dialog" @submit.prevent="setGuestName()">
		<input v-model="guestName" type="text">
		<input type="submit" class="icon-confirm" value="">
	</form>
</template>

<script>
import Tooltip from 'nextcloud-vue/dist/Directives/Tooltip'

export default {
	name: 'GuestNameDialog',
	directives: {
		tooltip: Tooltip
	},
	props: {
		syncService: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			guestName: ''
		}
	},
	beforeMount() {
		this.guestName = this.syncService.session.guestName
	},
	methods: {
		setGuestName() {
			const previousGuestName = this.syncService.session.guestName
			this.syncService.updateSession(this.guestName).then(() => {
				localStorage.setItem('text-guestName', this.guestName)
			}).catch((e) => {
				this.guestName = previousGuestName
			})
		}
	}
}
</script>

<style scoped lang="scss">
	form.guest-name-dialog {
		display: flex;
		max-width: 200px;
		margin: auto;
		margin-top: -2px;

		input[type=text] {
			flex-grow: 1;
		}
	}
</style>
