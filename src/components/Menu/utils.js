/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
	return actionEntry.action && !actionEntry.action($editor.can(), $editor)
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

const getType = (actionEntry) => {
	// isActive stores the value changing on active state change (on click)

	// If it is an array, the button is one of the list of alternative values for a specific option
	// Like ['heading', { level: 1 }]
	if (Array.isArray(actionEntry.isActive)) {
		return 'radio'
	}

	// If it is a string, it toggles a specific option like a checkbox
	if (typeof actionEntry.isActive === 'string') {
		return 'checkbox'
	}

	// Otherwise it is just a button
	return 'button'
}

const getActionState = (actionEntry, $editor) => {
	const active = getIsActive(actionEntry, $editor)

	return {
		disabled: isDisabled(actionEntry, $editor),
		class: getEntryClasses(actionEntry, active),
		active,
		type: getType(actionEntry),
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
