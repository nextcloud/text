<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section
		v-if="view.kind !== 'hidden'"
		ref="root"
		tabindex="-1"
		class="text-version-summary"
		:class="{ 'text-version-summary--empty': !card && !note && !summary.connectionLost.value }"
		:aria-label="t('text', 'AI summary of changes')"
		data-text-version-summary>
		<p class="text-comparison__sr-only" role="status">
			{{ announcement }}
		</p>

		<div v-if="start" class="text-version-summary__start">
			<NcAssistantButton
				v-if="start.button"
				:disabled="!start.enabled"
				:text="t('text', 'Summarize changes')"
				@click="begin()" />
			<p v-if="start.note" class="text-version-summary__start-note">
				{{ start.note }}
			</p>
		</div>

		<NcAssistantContent v-if="card" class="text-version-summary__card" contentClasses="text-version-summary__inner">
			<header class="text-version-summary__head">
				<NcAssistantIcon
					v-if="view.kind === 'done'"
					class="text-version-summary__icon"
					inline
					:size="20" />
				<NcLoadingIcon v-else class="text-version-summary__icon" :size="20" />
				<h2 class="text-version-summary__title">
					{{ view.kind === 'done' ? t('text', 'Summary of changes') : t('text', 'Summarizing changes…') }}
				</h2>
				<span v-if="view.kind === 'done' && summary.collapsed.value" class="text-version-summary__detail" dir="auto">{{ firstLine }}</span>
				<span v-else-if="view.kind === 'queued'" class="text-version-summary__detail">{{ queueText }}</span>
				<div v-if="view.kind === 'done'" class="text-version-summary__actions">
					<NcButton
						variant="tertiary"
						:aria-label="copied ? t('text', 'Copied') : t('text', 'Copy summary')"
						:title="copied ? t('text', 'Copied') : t('text', 'Copy summary')"
						@click="copy">
						<template #icon>
							<CheckIcon v-if="copied" :size="20" />
							<ContentCopyIcon v-else :size="20" />
						</template>
					</NcButton>
					<NcButton
						variant="tertiary"
						:aria-label="toggleLabel"
						:aria-expanded="!summary.collapsed.value"
						:aria-controls="bodyId"
						:title="toggleLabel"
						@click="summary.collapsed.value = !summary.collapsed.value">
						<template #icon>
							<ChevronDownIcon v-if="summary.collapsed.value" :size="20" />
							<ChevronUpIcon v-else :size="20" />
						</template>
					</NcButton>
				</div>
			</header>
			<p v-if="view.kind === 'done'" class="text-version-summary__notice">
				{{ range }} · {{ t('text', 'AI-generated, may omit or misstate changes') }}
			</p>
			<div
				v-if="view.kind === 'done'"
				v-show="!summary.collapsed.value"
				:id="bodyId"
				class="text-version-summary__body">
				<!-- Each block in the language of the newer version, whatever the interface's direction -->
				<div class="text-version-summary__text" data-text-version-summary-text>
					<template v-for="(block, index) in blocks" :key="index">
						<ul v-if="block.items" class="text-version-summary__list" dir="auto">
							<li v-for="(item, itemIndex) in block.items" :key="itemIndex">
								{{ item }}
							</li>
						</ul>
						<p v-else dir="auto">
							{{ block.text }}
						</p>
					</template>
				</div>
			</div>
			<div v-else class="text-version-summary__body">
				<NcProgressBar
					v-if="view.kind === 'running' && view.progress !== null"
					class="text-version-summary__bar"
					:value="Math.round(view.progress * 100)" />
				<p class="text-version-summary__notice">
					{{ waitText }}
				</p>
			</div>
		</NcAssistantContent>

		<NcNoteCard v-if="note" class="text-version-summary__note" :type="note.type">
			<div class="text-version-summary__note-row">
				<p>{{ note.text }}</p>
				<NcButton
					v-if="note.next"
					ref="nextButton"
					@click="note.next.run()">
					{{ note.next.label }}
				</NcButton>
			</div>
		</NcNoteCard>

		<NcNoteCard v-if="summary.connectionLost.value" class="text-version-summary__note" type="warning">
			<template #icon>
				<WifiOffIcon class="text-version-summary__note-icon" :size="20" />
			</template>
			<div class="text-version-summary__note-row">
				<p>{{ t('text', 'Connection lost. Trying again…') }}</p>
				<NcButton @click="summary.lookupNow()">
					{{ t('text', 'Retry now') }}
				</NcButton>
			</div>
		</NcNoteCard>
	</section>
</template>

<script setup lang="ts">
import type { ComparedEnds, VersionEntry } from '../comparison/versionEnds.ts'
import type { SummaryTexts } from '../versionSummary/summaries.ts'

import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { computed, nextTick, ref, useId, useTemplateRef, watch } from 'vue'
import NcAssistantButton from '@nextcloud/vue/components/NcAssistantButton'
import NcAssistantContent from '@nextcloud/vue/components/NcAssistantContent'
import NcAssistantIcon from '@nextcloud/vue/components/NcAssistantIcon'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import NcProgressBar from '@nextcloud/vue/components/NcProgressBar'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'
import ContentCopyIcon from 'vue-material-design-icons/ContentCopy.vue'
import WifiOffIcon from 'vue-material-design-icons/WifiOff.vue'
import { formatDate } from '../comparison/versionEnds.ts'
import { copyText } from '../versionSummary/copy.ts'
import { useVersionSummary } from '../versionSummary/summaries.ts'

const props = defineProps<{
	ends: ComparedEnds
	texts: SummaryTexts
	/** Load both texts again, after the file changed */
	reload: () => void
}>()

const summary = useVersionSummary(props.ends, props.texts)
const view = summary.view
const bodyId = useId()
const root = useTemplateRef<HTMLElement>('root')

// The button goes away, so the keyboard goes to the summary
function begin() {
	const hadFocus = root.value?.contains(document.activeElement) ?? false
	summary.generate()
	if (hadFocus) {
		nextTick(() => root.value?.focus())
	}
}

function unavailableNote(reason: string, retryAfter: number | null) {
	switch (reason) {
		case 'instance_cap':
			return retryAfter
				? t('text', 'This Nextcloud has reached its limit of summaries for this hour. Try again after {time}.', { time: timeOf(retryAfter) })
				: t('text', 'This Nextcloud has reached its limit of summaries for this hour.')
		case 'user_cap':
			return retryAfter
				? t('text', 'You have reached your limit of summaries for this hour. Try again after {time}.', { time: timeOf(retryAfter) })
				: t('text', 'You have reached your limit of summaries for this hour.')
		case 'too_large':
			return t('text', 'These versions are too long to summarize.')
		case 'unsupported_encoding':
			return t('text', 'Summaries are only available for files saved as UTF-8.')
		default:
			return t('text', 'Summaries are not available: no AI provider is set up. Ask your administrator.')
	}
}

function timeOf(seconds: number) {
	return new Date(seconds * 1000).toLocaleTimeString([], { timeStyle: 'short' })
}

const queueText = computed(() => {
	const current = view.value
	return current.kind === 'queued' && current.position !== null
		? t('text', 'Position {position} in the queue', { position: current.position })
		: t('text', 'Waiting for the AI provider')
})

const waitText = t('text', 'This can take a few minutes. Closing the comparison does not stop it.')

const progressText = computed(() => view.value.kind === 'running'
	? `${t('text', 'Summarizing changes…')} ${waitText}`
	: `${t('text', 'Summarizing changes…')} ${queueText.value}. ${waitText}`)

const start = computed<{ button: boolean, enabled?: boolean, note?: string } | undefined>(() => {
	const current = view.value
	switch (current.kind) {
		case 'ready':
			return { button: true, enabled: true, note: t('text', 'Both complete versions are sent to the AI provider of this Nextcloud.') }
		case 'unavailable':
			return { button: true, enabled: false, note: unavailableNote(current.reason, current.retryAfter) }
		case 'identical':
			return { button: false, note: t('text', 'The two versions are identical.') }
		case 'looksSame':
			return { button: false, note: t('text', 'The two versions look the same. Only their Markdown source differs.') }
		default:
			return undefined
	}
})

const card = computed(() => ['queued', 'running', 'done'].includes(view.value.kind))

interface Note {
	type: 'info' | 'warning' | 'error'
	text: string
	next?: { label: string, run: () => void }
}

const note = computed<Note | undefined>(() => {
	const current = view.value
	const tryAgain = { label: t('text', 'Try again'), run: begin }
	switch (current.kind) {
		case 'failed': {
			const text = current.code === 'invalid_output'
				? t('text', 'The AI answer could not be used.')
				: [t('text', 'The summary could not be created.'), current.message].filter(Boolean).join(' ')
			const { available, reason, retryAfter } = current.generation
			return available
				? { type: 'error', text: `${text} ${t('text', 'Trying again sends both complete versions to the AI provider.')}`, next: tryAgain }
				: { type: 'error', text: `${text} ${unavailableNote(reason ?? 'no_provider', retryAfter)}` }
		}
		case 'rateLimited':
			return { type: 'warning', text: t('text', 'You asked for several summaries in a short time. Try again in two minutes.'), next: tryAgain }
		case 'changed':
			return {
				type: 'warning',
				text: current.whileRunning
					? t('text', 'This file was saved while the summary was being made. The summary still finishes for the versions you compared. Reload to compare the latest saved version.')
					: t('text', 'This file changed after you opened the comparison.'),
				next: { label: t('text', 'Reload comparison'), run: props.reload },
			}
		case 'versionMissing':
			return { type: 'warning', text: t('text', 'One of these versions no longer exists. Choose another version.') }
		case 'accessLost':
			return { type: 'error', text: t('text', 'You can no longer open this file.') }
		case 'disabled':
			return { type: 'info', text: t('text', 'Summaries were turned off by your administrator.') }
		default:
			return undefined
	}
})

/** Lines starting with a dash become a list */
const blocks = computed(() => {
	const current = view.value
	if (current.kind !== 'done') {
		return []
	}
	const result: { items?: string[], text?: string }[] = []
	for (const line of current.summary.split('\n').map((text) => text.trim()).filter(Boolean)) {
		const item = line.match(/^[-*•]\s+(.*)$/)?.[1]
		const last = result.at(-1)
		if (item !== undefined && last?.items) {
			last.items.push(item)
		} else if (item !== undefined) {
			result.push({ items: [item] })
		} else {
			result.push({ text: line })
		}
	}
	return result
})

const toggleLabel = computed(() => summary.collapsed.value ? t('text', 'Expand summary') : t('text', 'Collapse summary'))

const firstLine = computed(() => {
	const first = blocks.value[0]
	return first?.items?.[0] ?? first?.text ?? ''
})

/** Names and labels as typed: Vue escapes what it shows */
const raw = { escape: false }

function describe(end: VersionEntry, style: 'short' | 'seconds') {
	const author = end.author?.displayName ?? t('text', 'unknown')
	const details = [formatDate(end.mtime, style), author].join(', ')
	if (end.id === 'current') {
		return end.label
			? t('text', 'the current version "{label}" ({details})', { label: end.label, details }, undefined, raw)
			: t('text', 'the current version ({details})', { details }, undefined, raw)
	}
	return end.label
		? t('text', '"{label}" ({details})', { label: end.label, details }, undefined, raw)
		: t('text', '{date} ({author})', { date: formatDate(end.mtime, style), author }, undefined, raw)
}

const range = computed(() => {
	const ends = summary.ends.value
	if (!ends) {
		return undefined
	}
	// Both ends saved within one minute are told apart by their seconds
	const style = formatDate(ends.from.mtime) === formatDate(ends.to.mtime) ? 'seconds' : 'short'
	return t('text', 'From {from} to {to}', { from: describe(ends.from, style), to: describe(ends.to, style) }, undefined, raw)
})

const announcement = computed(() => {
	if (summary.connectionLost.value) {
		return t('text', 'Connection lost. Trying again…')
	}
	switch (view.value.kind) {
		case 'done':
			return t('text', 'The AI summary of the changes is ready.')
		case 'queued':
		case 'running':
			return progressText.value
		case 'unavailable':
			// Said when it answers the user; shown silently on opening
			return summary.userStarted.value ? start.value?.note ?? '' : ''
		case 'identical':
		case 'looksSame':
			return start.value?.note ?? ''
		case 'ready':
			return ''
		default:
			return note.value?.text ?? ''
	}
})

// After a failure the user caused, the keyboard goes where they can go on, unless it moved elsewhere
const nextButton = useTemplateRef<{ $el: HTMLElement }>('nextButton')
watch(() => view.value.kind, async () => {
	const active = document.activeElement
	if (summary.userStarted.value && note.value?.next && (active === document.body || root.value?.contains(active))) {
		await nextTick()
		nextButton.value?.$el.focus()
	}
})

const copied = ref(false)

async function copy() {
	if (view.value.kind !== 'done') {
		return
	}
	const heading = t('text', 'AI summary of changes in {file}, {range} (AI-generated, may omit or misstate changes):', { file: summary.fileName.value, range: range.value ?? '' }, undefined, raw)
	if (await copyText(`${heading}\n\n${view.value.summary}`)) {
		copied.value = true
		setTimeout(() => {
			copied.value = false
		}, 2000)
	} else {
		showError(t('text', 'Could not copy the summary.'))
	}
}
</script>

<style lang="scss">
.text-version-summary {
	$g: var(--default-grid-baseline);

	display: flex;
	flex-direction: column;
	gap: calc(2 * $g);
	padding: calc(3 * $g);
	background-color: var(--color-main-background);

	&--empty {
		padding: 0;
	}

	// Focused after a start: the ring goes around what it shows
	&:focus-visible {
		outline: none;
	}

	&:focus-visible > &__card,
	&:focus-visible > &__note {
		outline: 2px solid var(--color-main-text);
		outline-offset: 2px;
	}

	& &__inner {
		display: flex;
		flex-direction: column;
		gap: $g;
		padding: calc(2 * $g) calc(3 * $g) calc(3 * $g);
	}

	&__head {
		display: flex;
		align-items: center;
		gap: calc(2 * $g);
		min-inline-size: 0;
		min-block-size: var(--default-clickable-area);
	}

	&__icon {
		flex-shrink: 0;
	}

	& &__title {
		flex-shrink: 0;
		margin: 0;
		color: var(--color-main-text);
		font-size: var(--default-font-size);
		font-weight: bold;
		line-height: var(--default-line-height);
	}

	&__detail {
		flex: 1 1 auto;
		min-inline-size: 0;
		overflow: hidden;
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small, 13px);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__actions {
		display: flex;
		flex-shrink: 0;
		margin-inline-start: auto;
		margin-inline-end: calc(-2 * $g);
	}

	// Lined up with the title, the bullets hanging under the icon
	&__body {
		display: flex;
		flex-direction: column;
		gap: calc(2 * $g);
		padding-inline-start: calc(20px + 2 * $g);
	}

	// Leaves room for the documents in short windows; the scroll box takes in
	// the bullets' gutter on either side, for summaries in the other direction
	&__text {
		max-block-size: 30vh;
		margin-inline-start: -1.25em;
		padding-inline: 1.25em;
		overflow-y: auto;
		overflow-wrap: anywhere;
		line-height: 1.6;
		user-select: text;

		p {
			margin: 0 0 $g;
		}
	}

	&__list {
		margin: 0;
		padding: 0;
		list-style: disc outside;

		li + li {
			margin-block-start: $g;
		}

		li::marker {
			color: var(--color-text-maxcontrast);
		}
	}

	&__notice {
		margin: 0;
		color: var(--color-text-maxcontrast);
		font-size: var(--font-size-small, 13px);
	}

	&__bar {
		max-inline-size: 360px;
	}

	& &__note {
		margin: 0;

		// The note's text takes the width, so its button stays beside it
		> div:last-child {
			flex: 1;
			min-inline-size: 0;
		}
	}

	&__note-icon {
		color: var(--note-theme);
	}

	&__note-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: $g calc(3 * $g);

		p {
			flex: 0 1 auto;
			max-inline-size: 70ch;
			margin: 0;
		}
	}
}

.text-version-summary__start {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: calc(2 * var(--default-grid-baseline));
	padding: calc(2 * var(--default-grid-baseline)) calc(3 * var(--default-grid-baseline));
}

.text-version-summary__start-note {
	margin: 0;
	color: var(--color-text-maxcontrast);
	font-size: var(--font-size-small, 13px);
}
</style>
