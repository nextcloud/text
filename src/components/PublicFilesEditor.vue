<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcModal v-if="active" :name="fileName" @close="close">
		<EditorReloader
			:fileId
			:relativePath
			:active
			:shareToken
			autofocus
			:mime="mimeType" />
	</NcModal>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import NcModal from '@nextcloud/vue/components/NcModal'

const props = defineProps <{
	fileId?: number
	relativePath?: string
	active?: boolean
	shareToken?: string
	mimeType?: string
}>()

const emit = defineEmits(['close'])

const EditorReloader = defineAsyncComponent(() => import('./EditorReloader.vue'))

const fileName = computed(() => props.relativePath
	? props.relativePath.substring(props.relativePath.lastIndexOf('/') + 1)
	: '')

const close = () => emit('close')

</script>
