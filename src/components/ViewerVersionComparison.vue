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
			:description="ends && t('text', 'A version may no longer exist. Choose other versions or try again.')">
			<template #action>
				<div class="text-version-comparison__recover">
					<template v-if="ends">
						<ComparisonVersionPicker
							v-if="part !== 'after'"
							end="from"
							:prefix="part === 'changes' ? 'from' : 'before'"
							:ends
							:base
							:file />
						<ComparisonVersionPicker
							v-if="part !== 'before'"
							end="to"
							:prefix="part === 'changes' ? 'to' : 'after'"
							:ends
							:base
							:file />
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
			<header v-if="!session.failed || (ends && part === 'changes')" class="text-comparison__header">
				<template v-if="ends && part === 'changes'">
					<ComparisonVersionPicker
						end="from"
						prefix="from"
						:ends
						:base
						:file />
					<ComparisonVersionPicker
						end="to"
						prefix="to"
						:ends
						:base
						:file
						:modified="texts?.after.modified" />
				</template>
				<template v-if="!session.failed">
					<ComparisonNavigation v-if="part === 'after'" :session="session" />
					<ComparisonFilter v-else :session="session" />
				</template>
			</header>
			<!-- Once per view: the versions compared after choosing others -->
			<p
				v-if="ends && part !== 'before'"
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
				<template v-if="ends && part === 'before'" #titleBefore>
					<ComparisonVersionPicker
						end="from"
						prefix="before"
						:ends
						:base
						:file />
				</template>
				<template v-if="ends && part === 'after'" #titleAfter>
					<ComparisonVersionPicker
						end="to"
						prefix="after"
						:ends
						:base
						:file
						:modified="texts?.after.modified" />
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
					<template v-if="ends" #title>
						<ComparisonVersionPicker
							:end="part === 'before' ? 'from' : 'to'"
							:prefix="part"
							:ends
							:base
							:file
							:modified="texts?.[part].modified" />
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
import { comparedEnds } from '../comparison/versionEnds.ts'
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

useComparisonAttachments({ fileId: props.file.fileid, filePath: props.file.path })

const { session, texts, error, reload } = useSharedComparison(props.base, props.file)

// Two versions of one file, whose ends can be changed
const ends = computed(() => comparedEnds(props.base, props.file))

/** Load both files again, and their versions, after the file changed */
function reloadComparison() {
	if (ends.value) {
		invalidateFileVersions(ends.value.fileId)
	}
	reload()
}

// Said once the new pair is on screen, after a picker changed it. Set a
// moment after the live region appears, or screen readers miss it.
const announcement = ref('')
const pendingAnnouncement = props.part === 'before' || !ends.value ? undefined : takeAnnouncement(ends.value)
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
	if (failed && ends.value && props.part !== 'before') {
		invalidateFileVersions(ends.value.fileId)
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
