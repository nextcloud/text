/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey } from 'vue'
import type { Context } from './useConnection.ts'

import { inject, provide } from 'vue'

interface EditorProps {
	context: Context
	relativePath?: string
}

interface FileProps {
	fileId?: number
	relativePath?: string
}

export const filePropsKey = Symbol('tiptap:file:props') as InjectionKey<FileProps>

/**
 *
 * @param props to get the file props from
 */
export function provideFileProps(props: EditorProps) {
	provide(filePropsKey, {
		fileId: props.context.type === 'file' ? props.context.id : undefined,
		relativePath: props.relativePath,
	})
}

/**
 *
 */
export function useFileProps() {
	return inject(filePropsKey) || {}
}
