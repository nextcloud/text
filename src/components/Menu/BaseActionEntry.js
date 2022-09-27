/*
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/* eslint-disable jsdoc/valid-types */

import { Tooltip } from '@nextcloud/vue'
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
	directives: {
		Tooltip,
	},
	mixins: [useEditorMixin, useIsMobileMixin, useStore, useOutlineActions, useOutlineStateMixin],
	props: {
		actionEntry: {
			type: Object,
			required: true,
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
			return [this.actionEntry.label, getKeys(this.$isMobile, this.actionEntry)].join(' ')
		},
	},
	mounted() {
		this.$_updateState = debounce(this.updateState.bind(this), 50)
		this.$editor.on('update', this.$_updateState)
		this.$editor.on('selectionUpdate', this.$_updateState)
	},
	beforeDestroy() {
		this.$editor.off('update', this.$_updateState)
		this.$editor.off('selectionUpdate', this.$_updateState)
	},
	methods: {
		updateState() {
			this.state = getActionState(this.actionEntry, this.$editor)
		},
	},
}

export { BaseActionEntry }
