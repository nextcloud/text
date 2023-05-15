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
	<span class="material-design-icon">
		<CheckIcon class="saving-indicator-check" />
		<span class="saving-indicator-container" :class="{error, saving}">
			<CircleMedium class="saving-indicator" />
		</span>
	</span>
</template>

<script>
import { defineComponent } from 'vue'
import { Check as CheckIcon, CircleMedium } from './icons.js'

export default defineComponent({
	name: 'SavingIndicator',
	components: {
		CheckIcon,
		CircleMedium,
	},
	props: {
		saving: {
			type: Boolean,
			default: false,
			required: false,
		},
		error: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
})
</script>

<style lang="scss" scoped>
.saving-indicator-check {
	cursor: pointer;

	:deep(svg) {
		fill: var(--color-text-lighter);
	}
}

.saving-indicator-container {
	display: none;
	position: absolute;

	&.error,&.saving {
		display: inline;
		>span {
			position: relative;
			top: 6px;
			left: 6px;
			cursor: pointer;
		}
	}

	&.saving > span {
		color: var(--color-primary-element);
		:deep(svg) {
			fill: var(--color-primary-element);
		}
	}
	&.error > span {
		color: var(--color-error);
		:deep(svg) {
			fill: var(--color-primary-element);
		}
	}
}
</style>
