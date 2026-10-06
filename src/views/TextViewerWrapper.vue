<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'

import { computed, onMounted } from 'vue'
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

// Swiping to select text would otherwise step to the next file
onMounted(() => emit('update:canSwipe', false))
</script>

<template>
	<ViewerComponent
		:filename="file.path"
		:fileid="file.fileid"
		:mime="file.mime"
		:source="file.encodedSource"
		:e2EeIsEncrypted="isEncrypted"
		active
		:onLoadedHandler="() => emit('loaded')" />
</template>
