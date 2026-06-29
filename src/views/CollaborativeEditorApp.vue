<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<EditorReloader
		ref="editor-container"
		:fileId
		:relativePath="filePath"
		:shareToken
		mime="text/markdown"
		active
		:autofocus
		@ready="emit('ready')"
		@create:content="(c: { markdown: string }) => emit('create:content', c)"
		@update:content="(c: { markdown: string }) => emit('update:content', c)">
		<template v-if="readonlyBarComponent" #readonlyBar>
			<component :is="readonlyBarComponent" v-bind="readonlyBarProps" />
		</template>
	</EditorReloader>
</template>

<script setup lang='ts'>
import type { ComponentInstance, ShallowRef } from 'vue'

import { useTemplateRef } from 'vue'
import EditorReloader from '../components/EditorReloader.vue'

const {
	fileId = undefined,
	filePath = undefined,
	autofocus = false,
	readonlyBarComponent = undefined,
	readonlyBarProps = {},
	shareToken = undefined,
} = defineProps<{
	fileId?: number
	filePath?: string
	autofocus?: boolean
	readonlyBarComponent?: string
	readonlyBarProps?: object
	shareToken?: string
}>()

const emit = defineEmits<{
	(e: 'ready'): void
	(e: 'create:content', content: { markdown: string }): void
	(e: 'update:content', content: { markdown: string }): void
}>()

const editorContainer = useTemplateRef('editor-container') as Readonly<ShallowRef<ComponentInstance<typeof EditorReloader>>>
defineExpose({ editorContainer })

</script>
