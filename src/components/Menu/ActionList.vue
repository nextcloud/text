<!--
  - @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
  - @author Grigorii K. Shartsev <me@shgk.me>
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
	<NcActions :title="tooltip"
		class="entry-list-action entry-action"
		v-bind="state"
		:container="menuIDSelector"
		:aria-label="labelWithSelected"
		:type="state.active ? 'primary': 'tertiary'"
		:force-menu="true"
		:data-text-action-entry="actionEntry.key"
		:data-text-action-active="activeKey"
		@update:open="onOpenChange">
		<template #icon>
			<component :is="icon" :key="iconKey" />
		</template>
		<template v-for="child in children">
			<NcActionSeparator v-if="child.isSeparator" :key="`child-${child.key}`" />
			<ActionListItem v-else
				:key="`child-${child.key}`"
				:active="currentChild?.key === child.key"
				is-item
				:action-entry="child"
				v-on="$listeners"
				@trigged="onTrigger" />
		</template>
		<slot v-bind="{ visible }" name="lastAction" />
	</NcActions>
</template>

<script>
import { NcActions, NcActionSeparator } from '@nextcloud/vue'
import { BaseActionEntry } from './BaseActionEntry.js'
import ActionListItem from './ActionListItem.vue'
import { getIsActive } from './utils.js'
import { useOutlineStateMixin } from '../Editor/Wrapper.provider.js'
import useStore from '../../mixins/store.js'
import { useMenuIDMixin } from './MenuBar.provider.js'

export default {
	name: 'ActionList',
	components: {
		NcActions,
		NcActionSeparator,
		ActionListItem,
	},
	extends: BaseActionEntry,
	mixins: [useStore, useOutlineStateMixin, useMenuIDMixin],
	data: () => ({
		visible: false,
	}),
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
		labelWithSelected() {
			if (this.currentChild) {
				// TRANSLATORS: examples - Headings, "Heading 1" is selected - Callouts, "Info" is selected
				return t('text', '{menuItemName}, "{selectedSubMenuItemName}" is selected', {
					menuItemName: this.actionEntry.label,
					selectedSubMenuItemName: this.currentChild.label,
				})
			}

			return this.actionEntry.label
		},
	},
	methods: {
		onOpenChange(val) {
			this.visible = val
		},
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
