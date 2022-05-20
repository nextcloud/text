<!--
  - @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
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
	<Actions v-tooltip="tooltip"
		class="entry-list-action entry-action"
		v-bind="state"
		:title="actionEntry.label"
		:data-action-entry="actionEntry._key"
		v-on="$listeners">
		<template #icon>
			<component :is="icon" />
		</template>
		<ActionSingle v-for="child in actionEntry.children"
			:key="`child-${child._key}`"
			is-item
			:action-entry="child" />
	</Actions>
</template>

<script>
import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import { BaseActionEntry } from './ActionEntry.mixin.js'
import ActionSingle from './ActionSingle.vue'
import { getIsActive } from './utils.js'

export default {
	name: 'ActionList',
	components: { Actions, ActionButton, ActionSingle },
	extends: BaseActionEntry,
	data: () => ({
		activeChild: null,
	}),
	computed: {
		currentChind() {
			const {
				state,
				$editor,
				actionEntry: { children },
			} = this

			if (!state.active) {
				return null
			}

			return children.find(child => {
				return getIsActive(child, $editor)
			})
		},
		icon() {
			if (this.currentChind) {
				return this.currentChind.icon
			}

			return this.actionEntry.icon
		},
	},
	methods: {
		runAction() {

		},
	},
}
</script>
