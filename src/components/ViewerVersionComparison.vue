<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section
		class="text-comparison text-version-comparison"
		:class="`text-version-comparison--${part}`"
		:aria-label="t('text', 'Version comparison')"
		data-text-el="version-comparison">
		<NcEmptyContent
			v-if="error"
			:name="t('text', 'Could not load the versions to compare')"
			:description="unsaved ? t('text', 'The latest edits could not be saved before comparing. Try again to compare the file as it is stored.') : pair && t('text', 'A version may no longer exist. Choose other versions or try again.')">
			<template #action>
				<div class="text-version-comparison__recover">
					<template v-if="pair">
						<ComparisonVersionPicker
							v-if="part !== 'after'"
							end="from"
							:pair
							:part />
						<ComparisonVersionPicker
							v-if="part !== 'before'"
							end="to"
							:pair
							:part />
					</template>
					<NcButton v-if="part !== 'before'" variant="primary" @click="reloadComparison">
						{{ t('text', 'Try again') }}
					</NcButton>
				</div>
			</template>
		</NcEmptyContent>
		<NcLoadingIcon v-else-if="!session" class="text-version-comparison__loading" :size="44" />
		<template v-else>
			<!-- One header across the panes: the filter on the left, the navigation on the right.
			     The list of changes names the versions compared here; the documents in their titles. -->
			<header v-if="!session.failed || (pair && part === 'changes')" class="text-comparison__header">
				<template v-if="pair && part === 'changes'">
					<ComparisonVersionPicker
						end="from"
						:pair
						:part />
					<ComparisonVersionPicker
						end="to"
						:pair
						:part />
				</template>
				<template v-if="!session.failed">
					<ComparisonNavigation v-if="part === 'after'" :session="session" />
					<ComparisonFilter v-else :session="session" />
				</template>
			</header>
			<!-- Once per view: the versions compared after choosing others -->
			<p
				v-if="pair && part !== 'before'"
				class="text-comparison__sr-only"
				aria-live="polite"
				aria-atomic="true">
				{{ announcement }}
			</p>
			<MarkdownSourceFallback
				v-if="session.failed"
				:beforeContent="session.beforeContent"
				:afterContent="session.afterContent"
				:side="part === 'changes' ? undefined : part">
				<template v-if="pair && part === 'before'" #titleBefore>
					<ComparisonVersionPicker
						end="from"
						:pair
						:part />
				</template>
				<template v-if="pair && part === 'after'" #titleAfter>
					<ComparisonVersionPicker
						end="to"
						:pair
						:part />
				</template>
			</MarkdownSourceFallback>
			<section v-else-if="part === 'changes'" class="text-comparison__changes">
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
				<ComparisonDocument :session="session" :side="part">
					<template v-if="pair" #title>
						<ComparisonVersionPicker
							:end="part === 'before' ? 'from' : 'to'"
							:pair
							:part />
					</template>
				</ComparisonDocument>
			</template>
		</template>
	</section>
</template>

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'
import type { ComparisonSide } from '../comparison/decorations.ts'

import { t } from '@nextcloud/l10n'
import { computed, ref, watch } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import ComparisonChanges from './ComparisonChanges.vue'
import ComparisonDocument from './ComparisonDocument.vue'
import ComparisonFilter from './ComparisonFilter.vue'
import ComparisonNavigation from './ComparisonNavigation.vue'
import ComparisonVersionPicker from './ComparisonVersionPicker.vue'
import MarkdownSourceFallback from './MarkdownSourceFallback.vue'
import { takeAnnouncement } from '../comparison/focus.ts'
import { useSharedComparison } from '../comparison/sharedComparison.ts'
import { comparedPair } from '../comparison/versionEnds.ts'
import { invalidateFileVersions } from '../comparison/versions.ts'
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

const { session, texts, path, error, unsaved, reload } = useSharedComparison(props.base, props.file)

useComparisonAttachments({ fileId: props.file.fileid, filePath: path })

// Two versions of one file, whose ends can be changed: nothing where versions cannot be listed
const pair = computed(() => comparedPair(props.base, props.file, texts.value))

/** Load both files again, and their versions, after the file changed */
function reloadComparison() {
	if (pair.value) {
		invalidateFileVersions(pair.value.fileId)
	}
	reload()
}

// Said once the new pair is on screen, after a picker changed it. Set a
// moment after the live region appears, or screen readers miss it.
const announcement = ref('')
const pendingAnnouncement = props.part === 'before' || !pair.value ? undefined : takeAnnouncement(pair.value)
if (pendingAnnouncement) {
	watch(session, (loaded) => {
		if (loaded) {
			setTimeout(() => {
				announcement.value = pendingAnnouncement
			}, 150)
		}
	}, { immediate: true })
}

// A version may be gone: the pickers offer the ones there are now
watch(error, (failed) => {
	if (failed && pair.value && props.part !== 'before') {
		invalidateFileVersions(pair.value.fileId)
	}
})

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
		flex-shrink: 0;
		min-block-size: calc(var(--default-clickable-area) + 2 * var(--default-grid-baseline));
	}

	// Side by side, on one line
	&--before .text-comparison__header,
	&--after .text-comparison__header {
		flex-wrap: nowrap;
	}

	// A narrow pane keeps Previous and Next on one line; screen readers hear the
	// position from the live region
	@container (max-width: 300px) {
		.text-comparison__navigation > span {
			display: none;
		}
	}

	&__loading {
		margin: auto;
	}

	&__recover {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: calc(2 * var(--default-grid-baseline));
	}
}
</style>
