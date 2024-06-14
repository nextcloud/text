/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const isMac = (navigator.userAgent.includes('Mac'))

const MODIFIERS = {
	Mod: isMac ? 'Meta' : 'Control',
	Alt: 'Alt', // Option key, on Apple computers.
	Control: 'Control',
	Shift: 'Shift',

	// unused
	// AltGraph: 'AltGraph',
	// Meta: 'Meta', // Command key on Apple computers
}

const TRANSLATIONS = {
	[MODIFIERS.Mod]: isMac ? t('text', 'Command') : t('text', 'Control'),
	[MODIFIERS.Control]: t('text', 'Ctrl'),
	[MODIFIERS.Alt]: t('text', isMac ? 'Option' : 'Alt'),
	[MODIFIERS.Shift]: t('text', 'Shift'),
}

export {
	MODIFIERS,
	TRANSLATIONS,
}
