/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type InjectionKey, inject, provide } from 'vue'

interface FileProps {
	fileId?: number
	relativePath?: string
}

export const filePropsKey = Symbol('tiptap:file:props') as InjectionKey<FileProps>

/**
 *
 * @param props
 */
export function provideFileProps(props: FileProps) {
	provide(filePropsKey, {
		fileId: props.fileId,
		relativePath: props.relativePath,
	})
}

/**
 *
 */
export function useFileProps() {
	return inject(filePropsKey) || {}
}
