<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
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
				actionEntry.action(this.$editor.chain().focus(), this.$editor)?.run()
			}

			this.$nextTick(() => {
				this.$emit('trigged', { ...actionEntry })
			})
		},
	},
}
</script>
