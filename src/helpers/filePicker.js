/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getFilePickerBuilder } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

/**
 * Create a file picker with our defaults
 *
 * @param {string} startPath path to start from
 * @param {boolean} allowDirectories whether to allow selecting directories
 */
export function buildFilePicker(startPath, allowDirectories = true) {
	return getFilePickerBuilder(t('text', 'Select file or folder to link to'))
		.startAt(startPath)
		.allowDirectories(allowDirectories)
		.setMultiSelect(false)
		.setNoMenu(true)
		.setButtonFactory((nodes) => {
			const node = nodes?.[0]
			const nodeName = node?.attributes?.displayName || node?.basename
			const isRoot = node?.root === node?.attributes?.filename
			const disabled = isRoot || (!allowDirectories && !node)

			let label = t('text', 'Choose')
			if (nodes.length === 1 && !isRoot) {
				label = t('text', 'Choose {file}', { file: nodeName })
			}

			return [{
				callback: () => {},
				variant: 'primary',
				label,
				disabled,
			}]
		})
		.build()
}
