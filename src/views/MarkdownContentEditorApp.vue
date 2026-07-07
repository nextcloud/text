<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<MarkdownContentEditor
		ref="editor-container"
		:content
		:fileId
		:noLazyImages
		:readOnly
		:relativePath="filePath"
		:shareToken
		@ready="emit('ready')"
		@create:content="(c: { markdown: string }) => emit('create:content', c)"
		@update:content="(c: { markdown: string }) => emit('update:content', c)">
		<template v-if="readonlyBarComponent" #readonlyBar>
			<component :is="readonlyBarComponent" v-bind="readonlyBarProps" />
		</template>
	</MarkdownContentEditor>
</template>

<script setup lang='ts'>
import type { ComponentInstance, ShallowRef } from 'vue'

import { useTemplateRef } from 'vue'
import MarkdownContentEditor from '../components/Editor/MarkdownContentEditor.vue'

const {
	fileId = undefined,
	filePath = undefined,
	noLazyImages = false,
	readOnly = false,
	readonlyBarComponent = undefined,
	readonlyBarProps = {},
	shareToken = undefined,
} = defineProps<{
	fileId?: number
	filePath?: string
	noLazyImages?: boolean
	content: string
	readOnly?: boolean
	readonlyBarComponent?: string
	readonlyBarProps?: object
	shareToken?: string
}>()

const emit = defineEmits<{
	ready: []
	'create:content': [{ markdown: string }]
	'update:content': [{ markdown: string }]
}>()

const editorContainer = useTemplateRef('editor-container') as Readonly<ShallowRef<ComponentInstance<typeof MarkdownContentEditor>>>
defineExpose({ editorContainer })

</script>
