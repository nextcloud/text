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
			<NcButton @click="load">
				{{ t('text', 'Retry') }}
			</NcButton>
		</div>
		<div v-else-if="model?.status === 'limited'" class="text-source-comparison__message" role="status">
			{{ model.reason === 'size'
				? t('text', 'This source comparison is too large to display safely.')
				: t('text', 'This source comparison exceeded the safe processing limit.') }}
		</div>
		<template v-else-if="model?.status === 'ready'">
			<header class="text-source-comparison__toolbar">
				<p
					v-if="model.lineEndingChange"
					class="text-source-comparison__line-ending-change"
					data-source-line-ending-change>
					{{ t('text', 'Line endings changed: {before} → {after}', {
						before: lineEndingLabel(model.lineEndingChange.before),
						after: lineEndingLabel(model.lineEndingChange.after),
					}) }}
				</p>
				<div v-if="model.hunks.length" class="text-source-comparison__navigation" :aria-label="t('text', 'Source change navigation')">
					<NcButton :aria-label="t('text', 'Previous source change')" :disabled="model.hunks.length <= 1" @click="move(-1)">
						{{ t('text', 'Previous') }}
					</NcButton>
					<p aria-live="polite" aria-atomic="true">
						{{ t('text', 'Source change {current} of {total}', {
							current: currentIndex + 1,
							total: model.hunks.length,
						}) }}
					</p>
					<NcButton :aria-label="t('text', 'Next source change')" :disabled="model.hunks.length <= 1" @click="move(1)">
						{{ t('text', 'Next') }}
					</NcButton>
				</div>
				<p v-else-if="!model.lineEndingChange" class="text-source-comparison__message">
					{{ t('text', 'No Markdown source differences') }}
				</p>

				<div
					v-if="layoutMode === 'single'"
					class="text-source-comparison__tabs"
					role="tablist"
					:aria-label="t('text', 'Source version to display')">
					<button
						:id="beforeTabId"
						ref="beforeTab"
						type="button"
						role="tab"
						:aria-selected="activeSide === 'before'"
						:aria-controls="sourcePanelId"
						:tabindex="activeSide === 'before' ? 0 : -1"
						@click="activeSide = 'before'"
						@keydown="onSideTabKeydown($event, 'before')">
						{{ t('text', 'Before') }}
					</button>
					<button
						:id="afterTabId"
						ref="afterTab"
						type="button"
						role="tab"
						:aria-selected="activeSide === 'after'"
						:aria-controls="sourcePanelId"
						:tabindex="activeSide === 'after' ? 0 : -1"
						@click="activeSide = 'after'"
						@keydown="onSideTabKeydown($event, 'after')">
						{{ t('text', 'After') }}
					</button>
				</div>
			</header>

			<div class="text-source-comparison__column-headings" :class="{ 'text-source-comparison__column-headings--single': layoutMode === 'single' }">
				<strong v-show="layoutMode !== 'single' || activeSide === 'before'">{{ t('text', 'Before') }}</strong>
				<strong v-show="layoutMode !== 'single' || activeSide === 'after'">{{ t('text', 'After') }}</strong>
			</div>

			<div
				:id="sourcePanelId"
				class="text-source-comparison__hunks"
				:role="layoutMode === 'single' ? 'tabpanel' : undefined"
				:aria-labelledby="layoutMode === 'single' ? activeSide === 'before' ? beforeTabId : afterTabId : undefined">
				<template v-for="(hunk, hunkIndex) in [...model.hunks, null]" :key="`source-slot-${hunkIndex}`">
					<div v-if="gapAt(hunkIndex)" class="text-source-comparison__gap">
						<NcButton
							v-if="canExpandGap(gapAt(hunkIndex)!)"
							:aria-expanded="expandedGaps.has(gapAt(hunkIndex)!.id)"
							:data-source-gap="gapAt(hunkIndex)!.id"
							@click="toggleGap(gapAt(hunkIndex)!.id)">
							{{ expandedGaps.has(gapAt(hunkIndex)!.id)
								? t('text', 'Hide unchanged lines')
								: t('text', 'Show {count} unchanged lines', { count: gapAt(hunkIndex)!.count }) }}
						</NcButton>
						<p v-else>
							{{ t('text', '{count} unchanged lines hidden', { count: gapAt(hunkIndex)!.count }) }}
						</p>
						<div v-if="expandedGaps.has(gapAt(hunkIndex)!.id)">
							<div
								v-for="(row, rowIndex) in gapRows(gapAt(hunkIndex)!)"
								:key="`${gapAt(hunkIndex)!.id}-${rowIndex}`"
								class="text-source-comparison__row"
								:class="{ 'text-source-comparison__row--single': layoutMode === 'single' }">
								<SourceLine v-show="layoutMode !== 'single' || activeSide === 'before'" :line="row.before" side="before" />
								<SourceLine v-show="layoutMode !== 'single' || activeSide === 'after'" :line="row.after" side="after" />
							</div>
						</div>
					</div>

					<section
						v-if="hunk"
						class="text-source-comparison__hunk"
						:class="{ 'text-source-comparison__hunk--current': hunkIndex === currentIndex }"
						:data-source-hunk="hunk.id">
						<h3 class="text-source-comparison__hunk-title">
							<button
								type="button"
								:aria-label="t('text', 'Source change at lines {before} / {after}', { before: hunk.beforeStart, after: hunk.afterStart })"
								:aria-current="hunkIndex === currentIndex ? 'true' : undefined"
								@click="currentId = hunk.id">
								{{ t('text', 'Lines {before} / {after}', { before: hunk.beforeStart, after: hunk.afterStart }) }}
							</button>
						</h3>
						<div
							v-for="(row, rowIndex) in hunkRows(hunk)"
							:key="`${hunk.id}-${rowIndex}`"
							class="text-source-comparison__row"
							:class="{ 'text-source-comparison__row--single': layoutMode === 'single' }">
							<SourceLine
								v-show="layoutMode !== 'single' || activeSide === 'before'"
								:line="row.before"
								side="before" />
							<SourceLine
								v-show="layoutMode !== 'single' || activeSide === 'after'"
								:line="row.after"
								side="after" />
						</div>
					</section>
				</template>
			</div>
		</template>
	</section>
</template>

<script setup lang="ts">
import type {
	SourceDiffGap,
	SourceDiffHunk,
	SourceDiffLine,
	SourceDiffModel,
	SourceLineEnding,
} from '../comparison/markdownSourceComparison.ts'

import { t } from '@nextcloud/l10n'
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'

const props = defineProps<{
	beforeContent: string
	afterContent: string
	layoutMode: 'paired' | 'single'
}>()

const MAXIMUM_WRAPPED_SOURCE_LINE_LENGTH = 2000
// ceiling: large gaps stay collapsed; upgrade when the source view virtualizes rows.
const MAXIMUM_EXPANDABLE_GAP_LINES = 2000

const SourceLine = defineComponent({
	props: {
		line: { type: Object as () => SourceDiffLine | undefined, default: undefined },
		side: { type: String as () => 'before' | 'after', required: true },
	},

	setup(lineProps) {
		return () => {
			const line = lineProps.line
			if (!line) {
				return h('div', { class: 'text-source-comparison__line text-source-comparison__line--empty', 'aria-hidden': 'true' })
			}
			const signals = [
				line.hasTab ? t('text', 'Tab') : '',
				line.hasTrailingWhitespace ? t('text', 'Trailing whitespace') : '',
				line.hasZeroWidth ? t('text', 'Zero-width character') : '',
				line.eolChanged ? line.eol.toUpperCase() : '',
			].filter(Boolean)
			return h('div', {
				class: [
					'text-source-comparison__line',
					line.changed ? `text-source-comparison__line--${lineProps.side === 'before' ? 'removed' : 'added'}` : '',
				],
			}, [
				line.changed
					? h('span', { class: 'text-source-comparison__sr-only' }, lineProps.side === 'before'
							? t('text', 'Removed line {line}', { line: line.number })
							: t('text', 'Added line {line}', { line: line.number }))
					: null,
				h('span', { class: 'text-source-comparison__line-number', 'aria-hidden': 'true' }, String(line.number)),
				h('span', { class: 'text-source-comparison__line-prefix', 'aria-hidden': 'true' }, line.changed ? (lineProps.side === 'before' ? '−' : '+') : ' '),
				h('code', {
					class: [
						'text-source-comparison__line-code',
						{ 'text-source-comparison__line-code--long': line.text.length > MAXIMUM_WRAPPED_SOURCE_LINE_LENGTH },
					],
					dir: 'auto',
				}, line.segments.map((segment) => h('bdi', {
					class: segment.changed ? 'text-source-comparison__segment--changed' : undefined,
				}, segment.text))),
				...signals.map((signal) => h('span', { class: 'text-source-comparison__whitespace-signal' }, signal)),
				line.missingFinalNewline
					? h('span', { class: 'text-source-comparison__newline-marker' }, t('text', 'No newline at end of file'))
					: null,
			])
		}
	},
})

const loading = ref(true)
const error = ref<unknown>(null)
const model = ref<SourceDiffModel | null>(null)
const currentId = ref<string | null>(null)
const activeSide = ref<'before' | 'after'>('before')
const expandedGaps = ref(new Set<string>())
const root = ref<HTMLElement | null>(null)
const beforeTab = ref<HTMLButtonElement | null>(null)
const afterTab = ref<HTMLButtonElement | null>(null)
const comparisonId = useId()
const beforeTabId = `${comparisonId}-before-tab`
const afterTabId = `${comparisonId}-after-tab`
const sourcePanelId = `${comparisonId}-source-panel`
let controller: AbortController | null = null
let generation = 0

const currentIndex = computed(() => {
	if (model.value?.status !== 'ready') {
		return 0
	}
	return Math.max(0, model.value.hunks.findIndex(({ id }) => id === currentId.value))
})
const gapsBySlot = computed(() => model.value?.status === 'ready'
	? new Map(model.value.gaps.map((gap) => [gap.slot, gap]))
	: new Map<number, SourceDiffGap>())
const hunkRowsById = computed(() => model.value?.status === 'ready'
	? new Map(model.value.hunks.map((hunk) => [hunk.id, pairedRows(hunk.before, hunk.after)]))
	: new Map<string, ReturnType<typeof pairedRows>>())

/** Load the source comparison for the current content. */
async function load() {
	const request = ++generation
	controller?.abort()
	controller = new AbortController()
	loading.value = true
	error.value = null
	try {
		const { createMarkdownSourceComparison } = await import('../comparison/markdownSourceComparison.ts')
		const result = await createMarkdownSourceComparison(props.beforeContent, props.afterContent, controller.signal)
		if (request !== generation) {
			return
		}
		model.value = result
		currentId.value = result.status === 'ready' ? result.hunks[0]?.id ?? null : null
	} catch (exception) {
		if (request !== generation || (exception instanceof DOMException && exception.name === 'AbortError')) {
			return
		}
		error.value = exception
	} finally {
		if (request === generation) {
			loading.value = false
		}
	}
}

/**
 * Move the current source hunk selection.
 *
 * @param offset Signed hunk navigation offset
 */
function move(offset: number) {
	if (model.value?.status !== 'ready' || model.value.hunks.length === 0) {
		return
	}
	const index = (currentIndex.value + offset + model.value.hunks.length) % model.value.hunks.length
	currentId.value = model.value.hunks[index]!.id
	nextTick(() => {
		const target = [...root.value?.querySelectorAll<HTMLElement>('[data-source-hunk]') ?? []]
			.find((candidate) => candidate.dataset.sourceHunk === currentId.value)
		if (target && typeof target.scrollIntoView === 'function') {
			target.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' })
		}
	})
}

/**
 * Read paired display rows for one hunk.
 *
 * @param hunk Source comparison hunk
 */
function hunkRows(hunk: SourceDiffHunk) {
	return hunkRowsById.value.get(hunk.id) ?? []
}

/**
 * Read paired display rows for one gap.
 *
 * @param gap Source comparison gap
 */
function gapRows(gap: SourceDiffGap) {
	return pairedRows(gap.before, gap.after)
}

/**
 * Pair source lines by display row.
 *
 * @param before Earlier source lines
 * @param after Later source lines
 */
function pairedRows(before: readonly SourceDiffLine[], after: readonly SourceDiffLine[]) {
	const rows: Array<{ before?: SourceDiffLine, after?: SourceDiffLine }> = []
	let beforeIndex = 0
	let afterIndex = 0
	while (beforeIndex < before.length || afterIndex < after.length) {
		const beforeLine = before[beforeIndex]
		const afterLine = after[afterIndex]
		if (beforeLine?.changed || afterLine?.changed) {
			const removed: SourceDiffLine[] = []
			const added: SourceDiffLine[] = []
			while (before[beforeIndex]?.changed) {
				removed.push(before[beforeIndex++]!)
			}
			while (after[afterIndex]?.changed) {
				added.push(after[afterIndex++]!)
			}
			for (let index = 0; index < Math.max(removed.length, added.length); index++) {
				rows.push({ before: removed[index], after: added[index] })
			}
			continue
		}

		rows.push({ before: beforeLine, after: afterLine })
		beforeIndex += beforeLine ? 1 : 0
		afterIndex += afterLine ? 1 : 0
	}
	return rows
}

/**
 * Read the gap at a hunk boundary.
 *
 * @param slot Gap boundary index
 */
function gapAt(slot: number) {
	return gapsBySlot.value.get(slot)
}

/** @param gap Source gap */
function canExpandGap(gap: SourceDiffGap) {
	return gap.count <= MAXIMUM_EXPANDABLE_GAP_LINES
}

/**
 * Toggle one source gap.
 *
 * @param id Source gap ID
 */
function toggleGap(id: string) {
	expandedGaps.value = expandedGaps.value.has(id) ? new Set() : new Set([id])
}

/**
 * Handle keyboard navigation between source side tabs.
 *
 * @param event Keyboard event
 * @param side Current source side
 */
function onSideTabKeydown(event: KeyboardEvent, side: 'before' | 'after') {
	let target: 'before' | 'after' | null = null
	if (event.key === 'Home') {
		target = 'before'
	} else if (event.key === 'End') {
		target = 'after'
	} else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
		target = side === 'before' ? 'after' : 'before'
	}
	if (!target) {
		return
	}
	event.preventDefault()
	activeSide.value = target
	nextTick(() => (target === 'before' ? beforeTab.value : afterTab.value)?.focus())
}

/** @param lineEnding Source line-ending convention */
function lineEndingLabel(lineEnding: SourceLineEnding) {
	return lineEnding === 'mixed' ? t('text', 'Mixed') : lineEnding.toUpperCase()
}

/** Check the user motion preference. */
function reducedMotion() {
	return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

onMounted(load)
onBeforeUnmount(() => {
	generation++
	controller?.abort()
})
</script>

<style lang="scss">
.text-source-comparison {
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	min-width: 0;
	min-height: 0;
	overflow: hidden;

	&__toolbar,
	&__navigation,
	&__tabs {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: calc(2 * var(--default-grid-baseline));
	}

	&__toolbar {
		flex-direction: column;
		padding: calc(2 * var(--default-grid-baseline));
	}

	&__navigation p,
	&__line-ending-change,
	&__message p {
		margin: 0;
	}

	&__tabs button {
		min-height: var(--default-clickable-area);
		padding-inline: calc(4 * var(--default-grid-baseline));
		border: 2px solid transparent;
		border-radius: var(--border-radius-pill);
		background: var(--color-background-hover);
		font-size: var(--default-font-size);

		&:focus-visible {
			outline: 2px solid var(--color-primary-element);
			outline-offset: 2px;
		}

		&[aria-selected='true'] {
			border-color: var(--color-primary-element);
			font-weight: var(--font-weight-heading);
		}
	}

	&__message {
		padding: calc(6 * var(--default-grid-baseline));
		text-align: center;
	}

	&__column-headings,
	&__row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	}

	&__column-headings {
		position: sticky;
		top: 0;
		z-index: 2;
		background: var(--color-main-background);

		strong {
			padding: calc(2 * var(--default-grid-baseline)) calc(3 * var(--default-grid-baseline));
			border-block: 1px solid var(--color-border);
		}

		strong + strong {
			border-inline-start: 1px solid var(--color-border);
		}

		&--single {
			display: block;
		}
	}

	&__hunk {
		border-block-end: 1px solid var(--color-border);

		&--current {
			box-shadow: inset 3px 0 0 var(--color-primary-element);
		}
	}

	&__hunk-title {
		margin: 0;
		background: var(--color-background-dark);
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);

		button {
			display: block;
			inline-size: 100%;
			min-height: var(--default-clickable-area);
			padding: calc(2 * var(--default-grid-baseline)) calc(3 * var(--default-grid-baseline));
			border: 0;
			background: transparent;
			color: inherit;
			font: inherit;
			font-weight: var(--font-weight-heading);
			text-align: start;

			&:focus-visible {
				outline: 2px solid var(--color-primary-element);
				outline-offset: -2px;
			}
		}
	}

	&__row--single {
		display: block;
	}

	&__line {
		display: grid;
		grid-template-columns: 4ch 2ch minmax(0, 1fr) auto;
		min-width: 0;
		border-inline-start: 3px solid transparent;
		font-family: var(--font-face-monospace);
		font-size: var(--font-size-small);

		&:nth-child(2) {
			border-inline-start-color: var(--color-border);
		}

		&--removed {
			border-inline-start-color: var(--color-border-error);
			background: var(--color-error);
		}

		&--added {
			border-inline-start-color: var(--color-border-success);
			background: var(--color-success);
		}

		&--empty {
			min-height: calc(6 * var(--default-grid-baseline));
			background: repeating-linear-gradient(-45deg, transparent, transparent 6px, var(--color-background-dark) 6px, var(--color-background-dark) 7px);
		}
	}

	&__line-number,
	&__line-prefix {
		padding-inline: var(--default-grid-baseline);
		color: var(--color-text-maxcontrast);
		text-align: end;
		user-select: none;
	}

	&__line-code {
		min-width: 0;
		padding-inline: calc(2 * var(--default-grid-baseline));
		overflow-wrap: anywhere;
		white-space: break-spaces;

		&--long {
			overflow-x: auto;
			overflow-wrap: normal;
			white-space: pre;
		}
	}

	&__hunks {
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;
		overflow: auto;
	}

	&__segment--changed {
		font-weight: var(--font-weight-heading);
		text-decoration: underline 2px;
		text-underline-offset: 2px;
	}

	&__whitespace-signal,
	&__newline-marker {
		align-self: center;
		margin: var(--default-grid-baseline);
		padding-inline: var(--default-grid-baseline);
		border: 1px dashed var(--color-border-maxcontrast);
		border-radius: var(--border-radius-pill);
		color: var(--color-text-maxcontrast);
		font-family: var(--font-face);
		font-size: var(--font-size-small);
		white-space: nowrap;
	}

	&__newline-marker {
		grid-column: 3 / -1;
		justify-self: start;
	}

	&__gap {
		padding: calc(2 * var(--default-grid-baseline));
		border-block-end: 1px solid var(--color-border);
		text-align: center;

		p {
			margin: 0;
			color: var(--color-text-maxcontrast);
		}
	}

	&__sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
}
</style>
