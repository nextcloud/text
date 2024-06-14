/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineComponent } from 'vue'

export default defineComponent({
	data() {
		return {
			/** Current menu entry that has focus */
			activeMenuEntry: 0,
			entries: [],
		}
	},
	computed: {
		visibleEntries() {
			return this.entries
		},
	},
	watch: {
		visibleEntries() {
			this.$nextTick(() => {
				if (this.activeMenuEntry > this.visibleEntries.length || this.visibleEntries[this.activeMenuEntry]?.disabled) {
					this.setNextMenuEntry()
				}
			})
		},
	},
	methods: {
		/**
		 * Update the disabled state of an menu entry
		 * @param {string} menuKey The key of the menu entry that changed
		 * @param {boolean} state The new disabled state
		 */
		disableMenuEntry(menuKey, state) {
			const index = this.visibleEntries.findIndex(({ key }) => key === menuKey)
			this.visibleEntries[index].disabled = state
			if (state === false && this.activeMenuEntry === index) {
				this.$nextTick(() => this.setNextMenuEntry())
			}
		},
		/**
		 * Set the active menu entry to the next one (or reset to first)
		 */
		setNextMenuEntry() {
			// refs is not reactive so we must check this every time
			const modulo = this.visibleEntries.length + (this.$refs.remainingEntries ? 1 : 0)

			do {
				this.activeMenuEntry = (this.activeMenuEntry + 1) % modulo
			} while (this.activeMenuEntry < this.visibleEntries.length && this.visibleEntries[this.activeMenuEntry].disabled)
		},
		/**
		 * Set the active menu entry to the previous one (or reset to last entry (remaining actions))
		 */
		setPreviousMenuEntry() {
			// refs is not reactive so we must check this every time
			const modulo = this.visibleEntries.length + (this.$refs.remainingEntries ? 1 : 0)

			do {
				const index = this.activeMenuEntry - 1
				this.activeMenuEntry = ((index % modulo) + modulo) % modulo // needed as JS does not work with negative modulos
			} while (this.activeMenuEntry < this.visibleEntries.length && this.visibleEntries[this.activeMenuEntry].disabled)
		},

		/**
		 * Handle navigation in toolbar
		 * @param {KeyboardEvent} event The keydown event
		 */
		handleToolbarNavigation(event) {
			if (event.key === 'ArrowRight') {
				this.setNextMenuEntry()
			} else if (event.key === 'ArrowLeft') {
				this.setPreviousMenuEntry()
			}

			if (this.activeMenuEntry === this.visibleEntries.length) {
				this.$refs.remainingEntries?.focusButton?.()
			} else {
				// The ref is in no order (ordered by the time they needed to mount), so we need to order them like they are shown on the menu
				const entries = [...this.$refs.menuEntries].sort((a, b) => this.visibleEntries.findIndex(({ key }) => key === a.$vnode.data.key) - this.visibleEntries.findIndex(({ key }) => key === b.$vnode.data.key))
				entries[this.activeMenuEntry].focusButton()
			}
		},
	},
})
