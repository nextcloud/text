<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
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
		:disabled="!isEnabled"
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
import { getActionState, getIsActive } from './utils.js'
import { useOutlineStateMixin } from '../Editor/Wrapper.provider.js'
import useStore from '../../mixins/store.js'
import { useMenuIDMixin } from './MenuBar.provider.js'
import debounce from 'debounce'

export default {
	name: 'ActionList',
	components: {
		NcActions,
		NcActionSeparator,
		ActionListItem,
	},
	extends: BaseActionEntry,
	mixins: [useStore, useOutlineStateMixin, useMenuIDMixin],
	props: {
		forceEnabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		visible: false,
		hasEnabledChild: true,
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
		isEnabled() {
			return this.forceEnabled || this.hasEnabledChild
		},
	},
	mounted() {
		this.$_updateState = debounce(this.checkStateOfChildren.bind(this), 50)
		this.$editor.on('update', this.$_updateState)
		this.$editor.on('selectionUpdate', this.$_updateState)
	},
	beforeDestroy() {
		this.$editor.off('update', this.$_updateState)
		this.$editor.off('selectionUpdate', this.$_updateState)
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
		checkStateOfChildren() {
			this.hasEnabledChild = this.children.some(child => this.isChildEnabled(child))
		},
		isChildEnabled(child) {
			return !child.isSeparator
				&& !getActionState(child, this.$editor).disabled
		},
	},
}
</script>
