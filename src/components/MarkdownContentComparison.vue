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
		<header class="text-comparison__header">
			<p
				class="text-comparison__sr-only"
				data-comparison-announcement
				aria-live="polite"
				aria-atomic="true">
				{{ navigationAnnouncement }}
			</p>
			<div class="text-comparison__toolbar">
				<div class="text-comparison__view-tabs" role="tablist" :aria-label="t('text', 'Comparison view')">
					<button
						:id="changesTabId"
						ref="changesTab"
						type="button"
						role="tab"
						:aria-controls="changesPanelId"
						:aria-selected="view === 'changes'"
						:disabled="!!renderedLimitReason"
						:tabindex="view === 'changes' ? 0 : -1"
						@click="setView('changes')"
						@keydown="onViewTabKeydown($event, 'changes')">
						{{ t('text', 'Changes') }}
					</button>
					<button
						:id="documentsTabId"
						ref="documentsTab"
						type="button"
						role="tab"
						:aria-controls="documentsPanelId"
						:aria-selected="view === 'documents'"
						:disabled="!!renderedLimitReason"
						:tabindex="view === 'documents' ? 0 : -1"
						@click="setView('documents')"
						@keydown="onViewTabKeydown($event, 'documents')">
						{{ t('text', 'Full documents') }}
					</button>
					<button
						:id="sourceTabId"
						ref="sourceTab"
						type="button"
						role="tab"
						:aria-controls="sourcePanelId"
						:aria-selected="view === 'source'"
						:tabindex="view === 'source' ? 0 : -1"
						@click="setView('source')"
						@keydown="onViewTabKeydown($event, 'source')">
						{{ t('text', 'Markdown source') }}
					</button>
				</div>

				<div
					v-if="view === 'documents' && activeIds.length"
					class="text-comparison__navigation"
					:aria-label="t('text', 'Change navigation')">
					<NcButton
						variant="tertiary"
						:aria-label="t('text', 'Previous change')"
						:disabled="activeIds.length <= 1"
						@click="move(-1)">
						{{ t('text', 'Previous') }}
					</NcButton>
					<p class="text-comparison__status" aria-hidden="true">
						{{ currentAnnouncement }}
					</p>
					<NcButton
						variant="tertiary"
						:aria-label="t('text', 'Next change')"
						:disabled="activeIds.length <= 1"
						@click="move(1)">
						{{ t('text', 'Next') }}
					</NcButton>
				</div>
			</div>

			<div v-if="view === 'changes' && !renderedLimitReason" class="text-comparison__changes-controls">
				<p class="text-comparison__changes-count">
					{{ n('text', '%n change', '%n changes', activeGroups.length) }}
				</p>
				<label v-if="formattingCount" class="text-comparison__filter">
					<input v-model="hidePureFormatting" type="checkbox">
					<span>{{ t('text', 'Hide formatting-only changes') }}</span>
					<small v-if="hidePureFormatting">{{ t('text', '{count} hidden', { count: formattingCount }) }}</small>
				</label>
			</div>

			<div
				v-if="view === 'documents' && hidePureFormatting && formattingCount"
				class="text-comparison__hidden-formatting"
				data-comparison-hidden-formatting
				role="status">
				<span>{{ n('text', '%n formatting change hidden', '%n formatting changes hidden', formattingCount) }}</span>
				<NcButton variant="tertiary" @click="hidePureFormatting = false">
					{{ t('text', 'Show') }}
				</NcButton>
			</div>
		</header>
		<div
			v-if="renderedLimitReason"
			class="text-comparison__rendered-limit"
			data-comparison-rendered-limit
			role="status">
			{{ renderedLimitReason === 'size'
				? t('text', 'This comparison is too large for rendered views. Markdown source is shown instead.')
				: t('text', 'This comparison has too many changes for rendered views. Markdown source is shown instead.') }}
		</div>

		<div
			v-show="view === 'changes'"
			:id="changesPanelId"
			class="text-comparison__changes"
			role="tabpanel"
			:aria-labelledby="changesTabId">
			<template v-if="!renderedLimitReason">
				<div v-if="activeGroups.length && originalAfter && originalBefore" class="text-comparison__changes-content">
					<ComparisonChangeList
						:afterDocument="originalAfter"
						:beforeDocument="originalBefore"
						:currentId="currentId || undefined"
						:groups="activeGroups"
						@currentLabel="currentLabel = $event"
						@select="selectDescriptor" />
				</div>
				<div
					v-else-if="model.descriptors.length"
					class="text-comparison__empty"
					data-comparison-empty="filtered"
					role="status">
					<p>{{ t('text', 'All rendered changes are formatting-only and hidden by the current filter.') }}</p>
				</div>
				<div
					v-else-if="rawDifferent"
					class="text-comparison__empty"
					data-comparison-empty="syntax"
					role="status">
					<p>{{ t('text', 'No rendered differences — Markdown syntax differs.') }}</p>
					<NcButton data-comparison-empty-action @click="setView('source')">
						{{ t('text', 'Open Markdown source') }}
					</NcButton>
				</div>
				<div
					v-else
					class="text-comparison__empty"
					data-comparison-empty="identical"
					role="status">
					<p>{{ t('text', 'No differences.') }}</p>
				</div>
			</template>
		</div>

		<div
			v-show="view === 'documents'"
			:id="documentsPanelId"
			class="text-comparison__documents"
			role="tabpanel"
			:aria-labelledby="documentsTabId">
			<div
				v-if="layoutMode === 'single'"
				class="text-comparison__side-tabs"
				role="tablist"
				:aria-label="t('text', 'Version to display')">
				<button
					:id="beforeTabId"
					ref="beforeSideTab"
					type="button"
					role="tab"
					:aria-selected="activeSide === 'before'"
					:aria-controls="beforePanelId"
					:tabindex="activeSide === 'before' ? 0 : -1"
					@click="setActiveSide('before')"
					@keydown="onSideTabKeydown($event, 'before')">
					{{ t('text', 'Before') }}
				</button>
				<button
					:id="afterTabId"
					ref="afterSideTab"
					type="button"
					role="tab"
					:aria-selected="activeSide === 'after'"
					:aria-controls="afterPanelId"
					:tabindex="activeSide === 'after' ? 0 : -1"
					@click="setActiveSide('after')"
					@keydown="onSideTabKeydown($event, 'after')">
					{{ t('text', 'After') }}
				</button>
			</div>

			<div v-if="beforeEditor && afterEditor" class="text-comparison__document-grid">
				<article
					v-show="layoutMode !== 'single' || activeSide === 'before'"
					:id="beforePanelId"
					ref="beforePane"
					class="text-comparison__document text-comparison__document--before"
					:role="layoutMode === 'single' ? 'tabpanel' : 'region'"
					:aria-label="layoutMode !== 'single' ? t('text', 'Before') : undefined"
					:aria-labelledby="layoutMode === 'single' ? beforeTabId : undefined">
					<header>
						<div class="text-comparison__document-heading">
							<span aria-hidden="true">−</span>
							<h2>{{ t('text', 'Before') }}</h2>
						</div>
						<span class="text-comparison__document-legend" aria-hidden="true">
							{{ t('text', 'Removed') }}
							<span v-if="layoutMode !== 'single'" data-comparison-independent-scrolling> · {{ t('text', 'Independent scroll') }}</span>
						</span>
						<p class="text-comparison__sr-only">
							{{ t('text', 'The Before pane scrolls independently. Removed content uses a minus sign, border, highlight, and line-through.') }}
						</p>
					</header>
					<div ref="beforeScroller" class="text-comparison__document-scroller">
						<ComparisonEditorContent
							class="text-comparison__content"
							:editor="beforeEditor"
							:plugins="beforePlugins"
							@ready="onEditorReady('before')" />
					</div>
				</article>

				<article
					v-show="layoutMode !== 'single' || activeSide === 'after'"
					:id="afterPanelId"
					ref="afterPane"
					class="text-comparison__document text-comparison__document--after"
					:role="layoutMode === 'single' ? 'tabpanel' : 'region'"
					:aria-label="layoutMode !== 'single' ? t('text', 'After') : undefined"
					:aria-labelledby="layoutMode === 'single' ? afterTabId : undefined">
					<header>
						<div class="text-comparison__document-heading">
							<span aria-hidden="true">+</span>
							<h2>{{ t('text', 'After') }}</h2>
						</div>
						<span class="text-comparison__document-legend" aria-hidden="true">
							{{ t('text', 'Added') }}
							<span v-if="layoutMode !== 'single'" data-comparison-independent-scrolling> · {{ t('text', 'Independent scroll') }}</span>
						</span>
						<p class="text-comparison__sr-only">
							{{ t('text', 'The After pane scrolls independently. Added content uses a plus sign, border, highlight, and underline.') }}
						</p>
					</header>
					<div ref="afterScroller" class="text-comparison__document-scroller">
						<ComparisonEditorContent
							class="text-comparison__content"
							:editor="afterEditor"
							:plugins="afterPlugins"
							@ready="onEditorReady('after')" />
					</div>
				</article>
			</div>
		</div>

		<div
			v-show="view === 'source'"
			:id="sourcePanelId"
			class="text-comparison__source"
			role="tabpanel"
			:aria-labelledby="sourceTabId">
			<p class="text-comparison__source-explanation">
				{{ t('text', 'Source compares literal Markdown, so its change groups and count can differ from rendered changes.') }}
			</p>
			<div v-if="sourceComponentLoading" class="text-comparison__source-message" role="status">
				{{ t('text', 'Loading Markdown source view…') }}
			</div>
			<div v-else-if="sourceComponentError" class="text-comparison__source-message" role="alert">
				<p>{{ t('text', 'Could not load the Markdown source view.') }}</p>
				<NcButton @click="loadSourceComponent">
					{{ t('text', 'Retry') }}
				</NcButton>
			</div>
			<component
				:is="SourceComparison"
				v-else-if="SourceComparison"
				:afterContent="afterContent"
				:beforeContent="beforeContent"
				:layoutMode="layoutMode" />
		</div>
	</section>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/core'
import type { Component, ShallowRef } from 'vue'
import type { ComparisonSide } from '../comparison/markdownComparison.ts'

import { getCurrentUser } from '@nextcloud/auth'
import { n, t } from '@nextcloud/l10n'
import {
	computed,
	markRaw,
	nextTick,
	onBeforeUnmount,
	onMounted,
	provide,
	ref,
	shallowRef,
	useId,
	watch,
} from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import ComparisonChangeList from './ComparisonChangeList.vue'
import ComparisonEditorContent from './ComparisonEditorContent.vue'
import { locateComparisonTarget } from '../comparison/comparisonDocumentLocation.ts'
import {
	currentIdAfterFilter,
	currentOrdinal,
	groupComparisonDescriptors,
	moveCurrentId,
	visibleDescriptorIds,
} from '../comparison/comparisonNavigation.ts'
import { createComparisonEditor } from '../comparison/createComparisonEditor.ts'
import {
	ComparisonModelLimitError,
	createComparisonDecorationPlugin,
	createMarkdownComparisonModel,
	setComparisonDecorationState,
} from '../comparison/markdownComparison.ts'
import { exceedsRenderedComparisonLimit } from '../comparison/renderedComparisonLimit.ts'
import AttachmentResolver from '../services/AttachmentResolver.js'
import { ATTACHMENT_RESOLVER, EDITOR_UPLOAD } from './Editor.provider.ts'

type LayoutMode = 'paired' | 'single'
type ComparisonView = 'changes' | 'documents' | 'source'

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
const root = ref<HTMLElement | null>(null)
const beforePane = ref<HTMLElement | null>(null)
const afterPane = ref<HTMLElement | null>(null)
const beforeScroller = ref<HTMLElement | null>(null)
const afterScroller = ref<HTMLElement | null>(null)
const changesTab = ref<HTMLButtonElement | null>(null)
const documentsTab = ref<HTMLButtonElement | null>(null)
const sourceTab = ref<HTMLButtonElement | null>(null)
const beforeSideTab = ref<HTMLButtonElement | null>(null)
const afterSideTab = ref<HTMLButtonElement | null>(null)
const layoutMode = ref<LayoutMode>('paired')
const view = ref<ComparisonView>(renderedLimitReason ? 'source' : 'changes')
const activeSide = ref<ComparisonSide>('before')
const hidePureFormatting = ref(false)
const SourceComparison: ShallowRef<Component | null> = shallowRef(null)
const sourceComponentLoading = ref(false)
const sourceComponentError = ref<unknown>(null)
let destroyed = false
const comparisonId = useId()
const changesPanelId = `${comparisonId}-changes-panel`
const documentsPanelId = `${comparisonId}-documents-panel`
const sourcePanelId = `${comparisonId}-source-panel`
const changesTabId = `${comparisonId}-changes-tab`
const documentsTabId = `${comparisonId}-documents-tab`
const sourceTabId = `${comparisonId}-source-tab`
const beforePanelId = `${comparisonId}-before-panel`
const afterPanelId = `${comparisonId}-after-panel`
const beforeTabId = `${comparisonId}-before-tab`
const afterTabId = `${comparisonId}-after-tab`

const attachmentResolver = props.fileId
	? new AttachmentResolver({
			currentDirectory: props.filePath?.split('/').slice(0, -1).join('/') ?? '/',
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
provide(ATTACHMENT_RESOLVER, shallowRef(attachmentResolver))
provide(EDITOR_UPLOAD, false)

const comparisonRuntime = renderedLimitReason ? null : createComparisonRuntime()
const afterEditor = comparisonRuntime?.afterEditor
const beforeEditor = comparisonRuntime?.beforeEditor
const model = comparisonRuntime?.model ?? { descriptors: [] }
const originalAfter = comparisonRuntime?.originalAfter
const originalBefore = comparisonRuntime?.originalBefore
const currentId = ref<string | null>(model.descriptors[0]?.id ?? null)
const rawDifferent = props.beforeContent !== props.afterContent
const formattingCount = model.descriptors.filter(({ facets }) => facets.length === 1 && facets[0] === 'formatting').length
const visibleIds = computed(() => visibleDescriptorIds(model.descriptors, hidePureFormatting.value))
const activeDescriptors = computed(() => {
	const active = new Set(visibleIds.value)
	return model.descriptors.filter(({ id }) => active.has(id))
})
const activeGroups = computed(() => groupComparisonDescriptors(activeDescriptors.value))
const activeIds = computed(() => activeGroups.value.map(({ id }) => id))
const currentLabel = ref(t('text', 'change'))
const currentAnnouncement = computed(() => {
	return t('text', 'Change {current} of {total}: {label}', {
		current: currentOrdinal(activeIds.value, currentId.value),
		total: activeIds.value.length,
		label: currentLabel.value,
	})
})
const navigationAnnouncement = computed(() => view.value === 'documents' && activeIds.value.length
	? currentAnnouncement.value
	: '')
const pluginRuntime = initializeComparisonPlugins()
const afterPluginKey = pluginRuntime?.afterPluginKey
const afterPlugins = pluginRuntime?.afterPlugins ?? []
const beforePluginKey = pluginRuntime?.beforePluginKey
const beforePlugins = pluginRuntime?.beforePlugins ?? []
const readyEditors = new Set<ComparisonSide>()
const pendingTargets: Record<ComparisonSide, string | null> = { before: null, after: null }

/** Create both state-only editors atomically so partial initialization cannot leak. */
function createComparisonRuntime() {
	const editors: Editor[] = []
	try {
		const editorOptions = {
			filePath: props.filePath,
			noLazyImages: props.noLazyImages,
			openLink: props.openLinkHandler,
		}
		const beforeEditor = createComparisonEditor(props.beforeContent, editorOptions)
		editors.push(beforeEditor)
		const afterEditor = createComparisonEditor(props.afterContent, {
			...editorOptions,
			schema: beforeEditor.schema,
		})
		editors.push(afterEditor)
		const originalBefore = beforeEditor.state.doc
		const originalAfter = afterEditor.state.doc
		const model = createMarkdownComparisonModel(originalBefore, originalAfter)
		let runtimeDestroyed = false
		return {
			afterEditor,
			beforeEditor,
			destroy() {
				if (runtimeDestroyed) {
					return
				}
				runtimeDestroyed = true
				beforeEditor.destroy()
				afterEditor.destroy()
			},
			model,
			originalAfter,
			originalBefore,
		}
	} catch (error) {
		for (const editor of editors) {
			editor.destroy()
		}
		if (error instanceof ComparisonModelLimitError) {
			renderedLimitReason = 'complexity'
			view.value = 'source'
			return null
		}
		throw error
	}
}

/** Prepare decorations against the original documents before their visible mount. */
function initializeComparisonPlugins() {
	if (!comparisonRuntime) {
		return null
	}
	try {
		const selection = { activeIds: visibleIds.value, currentId: currentId.value }
		const beforeDecoration = createComparisonDecorationPlugin(
			model.descriptors,
			'before',
			t('text', 'Removed content'),
			t('text', 'Content exists only in After'),
			selection,
		)
		const afterDecoration = createComparisonDecorationPlugin(
			model.descriptors,
			'after',
			t('text', 'Added content'),
			t('text', 'Content exists only in Before'),
			selection,
		)
		return {
			afterPluginKey: afterDecoration.key,
			afterPlugins: [afterDecoration.plugin],
			beforePluginKey: beforeDecoration.key,
			beforePlugins: [beforeDecoration.plugin],
		}
	} catch (error) {
		comparisonRuntime?.destroy()
		throw error
	}
}

/**
 * @param side Mounted comparison side
 */
function onEditorReady(side: ComparisonSide) {
	if (readyEditors.has(side)) {
		throw new Error('Comparison editor plugin initialization failed')
	}
	readyEditors.add(side)
}

/**
 * @param nextView Selected peer view
 */
function setView(nextView: ComparisonView) {
	if (renderedLimitReason && nextView !== 'source') {
		return
	}
	view.value = nextView
	if (nextView === 'source') {
		loadSourceComponent()
	}
}

/** Load the source view only after its peer tab is selected. */
async function loadSourceComponent() {
	if (SourceComparison.value || sourceComponentLoading.value) {
		return
	}
	sourceComponentLoading.value = true
	sourceComponentError.value = null
	try {
		const component = await import('./MarkdownSourceComparison.vue')
		if (!destroyed) {
			SourceComparison.value = markRaw(component.default)
		}
	} catch (error) {
		if (!destroyed) {
			sourceComponentError.value = error
		}
	} finally {
		if (!destroyed) {
			sourceComponentLoading.value = false
		}
	}
}

/**
 * Select a changelog record and locate both original document sides.
 *
 * @param id Opaque descriptor ID
 */
function selectDescriptor(id: string) {
	if (!activeIds.value.includes(id)) {
		return
	}
	currentId.value = id
	updateSelection()
	pendingTargets.before = id
	pendingTargets.after = id
	setView('documents')
	nextTick(locatePendingTargets)
}

/**
 * @param offset Navigation offset
 */
function move(offset: number) {
	const next = moveCurrentId(activeIds.value, currentId.value, offset)
	if (next) {
		selectDescriptor(next)
	}
}

/** Update decoration visibility and current state without replacing either document. */
function updateSelection() {
	if (!beforeEditor || !afterEditor || !beforePluginKey || !afterPluginKey) {
		return
	}
	const state = { activeIds: visibleIds.value, currentId: currentId.value }
	setComparisonDecorationState(beforeEditor, beforePluginKey, state)
	setComparisonDecorationState(afterEditor, afterPluginKey, state)
}

/** Locate every currently visible side with independent pane-local math. */
function locatePendingTargets() {
	if (view.value !== 'documents') {
		return
	}
	if (layoutMode.value === 'paired') {
		locatePendingSide('before')
		locatePendingSide('after')
	} else {
		locatePendingSide(activeSide.value)
	}
}

/**
 * @param side Visible document side
 */
function locatePendingSide(side: ComparisonSide) {
	const id = pendingTargets[side]
	if (!id) {
		return
	}
	const located = locateComparisonTarget(
		side === 'before' ? beforePane.value : afterPane.value,
		side === 'before' ? beforeScroller.value : afterScroller.value,
		id,
		reducedMotion() ? 'auto' : 'smooth',
	)
	if (located) {
		pendingTargets[side] = null
	}
}

/**
 * @param side Side selected in single mode
 * @param focus Whether keyboard navigation should move tab focus
 */
function setActiveSide(side: ComparisonSide, focus = false) {
	activeSide.value = side
	nextTick(() => {
		if (focus) {
			(side === 'before' ? beforeSideTab.value : afterSideTab.value)?.focus()
		}
		locatePendingSide(side)
	})
}

/**
 * @param event Tab keyboard event
 * @param current Current peer view
 */
function onViewTabKeydown(event: KeyboardEvent, current: ComparisonView) {
	const views: ComparisonView[] = renderedLimitReason ? ['source'] : ['changes', 'documents', 'source']
	let target: ComparisonView | undefined
	if (event.key === 'Home') {
		target = views[0]
	} else if (event.key === 'End') {
		target = views.at(-1)
	} else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
		const offset = event.key === 'ArrowRight' ? 1 : -1
		const index = views.indexOf(current)
		target = views[(index + offset + views.length) % views.length]
	}
	if (!target) {
		return
	}
	event.preventDefault()
	setView(target)
	nextTick(() => ({
		changes: changesTab.value,
		documents: documentsTab.value,
		source: sourceTab.value,
	})[target]?.focus())
}

/**
 * @param event Side-tab keyboard event
 * @param current Current document side
 */
function onSideTabKeydown(event: KeyboardEvent, current: ComparisonSide) {
	let target: ComparisonSide | null = null
	if (event.key === 'Home') {
		target = 'before'
	} else if (event.key === 'End') {
		target = 'after'
	} else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
		target = current === 'before' ? 'after' : 'before'
	}
	if (!target) {
		return
	}
	event.preventDefault()
	setActiveSide(target, true)
}

/** @param width Comparison container width */
function updateLayout(width: number) {
	if (!width) {
		return
	}
	layoutMode.value = width >= 760 ? 'paired' : 'single'
}

/** Return the user's motion-safe scrolling behavior. */
function reducedMotion() {
	return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

let rootObserver: ResizeObserver | null = null

watch(hidePureFormatting, () => {
	currentId.value = currentIdAfterFilter(model.descriptors, activeIds.value, currentId.value)
	for (const side of ['before', 'after'] as const) {
		if (pendingTargets[side] && !activeIds.value.includes(pendingTargets[side])) {
			pendingTargets[side] = currentId.value
		}
	}
	updateSelection()
})
watch(layoutMode, () => nextTick(locatePendingTargets))

onMounted(async () => {
	if (!renderedLimitReason && readyEditors.size !== 2) {
		throw new Error('Comparison editor plugin initialization failed')
	}
	if (root.value) {
		const initialWidth = root.value.getBoundingClientRect().width || root.value.clientWidth
		if (initialWidth) {
			updateLayout(initialWidth)
		}
		if (typeof ResizeObserver !== 'undefined') {
			rootObserver = new ResizeObserver(([entry]) => updateLayout(entry?.contentRect.width ?? 0))
			rootObserver.observe(root.value)
		}
	}
	if (renderedLimitReason) {
		await loadSourceComponent()
	}
	await nextTick()
	if (!renderedLimitReason && readyEditors.size !== 2) {
		throw new Error('Comparison editor plugin initialization failed')
	}
	emit('ready')
})

onBeforeUnmount(() => {
	destroyed = true
	rootObserver?.disconnect()
	comparisonRuntime?.destroy()
})
</script>

<style lang="scss">
@use './../css/prosemirror.scss';

// Widest the change list is allowed to grow. Its rows are single-line
// previews rather than prose, so they earn width well past a reading measure,
// but past this the longest preview still ends far short of the right edge and
// the row reads as two fragments with a gap between them.
$content-measure: 1040px;
// Gutter either side of the change list, matched by the controls above it.
$content-inset: 16px;

.text-comparison-root {
	display: flex;
	flex: 1 1 auto;
	inline-size: 100%;
	min-width: 0;
	min-height: 0;
	block-size: 100%;
	overflow: hidden;
}

.text-comparison {
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	min-width: 0;
	min-height: 0;
	block-size: 100%;
	overflow: hidden;
	color: var(--color-main-text);

	// No inline padding here: __changes-controls measures itself against this
	// box and must resolve to the same width as the list in the panel below.
	// The rows that are not on that measure carry their own inset instead.
	&__header {
		position: relative;
		z-index: 5;
		flex: 0 0 auto;
		padding-block: calc(2 * var(--default-grid-baseline));
		border-block-end: 1px solid var(--color-border);
		background: var(--color-main-background);
	}

	&__toolbar,
	&__hidden-formatting {
		padding-inline: calc(3 * var(--default-grid-baseline));
	}

	&__toolbar,
	&__changes-controls,
	&__hidden-formatting,
	&__navigation {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: calc(2 * var(--default-grid-baseline));
		min-width: 0;
	}

	&__toolbar {
		justify-content: space-between;
	}

	&__view-tabs,
	&__side-tabs {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1px;
		padding: calc(0.5 * var(--default-grid-baseline));
		border-radius: var(--border-radius-element);
		background: var(--color-background-dark);

		button {
			min-block-size: var(--default-clickable-area);
			padding-inline: calc(3 * var(--default-grid-baseline));
			border: 0;
			border-radius: var(--border-radius-small);
			background: transparent;
			font-size: var(--default-font-size);
			font-weight: var(--font-weight-element);

			&[aria-selected='true'] {
				background: var(--color-main-background);
				box-shadow: 0 1px 3px var(--color-box-shadow);
				color: var(--color-primary-element);
				font-weight: var(--font-weight-heading);
			}

			&:focus-visible {
				outline: 2px solid var(--color-primary-element);
				outline-offset: 1px;
			}
		}
	}

	&__navigation {
		flex: 0 0 auto;
		gap: calc(0.5 * var(--default-grid-baseline));

		button {
			min-block-size: var(--default-clickable-area);
		}
	}

	&__status,
	&__changes-count,
	&__empty p,
	&__source-message p,
	&__source-explanation {
		margin: 0;
	}

	&__status {
		min-inline-size: 10rem;
		font-size: var(--font-size-small);
		text-align: center;
	}

	/* The controls and the list share one measure so their rules line up at every width. */
	&__changes-controls,
	&__changes-content {
		box-sizing: border-box;
		inline-size: min(calc(100% - #{$content-inset}), #{$content-measure});
		margin-inline: auto;
	}

	&__changes-controls {
		justify-content: space-between;
		margin-block-start: calc(2 * var(--default-grid-baseline));
		padding-block-start: calc(2 * var(--default-grid-baseline));
		border-block-start: 1px solid var(--color-border);
	}

	&__changes-count {
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
	}

	&__filter {
		display: flex;
		align-items: center;
		gap: calc(1.5 * var(--default-grid-baseline));
		min-block-size: var(--default-clickable-area);
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
		white-space: nowrap;

		input {
			inline-size: calc(4 * var(--default-grid-baseline));
			block-size: calc(4 * var(--default-grid-baseline));
		}
	}

	&__hidden-formatting {
		justify-content: flex-end;
		margin-block-start: var(--default-grid-baseline);
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
	}

	&__rendered-limit {
		flex: 0 0 auto;
		padding: calc(2.5 * var(--default-grid-baseline)) calc(4 * var(--default-grid-baseline));
		border-block-end: 1px solid var(--color-border);
		background: var(--color-warning);
		color: var(--color-warning-text);
		text-align: center;
	}

	&__changes {
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		// Keeps a row the browser scrolls to clear of the sticky section header
		// it would otherwise be parked underneath.
		scroll-padding-block-start: var(--default-clickable-area);
	}

	&__changes-content {
		padding-block: calc(3 * var(--default-grid-baseline)) calc(8 * var(--default-grid-baseline));
	}

	&__empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: calc(3.5 * var(--default-grid-baseline));
		min-block-size: calc(45 * var(--default-grid-baseline));
		padding: calc(6 * var(--default-grid-baseline));
		text-align: center;
	}

	&__documents {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	&__side-tabs {
		flex: 0 0 auto;
		inline-size: fit-content;
		margin: calc(2 * var(--default-grid-baseline)) auto;
	}

	&__document-grid {
		display: grid;
		flex: 1 1 auto;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	&--single &__document-grid {
		display: block;
	}

	&--single &__document {
		block-size: 100%;
	}

	&__document {
		display: flex;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
		overflow: hidden;

		& + & {
			border-inline-start: 1px solid var(--color-border);
		}

		> header {
			display: flex;
			flex: 0 0 auto;
			align-items: center;
			justify-content: space-between;
			gap: calc(3 * var(--default-grid-baseline));
			padding: calc(2 * var(--default-grid-baseline)) calc(4 * var(--default-grid-baseline));
			border-block-end: 1px solid var(--color-border);
			background: var(--color-main-background);

			h2 {
				margin: 0;
				font-size: var(--default-font-size);
				font-weight: var(--font-weight-heading);
			}
		}
	}

	&__document-heading {
		display: flex;
		align-items: center;
		gap: calc(1.5 * var(--default-grid-baseline));

		span {
			inline-size: calc(4 * var(--default-grid-baseline));
			font-size: var(--default-font-size);
			font-weight: var(--font-weight-heading);
			line-height: 1;
			text-align: center;
		}
	}

	&__document--before > header &__document-heading span { color: var(--color-error-text); }
	&__document--after > header &__document-heading span { color: var(--color-success-text); }

	&__document-legend {
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-element);
	}

	&__document-scroller {
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;
		padding-inline: calc(4 * var(--default-grid-baseline));
		overflow: auto;
		overscroll-behavior: contain;
	}

	&--single &__document + &__document {
		border-inline-start: 0;
	}

	&__content {
		min-width: 0;

		// The rendered document keeps its own heading scale: these sizes belong
		// to the content being compared, not to the comparison chrome.
		.ProseMirror {
			min-width: 0;
			padding: calc(3 * var(--default-grid-baseline)) calc(1.5 * var(--default-grid-baseline)) calc(9 * var(--default-grid-baseline));
			font-size: var(--default-font-size);

			p { margin-block-end: 0.75em; }

			h1,
			h2,
			h3,
			h4,
			h5,
			h6 { margin-block: calc(4.5 * var(--default-grid-baseline)) calc(2 * var(--default-grid-baseline)); }

			h1 { font-size: 24px; }
			h2 { font-size: 20px; }
			h3 { font-size: 18px; }
			h4 { font-size: 17px; }

			pre {
				padding: calc(2.5 * var(--default-grid-baseline)) calc(3 * var(--default-grid-baseline));
				margin-block-end: 0.75em;
				font-size: var(--font-size-small);
			}

			img { max-inline-size: 100%; }
		}
	}

	&__source {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	&__source-explanation {
		flex: 0 0 auto;
		padding: calc(2 * var(--default-grid-baseline)) calc(3 * var(--default-grid-baseline));
		border-block-end: 1px solid var(--color-border);
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small);
		text-align: center;
	}

	&__source-message {
		padding: calc(6 * var(--default-grid-baseline));
		text-align: center;
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

.text-comparison-change {
	border-radius: var(--border-radius-small);
	box-decoration-break: clone;
	-webkit-box-decoration-break: clone;

	&--removed {
		border-block-end: 1px solid var(--color-border-error);
		background-color: var(--color-error);
		text-decoration: line-through;
		text-decoration-thickness: 1px;
	}

	&--added {
		border-block-end: 1px solid var(--color-border-success);
		background-color: var(--color-success);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	&--formatting {
		border-block-end: 3px double var(--color-primary-element);
		background: var(--color-primary-element-light);
		text-decoration: none;
	}

	&--attribute {
		border: 2px dashed var(--color-element-warning);
		background: var(--color-warning);
		text-decoration: none;
	}

	// Relocation reads as info, not primary: primary already marks the current
	// change and the selected changelog row, and a formatting change below.
	&--move {
		border-inline-start: 4px solid var(--color-element-info);
		background: var(--color-info);
		text-decoration: none;
	}

	// Excludes --move: a moved block carries both classes, and this rule is both
	// later and more specific, so it would repaint relocation as a warning.
	&--block:not(&--removed, &--added, &--move) {
		border: 2px solid var(--color-element-warning);
		background: var(--color-warning);
		text-decoration: none;
	}

	&--current {
		outline: 2px solid var(--color-primary-element);
		outline-offset: 2px;
	}

	&:not([data-node-view-wrapper], &--empty) {
		padding-inline: calc(0.5 * var(--default-grid-baseline));
	}

	&--empty {
		display: inline-grid;
		place-items: center;
		inline-size: 1.2em;
		block-size: 1.2em;
		margin-inline: var(--default-grid-baseline);
		border: 2px solid currentColor;
		border-radius: 50%;
		background: var(--color-main-background);
		color: var(--color-text-maxcontrast);
		font-size: 0.75em;
		line-height: 1;
		text-decoration: none;
	}
}

.text-comparison .text-comparison__content .ProseMirror .text-comparison-change--empty {
	width: 1.2em;
	border: 2px solid currentColor !important;
}

.text-comparison--single {
	.text-comparison__toolbar,
	.text-comparison__hidden-formatting { padding-inline: calc(2 * var(--default-grid-baseline)); }
	.text-comparison__toolbar { align-items: stretch; }
	.text-comparison__view-tabs { flex: 1 1 100%; }
	.text-comparison__view-tabs button { flex: 1 1 0; padding-inline: calc(1.5 * var(--default-grid-baseline)); }
	.text-comparison__navigation {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		inline-size: 100%;
	}
	.text-comparison__status { min-inline-size: 0; }
	.text-comparison__changes-controls { align-items: flex-start; }
	.text-comparison__filter { white-space: normal; }
}

@media (prefers-reduced-motion: reduce) {
	.text-comparison * {
		scroll-behavior: auto !important;
		transition: none !important;
	}
}
</style>
