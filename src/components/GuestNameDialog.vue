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
	<div class="guest-name-dialog">
		<p>{{ t('text', 'Please enter a name to identify you as a public editor:') }}</p>
		<form @submit.prevent="setGuestName()">
			<input ref="guestNameField" type="text" :value="value">
			<input type="submit" class="icon-confirm" value="">
		</form>
	</div>
</template>

<script>
export default {
	name: 'GuestNameDialog',
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	methods: {
		setGuestName() {
			this.$emit('input', this.$refs.guestNameField.value)
		}
	}
}
</script>

<style scoped lang="scss">
	.guest-name-dialog {
		padding: 30px;
		text-align: center;

		form {
			display: flex;
			width: 100%;
			max-width: 200px;
			margin: auto;
			margin-top: 30px;

			input[type=text] {
				flex-grow: 1;
			}
		}
	}
</style>
