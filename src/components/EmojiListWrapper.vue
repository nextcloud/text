<!--
  - @copyright Copyright (c) 2021 Jonas <jonas@freesources.org>
  -
  - @author Jonas <jonas@freesources.org>
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
	<EmojiList ref="emojiList"
		:items="items"
		:command="command" />
</template>

<script>
import EmojiList from './EmojiList.vue'

export default {
	name: 'EmojiListWrapper',

	components: {
		EmojiList,
	},

	props: {
		items: {
			type: Array,
			required: true,
		},
		command: {
			type: Function,
			required: true,
		},
	},

	methods: {
		onKeyDown({ event }) {
			// Ignore any key modifier combinations
			return this.$refs.emojiList?.onKeyDown({ event })
		},
	},
}
</script>
