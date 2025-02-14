/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { FilePickerType, getFilePickerBuilder } from '@nextcloud/dialogs'

export const buildFilePicker = (startPath) => {
	return getFilePickerBuilder(t('text', 'Select file or folder to link to'))
		.startAt(startPath)
		.allowDirectories(true)
		.setMultiSelect(false)
		.setType(FilePickerType.Choose)
		.build()
}
