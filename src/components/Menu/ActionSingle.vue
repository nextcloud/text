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
	<NcButton class="entry-single-action entry-action"
		:class="state.class"
		:disabled="state.disabled"
		:aria-keyshortcuts="keyshortcuts || undefined"
		:data-text-action-entry="actionEntry.key"
		:aria-label="label"
		:title="tooltip"
		type="tertiary"
		:pressed="state.type !== 'button' ? state.active : undefined"
		v-on="$listeners"
		@click="runAction">
		<template #icon>
			<component :is="icon" />
		</template>

		<template v-if="actionEntry.forceLabel" #default>
			{{ label }}
		</template>
	</NcButton>
</template>

<script>
import { NcButton } from '@nextcloud/vue'
import { BaseActionEntry } from './BaseActionEntry.js'

export default {
	name: 'ActionSingle',

	components: {
		NcButton,
	},

	extends: BaseActionEntry,

	props: {
		isItem: {
			type: Boolean,
			default: false,
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
