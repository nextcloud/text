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
				<!-- Each line in the language of the newer version, whatever the interface's direction -->
				<div
					ref="text"
					class="text-version-summary__text"
					:class="{ 'text-version-summary__text--more': more }"
					tabindex="0"
					data-text-version-summary-text
					@scroll="measure">
					<p
						v-for="(line, index) in parts.gist"
						:key="index"
						class="text-version-summary__gist"
						dir="auto">
						{{ line }}
					</p>
					<div v-if="parts.groups.length" class="text-version-summary__groups">
						<section v-for="(group, index) in parts.groups" :key="index" class="text-version-summary__group">
							<h3 v-if="group.label" class="text-version-summary__label" dir="auto">
								{{ group.label }}
							</h3>
							<p v-for="(paragraph, paragraphIndex) in group.paragraphs" :key="paragraphIndex" dir="auto">
								{{ paragraph }}
							</p>
							<ul v-if="group.items.length" class="text-version-summary__list" dir="auto">
								<li v-for="(item, itemIndex) in group.items" :key="itemIndex">
									{{ item }}
								</li>
							</ul>
						</section>
					</div>
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
				<p>{{ t('text', 'No answer from the server. Trying again…') }}</p>
				<NcButton @click="summary.retryNow()">
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
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, ref, useId, useTemplateRef, watch } from 'vue'
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
import { formatDates, isCurrent } from '../comparison/versionEnds.ts'
import { copyText } from '../versionSummary/copy.ts'
import { parseSummary } from '../versionSummary/format.ts'
import { policyOf } from '../versionSummary/states.ts'
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

const queueText = computed(() => {
	const current = view.value
	return current.kind === 'queued' && current.position !== null
		? t('text', 'Position {position} in the queue', { position: current.position })
		: t('text', 'Waiting for the AI provider')
})

const waitText = t('text', 'This can take a few minutes. Closing the comparison does not stop it.')

const display = computed(() => policyOf(view.value).display)
const card = computed(() => display.value.place === 'card')

const actions = {
	tryAgain: { label: t('text', 'Try again'), run: begin },
	reload: { label: t('text', 'Reload comparison'), run: () => props.reload() },
}

const note = computed(() => {
	const shown = display.value
	return shown.place === 'note' ? { type: shown.type, text: shown.text, next: shown.next && actions[shown.next] } : undefined
})

const parts = computed(() => view.value.kind === 'done' ? parseSummary(view.value.summary) : { gist: [], groups: [] })

// A summary longer than its box scrolls; its end fades until it is read, so it does not look complete
const text = useTemplateRef<HTMLElement>('text')
const more = ref(false)
function measure() {
	const box = text.value
	more.value = box !== null && box.scrollTop + box.clientHeight < box.scrollHeight - 1
}
useResizeObserver(text, measure)
watch(parts, () => nextTick(measure))

const toggleLabel = computed(() => summary.collapsed.value ? t('text', 'Expand summary') : t('text', 'Collapse summary'))

const firstLine = computed(() => {
	const [group] = parts.value.groups
	return parts.value.gist[0] ?? group?.paragraphs[0] ?? group?.items[0] ?? ''
})

/** Names and labels as typed: Vue escapes what it shows */
const raw = { escape: false, sanitize: false }

function describe(end: VersionEntry, date: string) {
	const author = end.author?.displayName ?? t('text', 'unknown')
	const details = [date, author].join(', ')
	if (isCurrent(end.id)) {
		return end.label
			? t('text', 'the current version "{label}" ({details})', { label: end.label, details }, undefined, raw)
			: t('text', 'the current version ({details})', { details }, undefined, raw)
	}
	return end.label
		? t('text', '"{label}" ({details})', { label: end.label, details }, undefined, raw)
		: t('text', '{date} ({author})', { date, author }, undefined, raw)
}

const range = computed(() => {
	const ends = summary.ends.value
	if (!ends) {
		return undefined
	}
	// Both ends saved within one minute are told apart by their seconds
	const [from, to] = formatDates([ends.from.mtime, ends.to.mtime])
	return t('text', 'From {from} to {to}', { from: describe(ends.from, from!), to: describe(ends.to, to!) }, undefined, raw)
})

const announcement = computed(() => {
	if (summary.connectionLost.value) {
		return t('text', 'No answer from the server. Trying again…')
	}
	const shown = display.value
	switch (shown.place) {
		case 'card':
			// Not the queue position: each change would be read out again
			return view.value.kind === 'done' ? t('text', 'The AI summary of the changes is ready.') : `${t('text', 'Summarizing changes…')} ${waitText}`
		case 'note':
			return shown.text
		case 'start':
			return shown.said === 'always' || (shown.said === 'answer' && summary.userStarted.value) ? shown.text : ''
		default:
			return ''
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
	if (await copyText(`${heading}\n\n${view.value.summary}`, root.value ?? document.body)) {
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

		&--more {
			mask-image: linear-gradient(to bottom, #000 calc(100% - 3em), transparent);
		}

		// Inside the box, where the fade does not hide it
		&:focus-visible {
			outline-offset: calc(-1 * var(--border-width-input-focused, 2px));
		}
	}

	&__gist {
		color: var(--color-main-text);
	}

	// The groups share the width of a wide comparison, one under another in a narrow one
	&__groups {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		gap: calc(2 * $g) calc(6 * $g);
		margin-block-start: $g;
	}

	& &__label {
		margin: 0 0 $g;
		color: var(--color-main-text);
		font-size: var(--default-font-size);
		font-weight: bold;
		line-height: 1.6;
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
</style>
