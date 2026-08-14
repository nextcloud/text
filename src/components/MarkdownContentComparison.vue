<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section class="text-comparison" :aria-label="t('text', 'Version comparison')">
		<header class="text-comparison__header">
			<h2>{{ t('text', 'Changes') }}</h2>
			<div v-if="!renderedLimitReason" class="text-comparison__changes-controls">
				<p class="text-comparison__changes-count">
					{{ n('text', '%n change', '%n changes', activeGroups.length) }}
				</p>
				<label v-if="formattingCount" class="text-comparison__filter">
					<input v-model="hidePureFormatting" type="checkbox">
					<span>{{ t('text', 'Hide formatting-only changes') }}</span>
					<small v-if="hidePureFormatting">{{ t('text', '{count} hidden', { count: formattingCount }) }}</small>
				</label>
			</div>
		</header>

		<div
			v-if="renderedLimitReason"
			class="text-comparison__rendered-limit"
			data-comparison-rendered-limit
			role="status">
			{{ renderedLimitReason === 'size'
				? t('text', 'This comparison is too large for a rendered view.')
				: t('text', 'This comparison has too many changes for a rendered view.') }}
		</div>
		<div v-else-if="activeGroups.length" class="text-comparison__changes-content">
			<ComparisonChangeList
				:afterDocument="originalAfter!"
				:beforeDocument="originalBefore!"
				:currentId="currentId || undefined"
				:groups="activeGroups"
				@select="currentId = $event" />
		</div>
		<div
			v-else-if="model.descriptors.length"
			class="text-comparison__empty"
			data-comparison-empty="filtered"
			role="status">
			{{ t('text', 'All rendered changes are formatting-only and hidden by the current filter.') }}
		</div>
		<div
			v-else-if="rawDifferent"
			class="text-comparison__empty"
			data-comparison-empty="syntax"
			role="status">
			{{ t('text', 'No rendered differences — Markdown syntax differs.') }}
		</div>
		<div
			v-else
			class="text-comparison__empty"
			data-comparison-empty="identical"
			role="status">
			{{ t('text', 'No differences.') }}
		</div>
	</section>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/core'

import { n, t } from '@nextcloud/l10n'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ComparisonChangeList from './ComparisonChangeList.vue'
import {
	currentIdAfterFilter,
	groupComparisonDescriptors,
	visibleDescriptorIds,
} from '../comparison/comparisonNavigation.ts'
import { createComparisonEditor } from '../comparison/createComparisonEditor.ts'
import {
	ComparisonModelLimitError,
	createMarkdownComparisonModel,
} from '../comparison/markdownComparison.ts'
import { exceedsRenderedComparisonLimit } from '../comparison/renderedComparisonLimit.ts'

const props = defineProps<{
	beforeContent: string
	afterContent: string
	fileId?: number
	filePath?: string
	shareToken?: string
	noLazyImages?: boolean
	openLinkHandler?: (href: string) => void
}>()
const emit = defineEmits<{ ready: [] }>()
let renderedLimitReason: 'size' | 'complexity' | null
	= exceedsRenderedComparisonLimit(props.beforeContent, props.afterContent) ? 'size' : null

const runtime = renderedLimitReason ? null : createRuntime()
const model = runtime?.model ?? { descriptors: [] }
const originalAfter = runtime?.afterEditor.state.doc
const originalBefore = runtime?.beforeEditor.state.doc
const rawDifferent = props.beforeContent !== props.afterContent
const hidePureFormatting = ref(false)
const formattingCount = model.descriptors
	.filter(({ facets }) => facets.length === 1 && facets[0] === 'formatting')
	.length
const visibleIds = computed(() => visibleDescriptorIds(model.descriptors, hidePureFormatting.value))
const activeDescriptors = computed(() => {
	const active = new Set(visibleIds.value)
	return model.descriptors.filter(({ id }) => active.has(id))
})
const activeGroups = computed(() => groupComparisonDescriptors(activeDescriptors.value))
const activeIds = computed(() => activeGroups.value.map(({ id }) => id))
const currentId = ref<string | null>(activeIds.value[0] ?? null)

/** Create both immutable documents atomically with one shared schema. */
function createRuntime() {
	const editors: Editor[] = []
	try {
		const options = {
			filePath: props.filePath,
			noLazyImages: props.noLazyImages,
			openLink: props.openLinkHandler,
		}
		const beforeEditor = createComparisonEditor(props.beforeContent, options)
		editors.push(beforeEditor)
		const afterEditor = createComparisonEditor(props.afterContent, {
			...options,
			schema: beforeEditor.schema,
		})
		editors.push(afterEditor)
		return {
			afterEditor,
			beforeEditor,
			model: createMarkdownComparisonModel(beforeEditor.state.doc, afterEditor.state.doc),
		}
	} catch (error) {
		for (const editor of editors) {
			editor.destroy()
		}
		if (error instanceof ComparisonModelLimitError) {
			renderedLimitReason = 'complexity'
			return null
		}
		throw error
	}
}

watch(hidePureFormatting, () => {
	currentId.value = currentIdAfterFilter(model.descriptors, activeIds.value, currentId.value)
})

onMounted(async () => {
	await nextTick()
	emit('ready')
})

onBeforeUnmount(() => {
	runtime?.beforeEditor.destroy()
	runtime?.afterEditor.destroy()
})
</script>

<style lang="scss">
.text-comparison-root,
.text-comparison {
	inline-size: 100%;
}

.text-comparison {
	&__header,
	&__changes-content,
	&__empty,
	&__rendered-limit {
		max-inline-size: 1040px;
		margin-inline: auto;
		padding: 16px;
	}

	&__header,
	&__changes-controls,
	&__filter {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	&__header,
	&__changes-controls {
		justify-content: space-between;
	}

	&__header h2,
	&__changes-count {
		margin: 0;
	}
}
</style>
