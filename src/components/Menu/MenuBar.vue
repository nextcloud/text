<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license AGPL-3.0-or-later
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
	<div :id="randomID"
		class="text-menubar"
		data-text-el="menubar"
		role="menubar"
		:aria-label="t('text', 'Formatting menu bar')"
		:class="{
			'text-menubar--ready': isReady,
			'text-menubar--show': isVisible,
			'text-menubar--autohide': autohide,
			'text-menubar--is-workspace': $isRichWorkspace
		}">
		<HelpModal v-if="displayHelp" @close="hideHelp" />

		<div v-if="$isRichEditor"
			ref="menubar"
			role="group"
			class="text-menubar__entries"
			:aria-label="t('text', 'Editor actions')">
			<ActionEntry v-for="actionEntry of visibleEntries"
				v-bind="{ actionEntry }"
				:key="`text-action--${actionEntry.key}`" />
			<ActionList key="text-action--remain"
				:action-entry="hiddenEntries">
				<template #lastAction="{ visible }">
					<ActionFormattingHelp @click="showHelp" />
					<NcActionSeparator />
					<CharacterCount v-bind="{ visible }" />
				</template>
			</ActionList>
		</div>
		<div class="text-menubar__slot">
			<slot />
		</div>
	</div>
</template>

<script>
import { NcActionSeparator } from '@nextcloud/vue'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import debounce from 'debounce'

import HelpModal from '../HelpModal.vue'
import actionsFullEntries from './entries.js'
import ActionEntry from './ActionEntry.js'
import { MENU_ID } from './MenuBar.provider.js'
import ActionList from './ActionList.vue'
import { DotsHorizontal } from '../icons.js'
import {
	useEditorMixin,
	useIsRichEditorMixin,
	useIsRichWorkspaceMixin,
} from '../Editor.provider.js'
import ActionFormattingHelp from './ActionFormattingHelp.vue'
import CharacterCount from './CharacterCount.vue'

export default {
	name: 'MenuBar',
	components: {
		ActionEntry,
		ActionFormattingHelp,
		ActionList,
		HelpModal,
		NcActionSeparator,
		CharacterCount,
	},
	mixins: [
		useEditorMixin,
		useIsRichEditorMixin,
		useIsRichWorkspaceMixin,
	],
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[MENU_ID]: {
				get: () => this.randomID,
			},
		})

		return val
	},
	props: {
		autohide: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			randomID: `menu-bar-${(Math.ceil((Math.random() * 10000) + 500)).toString(16)}`,
			displayHelp: false,
			forceRecompute: 0,
			isReady: false,
			isVisible: this.$editor.isFocused,
			windowWidth: 0,
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
			const list = [...actionsFullEntries].filter(({ priority }) => {
				// if entry do not have priority, we assume it aways will be visible
				return priority === undefined || priority <= this.iconsLimit
			})

			return list
		},
		hiddenEntries() {
			return {
				key: 'remain',
				label: this.t('text', 'Remaining actions'),
				icon: DotsHorizontal,
				children: [...actionsFullEntries].filter(({ priority }) => {
					// reverse logic from visibleEntries
					return priority !== undefined && priority > this.iconsLimit
				}),
			}
		},
	},
	mounted() {
		window.addEventListener('resize', this.getWindowWidth)
		subscribe('files:sidebar:opened', this.redrawAfterTransition)
		subscribe('files:sidebar:closed', this.redrawAfterTransition)

		this.$onFocusChange = () => {
			this.isVisible = this.$editor.isFocused
		}
		this.$onBlurChange = debounce(() => {
			this.isVisible = this.$editor.isFocused
		}, 3000) // 3s

		this.$editor.on('focus', this.$onFocusChange)
		this.$editor.on('blur', this.$onBlurChange)

		this.$checkInterval = setInterval(() => {
			const { menubar } = this.$refs
			const isWidthAvailable = (menubar && menubar.clientWidth > 0)

			if (this.$isRichEditor && isWidthAvailable) {
				this.redrawMenuBar()
			}

			if (!this.$isRichEditor || isWidthAvailable) {
				clearInterval(this.$checkInterval)
			}

			if (isWidthAvailable || !this.$isRichEditor) {
				this.$nextTick(() => {
					this.isReady = true
				})
			}
		}, 100)

		this.$nextTick(() => {
			this.$emit('update:loaded', true)
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getWindowWidth)

		unsubscribe('files:sidebar:opened', this.redrawAfterTransition)
		unsubscribe('files:sidebar:closed', this.redrawAfterTransition)

		this.$editor.off('focus', this.$onFocusChange)
		this.$editor.off('blur', this.$onBlurChange)
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
		showHelp() {
			this.displayHelp = true
		},

		hideHelp() {
			this.displayHelp = false
		},
	},
}
</script>

<style scoped lang="scss">
	.text-menubar {
		--background-blur: blur(10px);
		position: sticky;
		top: 0;
		z-index: 10021; // above modal-header so menubar is always on top
		background-color: var(--color-main-background-translucent);
		backdrop-filter: var(--background-blur);
		max-height: 44px; // important for mobile so that the buttons are always inside the container
		padding-top:3px;
		padding-bottom: 3px;

		visibility: hidden;

		display: flex;
		justify-content: flex-end;
		align-items: center;

		&.text-menubar--ready:not(.text-menubar--autohide) {
			visibility: visible;
			animation-name: fadeInDown;
			animation-duration: 0.3s;
		}

		&.text-menubar--autohide {
			opacity: 0;
			transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
			&.text-menubar--show {
				visibility: visible;
				opacity: 1;
			}
		}
		.text-menubar__entries {
			display: flex;
			flex-grow: 1;
			margin-left: max(0px, calc((100% - var(--text-editor-max-width)) / 2));
		}

		.text-menubar__slot {
			justify-content: flex-end;
			display: flex;
			min-width: max(0px, min(100px, (100% - var(--text-editor-max-width)) / 2));
		}

		&.text-menubar--is-workspace {
			.text-menubar__entries {
				margin-left: 0;
			}
		}

		@media (max-width: 660px) {
			.text-menubar__entries {
				margin-left: 0;
			}
		}
	}
</style>
