<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="suggestion-list">
		<template v-if="hasResults">
			<div v-for="(groupItems, key, groupIndex) in itemGroups" :key="key">
				<div v-if="hasGroups" class="suggestion-list__group">
					{{ key }}
				</div>
				<div v-for="(item, index) in groupItems"
					:key="combineIndex(groupIndex, index)"
					class="suggestion-list__item"
					:class="{ 'is-selected': combineIndex(groupIndex, index) === selectedIndex }"
					@click="selectItem(combineIndex(groupIndex, index))">
					<slot :item="item" :active="combineIndex(groupIndex, index) === selectedIndex" />
				</div>
			</div>
		</template>
		<div v-else class="suggestion-list__item is-empty">
			{{ t('text', 'No suggestion found') }}
		</div>
	</div>
</template>
<script>
import { translate as t } from '@nextcloud/l10n'

export default {
	name: 'SuggestionListWrapper',

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
	data() {
		return {
			selectedIndex: 0,
		}
	},
	computed: {
		hasGroups() {
			return Object.keys(this.itemGroups).includes(undefined)
		},
		hasResults() {
			return this.items.length > 0
		},
		itemHeight() {
			return this.$el.scrollHeight / this.items.length
		},
		itemInsideScrollView() {
			// If upper border of item is bigger or equal than scroll top
			// and lower end of item is smaller or equal than scroll bottom
			return this.selectedIndex * this.itemHeight >= this.$el.scrollTop
				&& (this.selectedIndex + 1) * this.itemHeight <= this.$el.scrollTop + this.$el.clientHeight
		},
		itemGroups() {
			const groups = {}
			this.items.forEach((item) => {
				if (!groups[item.suggestGroup]) {
					groups[item.suggestGroup] = []
				}
				groups[item.suggestGroup].push(item)
			})
			return groups
		},
		combineIndex() {
			return (groupIndex, index) => {
				const previousItemCount = Object.values(this.itemGroups)
					.slice(0, groupIndex)
					.reduce((sum, items) => {
						return sum + items.length
					}, 0)
				return previousItemCount + index
			}
		},
	},
	watch: {
		items() {
			this.selectedIndex = 0
			this.$el.scrollTop = 0
		},
	},
	methods: {
		t,
		onKeyDown({ event }) {
			// Ignore any key modifier combinations
			if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
				return false
			}

			if (event.key === 'ArrowUp') {
				this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
				if (!this.itemInsideScrollView) {
					this.$el.scrollTop = this.selectedIndex * this.itemHeight
				}
				return true
			}

			if (event.key === 'ArrowDown') {
				this.selectedIndex = (this.selectedIndex + 1) % this.items.length
				if (!this.itemInsideScrollView) {
					this.$el.scrollTop = (this.selectedIndex + 1) * this.itemHeight - this.$el.clientHeight
				}
				return true
			}

			if (event.key === 'Enter' || event.key === 'Tab') {
				this.selectItem(this.selectedIndex)
				return true
			}

			return false
		},

		selectItem(index) {
			const item = this.items[index]

			if (item) {
				this.$emit('select', item)
				this.command(item)
			}
		},
	},
}
</script>

<style scoped lang="scss">
.suggestion-list {
	border-radius: var(--border-radius);
	background-color: var(--color-main-background);
	box-shadow: 0 1px 5px var(--color-box-shadow);
	overflow: auto;

	min-width: 200px;
	max-width: 400px;
	width: 80vw;
	padding: 4px;
	// Show maximum 5 entries and a half to show scroll
	max-height: 35.5px * 5 + 18px;
	margin: 5px 0;

	&__group {
		font-weight: bold;
		color: var(--color-primary-element);
		font-size: var(--default-font-size);
		line-height: var(--default-clickable-area);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: .7;
		box-shadow: none !important;
		flex-shrink: 0;
		padding-left: 8px;
	}

	&__item {
		border-radius: 8px;
		padding: 4px 8px;
		margin-bottom: 4px;
		opacity: 0.8;
		cursor: pointer;

		// Take care of long names
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&:last-child {
			margin-bottom: 0;
		}

		&__emoji {
			padding-right: 8px;
		}

		&.is-selected,
		&:focus,
		&:hover {
			opacity: 1;
			background-color: var(--color-primary-element-light);
		}
	}
}
</style>
