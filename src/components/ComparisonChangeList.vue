<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<nav
		v-if="edits.length > PAGE_SIZE"
		class="text-comparison__change-pages"
		:aria-label="t('text', 'Change pages')">
		<NcButton
			type="button"
			variant="tertiary"
			:disabled="pageStart === 0"
			@click="movePage(-1)">
			{{ t('text', 'Previous') }}
		</NcButton>
		<span aria-live="polite">
			{{
				t('text', 'Showing changes {from}–{to} of {total}', {
					from: pageStart + 1,
					to: pageEnd,
					total: edits.length,
				})
			}}
		</span>
		<NcButton
			type="button"
			variant="tertiary"
			:disabled="pageEnd === edits.length"
			@click="movePage(1)">
			{{ t('text', 'Next') }}
		</NcButton>
	</nav>
	<ol class="text-comparison__change-list">
		<li v-for="section in sections" :key="section.id">
			<h3 :id="`${listId}-${section.id}-heading`" class="section-heading">
				<button
					type="button"
					class="text-comparison__section-toggle"
					:aria-controls="`${listId}-${section.id}-group`"
					:aria-expanded="!collapsed.has(section.id)"
					:data-comparison-section="section.id"
					@click="toggle(section.id)">
					<span class="caret" aria-hidden="true">
						{{ collapsed.has(section.id) ? '▸' : '▾' }}
					</span>
					<span class="section-title">
						{{ section.title || t('text', 'Document start') }}
					</span>
					<span class="count">
						{{ n('text', '%n change', '%n changes', section.edits.length) }}
					</span>
				</button>
			</h3>
			<ul
				v-if="!collapsed.has(section.id)"
				:id="`${listId}-${section.id}-group`"
				class="rows"
				:aria-labelledby="`${listId}-${section.id}-heading`">
				<li v-for="item in section.records" :key="item.id">
					<button
						type="button"
						class="text-comparison__change-item"
						:aria-current="item.id === currentId ? 'true' : undefined"
						:aria-label="item.accessibleLabel"
						:data-comparison-select="item.id"
						:data-operation-symbol="OPS[item.operation][0]"
						@click="emit('select', item.id)">
						<span class="text-comparison__change-item-content copy" :class="{ 'copy--label-first': item.textUnchanged }">
							<span class="preview" dir="auto" aria-hidden="true">
								<template v-for="(preview, index) in item.previews" :key="preview.id">
									<span
										v-if="index > 0"
										class="separator">;
									</span>
									<ins v-if="preview.operation === 'insert'" class="text-comparison__preview-after">{{ preview.after }}</ins>
									<del v-else-if="preview.operation === 'delete'" class="text-comparison__preview-before">{{ preview.before }}</del>
									<template v-else-if="preview.textUnchanged">
										{{ preview.before }}
									</template>
									<template v-else>
										<del class="text-comparison__preview-before">{{
											preview.before
										}}</del>
										<span class="arrow" aria-hidden="true">
											→
										</span>
										<ins class="text-comparison__preview-after">{{
											preview.after
										}}</ins>
									</template>
								</template>
							</span>
							<span class="title">
								<strong class="label">{{
									item.label
								}}</strong>
								<span class="context">{{
									item.context
								}}</span>
								<span
									v-if="item.memberCount > 1"
									class="badge">
									{{
										n('text', '%n edit', '%n edits', item.memberCount)
									}}
								</span>
								<span v-if="item.block" class="badge" :aria-label=" t('text', 'Block-level change; fine inline detail is unavailable') ">
									{{ t('text', 'Block-level') }}
								</span>
							</span>
						</span>
					</button>
				</li>
			</ul>
		</li>
	</ol>
</template>

<script setup lang="ts">
import type { Node } from '@tiptap/pm/model'
import type { ComparisonDescriptor as Descriptor, ComparisonEdit as Edit } from '../comparison/markdownComparisonTypes.ts'

import { n, t } from '@nextcloud/l10n'
import { computed, reactive, ref, useId, watch } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import { selectComparisonSignal as selectSignal, comparisonSignalLabel as signalLabel } from '../comparison/comparisonPresentation.ts'
import { buildComparisonSections as buildSections } from '../comparison/comparisonSections.ts'

const props = defineProps<{
	edits: readonly Edit[]
	currentId?: string
	beforeDocument: Node
	afterDocument: Node
}>()
const emit = defineEmits<{
	select: [id: string]
	currentLabel: [label: string]
}>()
const PAGE_SIZE = 80
const PREVIEW_LABELS = {
	'front-matter': () => t('text', 'Front matter changed'),
	image: () => t('text', 'Image changed'),
	mention: () => t('text', 'Mention changed'),
	mathematics: () => t('text', 'Mathematics changed'),
	'footnote-reference': () => t('text', 'Footnote changed'),
	'horizontal-rule': () => t('text', 'Divider changed'),
	'changed-content': () => t('text', 'Changed content'),
}
const CONTEXT = {
	paragraph: () => t('text', 'Paragraph'),
	heading: () => t('text', 'Heading'),
	'list-item': () => t('text', 'List item'),
	task: () => t('text', 'Task'),
	table: () => t('text', 'Table'),
	'table-row': () => t('text', 'Table row'),
	'table-cell': () => t('text', 'Table cell'),
	image: () => t('text', 'Image'),
	'code-block': () => t('text', 'Code block'),
	quote: () => t('text', 'Quote'),
	callout: () => t('text', 'Callout'),
	details: () => t('text', 'Details'),
	footnote: () => t('text', 'Footnote'),
	'footnote-reference': () => t('text', 'Footnote reference'),
	'front-matter': () => t('text', 'Front matter'),
	mathematics: () => t('text', 'Mathematics'),
	mention: () => t('text', 'Mention'),
	preview: () => t('text', 'Link preview'),
	unknown: () => t('text', 'Changed content'),
}
const OPS = {
	insert: ['+', () => t('text', 'Added')],
	delete: ['−', () => t('text', 'Removed')],
	replace: ['↔', () => t('text', 'Changed')],
	move: ['↳', () => t('text', 'Moved')],
} as const
const collapsed = reactive(new Set<string>())
const listId = useId()
const pageStart = ref(pageFor(props.currentId))
const pageEnd = computed(() => Math.min(pageStart.value + PAGE_SIZE, props.edits.length))
const visibleEdits = computed(() => props.edits.slice(pageStart.value, pageEnd.value))
const sections = computed(() => buildSections(
	visibleEdits.value,
	props.beforeDocument,
	props.afterDocument,
).map((section) => ({
	...section,
	records: section.edits.map((edit) => record(edit, section.title)),
})))
const records = computed(() => sections.value.flatMap(({ records: sectionRecords }) => sectionRecords))

watch(
	[records, () => props.currentId],
	() => {
		const current = records.value.find(({ id }) => id === props.currentId)
		if (current) {
			emit('currentLabel', current.label)
		} else if (
			!props.currentId
			|| !props.edits.some(({ id }) => id === props.currentId)
		) {
			emit('currentLabel', '')
		}
	},
	{ immediate: true },
)
watch([() => props.currentId, () => props.edits], ([id]) => {
	pageStart.value = pageFor(id)
	const section = sections.value.find(({ edits }) => edits.some((edit) => edit.id === id))
	if (section) {
		collapsed.delete(section.id)
	}
})

function pageFor(id?: string) {
	const index = id ? props.edits.findIndex((edit) => edit.id === id) : -1
	return index < 0 ? 0 : Math.floor(index / PAGE_SIZE) * PAGE_SIZE
}
function movePage(offset: number) {
	const maximum = Math.max(
		0,
		Math.floor((props.edits.length - 1) / PAGE_SIZE) * PAGE_SIZE,
	)
	pageStart.value = Math.min(
		maximum,
		Math.max(0, pageStart.value + offset * PAGE_SIZE),
	)
}
function toggle(id: string) {
	if (collapsed.has(id)) {
		collapsed.delete(id)
	} else {
		collapsed.add(id)
	}
}
function record(edit: Edit, sectionTitle: string) {
	const descriptor = edit.primary
	const previews = edit.descriptors.map((member) => {
		let before = previewSide(member.preview.before)
		let after = previewSide(member.preview.after)
		const textUnchanged = before === after
		if (member.operation === 'insert') {
			after ||= t('text', 'Content added')
		} else if (member.operation === 'delete') {
			before ||= t('text', 'Content removed')
		} else if (textUnchanged) {
			before = after = before || t('text', 'Content changed')
		} else {
			before ||= t('text', 'No content')
			after ||= t('text', 'No content')
		}
		return {
			id: member.id,
			operation: member.operation,
			before,
			after,
			textUnchanged,
			accessible: member.operation === 'insert'
				? after
				: member.operation === 'delete'
					? before
					: textUnchanged ? before : `${before} → ${after}`,
		}
	})
	const preview = previews.map(({ accessible }) => accessible).join('; ')
	const context = descriptorContext(descriptor, sectionTitle)
	const block = edit.descriptors.some(({ detail }) => detail === 'block')
	const label
		= edit.kind === 'table-column'
			? tableColumnLabel(descriptor)
			: descriptorLabel(descriptor)
	return {
		id: edit.id,
		operation: descriptor.operation,
		block,
		label,
		context,
		previews,
		textUnchanged: previews.every(({ textUnchanged }) => textUnchanged),
		memberCount: edit.descriptors.length,
		accessibleLabel: [
			operationLabel(descriptor.operation),
			label,
			context,
			preview,
			block ? t('text', 'Block-level') : '',
		]
			.filter(Boolean)
			.join('. '),
	}
}
function previewSide(atom: Descriptor['preview']['before']) {
	if (!atom) {
		return ''
	}
	if (atom.kind === 'text') {
		return atom.text
	}
	return PREVIEW_LABELS[atom.node]()
}
function descriptorLabel(descriptor: Descriptor) {
	if (descriptor.operation === 'move') {
		return t('text', 'Moved section')
	}
	if (descriptor.coarseReason && descriptor.facets.includes('structure')) {
		return t('text', 'Structure changed')
	}
	const signal = selectSignal(descriptor.signals)
	const label = signal && signalLabel(signal)
	if (label) {
		return label
	}
	const context = contextType(descriptor)
	if (descriptor.detail === 'block' && descriptor.operation === 'insert') {
		return t('text', '{context} added', { context })
	}
	if (descriptor.detail === 'block' && descriptor.operation === 'delete') {
		return t('text', '{context} removed', { context })
	}
	return descriptor.facets.includes('structure')
		? t('text', 'Structure changed')
		: t('text', '{context} changed', { context })
}
function tableColumnLabel(descriptor: Descriptor) {
	return descriptor.operation === 'insert'
		? t('text', 'Table column added')
		: descriptor.operation === 'delete'
			? t('text', 'Table column removed')
			: t('text', 'Table column changed')
}
function descriptorContext(descriptor: Descriptor, sectionTitle: string) {
	return sectionTitle
		? t('text', 'Section: {section}', { section: sectionTitle })
		: contextType(descriptor)
}
function contextType(descriptor: Descriptor) {
	const code
		= descriptor.operation === 'delete'
			? descriptor.context.before?.code
			: (descriptor.context.after?.code ?? descriptor.context.before?.code)
	return CONTEXT[code ?? 'unknown']()
}
function operationLabel(operation: Descriptor['operation']) {
	return OPS[operation][1]()
}
</script>

<style scoped lang="scss">
$g: var(--default-grid-baseline);
$border: var(--color-border);
$primary: var(--color-primary-element);

.text-comparison {
	&__change-pages {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(2 * $g);
		padding-block: calc(2 * $g);
	}
	&__change-list,
	.rows {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.section-heading {
		position: sticky;
		top: 0;
		z-index: 1;
		margin: 0;
		background: var(--color-main-background);
	}
	&__section-toggle,
	&__change-item {
		inline-size: 100%;
		margin: 0 !important;
		border: 0;
		border-block-end: 1px solid $border;
		border-radius: 0;
		background: transparent;
		text-align: start;
	}
	&__section-toggle {
		display: flex;
		align-items: center;
		gap: calc(2 * $g);
	}
	.count {
		margin-inline-start: auto;
	}
	&__change-item {
		display: grid;
		grid-template-columns: calc(6 * $g) minmax(0, 1fr) calc(3 * $g);
		align-items: center;
		column-gap: calc(2 * $g);
		padding: calc(2 * $g);
		&::before {
			content: attr(data-operation-symbol);
		}
		&::after {
			content: '›';
		}
		&[aria-current='true'] {
			background: var(--color-primary-element-light);
		}
	}
	&__section-toggle:focus-visible,
	&__change-item:focus-visible {
		outline: 2px solid $primary !important;
		outline-offset: -2px;
	}
	.copy {
		display: flex;
		flex-direction: column;
		gap: $g;
		min-inline-size: 0;
		overflow-wrap: anywhere;
	}
	.copy--label-first .preview {
		order: 2;
	}
	.copy--label-first .title {
		order: 1;
	}
	.preview {
		min-inline-size: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	&__preview-before,
	&__preview-after {
		padding-inline: calc(0.5 * $g);
	}
	&__preview-before {
		background: var(--color-error);
		text-decoration: line-through;
	}
	&__preview-after {
		background: var(--color-success);
	}
	.title {
		display: flex;
		align-items: center;
		gap: calc(1.5 * $g);
		min-inline-size: 0;
		overflow: hidden;
		white-space: nowrap;
	}
	.label {
		flex: none;
	}
	.context {
		min-inline-size: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.badge {
		flex: none;
	}
}
.text-comparison--single .preview {
	white-space: normal;
}
.text-comparison--single .title {
	display: grid;
	grid-template-columns: minmax(0, 1fr) repeat(2, max-content);
}
.text-comparison--single .label {
	grid-column: 1 / -1;
}
</style>
