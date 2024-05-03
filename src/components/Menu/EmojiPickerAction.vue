<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcEmojiPicker class="entry-action entry-action__emoji"
		:data-text-action-entry="actionEntry.key"
		:container="menuIDSelector"
		@select-data="addEmoji">
		<div>
			<NcButton class="entry-action__button"
				role="menu"
				:title="actionEntry.label"
				:aria-label="actionEntry.label">
				<template #icon>
					<component :is="icon" />
				</template>
			</NcButton>
		</div>
	</NcEmojiPicker>
</template>

<script>
import { BaseActionEntry } from './BaseActionEntry.js'
import { NcEmojiPicker, NcButton } from '@nextcloud/vue'
import { useMenuIDMixin } from './MenuBar.provider.js'

export default {
	name: 'EmojiPickerAction',
	components: {
		NcEmojiPicker,
		NcButton,
	},
	extends: BaseActionEntry,
	mixins: [useMenuIDMixin],
	methods: {
		addEmoji({ id, native }) {
			this.actionEntry
				.action(this.$editor.chain(), { id, native })
				.focus()
				.run()
		},
	},
}
</script>
