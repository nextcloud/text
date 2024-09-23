<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NextcloudVueNcActionButton class="entry-single-action entry-action entry-action-item"
		:title="listItemTooltip || undefined"
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
				actionEntry.action(this.$editor.chain().focus(), this.$editor)?.run()
			}

			this.$nextTick(() => {
				this.$emit('trigged', { ...actionEntry })
			})
		},
	},
}
</script>
