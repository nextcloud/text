<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'

import { computed } from 'vue'
import ViewerComponent from '../components/ViewerComponent.vue'

const props = defineProps<{
	file: IFile
	files?: IFile[]
	editing?: boolean
	isSidebarShown?: boolean
	maxHeight?: number
	maxWidth?: number
}>()

const emit = defineEmits<{
	loaded: []
	errored: [error: Error]
}>()

const filename = computed(() => props.file?.path ?? null)
const fileid = computed(() => props.file?.fileid ?? undefined)
const mime = computed(() => props.file?.mime ?? null)

function onLoadedHandler() {
	emit('loaded')
}
</script>

<template>
	<ViewerComponent
		:filename="filename"
		:fileid="fileid"
		:mime="mime"
		:active="true"
		:onLoadedHandler="onLoadedHandler" />
</template>
