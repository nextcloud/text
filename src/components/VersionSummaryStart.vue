<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="start" ref="root" class="text-version-summary-start">
		<NcAssistantButton
			v-if="start.button !== 'none'"
			class="text-version-summary-start__button"
			:disabled="start.button === 'disabled'"
			:text="t('text', 'Summarize changes')"
			@click="begin" />
		<p
			:id="noteId"
			class="text-version-summary-start__note"
			:title="start.text">
			{{ start.text }}
		</p>
	</div>
</template>

<script setup lang="ts">
import type { ComparedEnds } from '../comparison/versionEnds.ts'
import type { SummaryTexts } from '../versionSummary/summaries.ts'

import { t } from '@nextcloud/l10n'
import { computed, useId, useTemplateRef, watchEffect } from 'vue'
import NcAssistantButton from '@nextcloud/vue/components/NcAssistantButton'
import { policyOf } from '../versionSummary/states.ts'
import { useVersionSummary } from '../versionSummary/summaries.ts'

const props = defineProps<{
	ends: ComparedEnds
	texts: SummaryTexts
}>()

const emit = defineEmits<{
	/** A summary was asked for; whether the keyboard was on the button, which goes away */
	started: [hadFocus: boolean]
}>()

const summary = useVersionSummary(props.ends, props.texts)
const start = computed(() => {
	const display = policyOf(summary.view.value).display
	return display.place === 'start' ? display : undefined
})
const noteId = useId()
const root = useTemplateRef<HTMLElement>('root')

// The assistant button wraps its button: the note describes the button itself
watchEffect(() => {
	const button = root.value?.querySelector('button')
	if (start.value) {
		button?.setAttribute('aria-describedby', noteId)
	} else {
		button?.removeAttribute('aria-describedby')
	}
}, { flush: 'post' })

function begin() {
	const hadFocus = root.value?.contains(document.activeElement) ?? false
	summary.generate()
	emit('started', hadFocus)
}
</script>

<style lang="scss">
.text-version-summary-start {
	display: flex;
	flex: 0 1 auto;
	align-items: center;
	gap: calc(2 * var(--default-grid-baseline));
	min-inline-size: 0;

	// The note gives way first; in a pane too narrow for the button, its label shortens
	&__button {
		flex-shrink: 0;

		&,
		& > .button-vue {
			max-inline-size: 100%;
		}

		.button-vue__text > * {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}

.text-version-summary-start__note {
	min-inline-size: 0;
	margin: 0;
	overflow: hidden;
	color: var(--color-text-maxcontrast);
	font-size: var(--font-size-small, 13px);
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
