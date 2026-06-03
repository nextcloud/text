<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<Editor
		v-if="!reloading"
		v-bind="props"
		@focus="$emit('focus')"
		@reload="reloading = true">
		<template v-if="$slots.readonlyBar" #readonlyBar>
			<slot name="readonlyBar" />
		</template>
	</Editor>
</template>

<script setup lang="ts">
import type { ComponentInstance, ShallowRef } from 'vue'

import { nextTick, ref, useTemplateRef, watch } from 'vue'
import Editor from './Editor.vue'
const props = defineProps(Editor.props)
defineEmits(['focus'])
const reloading = ref(false)
watch(reloading, (val) => {
	if (val) {
		nextTick(() => {
			reloading.value = false
		})
	}
})

const editorComponent = useTemplateRef('editor-component') as Readonly<ShallowRef<ComponentInstance<typeof Editor>>>
const { editor, debugYjsData, setContent, save } = editorComponent.value
defineExpose({ editor, debugYjsData, setContent, save })
</script>
