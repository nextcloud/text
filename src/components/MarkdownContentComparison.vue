<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section class="text-comparison" :aria-label="t('text', 'Version comparison')">
		<MarkdownSourceFallback v-if="failed" :beforeContent="beforeContent" :afterContent="afterContent" />
		<template v-else>
			<header class="text-comparison__header">
				<div class="text-comparison__tabs" role="tablist" :aria-label="t('text', 'Comparison view')">
					<button
						v-for="tab in tabs"
						:key="tab"
						type="button"
						role="tab"
						:aria-selected="view === tab"
						:tabindex="view === tab ? 0 : -1"
						@click="view = tab"
						@keydown="onTabKeydown($event, tab)">
						{{ tabLabels[tab] }}
					</button>
				</div>
				<label v-if="formattingCount" class="text-comparison__filter">
					<input v-model="hideFormatting" type="checkbox">
					{{ t('text', 'Hide formatting-only changes') }}
				</label>
				<div v-if="view === 'documents' && visibleChanges.length" class="text-comparison__navigation">
					<NcButton
						variant="tertiary"
						:aria-label="t('text', 'Previous change')"
						:disabled="visibleChanges.length < 2"
						@click="move(-1)">
						{{ t('text', 'Previous') }}
					</NcButton>
					<span aria-hidden="true">{{ status }}</span>
					<NcButton
						variant="tertiary"
						:aria-label="t('text', 'Next change')"
						:disabled="visibleChanges.length < 2"
						@click="move(1)">
						{{ t('text', 'Next') }}
					</NcButton>
				</div>
			</header>
			<p class="text-comparison__sr-only" aria-live="polite" aria-atomic="true">
				{{ status }}
			</p>

			<section v-show="view === 'changes'" role="tabpanel" class="text-comparison__changes">
				<ComparisonChangeList
					v-if="visibleChanges.length"
					:changes="visibleChanges"
					:currentId="currentId"
					:beforeDocument="editors.before.state.doc"
					:afterDocument="editors.after.state.doc"
					@select="selectChange" />
				<p v-else class="text-comparison__empty" role="status">
					{{ emptyMessage }}
				</p>
			</section>

			<section v-show="view === 'documents'" role="tabpanel" class="text-comparison__documents">
				<article
					v-for="side in sides"
					:key="side"
					class="text-comparison__document"
					:class="`text-comparison__document--${side}`"
					:aria-label="sideLabels[side]">
					<header class="text-comparison__document-header">
						<h2>{{ sideLabels[side] }}</h2>
						<span>{{ sideLegends[side] }}</span>
					</header>
					<div :ref="(element) => setScroller(side, element)" class="text-comparison__document-scroller">
						<EditorContent :editor="editors[side]" />
					</div>
				</article>
			</section>
		</template>
	</section>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { Change } from '../comparison/compare.ts'
import type { ComparisonDecorationKey, ComparisonSide as Side } from '../comparison/decorations.ts'

import { getCurrentUser } from '@nextcloud/auth'
import { t } from '@nextcloud/l10n'
import { EditorContent } from '@tiptap/vue-3'
import { computed, nextTick, onBeforeUnmount, provide, ref, shallowRef, watch } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import ComparisonChangeList from './ComparisonChangeList.vue'
import MarkdownSourceFallback from './MarkdownSourceFallback.vue'
import { compareDocuments } from '../comparison/compare.ts'
import { createComparisonDecorationPlugin, setComparisonDecorations } from '../comparison/decorations.ts'
import { createComparisonEditor } from '../comparison/editor.ts'
import { logger } from '../helpers/logger.ts'
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

/** Larger inputs are shown as plain source instead of being compared. */
const MAX_CONTENT_LENGTH = 1_000_000

type View = 'changes' | 'documents'
const tabs: readonly View[] = ['changes', 'documents']
const sides: readonly Side[] = ['before', 'after']
const tabLabels = { changes: t('text', 'Changes'), documents: t('text', 'Full documents') }
const sideLabels = { before: t('text', 'Before'), after: t('text', 'After') }
const sideLegends = { before: t('text', 'Removed'), after: t('text', 'Added') }

provide(ATTACHMENT_RESOLVER, shallowRef(props.fileId
	? new AttachmentResolver({
			currentDirectory: props.filePath?.split('/').slice(0, -1).join('/') ?? '/',
			fileId: props.fileId,
			session: undefined,
			shareToken: props.shareToken,
			user: getCurrentUser(),
		})
	: {
			async resolve(src: string) {
				return { fullUrl: src, isImage: true, name: src.split('/').pop(), previewUrl: src }
			},
		}))
provide(EDITOR_UPLOAD, false)

const editors = {} as Record<Side, ReturnType<typeof createComparisonEditor>>
const decorationKeys = {} as Record<Side, ComparisonDecorationKey>
const scrollers: Record<Side, HTMLElement | null> = { before: null, after: null }
let changes: Change[] = []
const failed = ref(false)

try {
	if (props.beforeContent.length + props.afterContent.length > MAX_CONTENT_LENGTH) {
		throw new Error('Content exceeds the comparison limit')
	}
	for (const side of sides) {
		editors[side] = createComparisonEditor(props[`${side}Content`], {
			ariaLabel: sideLabels[side],
			filePath: props.filePath,
			noLazyImages: props.noLazyImages,
			openLink: props.openLinkHandler,
		})
		const { key, plugin } = createComparisonDecorationPlugin(side)
		editors[side].registerPlugin(plugin)
		decorationKeys[side] = key
	}
	changes = compareDocuments(editors.before.state.doc, editors.after.state.doc)
} catch (error) {
	logger.warn('Falling back to plain source comparison', { error })
	failed.value = true
	destroyEditors()
}

const view = ref<View>('changes')
const hideFormatting = ref(false)
const currentId = ref<string | null>(changes[0]?.id ?? null)
const formattingCount = changes.filter(({ category }) => category === 'formatting').length
const visibleChanges = computed(() => hideFormatting.value
	? changes.filter(({ category }) => category !== 'formatting')
	: changes)
const currentIndex = computed(() => visibleChanges.value.findIndex(({ id }) => id === currentId.value))
const status = computed(() => currentIndex.value < 0
	? t('text', 'No changes')
	: t('text', 'Change {current} of {total}', { current: currentIndex.value + 1, total: visibleChanges.value.length }))
const emptyMessage = computed(() => {
	if (changes.length) {
		return t('text', 'All changes are formatting-only and hidden.')
	}
	return props.beforeContent === props.afterContent
		? t('text', 'No differences.')
		: t('text', 'No rendered differences — Markdown syntax differs.')
})

watch(visibleChanges, (visible) => {
	if (!visible.some(({ id }) => id === currentId.value)) {
		currentId.value = visible[0]?.id ?? null
	}
})
watch([currentId, hideFormatting], () => {
	if (failed.value) {
		return
	}
	for (const side of sides) {
		setComparisonDecorations(editors[side], decorationKeys[side], {
			changes,
			currentId: currentId.value,
			hideFormatting: hideFormatting.value,
		})
	}
}, { immediate: true })
watch([currentId, view], () => nextTick(scrollToCurrent))

onBeforeUnmount(destroyEditors)

function selectChange(id: string) {
	currentId.value = id
	view.value = 'documents'
}

function move(offset: number) {
	const count = visibleChanges.value.length
	const index = (Math.max(currentIndex.value, 0) + offset + count) % count
	currentId.value = visibleChanges.value[index]!.id
}

function scrollToCurrent() {
	if (view.value !== 'documents' || currentId.value === null) {
		return
	}
	for (const side of sides) {
		const scroller = scrollers[side]
		const target = scroller?.querySelector<HTMLElement>(`[data-comparison-change="${currentId.value}"]`)
		if (!scroller || !target) {
			continue
		}
		const offset = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top
		scroller.scrollTop += offset - (scroller.clientHeight - target.offsetHeight) / 2
	}
}

function setScroller(side: Side, element: Element | ComponentPublicInstance | null) {
	scrollers[side] = element instanceof HTMLElement ? element : null
}

function onTabKeydown(event: KeyboardEvent, tab: View) {
	const index = tabs.indexOf(tab)
	const next = {
		ArrowLeft: index - 1,
		ArrowRight: index + 1,
		Home: 0,
		End: tabs.length - 1,
	}[event.key]
	if (next === undefined) {
		return
	}
	event.preventDefault()
	view.value = tabs[(next + tabs.length) % tabs.length]!
	nextTick(() => (event.currentTarget as HTMLElement).parentElement
		?.querySelector<HTMLElement>('[aria-selected="true"]')
		?.focus())
}

function destroyEditors() {
	for (const side of sides) {
		editors[side]?.destroy()
	}
}
</script>

<style lang="scss">
@use './../css/prosemirror.scss';

.text-comparison {
	display: flex;
	flex: 1;
	flex-direction: column;
	min-inline-size: 0;
	block-size: 100%;
	min-block-size: 0;
	overflow: hidden;
	container-type: inline-size;

	$g: var(--default-grid-baseline);

	&__header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: calc(2 * $g);
		padding-inline: calc(2 * $g);
		border-block-end: 1px solid var(--color-border);
	}

	&__tabs {
		display: flex;

		button[role='tab'] {
			margin: 0;
			padding: calc(2 * $g) calc(3 * $g);
			border: 0;
			border-block-end: 2px solid transparent;
			border-radius: 0;
			background: transparent;

			&[aria-selected='true'] {
				border-block-end-color: var(--color-primary-element);
				font-weight: bold;
			}

			&:focus-visible {
				outline: 2px solid var(--color-primary-element);
				outline-offset: -2px;
			}
		}
	}

	&__filter {
		display: flex;
		align-items: center;
		gap: $g;
		color: var(--color-text-maxcontrast);
	}

	&__navigation {
		display: flex;
		align-items: center;
		gap: $g;
		margin-inline-start: auto;
	}

	&__sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		margin: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	&__changes {
		flex: 1;
		min-block-size: 0;
		overflow: auto;
	}

	&__empty {
		padding: calc(6 * $g);
		text-align: center;
	}

	&__documents {
		display: grid;
		flex: 1;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		min-block-size: 0;
	}

	&__document {
		display: flex;
		flex-direction: column;
		min-inline-size: 0;
		min-block-size: 0;

		& + & {
			border-inline-start: 1px solid var(--color-border);
		}
	}

	&__document-header {
		display: flex;
		justify-content: space-between;
		padding: calc(2 * $g) calc(4 * $g);
		border-block-end: 1px solid var(--color-border);

		h2 {
			margin: 0;
			font-size: var(--default-font-size);
		}

		span {
			color: var(--color-text-maxcontrast);
		}
	}

	&__document-scroller {
		flex: 1;
		min-block-size: 0;
		padding-inline: calc(4 * $g);
		overflow: auto;
		scroll-behavior: smooth;

		.ProseMirror {
			inline-size: auto;
			min-block-size: 0;
			padding: calc(3 * $g) calc(1.5 * $g) calc(9 * $g);
			border: 0;
		}
	}

	.text-comparison-change--removed {
		background: var(--color-error-hover);
		text-decoration: line-through;
	}

	.text-comparison-change--added {
		background: var(--color-success-hover);
	}

	.text-comparison-change--formatting {
		background: var(--color-primary-element-light);
	}

	.text-comparison-change--attribute {
		box-shadow: inset 0 -2px var(--color-warning);
	}

	.text-comparison-change--block {
		box-shadow: inset 0 0 0 2px var(--color-border-dark);
	}

	.text-comparison-change--current {
		outline: 2px solid var(--color-primary-element);
		outline-offset: 2px;
	}

	@container (max-width: 759px) {
		&__documents {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: repeat(2, minmax(0, 1fr));
		}

		&__document + &__document {
			border-inline-start: 0;
			border-block-start: 1px solid var(--color-border);
		}
	}
}

@media (prefers-reduced-motion: reduce) {
	.text-comparison__document-scroller {
		scroll-behavior: auto;
	}
}
</style>
