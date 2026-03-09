/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { inject, type InjectionKey, provide } from 'vue'

interface FileProps {
	fileId?: number
	relativePath?: string
}

export const filePropsKey = Symbol('tiptap:file:props') as InjectionKey<FileProps>

export const provideFileProps = (props: FileProps) => {
	provide(filePropsKey, {
		fileId: props.fileId,
		relativePath: props.relativePath,
	})
}

export const useFileProps = () => {
	return inject(filePropsKey) || {}
}
