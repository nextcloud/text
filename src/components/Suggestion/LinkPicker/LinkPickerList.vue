<!--
  - @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
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
  -->
<template>
	<SuggestionListWrapper ref="suggestionList" :command="command" :items="items" @select="(item) => $emit('select', item)">
		<template #default="{ item }">
			{{ item.label }}
		</template>
		<template #empty>
			{{ t('text', 'No command found') }}
		</template>
	</SuggestionListWrapper>
</template>

<script>
import SuggestionListWrapper from '../SuggestionListWrapper.vue'

export default {
	components: {
		SuggestionListWrapper,
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
			return this.$refs.suggestionList?.onKeyDown({ event })
		},
	},
}
</script>
