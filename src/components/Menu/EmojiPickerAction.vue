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
	<EmojiPicker class="entry-action entry-action__emoji"
		:data-text-action-entry="actionEntry.key"
		@selectData="addEmoji">
		<Button v-tooltip="actionEntry.label"
			class="entry-action__button"
			role="menu"
			:title="actionEntry.label"
			:aria-label="actionEntry.label"
			:aria-haspopup="true">
			<template #icon>
				<component :is="icon" />
			</template>
		</Button>
	</EmojiPicker>
</template>

<script>
import { BaseActionEntry } from './BaseActionEntry.js'
import { EmojiPicker, Button } from '@nextcloud/vue'

export default {
	name: 'EmojiPickerAction',
	components: {
		EmojiPicker,
		Button,
	},
	extends: BaseActionEntry,
	methods: {
		toggleChildMenu() {

		},
		addEmoji({ id, native }) {
			this.actionEntry
				.action(this.$editor.chain(), { id, native })
				.focus()
				.run()
		},
	},
}
</script>
