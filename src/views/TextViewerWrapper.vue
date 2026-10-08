<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'

import { computed, onMounted } from 'vue'
import ViewerComponent from '../components/ViewerComponent.vue'
import ViewerVersionComparison from '../components/ViewerVersionComparison.vue'

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
}>()

// An end-to-end encrypted file is read from its source, not opened collaboratively
const isEncrypted = computed(() => Boolean(props.file.attributes?.['e2ee-is-encrypted']))
// So is an older version of a file, which carries the file's own id: with it,
// the editor would open the current document rather than that version
const isVersion = computed(() => props.file.root?.startsWith('/versions/') ?? false)
// Side by side, the current file is only read too, like the version next to it
const isReadOnly = computed(() => isVersion.value || props.comparison === 'side-by-side')

// The differences view shows what changed from the first file to the second
const differences = computed(() => {
	const [base, other] = props.files ?? []
	return props.comparison === 'differences' && base && other ? { base, other } : undefined
})

// Swiping to select text would otherwise step to the next file
onMounted(() => emit('update:canSwipe', false))
</script>

<template>
	<ViewerVersionComparison
		v-if="differences"
		:source="differences.base.encodedSource"
		:currentSource="differences.other.encodedSource"
		:fileId="differences.other.fileid"
		:filePath="differences.other.path"
		@loaded="emit('loaded')" />
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
