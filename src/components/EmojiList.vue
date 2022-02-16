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
	<div class="emoji-list">
		<template v-if="hasResults">
			<div v-for="(emojiObject, index) in items"
				:key="index"
				class="emoji-list__item"
				:class="{ 'is-selected': index === selectedIndex }"
				@click="selectItem(index)">
				<span class="emoji-list__item__emoji">
					{{ emojiObject.native }}
				</span>
				:{{ emojiObject.short_name }}
			</div>
		</template>
		<div v-else class="emoji-list__item is-empty">
			{{ t('text', 'No emoji found') }}
		</div>
	</div>
</template>

<script>
import { translate as t } from '@nextcloud/l10n'
import { addRecent } from '@nextcloud/vue/dist/Functions/emoji'

export default {
	name: 'EmojiList',
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
		hasResults() {
			return this.items.length > 0
		},
	},
	watch: {
		items() {
			this.selectedIndex = 0
		},
	},
	methods: {
		t,
		onKeyDown({ event }) {
			if (event.key === 'ArrowUp') {
				this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
				return true
			}

			if (event.key === 'ArrowDown') {
				this.selectedIndex = (this.selectedIndex + 1) % this.items.length
				return true
			}

			if (event.key === 'Enter') {
				this.selectItem(this.selectedIndex)
				return true
			}

			return false
		},

		selectItem(index) {
			const emojiObject = this.items[index]

			if (emojiObject) {
				this.command(emojiObject)
				addRecent(emojiObject)
			}
		},
	},
}
</script>

<style scoped lang="scss">
	.emoji-list {
		border-radius: var(--border-radius);
		background-color: var(--color-main-background);
		box-shadow: 0 1px 5px var(--color-box-shadow);
		overflow: auto;

		min-width: 200px;
		max-width: 200px;
		padding: 4px;
		// Show maximum 5 entries and a half to show scroll
		max-height: 35.5px * 5 + 18px;
		margin: 5px 0;

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
				background-color: var(--color-primary-light);
			}
		}
	}
</style>
