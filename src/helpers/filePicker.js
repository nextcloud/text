/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getFilePickerBuilder } from '@nextcloud/dialogs'

export const buildFilePicker = (startPath) => {
	return getFilePickerBuilder(t('text', 'Select file or folder to link to'))
		.startAt(startPath)
		.allowDirectories(true)
		.setMultiSelect(false)
		.setButtonFactory((nodes, path) => {
			const buttons = []
			const node = nodes?.[0]?.attributes?.displayName || nodes?.[0]?.basename
			const isRoot = nodes?.[0]?.root === nodes?.[0]?.attributes?.filename
			let label = t('text', 'Choose')

			if (nodes.length === 1 && !isRoot) {
				label = t('text', 'Choose {file}', { file: node })
			}

			buttons.push({
				callback: () => {},
				type: 'primary',
				label,
				disabled: isRoot,
			})

			return buttons
		})
		.build()
}
