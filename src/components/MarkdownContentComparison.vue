<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section
		ref="root"
		class="text-comparison"
		:class="`text-comparison--${layoutMode}`"
		:aria-label="t('text', 'Version comparison')">
		<p class="text-comparison__sr-only" aria-live="polite" aria-atomic="true">
			{{ announcement }}
		</p>

		<MarkdownSourceFallback v-if="failure" :beforeContent="beforeContent" :afterContent="afterContent" />
		<template v-else>
			<header class="comparison-header">
				<div class="toolbar">
					<div class="view-tabs" role="tablist" :aria-label="t('text', 'Comparison view')">
						<button
							v-for="tab in tabs"
							:key="tab"
							:ref="(element) => setTabRef(tab, element)"
							type="button"
							role="tab"
							:aria-selected="view === tab"
							:tabindex="view === tab ? 0 : -1"
							@click="setView(tab)"
							@keydown="onViewTabKeydown($event, tab)">
							{{ tabLabels[tab] }}
						</button>
					</div>
					<div v-if="view === 'documents' && activeIds.length" class="navigation" :aria-label="t('text', 'Change navigation')">
						<NcButton
							type="button"
							variant="tertiary"
							:aria-label="t('text', 'Previous change')"
							:disabled="activeIds.length < 2"
							@click="move(-1)">
							{{ t('text', 'Previous') }}
						</NcButton>
						<span class="status" aria-hidden="true">{{
							announcement
						}}</span>
						<NcButton
							type="button"
							variant="tertiary"
							:aria-label="t('text', 'Next change')"
							:disabled="activeIds.length < 2"
							@click="move(1)">
							{{ t('text', 'Next') }}
						</NcButton>
					</div>
				</div>
				<div v-if="view === 'changes'" class="changes-controls">
					<p class="changes-count">
						{{ n('text', '%n change', '%n changes', activeEdits.length) }}
					</p>
					<label v-if="formatCount" class="filter">
						<input v-model="hideFormatting" type="checkbox">
						<span>{{ t('text', 'Hide formatting-only changes') }}</span>
						<small v-if="hideFormatting">{{
							t('text', '{count} hidden', { count: formatCount })
						}}</small>
					</label>
				</div>
				<div v-if="view === 'documents' && hideFormatting && formatCount" class="hidden-formatting" role="status">
					{{
						n(
							'text',
							'%n formatting change hidden',
							'%n formatting changes hidden',
							formatCount,
						)
					}}
					<NcButton type="button" variant="tertiary" @click="hideFormatting = false">
						{{ t('text', 'Show') }}
					</NcButton>
				</div>
			</header>

			<section v-show="view === 'changes'" role="tabpanel" class="text-comparison__changes">
				<div v-if="activeEdits.length" class="changes-content">
					<ComparisonChangeList
						:edits="activeEdits"
						:currentId="currentId || undefined"
						:beforeDocument="editors.before!.state.doc"
						:afterDocument="editors.after!.state.doc"
						@select="selectEdit"
						@currentLabel="currentLabel = $event" />
				</div>
				<div v-else-if="model.edits.length" class="empty" role="status">
					{{
						t(
							'text',
							'All rendered changes are formatting-only and hidden by the current filter.',
						)
					}}
				</div>
				<div v-else-if="rawDifferent" class="empty" role="status">
					<p>
						{{
							t('text', 'No rendered differences — Markdown syntax differs.')
						}}
					</p>
					<NcButton
						data-comparison-empty-action
						type="button"
						variant="tertiary"
						@click="setView('source')">
						{{ t('text', 'Open Markdown source') }}
					</NcButton>
				</div>
				<p v-else class="empty" role="status">
					{{ t('text', 'No differences.') }}
				</p>
			</section>

			<section
				v-if="showDocuments"
				v-show="view === 'documents'"
				role="tabpanel"
				class="text-comparison__documents">
				<div
					v-if="layoutMode === 'single'"
					class="side-tabs"
					role="tablist"
					:aria-label="t('text', 'Version to display')">
					<button
						v-for="side in sides"
						:key="side"
						:ref="(element) => setSideElement(side, 'tab', element)"
						role="tab"
						type="button"
						:aria-selected="activeSide === side"
						:tabindex="activeSide === side ? 0 : -1"
						@click="setSide(side)"
						@keydown="onSideKeydown">
						{{ sideLabels[side] }}
					</button>
				</div>
				<div class="text-comparison__document-grid">
					<article
						v-for="side in sides"
						v-show="layoutMode === 'paired' || activeSide === side"
						:key="side"
						:ref="(element) => setSideElement(side, 'pane', element)"
						class="text-comparison__document"
						:class="`text-comparison__document--${side}`"
						:aria-label="sideLabels[side]">
						<header>
							<div class="document-heading">
								<span aria-hidden="true">{{ side === 'before' ? '−' : '+' }}</span>
								<h2>{{ sideLabels[side] }}</h2>
							</div>
							<span class="document-legend" aria-hidden="true">{{ sideLegends[side] }}</span>
						</header>
						<div
							:ref="(element) => setSideElement(side, 'scroller', element)"
							class="text-comparison__document-scroller">
							<ComparisonEditorContent :editor="editors[side]!" :plugins="plugins[side]" @ready="refreshDocuments" />
						</div>
					</article>
				</div>
			</section>

			<section v-if="view === 'source'" role="tabpanel" class="source">
				<p class="source-explanation">
					{{
						t(
							'text',
							'Source compares literal Markdown, so its change groups can differ from rendered changes.',
						)
					}}
				</p>
				<MarkdownSourceFallback v-if="!SourceView" :beforeContent="beforeContent" :afterContent="afterContent" />
				<component
					:is="SourceView"
					v-else
					:beforeContent="beforeContent"
					:afterContent="afterContent"
					:layoutMode="layoutMode" />
			</section>
		</template>
	</section>
</template>

<script setup lang="ts">
import type { Component, ComponentPublicInstance as Public } from 'vue'
import type { ComparisonEdit as Edit, ComparisonSide as Side } from '../comparison/markdownComparisonTypes.ts'

import { getCurrentUser } from '@nextcloud/auth'
import { n, t } from '@nextcloud/l10n'
import { computed, markRaw, nextTick, onBeforeUnmount, onErrorCaptured, onMounted, provide, ref, shallowRef, watch } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import ComparisonChangeList from './ComparisonChangeList.vue'
import ComparisonEditorContent from './ComparisonEditorContent.vue'
import MarkdownSourceFallback from './MarkdownSourceFallback.vue'
import { currentIdAfterFilter, currentOrdinal, isPureFormatting, locateComparisonTarget as locateTarget, moveCurrentId, comparisonScrollBehavior as scrollBehavior, comparisonSideForKey as sideForKey } from '../comparison/comparisonNavigation.ts'
import { createComparisonEditor as createEditor } from '../comparison/createComparisonEditor.ts'
import { createComparisonDecorationPlugin as createDecoration, createMarkdownComparisonModel as createModel, exceedsRenderedComparisonLimit as exceedsLimit, ComparisonModelLimitError as ModelLimit, setComparisonDecorationState as setDecorations } from '../comparison/markdownComparison.ts'
import AttachmentResolver from '../services/AttachmentResolver.js'
import { ATTACHMENT_RESOLVER, EDITOR_UPLOAD } from './Editor.provider.ts'

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
type View = 'changes' | 'documents' | 'source'
const tabs: readonly View[] = ['changes', 'documents', 'source']
const sides: readonly Side[] = ['before', 'after']
const tabLabels = { changes: t('text', 'Changes'), documents: t('text', 'Full documents'), source: t('text', 'Markdown source') }
const sideLabels = { before: t('text', 'Before'), after: t('text', 'After') }
const sideLegends = { before: t('text', 'Removed'), after: t('text', 'Added') }
const root = ref<HTMLElement | null>(null)
const sideElements: Record<Side, Record<'pane' | 'scroller' | 'tab', HTMLElement | null>> = {
	before: { pane: null, scroller: null, tab: null },
	after: { pane: null, scroller: null, tab: null },
}
const tabRefs = new Map<View, HTMLButtonElement>()
const layoutMode = ref<'paired' | 'single'>('paired')
const activeSide = ref<Side>('before')
const view = ref<View>('changes')
const showDocuments = ref(false)
const hideFormatting = ref(false)
const currentId = ref<string | null>(null)
const currentLabel = ref('')
const failure = ref(false)
const SourceView = shallowRef<Component | null>(null)
let observer: ResizeObserver | null = null
let didReady = false
let destroyed = false

const resolver = props.fileId
	? new AttachmentResolver({
			currentDirectory:
				props.filePath?.split('/').slice(0, -1).join('/') ?? '/',
			fileId: props.fileId,
			session: undefined,
			shareToken: props.shareToken,
			user: getCurrentUser(),
		})
	: {
			async resolve(src: string) {
				return {
					fullUrl: src,
					isImage: true,
					name: src.split('/').pop(),
					previewUrl: src,
				}
			},
		}
provide(ATTACHMENT_RESOLVER, shallowRef(resolver))
provide(EDITOR_UPLOAD, false)

type ComparisonEditor = ReturnType<typeof createEditor>
type Decoration = ReturnType<typeof createDecoration>
const editors: Record<Side, ComparisonEditor | null> = { before: null, after: null }
const plugins: Record<Side, Decoration['plugin'][]> = { before: [], after: [] }
const pluginKeys: Record<Side, Decoration['key'] | null> = { before: null, after: null }
let model = { edits: [] as readonly Edit[] }

try {
	if (exceedsLimit(props.beforeContent, props.afterContent)) {
		throw new ModelLimit()
	}
	editors.before = createEditor(props.beforeContent, {
		ariaLabel: t('text', 'Before document'),
		filePath: props.filePath,
		noLazyImages: props.noLazyImages,
		openLink: props.openLinkHandler,
	})
	editors.after = createEditor(props.afterContent, {
		ariaLabel: t('text', 'After document'),
		filePath: props.filePath,
		noLazyImages: props.noLazyImages,
		openLink: props.openLinkHandler,
		schema: editors.before.schema,
	})
	model = createModel(
		editors.before.state.doc,
		editors.after.state.doc,
	)
	currentId.value = model.edits[0]?.id ?? null
	const descriptors = model.edits.flatMap(({ descriptors }) => descriptors)
	const initial = decorationSelection(model.edits, currentId.value)
	for (const side of sides) {
		const decoration = createDecoration(descriptors, side, t('text', 'Changed content'), initial)
		plugins[side] = [decoration.plugin]
		pluginKeys[side] = decoration.key
	}
} catch {
	activateFallback()
}
const activeEdits = computed(() => model.edits.filter((edit) => !hideFormatting.value || !isPureFormatting(edit)))
const activeIds = computed(() => activeEdits.value.map(({ id }) => id))
const formatCount = computed(() => model.edits.filter(isPureFormatting).length)
const rawDifferent = computed(() => props.beforeContent !== props.afterContent)
const announcement = computed(() => failure.value
	? t('text', 'Detailed rendered comparison unavailable')
	: activeIds.value.length
		? t('text', 'Change {current} of {total}: {label}', {
				current: currentOrdinal(activeIds.value, currentId.value),
				total: activeIds.value.length,
				label: currentLabel.value,
			})
		: t('text', 'No rendered changes'))

watch(activeIds, (ids) => {
	currentId.value = currentIdAfterFilter(
		model.edits,
		ids,
		currentId.value,
	)
	updateDecorations()
})
watch(currentId, refreshDocuments)
watch(view, (next) => {
	if (next === 'source' && !SourceView.value) {
		loadSource()
	}
})

onErrorCaptured(() => {
	activateFallback()
	nextTick(ready)
	return false
})
onMounted(() => {
	if (typeof ResizeObserver !== 'undefined') {
		observer = new ResizeObserver(([entry]) => {
			const nextLayout
				= (entry?.contentRect.width ?? root.value?.clientWidth ?? 760) < 760
					? 'single'
					: 'paired'
			if (nextLayout === layoutMode.value) {
				return
			}
			layoutMode.value = nextLayout
			locateCurrent(true)
		})
	}
	if (root.value) {
		observer?.observe(root.value)
	}
	ready()
})
onBeforeUnmount(() => {
	destroyed = true
	observer?.disconnect()
	observer = null
	destroyEditors()
})

function decorationSelection(edits: readonly Edit[], current: string | null) {
	const activeIds = edits.flatMap(({ descriptors }) => descriptors.map(({ id }) => id))
	const selected = edits.find(({ id }) => id === current)
	return {
		activeIds,
		currentIds: selected?.descriptors.map(({ id }) => id) ?? [],
	}
}
function updateDecorations() {
	if (
		sides.some((side) => !editors[side] || !pluginKeys[side] || editors[side]?.isDestroyed)
	) {
		return
	}
	const selection = decorationSelection(activeEdits.value, currentId.value)
	for (const side of sides) {
		setDecorations(editors[side]!, pluginKeys[side]!, selection)
	}
}
function refreshDocuments() {
	updateDecorations()
	locateCurrent(true)
}
function selectEdit(id: string) {
	currentId.value = id
	if (!isPureFormatting(model.edits.find((edit) => edit.id === id)!)) {
		setView('documents')
	}
}
function move(offset: number) {
	currentId.value = moveCurrentId(
		activeIds.value,
		currentId.value,
		offset,
	)
}
function locateCurrent(selectVisibleSide = false) {
	const edit = model.edits.find(({ id }) => id === currentId.value)
	if (!edit) {
		return
	}
	if (selectVisibleSide
		&& layoutMode.value === 'single'
		&& edit.descriptors.every((descriptor) => descriptor[activeSide.value].from === descriptor[activeSide.value].to)) {
		const other = activeSide.value === 'before' ? 'after' : 'before'
		if (edit.descriptors.some((descriptor) => descriptor[other].from !== descriptor[other].to)) {
			activeSide.value = other
		}
	}
	nextTick(() => {
		for (const side of ['before', 'after'] as const) {
			const editor = editors[side]
			const { pane, scroller } = sideElements[side]
			const range = edit.primary[side]
			locateTarget(
				pane,
				scroller,
				edit.primary.id,
				scrollBehavior(),
				() => {
					if (!editor || editor.isDestroyed) {
						return null
					}
					const rect = editor.view.coordsAtPos(range.from)
					return { top: rect.top, height: Math.max(1, rect.bottom - rect.top) }
				},
			)
		}
	})
}
function ready() {
	if (!didReady && !destroyed) {
		didReady = true
		emit('ready')
	}
}
function activateFallback() {
	failure.value = true
	destroyEditors()
}
function destroyEditors() {
	for (const side of sides) {
		editors[side]?.destroy()
		editors[side] = null
	}
}
async function loadSource() {
	try {
		SourceView.value = markRaw((await import('./MarkdownSourceComparison.vue')).default)
	} catch {
		SourceView.value = null
	}
}
function setView(next: View) {
	if (next === 'documents') {
		showDocuments.value = true
		locateCurrent(true)
	}
	view.value = next
	nextTick(() => tabRefs.get(next)?.focus())
}
function setSide(side: Side) {
	activeSide.value = side
	locateCurrent()
	nextTick(() => sideElements[side].tab?.focus())
}
function setSideElement(side: Side, key: 'pane' | 'scroller' | 'tab', element: Element | Public | null) {
	sideElements[side][key] = element instanceof HTMLElement ? element : null
}
function setTabRef(tab: View, element: Element | Public | null) {
	if (element instanceof HTMLButtonElement) {
		tabRefs.set(tab, element)
	}
}
function onViewTabKeydown(event: KeyboardEvent, tab: View) {
	const index = tabs.indexOf(tab)
	const direction = sideForKey(event.key)
	if (!direction) {
		return
	}
	event.preventDefault()
	const next = event.key === 'Home'
		? 0
		: event.key === 'End'
			? tabs.length - 1
			: (index + (direction === 'before' ? -1 : 1) + tabs.length) % tabs.length
	setView(tabs[next]!)
}
function onSideKeydown(event: KeyboardEvent) {
	const side = sideForKey(event.key)
	if (side) {
		event.preventDefault()
		setSide(side)
	}
}
</script>

<style lang="scss">
@use './../css/prosemirror.scss';

$g: var(--default-grid-baseline);
$border: var(--color-border);
$primary: var(--color-primary-element);

.text-comparison-root,
.text-comparison {
	display: flex;
	flex: 1;
	min-inline-size: 0;
	block-size: 100%;
	min-block-size: 0;
	overflow: hidden;
}
.text-comparison {
	flex-direction: column;
	.view-tabs,
	.side-tabs {
		display: flex;
		gap: calc(2 * $g);
	}
	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(2 * $g);
		border-block-end: 1px solid $border;
	}
	.navigation {
		display: grid;
		align-items: center;
		grid-template-columns: auto minmax(10rem, 1fr) auto;
		gap: $g;
	}
	.status,
	.changes-count,
	.empty p,
	.source-explanation {
		margin: 0;
	}
	.status {
		text-align: center;
	}
	.view-tabs,
	.side-tabs {
		button[role='tab'] {
			margin: 0 !important;
			border: 0 !important;
			border-block-end: 2px solid transparent !important;
			border-radius: 0 !important;
			background: transparent !important;
			&:focus-visible {
				box-shadow: none !important;
				outline: 2px solid $primary !important;
				outline-offset: -2px;
			}
			&[aria-selected='true'] {
				border-block-end-color: $primary !important;
				font-weight: 700;
			}
		}
	}
	.changes-controls,
	.changes-content {
		box-sizing: border-box;
		inline-size: min(calc(100% - 16px), 1040px);
		margin-inline: auto;
	}
	.changes-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(2 * $g);
		flex-wrap: wrap;
		padding-block: calc(2 * $g);
	}
	.changes-count,
	.filter,
	.hidden-formatting,
	.source-explanation {
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
	}
	.filter,
	.hidden-formatting {
		display: flex;
		align-items: center;
		gap: calc(1.5 * $g);
	}
	.hidden-formatting {
		justify-content: flex-end;
		padding: $g calc(3 * $g);
	}
	&__changes {
		flex: 1;
		min-block-size: 0;
		overflow: auto;
	}
	.changes-content {
		padding-block-end: calc(8 * $g);
	}
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: calc(3 * $g);
		min-block-size: calc(40 * $g);
		padding: calc(6 * $g);
		text-align: center;
	}
	&__documents,
	&__document,
	.source {
		display: flex;
		flex-direction: column;
		min-block-size: 0;
		overflow: hidden;
	}
	&__documents,
	.source {
		flex: 1;
	}
	.side-tabs {
		flex: none;
		inline-size: fit-content;
		margin: $g auto;
	}
	&__document-grid {
		display: grid;
		flex: 1;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		min-block-size: 0;
		overflow: hidden;
	}
	&__document {
		min-inline-size: 0;
		> header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: calc(2 * $g);
			padding: calc(2 * $g) calc(4 * $g);
			border-block-end: 1px solid $border;
			background: var(--color-main-background);
			flex-wrap: wrap;
		}
		.document-heading {
			display: flex;
			align-items: center;
			gap: calc(1.5 * $g);
			min-inline-size: 0;
			h2 {
				margin: 0;
				font-size: var(--default-font-size);
				font-weight: var(--font-weight-heading);
				line-height: var(--default-line-height);
			}
			span {
				inline-size: calc(4 * $g);
				font-weight: var(--font-weight-heading);
				line-height: 1;
				text-align: center;
			}
		}
		.document-legend {
			margin-inline-start: auto;
			color: var(--color-text-maxcontrast);
			font-size: var(--font-size-small);
			font-weight: var(--font-weight-element);
			white-space: nowrap;
		}
		& + & {
			border-inline-start: 1px solid $border;
		}
	}
	&__document--before .document-heading > span { color: var(--color-error-text); }
	&__document--after .document-heading > span { color: var(--color-success-text); }
	&__document-scroller {
		flex: 1;
		min-block-size: 0;
		padding-inline: calc(4 * $g);
		overflow: auto;
	}
	&__content .ProseMirror {
		inline-size: auto;
		min-inline-size: 0;
		min-block-size: 0;
		padding: calc(3 * $g) calc(1.5 * $g) calc(9 * $g);
		border: 0;
		.text-comparison-change--removed {
			--comparison-color: var(--color-error);
			background: var(--color-error-hover);
			text-decoration: line-through;
		}
		.text-comparison-change--added {
			--comparison-color: var(--color-success);
			background: var(--color-success-hover);
			text-decoration: underline;
		}
		.text-comparison-change--formatting {
			--comparison-color: var(--color-primary-element);
			background: var(--color-primary-element-light);
		}
		.text-comparison-change--attribute {
			box-shadow: inset 0 -2px var(--color-warning);
		}
		.text-comparison-change--move {
			--comparison-color: var(--color-element-info);
			box-shadow: inset 3px 0 var(--color-element-info);
		}
		.text-comparison-change--block {
			box-shadow: inset 0 0 0 2px var(--color-warning);
		}
		.text-comparison-change--current {
			outline: 2px solid $primary;
			outline-offset: 2px;
		}
		[data-node-view-wrapper].text-comparison-change,
		tr.text-comparison-change {
			box-shadow: inset 0 0 0 3px var(--comparison-color, var(--color-warning));
			&.text-comparison-change--current {
				box-shadow: inset 0 0 0 4px $primary;
			}
		}
	}
	&__sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.source-explanation {
		padding: calc(2 * $g) calc(3 * $g) 0;
	}
	&--single {
		.toolbar {
			flex-wrap: wrap;
		}
		.view-tabs {
			flex: 1;
		}
		.view-tabs button {
			flex: 1;
		}
		.navigation {
			flex: 0 0 100%;
			grid-template-columns: auto minmax(0, 1fr) auto;
			inline-size: 100%;
		}
		.status { min-inline-size: 0; }
		.text-comparison__document-grid {
			display: block;
		}
		.text-comparison__document {
			block-size: 100%;
			border-inline-start: 0;
		}
	}
}
@media (prefers-reduced-motion: reduce) {
	.text-comparison * {
		scroll-behavior: auto !important;
		transition: none !important;
	}
}
</style>
