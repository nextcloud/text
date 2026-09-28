<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<ViewerVersionComparison
		v-if="versionComparison"
		:source="versionComparison.source"
		:currentSource="versionComparison.currentSource"
		:fileId="versionComparison.fileId"
		:filePath="versionComparison.filePath"
		@loaded="onLoadedHandler" />
	<EditorReloader
		v-else-if="!useSourceView"
		:context="{ id: fileid, type: 'file' }"
		:relativePath="filename"
		:active="active || isEmbedded"
		autofocus
		:shareToken="shareToken || getSharingToken()"
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
import ViewerVersionComparison from './ViewerVersionComparison.vue'
import { openMimetypesMarkdown } from '../helpers/mime.js'

defineOptions({
	inheritAttrs: false,
})

const props = defineProps <{
	filename?: string | undefined
	fileid?: number | undefined
	active?: boolean
	shareToken?: string
	mime?: string | undefined
	source?: string | undefined
	isEmbedded?: boolean
	onLoadedHandler?: () => void
}>()

provide('isEmbedded', props.isEmbedded)

const hasToggledInteractiveEmbedding = ref(false)

const attrs = useAttrs()
const isEncrypted = computed(() => Boolean(attrs.e2EeIsEncrypted))

const useSourceView = computed(() => props.source
	&& (!props.fileid
		|| props.isEmbedded
		|| isEncrypted.value)
	&& !hasToggledInteractiveEmbedding.value)

/**
 * Viewer renders this component for the older version when comparing versions.
 * Return the current file to compare against in that case, null otherwise.
 */
function findVersionComparison() {
	const viewer = window.OCA?.Viewer
	const current = viewer?.fileInfo
	if (!props.source
		|| viewer?.compareFileInfo?.source !== props.source
		|| !current?.source
		|| !props.mime
		|| !openMimetypesMarkdown.includes(props.mime)) {
		return null
	}
	return {
		source: props.source,
		currentSource: current.source as string,
		fileId: current.fileid as number | undefined,
		filePath: current.filename as string | undefined,
	}
}

const versionComparison = findVersionComparison()

onMounted(() => {
	if (!useSourceView.value && !versionComparison && props.onLoadedHandler) {
		props.onLoadedHandler()
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

// The Markdown version comparison shows both versions itself
.viewer--split .viewer__file-wrapper:has(.text-version-comparison) ~ .viewer__file-wrapper {
	display: none;
}

.viewer[data-handler="text"] .modal-wrapper .modal-container {
	bottom: 0;
}
</style>
