<!--
  - @copyright Copyright (c) 2022
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
	<li class="inline-container-base">
		<ul>
			<slot />
		</ul>
	</li>
</template>

<script>
import { defineComponent } from 'vue'

/**
 * A wrapper for allowing inlining NcAction components
 * within the action menu (see TableHeaderView for a usage example)
 */
export default defineComponent({
	name: 'InlineActionsContainer',
})
</script>

<style lang="scss">
.inline-container-base {
	ul {
		display: flex;
		justify-content: space-between;
	}
	.action-button {
		padding: 0 !important;
	}
}
</style>
