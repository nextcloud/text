<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcActions
		ref="actions"
		v-model:open="open"
		class="text-comparison__picker"
		:data-comparison-picker="end"
		:title="fullName"
		:menuName="menuName"
		forceName
		forceMenu
		variant="tertiary">
		<template #icon>
			<HistoryIcon :size="20" />
		</template>
		<!-- Also before the first opening: a menu without actions is not shown at all -->
		<NcActionText v-if="!fileVersions.versions.value && !fileVersions.failed.value">
			{{ t('text', 'Loading versions…') }}
		</NcActionText>
		<template v-else-if="fileVersions.failed.value">
			<NcActionText>{{ t('text', 'Could not load the versions') }}</NcActionText>
			<NcActionButton @click="fileVersions.load()">
				{{ t('text', 'Try again') }}
			</NcActionButton>
		</template>
		<NcActionButton
			v-for="option in options"
			v-else
			:key="option.entry.id"
			type="radio"
			:modelValue="pair[end]"
			:value="option.entry.id"
			:disabled="option.disabled"
			:description="option.description"
			closeAfterClick
			@update:modelValue="choose(option.entry)">
			{{ option.name }}
		</NcActionButton>
		<template v-if="fileVersions.versions.value">
			<NcActionSeparator />
			<NcActionButton @click="fileVersions.refresh()">
				<template #icon>
					<RefreshIcon :size="20" />
				</template>
				{{ t('text', 'Refresh versions') }}
			</NcActionButton>
		</template>
	</NcActions>
</template>

<script setup lang="ts">
import type { ComparisonSide } from '../comparison/decorations.ts'
import type { ComparedPair, End, VersionEntry } from '../comparison/versionEnds.ts'

import { t } from '@nextcloud/l10n'
import { getViewer } from '@nextcloud/viewer'
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import NcActionText from '@nextcloud/vue/components/NcActionText'
import HistoryIcon from 'vue-material-design-icons/History.vue'
import RefreshIcon from 'vue-material-design-icons/Refresh.vue'
import { handOver, takeFocus } from '../comparison/focus.ts'
import { formatDate, formatDates, isCurrent, isOlder, versionNode } from '../comparison/versionEnds.ts'
import { useFileVersions } from '../comparison/versions.ts'
import { logger } from '../helpers/logger.ts'

const props = defineProps<{
	/** The end this picker changes */
	end: End
	/** The versions compared */
	pair: ComparedPair
	/** Where it names its end: Before or After above a document, From or to above the list of changes */
	part: ComparisonSide | 'changes'
}>()

const fileVersions = useFileVersions(props.pair.fileId)
const other = computed<End>(() => props.end === 'from' ? 'to' : 'from')

/**
 * The name of a version: the current file, or the date it was saved.
 *
 * @param id The end.
 * @param date When it was saved.
 */
function versionName(id: string, date: string) {
	return isCurrent(id) ? t('text', 'Current version, {date}', { date }) : date
}

const fullName = computed(() => versionName(props.pair[props.end], formatDate(props.pair.saved[props.end], 'long')))

const menuName = computed(() => {
	// Both ends saved within one minute are told apart by their seconds
	const [date] = formatDates([props.pair.saved[props.end], props.pair.saved[other.value]])
	const version = versionName(props.pair[props.end], date!)
	switch (props.part === 'changes' ? props.end : props.part) {
		case 'before':
			return t('text', 'Before: {version}', { version })
		case 'after':
			return t('text', 'After: {version}', { version })
		case 'from':
			return t('text', 'From {version}', { version })
		default:
			return t('text', 'to {version}', { version })
	}
})

const options = computed(() => {
	const versions = fileVersions.versions.value ?? []
	const otherEnd = { id: props.pair[other.value], mtime: props.pair.saved[other.value] }
	const dates = formatDates(versions.map(({ mtime }) => mtime))
	return versions.map((entry, index) => {
		const disabled = entry.id === otherEnd.id || !(props.end === 'from' ? isOlder(entry, otherEnd) : isOlder(otherEnd, entry))
		const date = dates[index]!
		const current = isCurrent(entry.id)
		const details = [
			// The current version is named as such, its date goes with the details
			current && date,
			entry.author?.displayName ?? t('text', 'Author unknown'),
			entry.label,
			disabled && (props.end === 'from' ? t('text', 'Newer than the other end') : t('text', 'Older than the other end')),
		]
		return {
			entry,
			name: current ? t('text', 'Current version') : date,
			description: details.filter(Boolean).join(' · '),
			disabled,
		}
	})
})

const actions = useTemplateRef<InstanceType<typeof NcActions>>('actions')
const open = ref(false)
watch(open, (isOpen) => {
	if (isOpen) {
		fileVersions.load()
	}
})

/** Give the keyboard to the button that opens the menu */
function focusButton() {
	(actions.value?.$el as HTMLElement | undefined)?.querySelector('button')?.focus()
}

/**
 * Compare another version at this end, keeping the view.
 *
 * @param entry The version chosen.
 */
function choose(entry: VersionEntry) {
	const path = fileVersions.path.value
	if (entry.id === props.pair[props.end] || path === undefined) {
		return
	}
	const ends = { fileId: props.pair.fileId, from: props.pair.from, to: props.pair.to, [props.end]: entry.id }
	// Both ends saved within one minute are told apart by their seconds
	const [fromDate, toDate] = formatDates([props.end === 'from' ? entry.mtime : props.pair.saved.from, props.end === 'to' ? entry.mtime : props.pair.saved.to])
	const describe = (id: string, date: string) => isCurrent(id) ? t('text', 'the current version') : date
	handOver(ends, props.end, t('text', 'Comparing {from} with {to}', { from: describe(ends.from, fromDate!), to: describe(ends.to, toDate!) }))

	const nodes = { ...props.pair.nodes, [props.end]: versionNode(entry, props.pair.fileId, path) }
	getViewer().compare(nodes.to, nodes.from).catch((exception) => {
		logger.error('Could not compare other versions', { exception })
	})
}

onMounted(async () => {
	if (takeFocus(props.pair, props.end)) {
		await nextTick()
		focusButton()
	}
})
</script>

<style lang="scss">
.text-comparison__picker {
	max-inline-size: 100%;

	// One line, so both documents start level; the menu names each version in full
	.button-vue {
		max-inline-size: 100%;
	}

	.button-vue__wrapper {
		justify-content: start;
		min-inline-size: 0;
	}

	.button-vue__text {
		flex-shrink: 1;
		min-inline-size: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
