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
			:modelValue="ends[end]"
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
import type { IFile } from '@nextcloud/files'
import type { ComparedEnds, VersionEntry } from '../comparison/versionEnds.ts'

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
import { formatDate, versionNode } from '../comparison/versionEnds.ts'
import { useFileVersions } from '../comparison/versions.ts'
import { logger } from '../helpers/logger.ts'

const props = defineProps<{
	/** The end this picker changes */
	end: 'from' | 'to'
	ends: ComparedEnds
	/** The older file compared */
	base: IFile
	/** The newer file compared */
	file: IFile
	/** Before, After, From or to, as the view names this end */
	prefix: 'before' | 'after' | 'from' | 'to'
	/** When the server last changed the text loaded for this end, in seconds */
	modified?: number
}>()

const fileVersions = useFileVersions(props.ends.fileId)
const node = computed(() => props.end === 'from' ? props.base : props.file)

/**
 * The name of a version: the current file, or the date it was saved.
 *
 * @param id The end.
 * @param seconds When it was saved.
 * @param style How much of the date to show.
 */
function versionName(id: string, seconds: number, style: 'short' | 'seconds' | 'long' = 'short') {
	return id === 'current'
		? t('text', 'Current version, {date}', { date: formatDate(seconds, style) })
		: formatDate(seconds, style)
}

// The current file may have changed since its node was made
const seconds = computed(() => props.ends[props.end] === 'current' && props.modified !== undefined
	? props.modified
	: Math.floor((node.value.mtime?.getTime() ?? 0) / 1000))

const fullName = computed(() => versionName(props.ends[props.end], seconds.value, 'long'))

// Both ends saved within one minute are told apart by their seconds
const style = computed(() => {
	const other = props.end === 'from' ? props.file : props.base
	return formatDate(seconds.value) === formatDate(Math.floor((other.mtime?.getTime() ?? 0) / 1000)) ? 'seconds' : 'short'
})

const menuName = computed(() => {
	const version = versionName(props.ends[props.end], seconds.value, style.value)
	switch (props.prefix) {
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
	const otherId = props.ends[props.end === 'from' ? 'to' : 'from']
	// The other end may be gone from the list, as after a failed load: its node still knows when it was saved
	const otherNode = props.end === 'from' ? props.file : props.base
	const otherMtime = versions.find(({ id }) => id === otherId)?.mtime ?? Math.floor((otherNode.mtime?.getTime() ?? 0) / 1000)
	// Versions saved within one minute are told apart by their seconds
	const minutes = versions.map(({ mtime }) => formatDate(mtime))
	return versions.map((entry, index) => {
		const disabled = entry.id === otherId || (props.end === 'from' ? entry.mtime >= otherMtime : entry.mtime <= otherMtime)
		const date = formatDate(entry.mtime, minutes.indexOf(minutes[index]!) === minutes.lastIndexOf(minutes[index]!) ? 'short' : 'seconds')
		const current = entry.id === 'current'
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
	const versions = fileVersions.versions.value ?? []
	const path = fileVersions.path.value
	if (entry.id === props.ends[props.end] || path === undefined) {
		return
	}
	const ends = { ...props.ends, [props.end]: entry.id }
	// The other end may be gone from the list, as after a failed load: it stays
	// until it is changed too
	const otherNode = props.end === 'from' ? props.file : props.base
	const describe = (id: string) => {
		const seconds = versions.find((version) => version.id === id)?.mtime ?? Math.floor((otherNode.mtime?.getTime() ?? 0) / 1000)
		return id === 'current' ? t('text', 'the current version') : formatDate(seconds)
	}
	handOver(ends, props.end, t('text', 'Comparing {from} with {to}', { from: describe(ends.from), to: describe(ends.to) }))

	const changed = versionNode(entry, props.ends.fileId, path)
	const [base, file] = props.end === 'from' ? [changed, props.file] : [props.base, changed]
	getViewer().compare(file, base).catch((exception) => {
		logger.error('Could not compare other versions', { exception })
	})
}

onMounted(async () => {
	if (takeFocus(props.ends, props.end)) {
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
