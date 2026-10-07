<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="text-version-comparison" data-text-el="version-comparison">
		<NcLoadingIcon v-if="loading" :size="44" />
		<NcEmptyContent v-else-if="error" :name="t('text', 'Could not load the versions to compare')" />
		<MarkdownContentComparison
			v-else
			:beforeContent="beforeContent"
			:afterContent="afterContent"
			:fileId="fileId"
			:filePath="filePath" />
	</div>
</template>

<script setup lang="ts">
import axios from '@nextcloud/axios'
import { t } from '@nextcloud/l10n'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import { logger } from '../helpers/logger.ts'

const props = defineProps<{
	/** WebDAV URL of the older version. */
	source: string
	/** WebDAV URL of the current file. */
	currentSource: string
	fileId?: number
	filePath?: string
}>()
const emit = defineEmits<{ loaded: [] }>()

const MarkdownContentComparison = defineAsyncComponent(() => import('./MarkdownContentComparison.vue'))
const loading = ref(true)
const error = ref(false)
const beforeContent = ref('')
const afterContent = ref('')

onMounted(async () => {
	try {
		const [before, after] = await Promise.all([
			axios.get<string>(props.source, { responseType: 'text' }),
			axios.get<string>(props.currentSource, { responseType: 'text' }),
		])
		beforeContent.value = before.data
		afterContent.value = after.data
	} catch (exception) {
		logger.error('Failed to load versions for comparison', { exception })
		error.value = true
	}
	loading.value = false
	emit('loaded')
})
</script>

<style lang="scss">
.text-version-comparison {
	display: flex;
	align-items: center;
	justify-content: center;
	inline-size: 100%;
	block-size: 100%;
	background-color: var(--color-main-background);
}
</style>
