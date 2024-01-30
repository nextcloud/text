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
	<NextcloudVueNcActionButton class="entry-single-action entry-action entry-action-item"
		:class="state.class"
		:disabled="state.disabled"
		:aria-keyshortcuts="keyshortcuts || undefined"
		:data-text-action-entry="actionEntry.key"
		:type="state.type"
		:model-value="state.type !== 'button' ? state.active : undefined"
		close-after-click
		v-on="$listeners"
		@click="runAction">
		<template #icon>
			<component :is="icon" />
		</template>
		{{ label }}
	</NextcloudVueNcActionButton>
</template>

<script>
import { NcActionButton as NextcloudVueNcActionButton } from '@nextcloud/vue'
import { BaseActionEntry } from './BaseActionEntry.js'

export default {
	// This component is used as a direct child of NcActions.
	// Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
	// Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
	// Hotfix - rename the component to NcActionButton because it represents and renders it.
	// eslint-disable-next-line vue/match-component-file-name
	name: 'NcActionButton',

	components: {
		NextcloudVueNcActionButton,
	},

	extends: BaseActionEntry,

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
