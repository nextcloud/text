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
		role="menu"
		v-bind="state"
		:aria-label="actionEntry.label"
		:title="actionEntry.label"
		:data-text-action-entry="actionEntry.key"
		:data-text-action-active="activeKey">
		<template #icon>
			<component :is="icon" :key="iconKey" />
		</template>
		<ActionSingle v-for="child in actionEntry.children"
			:key="`child-${child.key}`"
			is-item
			:action-entry="child"
			@trigged="onTrigger" />
	</Actions>
</template>

<script>
import Actions from '@nextcloud/vue/dist/Components/Actions'
import { BaseActionEntry } from './BaseActionEntry.js'
import ActionSingle from './ActionSingle.vue'
import { getIsActive } from './utils.js'

export default {
	name: 'ActionList',
	components: { Actions, ActionSingle },
	extends: BaseActionEntry,
	computed: {
		currentChild() {
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
			if (this.currentChild) {
				return this.currentChild.icon
			}

			return this.actionEntry.icon
		},
		iconKey() {
			return `${this.actionEntry.key}/${this.activeKey}`
		},
		activeKey() {
			return this.currentChild?.key
		},
	},
	methods: {
		runAction() {
			// nothing todo
		},
		onTrigger(entry) {
			if (entry?.click) {
				entry.click(this)
			} else {
				this.$editor.chain().focus().run()
				this.$emit('trigged', entry)
			}
		},
	},
}
</script>
