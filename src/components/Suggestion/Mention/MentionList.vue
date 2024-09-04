<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<SuggestionListWrapper ref="suggestionList" :command="command" :items="items">
		<template #default="{ item, active}">
			<NcAutoCompleteResult :id="item.id"
				:label="item.label"
				icon="icon-user"
				source="users"
				:class="active ? 'highlight' : null" />
		</template>
		<template #empty>
			{{ t('text', 'No user found') }}
		</template>
	</SuggestionListWrapper>
</template>

<script>
import { NcAutoCompleteResult } from '@nextcloud/vue'

import SuggestionListWrapper from '../SuggestionListWrapper.vue'

export default {
	components: {
		NcAutoCompleteResult,
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

<style lang="scss">
.items {
	position: relative;
	border-radius: var(--border-radius);
	background: var(--color-main-background);
	overflow: hidden;
	font-size: 0.9rem;
	box-shadow: 0 1px 5px var(--color-box-shadow);
	min-width: 250px;
}

.item-empty {
	padding: 4px 8px;
	opacity: 0.8;
}
</style>
