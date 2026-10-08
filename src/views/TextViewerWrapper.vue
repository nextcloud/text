<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'
import type { ViewerBeforeDownloadDetail } from '@nextcloud/viewer'

import { computed, onMounted, useHost, useTemplateRef } from 'vue'
import ViewerComponent from '../components/ViewerComponent.vue'

// Of what the viewer gives a handler's element (`ViewerProps` in
// @nextcloud/viewer), the editor only needs the file
const props = defineProps<{
	file: IFile
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

// Swiping to select text would otherwise step to the next file
onMounted(() => emit('update:canSwipe', false))

// A download from the viewer gets the edits not saved yet too
const viewerComponent = useTemplateRef<InstanceType<typeof ViewerComponent>>('viewerComponent')
useHost()?.addEventListener('before-download', (event) => {
	const { detail } = event as CustomEvent<ViewerBeforeDownloadDetail>
	detail.waitUntil(viewerComponent.value?.saveWhenDirty() ?? Promise.resolve())
})
</script>

<template>
	<ViewerComponent
		ref="viewerComponent"
		:filename="file.path"
		:fileid="isVersion ? null : file.fileid"
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
