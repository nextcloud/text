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
	<component :is="component"
		class="entry-single-action entry-action"
		:title="isItem ? undefined : tooltip"
		:type="state.active ? 'primary' : 'tertiary'"
		:data-text-action-entry="actionEntry.key"
		:pressed="isItem ? state.active : undefined"
		v-bind="bindState"
		v-on="$listeners"
		@click="runAction">
		<template #icon>
			<component :is="icon" />
		</template>

		<template v-if="isItem || actionEntry.forceLabel" #default>
			{{ label }}
		</template>
	</component>
</template>

<script>
import { NcButton, NcActionButton } from '@nextcloud/vue'
import { BaseActionEntry } from './BaseActionEntry.js'

export default {
	name: 'ActionSingle',
	extends: BaseActionEntry,
	props: {
		isItem: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		component() {
			// Button and NcActionButton shares styles and behaviours
			// to keep it simple, this component handle the small differences
			return this.isItem
				? NcActionButton
				: NcButton
		},
		bindState() {
			const { keyshortcuts } = this

			const state = {
				...this.state,
				ariaLabel: this.label,
			}

			state.class = {
				...state.class,
				// inject a extra class
				'entry-action-item': this.isItem,
			}

			if (keyshortcuts) {
				state['aria-keyshortcuts'] = keyshortcuts
			}

			// item list behaviour
			if (this.isItem) {
				state.closeAfterClick = true
			}

			return state
		},
	},

	mounted() {
		this.$editor.on('transaction', () => this.updateState())
	},

	methods: {
		runAction() {
			const { actionEntry } = this

			if (actionEntry.click) {
				actionEntry.click(this)
			} else {
				// Some actions run themselves.
				// others still need to have .run() called upon them.
				actionEntry.action(this.$editor.chain().focus())?.run()
			}

			this.$nextTick(() => {
				this.$emit('trigged', { ...actionEntry })
			})
		},
	},
}
</script>
