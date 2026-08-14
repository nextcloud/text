<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<ol class="text-comparison__change-list">
		<li v-for="section in sections" :key="section.id" class="text-comparison__section">
			<h3 :id="`${listId}-${section.id}-heading`" class="text-comparison__section-heading">
				<button
					type="button"
					class="text-comparison__section-toggle"
					:aria-controls="`${listId}-${section.id}-group`"
					:aria-expanded="!collapsed.has(section.id)"
					:aria-label="section.accessibleLabel"
					:data-comparison-section="section.id"
					@click="toggleSection(section.id)">
					<span class="text-comparison__section-caret" aria-hidden="true">
						{{ collapsed.has(section.id) ? '▸' : '▾' }}
					</span>
					<span class="text-comparison__section-title">
						{{ section.title || t('text', 'Document start') }}
					</span>
					<span class="text-comparison__section-kinds" aria-hidden="true">
						<span
							v-for="kind in section.kinds"
							:key="kind"
							class="text-comparison__kind-dot"
							:class="`text-comparison__kind-dot--${kind}`" />
					</span>
					<span class="text-comparison__section-count">
						{{ n('text', '%n change', '%n changes', section.groups.length) }}
					</span>
				</button>
			</h3>

			<ul
				v-show="!collapsed.has(section.id)"
				:id="`${listId}-${section.id}-group`"
				class="text-comparison__section-rows"
				role="group"
				:aria-labelledby="`${listId}-${section.id}-heading`">
				<li v-for="record in section.records" :key="record.id">
					<button
						type="button"
						class="text-comparison__change-item"
						:aria-current="record.id === currentId ? 'true' : undefined"
						:aria-label="record.accessibleLabel"
						:data-comparison-select="record.id"
						@click="emit('select', record.id)">
						<span
							class="text-comparison__operation"
							:class="`text-comparison__operation--${record.operation}`"
							aria-hidden="true">
							{{ operationSymbol(record.operation) }}
						</span>
						<span
							class="text-comparison__change-copy"
							:class="{ 'text-comparison__change-copy--label-first': record.textUnchanged }">
							<span class="text-comparison__preview" aria-hidden="true">
								<template v-for="(preview, index) in record.previews" :key="preview.id">
									<span v-if="index > 0" class="text-comparison__preview-separator">; </span>
									<template v-if="preview.operation === 'insert'">
										<ins class="text-comparison__preview-after"><bdi dir="auto">{{ preview.after || t('text', 'Content added') }}</bdi></ins>
									</template>
									<template v-else-if="preview.operation === 'delete'">
										<del class="text-comparison__preview-before"><bdi dir="auto">{{ preview.before || t('text', 'Content removed') }}</bdi></del>
									</template>
									<template v-else-if="preview.textUnchanged">
										<bdi dir="auto">{{ preview.before || preview.after || t('text', 'Content changed') }}</bdi>
									</template>
									<template v-else>
										<del class="text-comparison__preview-before"><bdi dir="auto">{{ preview.before || t('text', 'No content') }}</bdi></del>
										<span class="text-comparison__preview-arrow" aria-hidden="true"> → </span>
										<ins class="text-comparison__preview-after"><bdi dir="auto">{{ preview.after || t('text', 'No content') }}</bdi></ins>
									</template>
								</template>
							</span>
							<span class="text-comparison__change-title">
								<strong class="text-comparison__change-label">{{ record.label }}</strong>
								<span class="text-comparison__change-context">{{ record.context }}</span>
								<span
									v-if="record.detail === 'block'"
									class="text-comparison__detail-badge"
									:aria-label="t('text', 'Block-level change; fine inline detail is unavailable')">
									{{ t('text', 'Block-level') }}
								</span>
							</span>
						</span>
						<span class="text-comparison__change-open" aria-hidden="true">›</span>
					</button>
				</li>
			</ul>
		</li>
	</ol>
</template>

<script setup lang="ts">
import type { Node } from '@tiptap/pm/model'
import type { ComparisonDescriptorGroup } from '../comparison/comparisonNavigation.ts'
import type { ComparisonSection } from '../comparison/comparisonSections.ts'
import type { ComparisonDescriptor } from '../comparison/markdownComparison.ts'

import { n, t } from '@nextcloud/l10n'
import { computed, ref, useId, watch } from 'vue'
import { isPureFormatting } from '../comparison/comparisonNavigation.ts'
import { selectComparisonSignal } from '../comparison/comparisonPresentation.ts'
import { buildComparisonSections, headingLocations, nearestHeading } from '../comparison/comparisonSections.ts'

const props = defineProps<{
	groups: readonly ComparisonDescriptorGroup[]
	currentId?: string
	beforeDocument: Node
	afterDocument: Node
}>()

const emit = defineEmits<{
	select: [id: string]
	currentLabel: [label: string]
}>()

const collapsed = ref(new Set<string>())
const listId = useId()
const beforeHeadings = headingLocations(props.beforeDocument)
const afterHeadings = headingLocations(props.afterDocument)

const sections = computed(() => {
	const built = buildComparisonSections(props.groups, props.beforeDocument, props.afterDocument)
	return built.map((section) => ({
		...section,
		accessibleLabel: sectionLabel(section),
		records: section.groups.map((group) => buildRecord(group, section)),
	}))
})
const records = computed(() => sections.value.flatMap(({ records }) => records))

watch(
	[records, () => props.currentId],
	() => emit('currentLabel', records.value.find(({ id }) => id === props.currentId)?.label ?? ''),
	{ immediate: true },
)

/**
 * Keep a selected change reachable even when its section was collapsed.
 */
watch(() => props.currentId, (id) => {
	if (!id) {
		return
	}
	const section = sections.value.find(({ records }) => records.some((record) => record.id === id))
	if (section && collapsed.value.has(section.id)) {
		const next = new Set(collapsed.value)
		next.delete(section.id)
		collapsed.value = next
	}
})

/**
 * @param id Section ID
 */
function toggleSection(id: string) {
	const next = new Set(collapsed.value)
	if (next.has(id)) {
		next.delete(id)
	} else {
		next.add(id)
	}
	collapsed.value = next
}

/**
 * Name a section for assistive technology.
 *
 * The kind swatch beside the title is decorative, so the kinds it shows are
 * spelled out here instead — otherwise that information exists only in colour.
 *
 * @param section Changed document section
 */
function sectionLabel(section: ComparisonSection) {
	const kinds = ({
		content: t('text', 'Content'),
		formatting: t('text', 'Formatting'),
		move: t('text', 'Moved content'),
		other: t('text', 'Other changes'),
	})
	return [
		section.title || t('text', 'Document start'),
		n('text', '%n change', '%n changes', section.groups.length),
		section.kinds.map((kind) => kinds[kind]).join(', '),
	].filter(Boolean).join('. ')
}

/**
 * @param group Changed semantic block
 * @param section Section the group belongs to
 */
function buildRecord(group: ComparisonDescriptorGroup, section: ComparisonSection) {
	const descriptor = group.descriptors[0]!
	const editCount = group.descriptors.length
	const detail = group.descriptors.some(({ detail }) => detail === 'block') ? 'block' : 'inline'
	const operations = new Set(group.descriptors.map(({ operation }) => operation))
	const operation = operations.size === 1 ? descriptor.operation : 'replace'
	const formattingOnly = group.descriptors.every(isPureFormatting)
	const label = editCount === 1 ? descriptorLabel(descriptor) : groupedDescriptorLabel(descriptor, editCount)
	const context = descriptorContext(descriptor, section.title)
	const previews = group.descriptors.map(descriptorPreview)
	// A link target, a task state or a formatting mark can change without the
	// words changing. Showing "Status dashboard → Status dashboard" would put
	// the row's emptiest text in its most prominent place, so those rows lead
	// with the label instead and keep the passage as context.
	// A relocation reads the same on both sides by definition, so it belongs
	// here too — only an insert or a delete genuinely has one side.
	const textUnchanged = formattingOnly || previews.every(({ textUnchanged }) => textUnchanged)
	const previewLabel = previews.map((preview) => previewText(
		preview.operation,
		preview.before,
		preview.after,
		preview.textUnchanged,
	)).join('; ')
	return {
		context,
		detail,
		id: group.id,
		label,
		operation,
		previews,
		textUnchanged,
		accessibleLabel: accessibleLabel(
			operation,
			detail,
			label,
			context,
			previewLabel,
		),
	}
}

/**
 * Preserve every exact descriptor preview represented by one grouped row.
 *
 * @param descriptor Semantic change
 */
function descriptorPreview(descriptor: ComparisonDescriptor) {
	const before = previewSide(descriptor.preview.before)
	const after = previewSide(descriptor.preview.after)
	return {
		after,
		before,
		id: descriptor.id,
		operation: descriptor.operation,
		textUnchanged: descriptor.operation !== 'insert'
			&& descriptor.operation !== 'delete'
			&& before === after,
	}
}

/**
 * @param descriptor Semantic change
 */
function descriptorLabel(descriptor: ComparisonDescriptor) {
	const context = contextType(descriptor)
	if (descriptor.operation === 'move') {
		return t('text', 'Moved section')
	}
	const signal = selectComparisonSignal(descriptor.signals)
	if (signal?.type === 'mark') {
		const formatting = ({
			bold: t('text', 'Bold'),
			italic: t('text', 'Italic'),
			strike: t('text', 'Strikethrough'),
			highlight: t('text', 'Highlight'),
			underline: t('text', 'Underline'),
			'inline-code': t('text', 'Inline code'),
		})[signal.mark]
		return signal.change === 'added'
			? t('text', '{formatting} added', { formatting })
			: signal.change === 'removed'
				? t('text', '{formatting} removed', { formatting })
				: t('text', '{formatting} changed', { formatting })
	}
	if (signal?.type === 'attribute') {
		return ({
			link: signal.change === 'added' ? t('text', 'Link added') : t('text', 'Link removed'),
			'link-target': t('text', 'Link target changed'),
			'heading-level': t('text', 'Heading level changed'),
			'list-start': t('text', 'List start changed'),
			'task-state': t('text', 'Task state changed'),
			'code-language': t('text', 'Code language changed'),
			'text-direction': t('text', 'Text direction changed'),
			'image-target': t('text', 'Image changed'),
			'image-alt': t('text', 'Image description changed'),
			'mention-identity': t('text', 'Mention changed'),
			mathematics: t('text', 'Mathematics changed'),
			'preview-target': t('text', 'Link preview changed'),
			'footnote-reference': t('text', 'Footnote changed'),
			'callout-type': t('text', 'Callout type changed'),
			'details-state': t('text', 'Details state changed'),
			'table-alignment': t('text', 'Table alignment changed'),
			'table-span': t('text', 'Table structure changed'),
			'unknown-attribute': t('text', 'Attribute changed'),
		})[signal.attribute]
	}
	if (descriptor.facets.includes('unknown')) {
		return t('text', 'Content changed')
	}
	if (descriptor.operation === 'insert') {
		return context.code === 'unknown'
			? t('text', 'Content added')
			: t('text', '{context} added', { context: context.label })
	}
	if (descriptor.operation === 'delete') {
		return context.code === 'unknown'
			? t('text', 'Content removed')
			: t('text', '{context} removed', { context: context.label })
	}
	if (descriptor.facets.includes('structure')) {
		return t('text', 'Structure changed')
	}
	return context.code === 'unknown'
		? t('text', 'Text changed')
		: t('text', '{context} changed', { context: context.label })
}

/**
 * @param descriptor First semantic range in one changed block
 * @param count Algorithm ranges represented by the row
 */
function groupedDescriptorLabel(descriptor: ComparisonDescriptor, count: number) {
	const context = contextType(descriptor)
	const label = context.code === 'unknown'
		? t('text', 'Content changed')
		: t('text', '{context} changed', { context: context.label })
	return `${label} — ${n('text', '%n edit', '%n edits', count)}`
}

/**
 * Describe where a change sits, without repeating its section heading.
 *
 * A heading rename still shows both names, because the old name is the only
 * place the reader can see what the section used to be called.
 *
 * @param descriptor Semantic change
 * @param sectionTitle Heading already shown above the row
 */
function descriptorContext(descriptor: ComparisonDescriptor, sectionTitle: string) {
	const before = nearestHeadingText(descriptor, 'before')
	const after = nearestHeadingText(descriptor, 'after')
	// A delete has no place in the After document — its After position is only
	// where the content collapsed to, which is the following section. Reading
	// that as a rename would claim a change that never happened.
	if (descriptor.operation === 'delete') {
		return before && before !== sectionTitle
			? t('text', 'Section: {section}', { section: before })
			: contextType(descriptor).label
	}
	const headingChanged = descriptor.operation === 'replace'
		&& (descriptor.context.before?.code === 'heading'
			|| descriptor.context.after?.code === 'heading')
	if (headingChanged && before && after && before !== after) {
		return t('text', '{before} → {after}', { before, after })
	}
	const section = after || before
	if (section && section !== sectionTitle) {
		return t('text', 'Section: {section}', { section })
	}
	return contextType(descriptor).label
}

/**
 * @param descriptor Semantic change
 * @param side Document side
 */
function nearestHeadingText(descriptor: ComparisonDescriptor, side: 'before' | 'after') {
	const headings = side === 'before' ? beforeHeadings : afterHeadings
	const position = descriptor.context[side]?.from ?? descriptor[side].from
	return nearestHeading(headings, position)
}

/**
 * @param descriptor Semantic change
 */
function contextType(descriptor: ComparisonDescriptor) {
	// A delete's After context is only the position its content collapsed to,
	// which is usually the enclosing heading. Reading it would report a deleted
	// paragraph as "Heading removed".
	const code = descriptor.operation === 'delete'
		? descriptor.context.before?.code ?? descriptor.context.after?.code ?? 'unknown'
		: descriptor.context.after?.code ?? descriptor.context.before?.code ?? 'unknown'
	return {
		code,
		label: ({
			'front-matter': t('text', 'Front matter'),
			paragraph: t('text', 'Paragraph'),
			heading: t('text', 'Heading'),
			'list-item': t('text', 'List item'),
			task: t('text', 'Task'),
			'table-cell': t('text', 'Table cell'),
			'code-block': t('text', 'Code block'),
			quote: t('text', 'Quote'),
			callout: t('text', 'Callout'),
			details: t('text', 'Details'),
			footnote: t('text', 'Footnote'),
			'footnote-reference': t('text', 'Footnote reference'),
			image: t('text', 'Image'),
			mention: t('text', 'Mention'),
			mathematics: t('text', 'Mathematics'),
			preview: t('text', 'Link preview'),
			unknown: t('text', 'Changed content'),
		})[code],
	}
}

/**
 * @param operation Display operation
 * @param detail Finest detail represented by the group
 * @param label Primary semantic label
 * @param context Nearest useful context
 * @param previewLabel Safe descriptor previews
 */
function accessibleLabel(
	operation: ComparisonDescriptor['operation'],
	detail: ComparisonDescriptor['detail'],
	label: string,
	context: string,
	previewLabel: string,
) {
	// The section heading above the row already names the section, once, for
	// assistive technology as much as for sight. Repeating it on every row
	// would restore the redundancy the grouping removed.
	return [
		operationLabel(operation),
		label,
		context,
		previewLabel,
		detail === 'block' ? t('text', 'Block-level; fine inline detail is unavailable') : '',
	].filter(Boolean).join('. ')
}

/**
 * @param operation Display operation
 * @param before Safe Before preview
 * @param after Safe After preview
 * @param textUnchanged Whether the passage reads the same on both sides
 */
function previewText(operation: ComparisonDescriptor['operation'], before: string, after: string, textUnchanged: boolean) {
	if (operation === 'insert') {
		return after || t('text', 'Content added')
	}
	if (operation === 'delete') {
		return before || t('text', 'Content removed')
	}
	if (textUnchanged) {
		return before || after || t('text', 'Content changed')
	}
	return `${before || t('text', 'No content')} → ${after || t('text', 'No content')}`
}

/**
 * @param atom Safe descriptor preview
 */
function previewSide(atom: ComparisonDescriptor['preview']['before']) {
	if (!atom) {
		return ''
	}
	if (atom.kind === 'text') {
		return atom.text
	}
	return ({
		'front-matter': t('text', 'Front matter changed'),
		image: t('text', 'Image changed'),
		mention: t('text', 'Mention changed'),
		mathematics: t('text', 'Mathematics changed'),
		'footnote-reference': t('text', 'Footnote reference changed'),
		'horizontal-rule': t('text', 'Divider changed'),
		'changed-content': t('text', 'Changed content'),
	})[atom.node]
}

/**
 * @param operation Display operation
 */
function operationLabel(operation: ComparisonDescriptor['operation']) {
	return ({
		insert: t('text', 'Added'),
		delete: t('text', 'Removed'),
		replace: t('text', 'Changed'),
		move: t('text', 'Moved'),
	})[operation]
}

/**
 * @param operation Display operation
 */
function operationSymbol(operation: ComparisonDescriptor['operation']) {
	return ({ insert: '+', delete: '−', replace: '↔', move: '↳' })[operation]
}
</script>

<style lang="scss">
.text-comparison {
	&__change-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	&__section-rows {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	// The section is the sticky header's containing block, so a header travels
	// only as far as its own rows and never over the next section's.
	&__section {
		position: relative;
	}

	&__section-heading {
		position: sticky;
		top: 0;
		z-index: 1;
		margin: 0;
		background: var(--color-main-background);
		font-size: inherit;
		font-weight: inherit;
	}

	// core/css/inputs.scss styles every bare <button> at (0,1,1): width 130px,
	// its own border and padding, an opaque background and a text cursor. Both
	// controls below are written as descendants of .text-comparison so they
	// carry (0,2,0) and win on specificity rather than on !important.
	.text-comparison__section-toggle {
		display: flex;
		align-items: center;
		gap: calc(2 * var(--default-grid-baseline));
		inline-size: 100%;
		min-block-size: var(--default-clickable-area);
		// The global rule sets `margin: 3px; margin-inline-start: 0` at (0,2,1),
		// which a two-class selector cannot reach.
		margin: 0 !important;
		padding: var(--default-grid-baseline) calc(2 * var(--default-grid-baseline));
		border: 0;
		border-block-end: 1px solid var(--color-border);
		border-radius: 0;
		background: transparent;
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
		text-align: start;
		cursor: pointer;

		&:hover {
			background: var(--color-background-hover);
			// …and `border-color: var(--color-main-text)` on hover at (0,4,1),
			// which would turn this divider black under the pointer.
			border-block-end-color: var(--color-border) !important;
		}
	}

	// Matches the row's operation column so section titles and change previews
	// share one left edge.
	&__section-caret {
		inline-size: calc(6 * var(--default-grid-baseline));
		font-size: var(--font-size-small);
		text-align: center;
	}

	&__section-title {
		min-inline-size: 0;
		overflow: hidden;
		color: var(--color-main-text);
		font-weight: var(--font-weight-heading);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__section-kinds {
		display: inline-flex;
		flex: 0 0 auto;
		gap: var(--default-grid-baseline);
	}

	// Nextcloud offers no fifth semantic hue, and primary and info sit about one
	// step apart, so shape carries the distinction alongside colour rather than
	// leaving two of the four swatches effectively identical.
	&__kind-dot {
		inline-size: calc(2 * var(--default-grid-baseline));
		block-size: calc(2 * var(--default-grid-baseline));
		border-radius: 50%;

		&--content {
			background: var(--color-element-warning);
		}

		&--formatting {
			border: 2px solid var(--color-primary-element);
			background: transparent;
		}

		&--move {
			border-radius: 0;
			background: var(--color-element-info);
			transform: rotate(45deg);
		}

		// --color-text-maxcontrast rather than --color-border-maxcontrast: both
		// are themed, but this one holds more contrast on either ground.
		&--other {
			background: var(--color-text-maxcontrast);
		}
	}

	&__section-count {
		flex: 0 0 auto;
		margin-inline-start: auto;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.text-comparison__change-item {
		display: grid;
		grid-template-columns: calc(6 * var(--default-grid-baseline)) minmax(0, 1fr) calc(3 * var(--default-grid-baseline));
		align-items: center;
		gap: calc(2 * var(--default-grid-baseline));
		inline-size: 100%;
		min-block-size: calc(14 * var(--default-grid-baseline));
		margin: 0 !important;
		padding: calc(2 * var(--default-grid-baseline)) calc(2 * var(--default-grid-baseline));
		border: 0;
		border-block-end: 1px solid var(--color-border);
		border-radius: 0;
		background: transparent;
		color: var(--color-main-text);
		text-align: start;
		cursor: pointer;

		&:hover {
			background: var(--color-background-hover);
			border-block-end-color: var(--color-border) !important;
		}

		// After :hover, so pointing at the current change cannot make it look
		// unselected.
		&[aria-current='true'] {
			background: var(--color-primary-element-light);
			box-shadow: inset calc(0.75 * var(--default-grid-baseline)) 0 0 var(--color-primary-element);
		}
	}

	// The global focus ring is declared !important at (0,3,1): a black outline
	// plus a white box-shadow that would erase the selection bar. Beating it
	// needs both !important and more classes, hence the extra level of nesting.
	.text-comparison__change-list {
		.text-comparison__section-toggle:focus-visible,
		.text-comparison__change-item:focus-visible {
			position: relative;
			z-index: 2;
			outline: 2px solid var(--color-primary-element) !important;
			outline-offset: -2px;
			box-shadow: none !important;
		}

		.text-comparison__change-item[aria-current='true']:focus-visible {
			box-shadow: inset calc(0.75 * var(--default-grid-baseline)) 0 0 var(--color-primary-element) !important;
		}
	}

	&__operation {
		display: grid;
		place-items: center;
		inline-size: calc(6 * var(--default-grid-baseline));
		block-size: calc(6 * var(--default-grid-baseline));
		border: 1px solid currentColor;
		border-radius: 50%;
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-heading);

		&--insert { color: var(--color-success-text); }
		&--delete { color: var(--color-error-text); }
		&--replace { color: var(--color-warning-text); }
		// Info, matching both the section swatch and the document mark.
		&--move { color: var(--color-element-info); }
	}

	&__change-copy {
		display: grid;
		gap: var(--default-grid-baseline);
		min-inline-size: 0;
		line-height: var(--default-line-height);
	}

	// When only an attribute or a mark changed, the passage reads the same on
	// both sides, so the label is the informative half and leads instead.
	&__change-copy--label-first {
		.text-comparison__preview {
			order: 2;
			color: var(--color-text-maxcontrast);
			font-size: var(--font-size-small);
		}

		.text-comparison__change-title {
			order: 1;
			color: var(--color-main-text);
			font-size: var(--default-font-size);
		}

		.text-comparison__change-label {
			font-weight: var(--font-weight-heading);
		}
	}

	/* The changed content itself leads the row. */
	&__preview {
		min-inline-size: 0;
		overflow: hidden;
		color: var(--color-main-text);
		font-size: var(--default-font-size);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__preview-before {
		padding-inline: calc(0.5 * var(--default-grid-baseline));
		border-radius: var(--border-radius-small);
		background: var(--color-error);
		box-shadow: inset 0 -2px 0 var(--color-border-error);
		text-decoration: line-through;
		text-decoration-thickness: 1px;
	}

	&__preview-after {
		padding-inline: calc(0.5 * var(--default-grid-baseline));
		border-radius: var(--border-radius-small);
		background: var(--color-success);
		box-shadow: inset 0 -2px 0 var(--color-border-success);
		text-decoration: none;
	}

	&__preview-arrow {
		color: var(--color-text-maxcontrast);
	}

	&__preview-separator {
		color: var(--color-text-maxcontrast);
	}

	&__change-title {
		display: flex;
		align-items: center;
		gap: calc(1.5 * var(--default-grid-baseline));
		min-inline-size: 0;
		overflow: hidden;
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
		white-space: nowrap;
	}

	&__change-label {
		flex: 0 0 auto;
		font-weight: var(--font-weight-element);
	}

	&__change-context {
		min-inline-size: 0;
		overflow: hidden;
		text-overflow: ellipsis;

		&::before {
			content: '· ';
		}
	}

	&__change-open {
		color: var(--color-text-maxcontrast);
		font-size: var(--default-font-size);
	}

	// On one column the two pills cannot share a line: the Before half eats the
	// width and the After half is clipped away entirely, silently turning a
	// before-and-after row into a before-only one. Stack them instead.
	.text-comparison--single & {
		&__preview {
			white-space: normal;
		}

		&__preview-before,
		&__preview-after {
			display: block;
			inline-size: fit-content;
			max-inline-size: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__preview-arrow {
			display: none;
		}
	}

	&__detail-badge {
		flex: 0 0 auto;
		padding-inline: calc(1.5 * var(--default-grid-baseline));
		border: 1px solid var(--color-border-maxcontrast);
		border-radius: var(--border-radius-pill);
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-element);
		// Capped so the badge's border cannot make its row taller than its
		// neighbours and stutter the divider rhythm.
		line-height: calc(4 * var(--default-grid-baseline));
	}
}
</style>
