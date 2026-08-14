<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div ref="host" />
</template>

<script setup lang="ts">
import type { Plugin } from '@tiptap/pm/state'
import type { Editor } from '@tiptap/vue-3'
import type { AppContext } from 'vue'

import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import {
	consumeStateOnlyComparisonEditor,
	registerMountedPlugin,
} from '../comparison/comparisonEditorLifecycle.ts'

type ContentComponent = NonNullable<Editor['contentComponent']>

interface ComparisonComponentInternals {
	ctx: { _: ContentComponent }
	provides: AppContext['provides']
}

const { editor, plugins } = defineProps<{
	editor: Editor
	plugins: readonly Plugin[]
}>()
const emit = defineEmits<{ ready: [] }>()
const INITIALIZATION_ERROR = 'Comparison editor plugin initialization failed'
const host = ref<HTMLElement | null>(null)
const instance = getCurrentInstance()

onMounted(() => {
	if (!instance || !host.value) {
		throw new Error(INITIALIZATION_ERROR)
	}
	const internals = instance as unknown as ComparisonComponentInternals
	const owner = internals.ctx._
	if (owner !== instance
		|| editor.options.element !== null
		|| editor.contentComponent !== null
		|| editor.appContext !== null) {
		throw new Error(INITIALIZATION_ERROR)
	}
	consumeStateOnlyComparisonEditor(editor)

	const appContext: AppContext = {
		...instance.appContext,
		provides: internals.provides,
	}
	setEditorContext(editor, owner, appContext)

	try {
		editor.setOptions({ element: host.value })
		editor.mount(host.value)
		if (editor.view.dom.parentElement !== host.value
			|| editor.contentComponent !== owner
			|| editorAppContext(editor) !== appContext) {
			throw new Error(INITIALIZATION_ERROR)
		}
		for (const plugin of plugins) {
			registerMountedPlugin(editor, plugin)
		}
		emit('ready')
	} catch (error) {
		setEditorContext(editor, null, null)
		throw error
	}
})

onBeforeUnmount(() => {
	setEditorContext(editor, null, null)
})

/**
 * Update Tiptap's public Vue rendering context as one lifecycle operation.
 *
 * @param editorInstance Comparison editor
 * @param contentComponent Owning Vue component instance
 * @param appContext Owning Vue application context
 */
function setEditorContext(
	editorInstance: Editor,
	contentComponent: ContentComponent | null,
	appContext: AppContext | null,
) {
	editorInstance.contentComponent = contentComponent
	editorInstance.appContext = appContext
}

/** @param editorInstance Comparison editor */
function editorAppContext(editorInstance: Editor): AppContext | null {
	return editorInstance.appContext
}
</script>
