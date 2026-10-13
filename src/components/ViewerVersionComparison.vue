<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section
		class="text-comparison text-version-comparison"
		:aria-label="t('text', 'Version comparison')"
		data-text-el="version-comparison">
		<NcEmptyContent v-if="error" :name="t('text', 'Could not load the versions to compare')" />
		<NcLoadingIcon v-else-if="!session" class="text-version-comparison__loading" :size="44" />
		<MarkdownSourceFallback
			v-else-if="session.failed"
			:beforeContent="session.beforeContent"
			:afterContent="session.afterContent"
			:side="part === 'changes' ? undefined : part" />
		<template v-else>
			<!-- One header across the panes: the filter on the left, the navigation on the right -->
			<header class="text-comparison__header">
				<ComparisonNavigation v-if="part === 'after'" :session="session" />
				<ComparisonFilter v-else :session="session" />
			</header>
			<section v-if="part === 'changes'" class="text-comparison__changes">
				<ComparisonChanges :session="session" @select="selectChange" />
			</section>
			<template v-else>
				<p
					v-if="part === 'after'"
					class="text-comparison__sr-only"
					aria-live="polite"
					aria-atomic="true">
					{{ session.status.value }}
				</p>
				<ComparisonDocument :session="session" :side="part" />
			</template>
		</template>
	</section>
</template>

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'
import type { ComparisonSide } from '../comparison/decorations.ts'

import { t } from '@nextcloud/l10n'
import { watch } from 'vue'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import ComparisonChanges from './ComparisonChanges.vue'
import ComparisonDocument from './ComparisonDocument.vue'
import ComparisonFilter from './ComparisonFilter.vue'
import ComparisonNavigation from './ComparisonNavigation.vue'
import MarkdownSourceFallback from './MarkdownSourceFallback.vue'
import { useSharedComparison } from '../comparison/sharedComparison.ts'
import { useComparisonAttachments } from '../composables/useComparisonAttachments.ts'

const props = defineProps<{
	/** The older file */
	base: IFile
	/** The newer file */
	file: IFile
	/** One of the documents side by side, or the list of changes */
	part: ComparisonSide | 'changes'
}>()

const emit = defineEmits<{
	loaded: []
	select: [id: string]
}>()

useComparisonAttachments({ fileId: props.file.fileid, filePath: props.file.path })

const { session, error } = useSharedComparison(props.base, props.file)

watch(() => session.value !== undefined || error.value, (settled) => {
	if (settled) {
		emit('loaded')
	}
}, { immediate: true })

/**
 * Make a change picked in the list the current one.
 *
 * @param id Id of the change.
 */
function selectChange(id: string) {
	session.value!.select(id)
	emit('select', id)
}
</script>

<style lang="scss">
@use './../css/comparison.scss';

.text-version-comparison {
	background-color: var(--color-main-background);

	// Both panes' headers line up, whatever each holds
	.text-comparison__header {
		min-block-size: calc(var(--default-clickable-area) + 2 * var(--default-grid-baseline));
	}

	&__loading {
		margin: auto;
	}
}
</style>
