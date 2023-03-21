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
	<div id="resolve-conflicts" class="collision-resolve-dialog" :class="{'icon-loading': clicked }">
		<button :disabled="clicked" @click="resolveThisVersion" data-cy="resolveThisVersion">
			{{ t('text', 'Use current version') }}
		</button>
		<button :disabled="clicked" @click="resolveServerVersion" data-cy="resolveServerVersion">
			{{ t('text', 'Use the saved version') }}
		</button>
	</div>
</template>

<script>
export default {
	name: 'CollisionResolveDialog',
	data() {
		return {
			clicked: false,
		}
	},
	methods: {
		resolveThisVersion() {
			this.clicked = true
			this.$emit('resolve-use-this-version')
		},
		resolveServerVersion() {
			this.clicked = true
			this.$emit('resolve-use-server-version')
		},
	},
}
</script>

<style scoped lang="scss">
	#resolve-conflicts {
		display: flex;
		position: fixed;
		z-index: 10000;
		bottom: 0;
		max-width: 900px;
		width: 100vw;
		margin: auto;
		padding: 20px 0;

		button {
			margin: auto;
			box-shadow: 0 0 10px var(--color-box-shadow);
		}
	}
</style>
