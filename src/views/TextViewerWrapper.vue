<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'

import { computed, onMounted } from 'vue'
import ViewerComponent from '../components/ViewerComponent.vue'
import ViewerVersionComparison from '../components/ViewerVersionComparison.vue'
import { openMimetypesMarkdown } from '../helpers/mime.js'

// Of what the viewer gives a handler's element (`ViewerProps` in
// @nextcloud/viewer), the editor only needs the file, and when comparing,
// the files compared and how
const props = defineProps<{
	file: IFile
	files?: IFile[]
	comparison?: 'side-by-side' | 'differences'
}>()

const emit = defineEmits<{
	loaded: []
	'update:canSwipe': [canSwipe: boolean]
	// 'update:comparison': [comparison: 'side-by-side' | 'differences']
}>()

// An end-to-end encrypted file is read from its source, not opened collaboratively
const isEncrypted = computed(() => Boolean(props.file.attributes?.['e2ee-is-encrypted']))
// So is an older version of a file, which carries the file's own id: with it,
// the editor would open the current document rather than that version
const isVersion = computed(() => props.file.root?.startsWith('/versions/') ?? false)
// Side by side, the current file is only read too, like the version next to it
const isReadOnly = computed(() => isVersion.value || props.comparison === 'side-by-side')

const isMarkdown = (file: IFile) => openMimetypesMarkdown.includes(file.mime ?? '')

// The part of a Markdown comparison this element shows, from the first file
// compared to the second: one of the documents side by side, or the changes
const comparisonPart = computed(() => {
	const [base, other] = props.files ?? []
	if (!props.comparison || !base || !other || !isMarkdown(base) || !isMarkdown(other)) {
		return undefined
	}
	if (props.comparison === 'differences') {
		return { base, other, part: 'changes' as const }
	}
	return { base, other, part: props.file.source === base.source ? 'before' as const : 'after' as const }
})

/**
 * Show a change picked in the list in the documents side by side.
 */
function showChange() {
	// Once the viewer takes the view from its element:
	// emit('update:comparison', 'side-by-side')
}

// Swiping to select text would otherwise step to the next file
onMounted(() => emit('update:canSwipe', false))
</script>

<template>
	<ViewerVersionComparison
		v-if="comparisonPart"
		:base="comparisonPart.base"
		:file="comparisonPart.other"
		:part="comparisonPart.part"
		@loaded="emit('loaded')"
		@select="showChange" />
	<ViewerComponent
		v-else
		:filename="file.path"
		:fileid="isReadOnly ? undefined : file.fileid"
		:mime="file.mime"
		:source="file.encodedSource"
		:e2EeIsEncrypted="isEncrypted"
		active
		:onLoadedHandler="() => emit('loaded')" />
</template>

<style lang="scss">
// The viewer centres the element a handler renders and leaves it to size
// itself, which suits a picture. The editor takes the width of its parent
// instead, so left inline the two sized each other and never settled.
text-viewer {
	display: block;
	width: 100%;
	height: 100%;
}
</style>
