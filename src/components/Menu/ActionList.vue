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
	<NcActions v-tooltip="tooltip"
		class="entry-list-action entry-action"
		role="menu"
		v-bind="state"
		:container="menuIDSelector"
		:aria-label="actionEntry.label"
		:title="actionEntry.label"
		:data-text-action-entry="actionEntry.key"
		:data-text-action-active="activeKey">
		<template #icon>
			<component :is="icon" :key="iconKey" />
		</template>
		<ActionSingle v-for="child in children"
			:key="`child-${child.key}`"
			is-item
			:action-entry="child"
			v-on="$listeners"
			@trigged="onTrigger" />
		<slot name="lastAction" />
	</NcActions>
</template>

<script>
import { NcActions } from '@nextcloud/vue'
import { BaseActionEntry } from './BaseActionEntry.js'
import ActionSingle from './ActionSingle.vue'
import { getIsActive } from './utils.js'
import { useOutlineStateMixin } from '../Editor/Wrapper.provider.js'
import useStore from '../../mixins/store.js'
import { useMenuIDMixin } from './MenuBar.provider.js'

export default {
	name: 'ActionList',
	components: {
		NcActions,
		ActionSingle,
	},
	extends: BaseActionEntry,
	mixins: [useStore, useOutlineStateMixin, useMenuIDMixin],
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
		children() {
			return this.actionEntry.children.filter(({ visible }) => {
				if (visible === undefined) {
					return true
				}

				return typeof visible === 'function'
					? visible(this)
					: visible
			})
		},
	},
	methods: {
		runAction() {
			// nothing todo
		},
		onTrigger(entry) {
			if (entry?.click) {
				return
			}
			this.$editor.chain().focus().run()
			this.$emit('trigged', entry)
		},
	},
}
</script>
