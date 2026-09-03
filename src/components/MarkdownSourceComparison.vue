<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section ref="root" class="text-source-comparison" :aria-label="t('text', 'Markdown source comparison')">
		<div v-if="loading" class="text-source-comparison__message" role="status">
			{{ t('text', 'Loading Markdown source differences…') }}
		</div>
		<div v-else-if="error" class="text-source-comparison__message" role="alert">
			<p>{{ t('text', 'Could not load Markdown source differences.') }}</p>
			<NcButton type="button" variant="primary" @click="load">
				{{ t('text', 'Retry') }}
			</NcButton>
		</div>
		<div
			v-else-if="model?.status === 'limited'"
			data-source-limited
			class="text-source-comparison__message"
			role="status">
			{{
				t(
					'text',
					'Detailed source differences exceeded the safe processing limit.',
				)
			}}
		</div>

		<MarkdownSourceFallback v-if="model?.status !== 'ready'" :beforeContent="beforeContent" :afterContent="afterContent" />

		<template v-else>
			<header class="text-source-comparison__toolbar">
				<p v-if="model.lineEndingChange" data-source-line-ending-change>
					{{
						t(
							'text',
							'Line endings changed: {before} → {after}',
							model.lineEndingChange,
						)
					}}
				</p>
				<div v-if="model.hunks.length" class="text-source-comparison__navigation">
					<NcButton
						type="button"
						variant="tertiary"
						:disabled="model.hunks.length < 2"
						@click="move(-1)">
						{{ t('text', 'Previous') }}
					</NcButton>
					<p aria-live="polite" aria-atomic="true">
						{{
							t('text', 'Source change {current} of {total}', {
								current: currentIndex + 1,
								total: model.hunks.length,
							})
						}}
					</p>
					<NcButton
						type="button"
						variant="tertiary"
						:disabled="model.hunks.length < 2"
						@click="move(1)">
						{{ t('text', 'Next') }}
					</NcButton>
				</div>
				<div
					v-if="layoutMode === 'single'"
					class="text-source-comparison__side-tabs"
					role="tablist"
					:aria-label="t('text', 'Source version to display')">
					<button
						v-for="side in sides"
						:key="side"
						:ref="(element) => setTab(side, element)"
						role="tab"
						type="button"
						:aria-selected="activeSide === side"
						:tabindex="activeSide === side ? 0 : -1"
						@click="setSide(side)"
						@keydown="onTabKeydown">
						{{ sideLabels[side] }}
					</button>
				</div>
			</header>
			<div class="text-source-comparison__side-headings">
				<h2
					v-for="side in sides"
					:key="side"
					:data-source-side="side"
					:hidden="layoutMode === 'single' && activeSide !== side">
					{{ sideLabels[side] }}
				</h2>
			</div>

			<div class="text-source-comparison__hunks">
				<template v-for="(slot, index) in slots" :key="`slot-${index}`">
					<div v-if="slot.gap" class="text-source-comparison__gap">
						<NcButton
							data-source-gap-toggle
							type="button"
							variant="tertiary"
							:aria-expanded="Boolean(gapRows(slot.gap))"
							@click="toggleGap(slot.gap)">
							{{
								gapRows(slot.gap)
									? t('text', 'Hide unchanged lines')
									: t('text', 'Show {count} unchanged lines', {
										count: slot.gap.count,
									})
							}}
						</NcButton>
						<div v-if="gapRows(slot.gap)">
							<SourceRow
								v-for="(gapRow, rowIndex) in gapRows(slot.gap)"
								:key="rowIndex"
								:row="gapRow"
								:layoutMode="layoutMode"
								:activeSide="activeSide" />
						</div>
						<NcButton
							v-if="canShowMore(slot.gap)"
							data-source-gap-more
							type="button"
							variant="tertiary"
							@click="showMoreGap(slot.gap)">
							{{ t('text', 'Show more unchanged lines') }}
						</NcButton>
						<p v-else-if="isGapLimited(slot.gap)" data-source-gap-limited role="status">
							{{
								t(
									'text',
									'Additional unchanged lines are hidden to keep the comparison responsive.',
								)
							}}
						</p>
					</div>
					<section
						v-if="slot.hunk"
						class="text-source-comparison__hunk"
						:data-source-hunk="slot.hunk.id"
						:class="{ 'text-source-comparison__hunk--current': index === currentIndex }">
						<h3 class="text-source-comparison__hunk-title">
							<button type="button" :aria-current="index === currentIndex ? 'true' : undefined" @click="currentId = slot.hunk.id">
								{{
									t('text', 'Lines {before} / {after}', {
										before: slot.hunk.beforeStart,
										after: slot.hunk.afterStart,
									})
								}}
							</button>
						</h3>
						<SourceRow
							v-for="(hunkRow, rowIndex) in slot.hunk.rows"
							:key="rowIndex"
							:row="hunkRow"
							:layoutMode="layoutMode"
							:activeSide="activeSide" />
					</section>
				</template>
			</div>
		</template>
	</section>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance as Public } from 'vue'
import type { SourceDiffGap as Gap, SourceGapMaterializer as Materializer, SourceDiffModel as Model, SourceDiffRow as Row } from '../comparison/markdownSourceComparison.ts'

import { t } from '@nextcloud/l10n'
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import MarkdownSourceFallback from './MarkdownSourceFallback.vue'
import { comparisonScrollBehavior as scrollBehavior, comparisonSideForKey as sideForKey } from '../comparison/comparisonNavigation.ts'
import { displayMarkdownSource as display } from '../comparison/markdownSourceDisplay.ts'

const props = defineProps<{
	beforeContent: string
	afterContent: string
	layoutMode: 'paired' | 'single'
}>()
type Side = 'before' | 'after'
const sides: readonly Side[] = ['before', 'after']
const sideLabels = { before: t('text', 'Before'), after: t('text', 'After') }
const loading = ref(true)
const error = ref<unknown>(null)
const model = ref<Model | null>(null)
const currentId = ref<string | null>(null)
const activeSide = ref<Side>('before')
const rowsByGap = reactive(new Map<string, readonly Row[]>())
const root = ref<HTMLElement | null>(null)
const tabs: Record<Side, HTMLButtonElement | null> = { before: null, after: null }
let controller: AbortController | null = null
let generation = 0
let materialize: Materializer | null = null
let rowLimit = 0

const currentIndex = computed(() => model.value?.status === 'ready'
	? Math.max(
			0,
			model.value.hunks.findIndex(({ id }) => id === currentId.value),
		)
	: 0)
const slots = computed(() => {
	if (model.value?.status !== 'ready') {
		return []
	}
	const gaps = new Map(model.value.gaps.map((gap) => [gap.slot, gap]))
	return [...model.value.hunks, null].map((hunk, index) => ({ hunk, gap: gaps.get(index) }))
})
const SourceRow = defineComponent({
	props: {
		row: { type: Object as () => Row, required: true },
		layoutMode: { type: String as () => 'paired' | 'single', required: true },
		activeSide: { type: String as () => Side, required: true },
	},

	setup(rowProps) {
		const line = (value: Row[Side], side: Side) => {
			const operation = value?.changed ? (side === 'before' ? 'removed' : 'added') : undefined
			const trailing = value?.text.match(/ +$/)?.[0].length ?? 0
			const showEol = rowProps.row.before && rowProps.row.after
				&& rowProps.row.before.eol !== rowProps.row.after.eol
			return h('div', {
				class: ['text-source-comparison__line', operation && `text-source-comparison__line--${operation}`],
				hidden: rowProps.layoutMode === 'single' && rowProps.activeSide !== side,
				'aria-label': operation && t('text', operation === 'removed' ? 'Removed line {line}' : 'Added line {line}', { line: value!.number }),
				'data-source-operation': operation,
			}, value
				? [
						operation ? h('span', { 'aria-hidden': 'true', 'data-source-cue': '' }, operation === 'removed' ? '−' : '+') : null,
						h('span', { class: 'text-source-comparison__line-number', 'aria-hidden': 'true' }, String(value.number)),
						h('code', { dir: 'auto' }, value.segments.map((segment) => h('bdi', {
							class: segment.changed ? 'text-source-comparison__segment--changed' : undefined,
						}, display(segment.text)))),
						showEol && value.eol !== 'none' ? h('span', { class: 'text-source-comparison__annotation', 'data-source-eol': value.eol }, `⟦${value.eol.toUpperCase()}⟧`) : null,
						trailing ? h('span', { class: 'text-source-comparison__annotation', 'data-source-trailing': trailing }, t('text', '{count} trailing spaces', { count: trailing }).toUpperCase()) : null,
						value.eol === 'none' ? h('span', { class: 'text-source-comparison__annotation' }, t('text', 'No newline at end of file')) : null,
					]
				: [])
		}
		return () => h('div', {
			class: ['text-source-comparison__row', rowProps.layoutMode === 'single' && 'text-source-comparison__row--single'],
		}, [
			line(rowProps.row.before, 'before'),
			line(rowProps.row.after, 'after'),
		])
	},
})

async function load() {
	const request = ++generation
	controller?.abort()
	controller = new AbortController()
	loading.value = true
	error.value = null
	model.value = null
	rowsByGap.clear()
	try {
		const sourceComparison
			= await import('../comparison/markdownSourceComparison.ts')
		const { createMarkdownSourceComparison } = sourceComparison
		const result = await createMarkdownSourceComparison(
			props.beforeContent,
			props.afterContent,
			controller.signal,
		)
		if (request !== generation) {
			return
		}
		materialize = sourceComparison.materializeSourceDiffGap
		rowLimit
			= sourceComparison.SOURCE_DIFF_LIMITS.maximumDisplayedRows
		model.value = result
		currentId.value
			= result.status === 'ready' ? (result.hunks[0]?.id ?? null) : null
	} catch (exception) {
		if (
			request === generation
			&& (!(exception instanceof DOMException) || exception.name !== 'AbortError')
		) {
			error.value = exception
		}
	} finally {
		if (request === generation) {
			loading.value = false
		}
	}
}
function gapRows(gap: Gap) {
	return rowsByGap.get(gap.id)
}
function rowCount() {
	const hunkRows
		= model.value?.status === 'ready'
			? model.value.hunks.reduce((total, hunk) => total + hunk.rows.length, 0)
			: 0
	return [...rowsByGap.values()].reduce(
		(total, rows) => total + rows.length,
		hunkRows,
	)
}
function availableRows() {
	return Math.max(0, rowLimit - rowCount())
}
function canShowMore(gap: Gap) {
	const rows = rowsByGap.get(gap.id)
	return Boolean(rows && rows.length < gap.count && availableRows() > 0)
}
function isGapLimited(gap: Gap) {
	const rows = rowsByGap.get(gap.id)
	return Boolean(rows && rows.length < gap.count && availableRows() === 0)
}
function appendGap(gap: Gap) {
	if (!materialize) {
		return
	}
	const currentRows = rowsByGap.get(gap.id) ?? []
	const page = materialize(
		props.beforeContent,
		props.afterContent,
		gap,
		availableRows(),
		currentRows.length,
	)
	rowsByGap.set(gap.id, [...currentRows, ...page])
}
function toggleGap(gap: Gap) {
	if (rowsByGap.has(gap.id)) {
		rowsByGap.delete(gap.id)
	} else if (materialize) {
		rowsByGap.set(gap.id, [])
		appendGap(gap)
	}
}
function showMoreGap(gap: Gap) {
	appendGap(gap)
}
function move(offset: number) {
	if (model.value?.status !== 'ready' || !model.value.hunks.length) {
		return
	}
	const index
		= (currentIndex.value + offset + model.value.hunks.length)
			% model.value.hunks.length
	currentId.value = model.value.hunks[index]!.id
	nextTick(() => root.value
		?.querySelector<HTMLElement>(`[data-source-hunk="${currentId.value}"]`)
		?.scrollIntoView({
			block: 'center',
			behavior: scrollBehavior(),
		}))
}
function setSide(side: Side) {
	activeSide.value = side
	nextTick(() => tabs[side]?.focus())
}
function setTab(side: Side, element: Element | Public | null) {
	tabs[side] = element instanceof HTMLButtonElement ? element : null
}
function onTabKeydown(event: KeyboardEvent) {
	const side = sideForKey(event.key)
	if (side) {
		event.preventDefault()
		setSide(side)
	}
}
watch(() => [props.beforeContent, props.afterContent], load)
onMounted(load)
onBeforeUnmount(() => {
	generation++
	controller?.abort()
})
</script>

<style lang="scss">
$g: var(--default-grid-baseline);

.text-source-comparison {
	container-type: inline-size;
	min-block-size: 0;
	overflow: auto;

	&__toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(2 * $g);
		flex-wrap: wrap;
		padding: calc(2 * $g) calc(3 * $g);
	}
	&__toolbar > p,
	&__navigation p {
		margin: 0;
	}
	&__navigation {
		display: grid;
		align-items: center;
		grid-template-columns: auto minmax(12rem, 1fr) auto;
		gap: $g;
		margin-inline-start: auto;
	}
	&__navigation p { text-align: center; }
	&__side-tabs {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: calc(2 * $g);
		inline-size: 100%;
		button[role='tab'] {
			margin: 0 !important;
			border: 0 !important;
			border-block-end: 2px solid transparent !important;
			border-radius: 0 !important;
			background: transparent !important;
			&:focus-visible {
				box-shadow: none !important;
				outline: 2px solid var(--color-primary-element) !important;
				outline-offset: -2px;
			}
		}
	}
	&__row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	&__side-headings {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border-block: 1px solid var(--color-border);
		h2 {
			margin: 0;
			padding: calc(2 * $g) calc(3 * $g);
			font-size: var(--default-font-size);
			font-weight: var(--font-weight-heading);
			line-height: var(--default-line-height);
		}
		h2 + h2 { border-inline-start: 1px solid var(--color-border); }
	}
	&__row--single { grid-template-columns: minmax(0, 1fr); }
	&__line {
		display: grid;
		align-items: start;
		grid-template-columns: 1.5rem 4rem minmax(12rem, 1fr) repeat(2, max-content);
		min-inline-size: 0;
		font-family: var(--font-face-monospace);
		font-size: var(--font-size-small);
	}
	&__line[hidden] { display: none; }
	[data-source-cue] {
		grid-column: 1;
		text-align: center;
	}
	&__line-number {
		grid-column: 2;
		color: var(--color-text-maxcontrast);
		text-align: end;
		padding-inline: 8px;
	}
	code {
		grid-column: 3;
		overflow-x: auto;
		white-space: pre;
		user-select: text;
	}
	&__annotation {
		padding-inline: 4px;
		white-space: nowrap;
	}
	&__line--removed { background: var(--color-error-hover); }
	&__line--added { background: var(--color-success-hover); }
	&__segment--changed {
		font-weight: bold;
		text-decoration: underline;
	}
	&__hunk {
		border-block-end: 1px solid var(--color-border);
		&--current { box-shadow: inset calc(0.75 * $g) 0 var(--color-primary-element); }
	}
	&__hunk-title {
		margin: 0;
		background: var(--color-background-dark);
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
		button {
			display: block;
			inline-size: 100%;
			min-block-size: var(--default-clickable-area);
			margin: 0 !important;
			padding: calc(2 * $g) calc(3 * $g);
			border: 0;
			border-radius: 0;
			background: transparent;
			color: inherit;
			font: inherit;
			font-weight: var(--font-weight-heading);
			text-align: start;
		}
	}
	&__gap {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: calc(2 * $g);
		border-block-end: 1px solid var(--color-border);
		text-align: center;
		> div { inline-size: 100%; }
	}
	&__side-tabs [role='tab'][aria-selected='true'] {
		border-block-end-color: var(--color-primary-element) !important;
		font-weight: var(--font-weight-heading);
	}
}
@container (max-width: 560px) {
	.text-source-comparison__navigation {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		inline-size: 100%;
		margin-inline-start: 0;
		button:first-child { grid-column: 1; }
		button:last-child { grid-column: 2; }
		p {
			grid-row: 2;
			grid-column: 1 / -1;
		}
	}
}
</style>
