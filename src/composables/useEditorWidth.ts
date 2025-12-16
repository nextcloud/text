/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/*
 * Handle the state of the full editor width toggle.
 *
 * If the css variable `--text-editor-max-width` is already set
 * for `document.body` it will be left as is and
 * no toggle will be shown in the text ui.
 * This way the collectives app handles it's per document width setting.
 *
 * Otherwise this composable handles the `is_full_width_editor` initial state.
 * It sets the css variable on the document accordingly.
 * The state is stored in a singleton to preserve and reuse it on the next mount.
 * It is persisted in the user settings across page reloads.
 *
 */

import axios from '@nextcloud/axios'
import { emit, subscribe } from '@nextcloud/event-bus'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'
import { useIsMobile } from '@nextcloud/vue/composables/useIsMobile'
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
import { useEditorFlags } from './useEditorFlags'

// Keep the current value around when leaving the editor and reopening
let valueSingleton = loadState('text', 'is_full_width_editor', false)

// This is either the reactive value of the editor width toggle
// or null if the width has already been set outside of text.
export const editorWidthKey = Symbol('text:editor:width') as InjectionKey<
	Readonly<Ref<boolean> | null>
>

// desktop: leave space for floating buttons and outline (2 * 40px) if necessary
// wide screen: 80ch content, narrow screen: full width
const editorWidthDesktop = 'min(80ch, 100%)'
const editorWidthDesktopEnhanced = 'min(80ch, (100% - 2 * 40px))'
const fullEditorWidthDesktop = '100%'
const fullEditorWidthDesktopEnhanced = 'calc(100% - 2 * 40px)'
const editorWidthMobile = 'min(80ch, 100%)'
const fullEditorWidthMobile = '100%'

/**
 * Detect if other apps (such as collectives) already configured texts max width.
 *
 * Check if document.body has a css variable `--text-editor-max-width` (either set or inherited).
 * Get the value set by text in the documentElement style.
 * If both values are set and match we assume text is handling the width.
 */
function maxWidthSetOutsideOfText() {
	const alreadySet = getComputedStyle(document.body).getPropertyValue(
		'--text-editor-max-width',
	)
	const setByText = document.documentElement.style.getPropertyValue(
		'--text-editor-max-width',
	)
	return Boolean(alreadySet) && alreadySet !== setByText
}

export const provideEditorWidth = (useTableOfContents = true) => {
	const isMobile = useIsMobile()
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
	const defaultEditorWidthDesktop = useTableOfContents
		? editorWidthDesktopEnhanced
		: editorWidthDesktop
	const defaultFullEditorWidthDesktop = useTableOfContents
		? fullEditorWidthDesktopEnhanced
		: fullEditorWidthDesktop
	const defaultEditorWidth = computed(() =>
		isMobile.value ? editorWidthMobile : defaultEditorWidthDesktop,
	)
	const fullEditorWidth = computed(() =>
		isMobile.value ? fullEditorWidthMobile : defaultFullEditorWidthDesktop,
	)
	const width = computed(() =>
		isFullWidth.value ? fullEditorWidth.value : defaultEditorWidth.value,
	)
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
	const isMobile = useIsMobile()
	const { isRichWorkspace } = useEditorFlags()

	// This will be null if the width is already configured outside of text.
	const isFullWidth = inject(editorWidthKey)

	// Disable if `editorWidthKey` got `null` injected or if in rich workspace or mobile view
	if (isFullWidth === null || isRichWorkspace || isMobile.value) {
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
