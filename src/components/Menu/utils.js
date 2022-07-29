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

import {
	TRANSLATIONS,
	MODIFIERS,
} from './keys.js'

const getEntryClasses = (actionEntry, isActive) => {
	return {
		'is-active': isActive,
		[`action-menu-${actionEntry.key}`]: true,
	}
}

const keysString = (keyChar, modifiers = []) => {
	return modifiers
		.map(mod => TRANSLATIONS[mod])
		.concat(keyChar.toUpperCase())
		.join('+')
}

const getKeyshortcuts = ({ keyChar, keyModifiers = [] }) => {
	return keyModifiers
		.map(mod => MODIFIERS[mod])
		.concat(keyChar)
		.join('+')
}

const getKeys = (isMobile, { keyChar, keyModifiers }) => {
	return (!isMobile && keyChar)
		? `(${keysString(keyChar, keyModifiers)})`
		: ''
}

const isDisabled = (actionEntry, $editor) => {
	return actionEntry.action && !actionEntry.action($editor.can())
}

const getIsActive = ({ isActive }, $editor) => {
	if (!isActive) {
		return false
	}

	const args = Array.isArray(isActive)
		? isActive
		: [isActive]

	return $editor.isActive(...args)
}

const getActionState = (actionEntry, $editor) => {
	const active = getIsActive(actionEntry, $editor)

	return {
		ariaLabel: actionEntry.label,
		disabled: isDisabled(actionEntry, $editor),
		class: getEntryClasses(actionEntry, active),
		active,
	}
}

export {
	isDisabled,
	getIsActive,
	getKeys,
	getKeyshortcuts,
	getEntryClasses,
	getActionState,
}
