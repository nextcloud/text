/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/*
 * Handle the state of the full editor width toggle.
 *
 * Apply it by setting the css variable on the document.
 * Keep it around after the editor is destroyed for the next mount.
 * Persist it in the user settings.
 *
 */

import axios from '@nextcloud/axios'
import { emit, subscribe } from '@nextcloud/event-bus'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'
import {
	computed,
	inject,
	provide,
	readonly,
	ref,
	watch,
	type InjectionKey,
	type Ref,
} from 'vue'

// Keep the current value around when leaving the editor and reopening
let valueSingleton = loadState('text', 'is_full_width_editor', false)

// This is either the reactive value of the editor width toggle
// or null if the width has already been set outside of text.
export const editorWidthKey = Symbol('text:editor:width') as InjectionKey<
	Readonly<Ref<boolean> | null>
>

const maxWidthSetOutsideOfText = () => {
	const alreadySet = getComputedStyle(document.body).getPropertyValue(
		'--text-editor-max-width',
	)
	const setByText = document.documentElement.style.getPropertyValue(
		'--text-editor-max-width',
	)
	return Boolean(alreadySet) && alreadySet !== setByText
}

export const provideEditorWidth = () => {
	// keep style that is already set - for example by collectives
	if (maxWidthSetOutsideOfText()) {
		provide(editorWidthKey, null)
		return { applyEditorWidth: () => {} }
	}
	const isFullWidth = ref(valueSingleton)
	provide(editorWidthKey, readonly(isFullWidth))
	subscribe('text:editor:full-width', ({ value }) => {
		valueSingleton = value
		isFullWidth.value = value
	})
	const width = computed(() => (isFullWidth.value ? '100%' : '80ch'))
	const applyEditorWidth = () => {
		document.documentElement.style.setProperty(
			'--text-editor-max-width',
			width.value,
		)
	}
	watch(width, applyEditorWidth)
	return { applyEditorWidth }
}

export const useEditorWidth = () => {
	// This will be null if the width is already configured outside of text.
	const isFullWidth = inject(editorWidthKey)
	if (isFullWidth === null) {
		return { canToggleWidth: false }
	}
	const setFullWidth = (checked: boolean) => {
		axios.post(generateUrl('/apps/text/settings'), {
			key: 'is_full_width_editor',
			value: checked ? '1' : '0',
		})
		emit('text:editor:full-width', { value: checked })
	}
	return { canToggleWidth: true, isFullWidth, setFullWidth }
}
