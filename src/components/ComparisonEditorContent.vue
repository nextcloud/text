<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<EditorContent
		class="text-comparison__content"
		role="document"
		:editor="editor" />
</template>

<script setup lang="ts">
import type { Plugin } from '@tiptap/pm/state'
import type { Editor } from '@tiptap/vue-3'

import { EditorContent } from '@tiptap/vue-3'
import { nextTick, onMounted } from 'vue'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ editor: Editor, plugins: readonly Plugin[] }>()
const emit = defineEmits<{ ready: [] }>()
const editor = props.editor
for (const plugin of props.plugins) {
	editor.registerPlugin(plugin)
}

onMounted(async () => {
	await nextTick()
	emit('ready')
})
</script>
