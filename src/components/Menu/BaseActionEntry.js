/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable jsdoc/valid-types */

import debounce from 'debounce'

import { useEditorMixin, useIsMobileMixin } from '../Editor.provider.js'
import { useOutlineActions, useOutlineStateMixin } from '../Editor/Wrapper.provider.js'
import { getActionState, getKeys, getKeyshortcuts } from './utils.js'
import useStore from '../../mixins/store.js'

import './ActionEntry.scss'

/**
 * @type {import("vue").ComponentOptions} BaseActionEntry
 */
const BaseActionEntry = {
	mixins: [useEditorMixin, useIsMobileMixin, useStore, useOutlineActions, useOutlineStateMixin],
	props: {
		actionEntry: {
			type: Object,
			required: true,
		},
		canBeFocussed: {
			type: Boolean,
			default: null,
		},
	},
	data() {
		return {
			state: getActionState(this.actionEntry, this.$editor),
		}
	},
	computed: {
		label() {
			const { label } = this.actionEntry

			return typeof label === 'function'
				? label(this)
				: label
		},
		icon() {
			return this.actionEntry.icon
		},
		keyshortcuts() {
			return getKeyshortcuts(this.actionEntry)
		},
		tooltip() {
			return [
				this.label,
				getKeys(this.$isMobile, this.actionEntry),
			].join(' ')
		},
		listItemTooltip() {
			return [
				getKeys(this.$isMobile, this.actionEntry),
			].join(' ')
		},
	},
	watch: {
		/** Handle tabindex for menu toolbar */
		canBeFocussed() {
			this.setTabIndexOnButton()
		},
	},
	mounted() {
		this.$_updateState = debounce(this.updateState.bind(this), 50)
		this.$editor.on('update', this.$_updateState)
		this.$editor.on('selectionUpdate', this.$_updateState)
		// Initially emit the disabled event to set the state in parent
		this.$emit('disabled', this.state.disabled)
		// Initially set the tabindex
		this.setTabIndexOnButton()
	},
	beforeDestroy() {
		this.$editor.off('update', this.$_updateState)
		this.$editor.off('selectionUpdate', this.$_updateState)
	},
	methods: {
		updateState() {
			this.state = getActionState(this.actionEntry, this.$editor)
			this.$emit('disabled', this.state.disabled)
		},
		setTabIndexOnButton() {
			/** @type {HTMLButtonElement} */
			const button = this.$el.tagName.toLowerCase() === 'button' ? this.$el : this.$el.querySelector('button')

			if (this.canBeFocussed === null) {
				button.removeAttribute('tabindex')
			} else {
				button.setAttribute('tabindex', this.canBeFocussed ? '0' : '-1')
			}
		},
		/**
		 * Focus the inner button of this action
		 */
		focusButton() {
			/** @type {HTMLButtonElement} */
			const button = this.$el.tagName.toLowerCase() === 'button' ? this.$el : this.$el.querySelector('button')
			button.focus()
		},
	},
}

export { BaseActionEntry }
