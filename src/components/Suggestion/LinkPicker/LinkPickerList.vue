<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<SuggestionListWrapper ref="suggestionList"
		:command="command"
		:items="items"
		@select="(item) => $emit('select', item)">
		<template #default="{ item }">
			<div class="link-picker__item" :data-key="item.key">
				<compoent :is="item.icon" v-if="typeof item.icon !== 'string'" />
				<img v-else :src="item.icon">
				<div>{{ item.label }}</div>
			</div>
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
<style lang="scss" scoped>
.link-picker__item {
	display: flex;
	align-items: center;

	& > div {
		padding: 4px;
		padding-left: 8px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	img {
		width: 20px;
		height: 20px;
		filter: var(--background-invert-if-dark);
	}
}
</style>
