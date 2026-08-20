<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<EditorReloader
		v-if="!useSourceView"
		:fileId="fileid"
		:relativePath="filename"
		:active="active || isEmbedded"
		:autofocus
		:shareToken
		:class="{ 'text-editor--embedding': isEmbedded }"
		:mime />
	<SourceView
		v-else
		:fileid
		:filename
		:isEncrypted
		:mime
		:source
		v-bind="$attrs"
		@loaded="onLoadedHandler"
		@edit="toggleEdit" />
</template>

<script setup lang="ts">
import { getSharingToken } from '@nextcloud/sharing/public'
import { computed, onMounted, provide, ref, useAttrs } from 'vue'
import EditorReloader from './EditorReloader.vue'
import SourceView from './SourceView.vue'

defineOptions({
	inheritAttrs: false,
})

const {
	filename = undefined,
	fileid = undefined,
	// This is a public interface for Viewer we cannot change for now.
	// eslint-disable-next-line vue/no-boolean-default
	autofocus = true,
	shareToken = getSharingToken(),
	mime = undefined,
	source = undefined,
	onLoadedHandler = () => {},
	...props
} = defineProps <{
	filename?: string | undefined
	fileid?: number | undefined
	active: boolean
	autofocus?: boolean
	shareToken?: string
	mime?: string | undefined
	source?: string | undefined
	isEmbedded: boolean
	onLoadedHandler?: () => void
}>()

provide('isEmbedded', props.isEmbedded)

const hasToggledInteractiveEmbedding = ref(false)

const attrs = useAttrs()
const isEncrypted = computed(() => Boolean(attrs.e2EeIsEncrypted))

const useSourceView = computed(() => source
	&& (!fileid
		|| props.isEmbedded
		|| isEncrypted.value)
	&& !hasToggledInteractiveEmbedding.value)

onMounted(() => {
	if (!useSourceView.value) {
		onLoadedHandler()
	}
})

/**
 * Toggle interactive editing
 */
function toggleEdit() {
	hasToggledInteractiveEmbedding.value = true
}

</script>

<style lang="scss" scoped>
.text-editor:not(.viewer__file--hidden) {
	top: 0;
	width: 100%;
	max-width: 100%;
	height: 100%;
	left: 0;
	margin: 0 auto;
	position: relative;
	background-color: var(--color-main-background);

	&.text-editor--embedding {
		min-height: 400px;
	}
}
</style>

<style lang="scss">
@media only screen and (max-width: 512px) {
	// on mobile, modal-container has top: 50px
	.text-editor {
		top: auto;
	}
}

body .toastify.dialogs {
	// Move the dialogs below the toolbar / status
	margin-top: calc(45px + var(--default-clickable-area));
}

.viewer--split .source-viewer .editor__content-wrapper {
	// Account for missing menubar for old version in version comparison
	margin-top: calc(var(--default-clickable-area) + 2 * var(--default-grid-baseline));
}

.viewer[data-handler="text"] .modal-wrapper .modal-container {
	bottom: 0;
}
</style>
