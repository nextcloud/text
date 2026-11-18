<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section
		ref="root"
		class="text-comparison text-version-comparison"
		:class="[`text-version-comparison--${part}`, { 'text-version-comparison--spanning': summarySpan }]"
		:aria-label="t('text', 'Version comparison')"
		tabindex="-1"
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
			<!-- One header across the panes: summarizing and the filter on the left, the navigation on the right.
			     The list of changes names the versions compared here; the documents in their titles. -->
			<header v-if="!session.failed || summaryTexts || (pair && part === 'changes')" class="text-comparison__header">
				<template v-if="pair && part === 'changes'">
					<ComparisonVersionPicker end="from" :pair :part />
					<ComparisonVersionPicker end="to" :pair :part />
				</template>
				<VersionSummaryStart
					v-if="summaryTexts && part !== 'after'"
					:key="`${summaryTexts.fromHash}:${summaryTexts.toHash}`"
					:class="{ 'text-comparison__end': part === 'changes' }"
					:ends="pair!"
					:texts="summaryTexts"
					@started="focusSummary" />
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
			<!-- One summary per comparison: above the list of changes, or across both documents
			     from the older one's pane, with room of its height above the newer one, so both start level -->
			<div
				v-if="summaryTexts && part === 'after'"
				class="text-comparison__summary-room"
				:style="{ blockSize: `${summaryHeight}px` }"
				aria-hidden="true" />
			<div
				v-if="summaryTexts && part !== 'after'"
				ref="summaryArea"
				class="text-comparison__summary"
				:style="summarySpan ? { inlineSize: `${summarySpan}px` } : undefined">
				<VersionSummary
					:key="`${summaryTexts.fromHash}:${summaryTexts.toHash}`"
					:ends="pair!"
					:texts="summaryTexts"
					:reload="reloadComparison" />
			</div>
			<MarkdownSourceFallback
				v-if="session.failed"
				:beforeContent="session.beforeContent"
				:afterContent="session.afterContent"
				:side="part === 'changes' ? undefined : part">
				<template v-if="pair && part === 'before'" #titleBefore>
					<ComparisonVersionPicker end="from" :pair :part />
				</template>
				<template v-if="pair && part === 'after'" #titleAfter>
					<ComparisonVersionPicker end="to" :pair :part />
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
						<ComparisonVersionPicker :end="part === 'before' ? 'from' : 'to'" :pair :part />
					</template>
				</ComparisonDocument>
			</template>
		</template>
	</section>
</template>

<script setup lang="ts">
import type { IFile } from '@nextcloud/files'
import type { ComparisonSide } from '../comparison/decorations.ts'

import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { useResizeObserver } from '@vueuse/core'
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
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
import { comparedPair, isCurrent } from '../comparison/versionEnds.ts'
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

// Whether summaries are on for this user, known without a request
const summariesAvailable = loadState('text', 'version_summaries', false)

const { session, texts, path, error, unsaved, summaryHeight, afterPane, reload } = useSharedComparison(props.base, props.file)

useComparisonAttachments({ fileId: props.file.fileid, filePath: path })

// Two versions of one file, whose ends can be changed: nothing where versions cannot be listed
const pair = computed(() => comparedPair(props.base, props.file, texts.value))

// Loaded only for a comparison that can show a summary
const VersionSummary = defineAsyncComponent(() => import('./VersionSummary.vue'))
const VersionSummaryStart = defineAsyncComponent(() => import('./VersionSummaryStart.vue'))
const summaryArea = useTemplateRef<HTMLElement>('summaryArea')
const root = useTemplateRef<HTMLElement>('root')

// Side by side, the summary spans both documents: from the older one's pane
// to the far edge of the newer one's, whichever side each is on
const summarySpan = ref<number>()
if (props.part === 'before') {
	useResizeObserver(summaryArea, ([entry]) => {
		summaryHeight.value = entry?.borderBoxSize[0]?.blockSize ?? 0
	})
	useResizeObserver([root, afterPane], () => {
		const own = root.value?.getBoundingClientRect()
		const other = afterPane.value?.getBoundingClientRect()
		summarySpan.value = own && other ? Math.max(own.right, other.right) - Math.min(own.left, other.left) : undefined
	})
	onBeforeUnmount(() => {
		summaryHeight.value = 0
	})
}
if (props.part === 'after') {
	watch(root, (element) => {
		afterPane.value = element ?? undefined
	}, { immediate: true })
	onBeforeUnmount(() => {
		if (afterPane.value === root.value) {
			afterPane.value = undefined
		}
	})
}

/**
 * Give the keyboard to the summary once the button it was on goes away.
 *
 * @param hadFocus Whether the keyboard was on the button.
 */
function focusSummary(hadFocus: boolean) {
	if (hadFocus) {
		nextTick(() => summaryArea.value?.querySelector<HTMLElement>('[data-text-version-summary]')?.focus())
	}
}

/** Load both files again, and their versions, after the file changed */
function reloadComparison() {
	if (pair.value) {
		invalidateFileVersions(pair.value.fileId)
	}
	// The button goes away while loading: the keyboard comes back to the comparison
	if (root.value?.contains(document.activeElement)) {
		const stop = watch([session, error], ([loaded, failed]) => {
			if (loaded || failed) {
				stop()
				nextTick(() => root.value?.focus())
			}
		})
	}
	reload()
}

const summaryTexts = computed(() => {
	// Nothing is newer than the current file, which Collectives may pass as the older end after a restore
	if (!summariesAvailable || !pair.value || isCurrent(pair.value.from) || !texts.value || !session.value) {
		return undefined
	}
	const { before, after } = texts.value
	const looksSame = !session.value.failed && session.value.changeCount === 0
	return { fromHash: before.sha256, toHash: after.sha256, utf8: before.utf8 && after.utf8, looksSame }
})

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

	// Side by side, on one line, so both headers keep one height: the summary's note gives way first
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

	.text-comparison__summary-room {
		flex-shrink: 0;
	}

	.text-comparison__end {
		margin-inline-start: auto;
	}

	// The summary reaches over the newer document's pane, and is drawn above it
	&--spanning {
		position: relative;
		z-index: 1;
		overflow: visible clip;

		.text-comparison__summary {
			flex-shrink: 0;
		}
	}
}
</style>
