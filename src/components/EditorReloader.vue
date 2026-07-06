<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<CollaborativeEditor
		v-if="!reloading"
		ref="editor-component"
		v-bind="props"
		@focus="$emit('focus')"
		@push:forbidden="$emit('push:forbidden')"
		@reload="reloading = true">
		<template v-if="$slots.header" #header>
			<slot name="header" />
		</template>
		<template v-if="$slots.readonlyBar" #readonlyBar>
			<slot name="readonlyBar" />
		</template>
	</CollaborativeEditor>
</template>

<script setup lang="ts">
import type { ComponentInstance, ShallowRef } from 'vue'

import { nextTick, ref, useTemplateRef, watch } from 'vue'
import CollaborativeEditor from './CollaborativeEditor.vue'
const props = defineProps(CollaborativeEditor.props)
defineEmits(['focus', 'push:forbidden'])
const reloading = ref(false)
watch(reloading, (val) => {
	if (val) {
		nextTick(() => {
			reloading.value = false
		})
	}
})

const editorComponent = useTemplateRef('editor-component') as Readonly<ShallowRef<ComponentInstance<typeof CollaborativeEditor | null>>>
defineExpose({
	get editor() {
		return editorComponent.value?.editor
	},
	get setContent() {
		return editorComponent.value?.setContent
	},
	get save() {
		return editorComponent.value?.save
	},
	get saveWhenDirty() {
		return editorComponent.value?.saveWhenDirty
	},
	get close() {
		return editorComponent.value?.close
	},
})
</script>
