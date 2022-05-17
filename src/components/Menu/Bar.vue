<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
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
  -
  -->

<template>
	<div class="menubar" :class="{ 'show': isVisible, 'autohide': autohide }">
		<div v-if="$isRichEditor" ref="menubar" class="menubar-entries">
			<ActionEntry v-for="actionEntry of visibleEntries"
				v-bind="{ actionEntry }"
				:key="`single-action-${actionEntry._key}`" />
		</div>
	</div>
</template>

<script>
import { subscribe, unsubscribe } from '@nextcloud/event-bus'

import actionsFullEntries from './entries.js'
import ActionEntry from './ActionEntry.js'
import { useIsRichEditorMixin, useEditorMixin } from '../EditorWrapper.provider.js'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'MenuBar',
	components: { ActionEntry },
	mixins: [useIsRichEditorMixin, useEditorMixin],
	props: {
		autohide: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			forceRecompute: 0,
			windowWidth: 0,
			isVisible: this.$editor.isFocused,
		}
	},
	computed: {
		iconsLimit() {
			// just force this computed to run again
			// eslint-disable-next-line no-unused-expressions
			(
				this.forceRecompute,
				this.windowWidth
			)
			const { menubar } = this.$refs
			const menuBarWidth = menubar && menubar.clientWidth > 200
				? menubar.clientWidth
				: 200

			// leave some buffer - this is necessary so the bar does not wrap during resizing
			const spaceToFill = menuBarWidth - 4
			const slots = Math.floor(spaceToFill / 44)

			// Leave one slot empty for the three dot menu
			return slots - 1
		},
		visibleEntries() {
			return [...actionsFullEntries].filter(entry => {
				return entry.priority <= this.iconsLimit
			})
		},
	},
	mounted() {
		window.addEventListener('resize', this.getWindowWidth)
		subscribe('files:sidebar:opened', this.redrawAfterTransition)
		subscribe('files:sidebar:closed', this.redrawAfterTransition)

		this.$onFocusChange = () => {
			this.isVisible = this.$editor.isFocused
		}

		this.$editor.on('focus', this.$onFocusChange)
		this.$editor.on('blur', this.$onFocusChange)

		this.$checkInterval = setInterval(() => {
			const { menubar } = this.$refs
			const isWidthAvailable = (menubar && menubar.clientWidth > 0)

			if (this.$isRichEditor && isWidthAvailable) {
				this.redrawMenuBar()
			}

			if (!this.$isRichEditor || isWidthAvailable) {
				clearInterval(this.$checkInterval)
			}
		}, 100)

		this.$emit('update:loaded', true)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getWindowWidth)

		unsubscribe('files:sidebar:opened', this.redrawAfterTransition)
		unsubscribe('files:sidebar:closed', this.redrawAfterTransition)

		this.$editor.off('focus', this.$onFocusChange)
		this.$editor.off('blur', this.$onFocusChange)
	},
	methods: {
		getWindowWidth() {
			this.windowWidth = document.documentElement.clientWidth
		},
		redrawAfterTransition() {
			// wait for transition to complete (100ms)
			setTimeout(this.redrawMenuBar, 110)
		},
		redrawMenuBar() {
			this.$nextTick(() => {
				this.getWindowWidth()
				this.forceRecompute++
			})
		},
	},
}
</script>

<style scoped lang="scss">
	.menubar {
		--background-blur: blur(10px);
		position: sticky;
		top: 0;
		z-index: 10021; // above modal-header and menububble so menubar is always on top
		background-color: var(--color-main-background-translucent);
		backdrop-filter: var(--background-blur);
		max-height: 44px; // important for mobile so that the buttons are always inside the container
		padding-top:3px;
		padding-bottom: 3px;

		&.autohide {
			visibility: hidden;
			opacity: 0;
			transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
			&.show {
				visibility: visible;
				opacity: 1;
			}
		}
		.menubar-entries {
			display: flex;
			justify-content: flex-start;
		}
		@media (max-width: 660px) {
			.menubar-entries {
				margin-left: 0;
			}
		}
	}
</style>
