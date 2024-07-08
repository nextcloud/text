<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
  - @author Julius Härtl <jus@bitgrid.net>
  - @author Grigorii K. Shartsev <me@shgk.me>
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
		role="region"
		:aria-label="t('text', 'Editor actions')"
		:class="{
			'text-menubar--ready': isReady,
			'text-menubar--hide': isHidden,
			'text-menubar--is-workspace': $isRichWorkspace
		}">
		<HelpModal v-if="displayHelp" @close="hideHelp" />
		<Translate v-if="displayTranslate !== false"
			:content="displayTranslate"
			@insert-content="translateInsert"
			@replace-content="translateReplace"
			@close="hideTranslate" />

		<div v-if="$isRichEditor"
			ref="menubar"
			role="toolbar"
			class="text-menubar__entries"
			:aria-label="t('text', 'Formatting menu bar')"
			@keydown.left.stop="handleToolbarNavigation"
			@keydown.right.stop="handleToolbarNavigation">
			<!-- The visible inline actions -->
			<component :is="actionEntry.component ? actionEntry.component : (actionEntry.children ? 'ActionList' : 'ActionSingle')"
				v-for="(actionEntry, index) in visibleEntries"
				ref="menuEntries"
				:key="actionEntry.key"
				:action-entry="actionEntry"
				:can-be-focussed="activeMenuEntry === index"
				@disabled="disableMenuEntry(actionEntry.key, $event)"
				@click="activeMenuEntry = index" />

			<!-- The remaining actions -->
			<ActionList ref="remainingEntries"
				:action-entry="hiddenEntries"
				:can-be-focussed="activeMenuEntry === visibleEntries.length"
				@click="activeMenuEntry = 'remain'">
				<template #lastAction="{ visible }">
					<NcActionButton v-if="canTranslate" @click="showTranslate">
						<template #icon>
							<TranslateVariant />
						</template>
						{{ t('text', 'Translate') }}
					</NcActionButton>
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
import { ref } from 'vue'
import { NcActionSeparator, NcActionButton } from '@nextcloud/vue'
import { loadState } from '@nextcloud/initial-state'
import { useElementSize } from '@vueuse/core'

import ActionFormattingHelp from './ActionFormattingHelp.vue'
import ActionList from './ActionList.vue'
import ActionSingle from './ActionSingle.vue'
import CharacterCount from './CharacterCount.vue'
import HelpModal from '../HelpModal.vue'
import ToolBarLogic from './ToolBarLogic.js'
import Translate from './../Modal/Translate.vue'
import actionsFullEntries from './entries.js'
import { MENU_ID } from './MenuBar.provider.js'
import { DotsHorizontal, TranslateVariant } from '../icons.js'
import {
	useEditorMixin,
	useIsMobileMixin,
	useIsRichEditorMixin,
	useIsRichWorkspaceMixin,
} from '../Editor.provider.js'

export default {
	name: 'MenuBar',
	components: {
		ActionFormattingHelp,
		ActionList,
		ActionSingle,
		HelpModal,
		NcActionSeparator,
		NcActionButton,
		CharacterCount,
		TranslateVariant,
		Translate,
	},
	extends: ToolBarLogic,
	mixins: [
		useEditorMixin,
		useIsMobileMixin,
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
		isHidden: {
			type: Boolean,
			default: false,
		},
	},

	setup() {
		const menubar = ref()
		const { width } = useElementSize(menubar)
		return { menubar, width }
	},

	data() {
		return {
			entries: [...actionsFullEntries],
			randomID: `menu-bar-${(Math.ceil((Math.random() * 10000) + 500)).toString(16)}`,
			displayHelp: false,
			displayTranslate: false,
			isReady: false,
			canTranslate: loadState('text', 'translation_languages', []).length > 0,
			resize: null,
		}
	},
	computed: {
		visibleEntries() {
			const list = this.entries.filter(({ priority }) => {
				// if entry has no priority, we assume it always will be visible
				return priority === undefined || priority <= this.iconsLimit
			})

			return list
		},
		hiddenEntries() {
			const remainingEntries = this.entries.filter(({ priority }) => {
				// reverse logic from visibleEntries
				return priority !== undefined && priority > this.iconsLimit
			})
			const entries = remainingEntries.reduce((acc, entry, index) => {
				// If entry has children, merge them into list. Otherwise keep entry itself.
				const children = entry.children ?? [entry]
				// If this block has menu entries, it should be separated for better visibility and a11y (menu item radio grouping)
				if (children.length > 1) {
					const hasPreviousItem = acc.length && !acc.at(-1).isSeparator
					const separatorBefore = hasPreviousItem ? [{ key: `separator-before-${entry.id}`, isSeparator: true }] : []

					const hasNextItem = index !== remainingEntries.length - 1
					const separatorAfter = hasNextItem ? [{ key: `separator-after-${entry.id}`, isSeparator: true }] : []

					return [...acc, ...separatorBefore, ...children, ...separatorAfter]
				}
				return [...acc, ...children]
			}, [])

			return {
				key: 'remain',
				label: this.t('text', 'Remaining actions'),
				icon: DotsHorizontal,
				children: entries,
			}
		},
		iconsLimit() {
			// leave some buffer - this is necessary so the bar does not wrap during resizing
			const spaceToFill = this.width - 4
			const spacePerSlot = this.$isMobile ? 44 : 46
			const slots = Math.floor(spaceToFill / spacePerSlot)
			// Leave one slot empty for the three dot menu
			return slots - 1
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.isReady = true
			this.$emit('update:loaded', true)
		})
	},
	methods: {
		showHelp() {
			this.displayHelp = true
		},

		hideHelp() {
			this.displayHelp = false
		},
		showTranslate() {
			const { from, to } = this.$editor.view.state.selection
			let selectedText = this.$editor.view.state.doc.textBetween(from, to, ' ')

			if (!selectedText.trim().length) {
				this.$editor.commands.selectAll()
				selectedText = this.$editor.view.state.doc.textContent
			}

			console.debug('translation click', this.$editor.view.state.selection, selectedText)
			this.displayTranslate = selectedText ?? ''
		},
		hideTranslate() {
			this.displayTranslate = false
		},
		translateInsert(content) {
			this.$editor.commands.command(({ tr, commands }) => {
				return commands.insertContentAt(tr.selection.to, content)
			})
			this.displayTranslate = false
		},
		translateReplace(content) {
			this.$editor.commands.command(({ tr, commands }) => {
				const selection = tr.selection
				const range = {
					from: selection.from,
					to: selection.to,
				}
				return commands.insertContentAt(range, content)
			})
			this.displayTranslate = false
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

		&.text-menubar--ready:not(.text-menubar--hide) {
			visibility: visible;
			animation-name: fadeInDown;
			animation-duration: 0.3s;
		}

		&.text-menubar--hide {
			opacity: 0;
			transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
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
