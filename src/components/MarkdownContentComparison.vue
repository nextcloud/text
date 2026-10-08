<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section class="text-comparison" :aria-label="t('text', 'Version comparison')">
		<MarkdownSourceFallback v-if="session.failed" :beforeContent="beforeContent" :afterContent="afterContent" />
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
				<ComparisonFilter :session="session" />
				<ComparisonNavigation v-if="view === 'documents'" :session="session" />
			</header>
			<p class="text-comparison__sr-only" aria-live="polite" aria-atomic="true">
				{{ status }}
			</p>

			<section v-show="view === 'changes'" role="tabpanel" class="text-comparison__changes">
				<ComparisonChanges :session="session" @select="selectChange" />
			</section>

			<section v-show="view === 'documents'" role="tabpanel" class="text-comparison__documents">
				<ComparisonDocument
					v-for="side in comparisonSides"
					:key="side"
					:session="session"
					:side="side" />
			</section>
		</template>
	</section>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import ComparisonChanges from './ComparisonChanges.vue'
import ComparisonDocument from './ComparisonDocument.vue'
import ComparisonFilter from './ComparisonFilter.vue'
import ComparisonNavigation from './ComparisonNavigation.vue'
import MarkdownSourceFallback from './MarkdownSourceFallback.vue'
import { comparisonSides, createComparisonSession } from '../comparison/session.ts'
import { useComparisonAttachments } from '../composables/useComparisonAttachments.ts'

const props = defineProps<{
	beforeContent: string
	afterContent: string
	fileId?: number
	filePath?: string
	shareToken?: string
	noLazyImages?: boolean
	openLinkHandler?: (href: string) => void
}>()

type View = 'changes' | 'documents'
const tabs: readonly View[] = ['documents', 'changes']
const tabLabels = { documents: t('text', 'Full documents'), changes: t('text', 'Changes') }

useComparisonAttachments({ fileId: props.fileId, filePath: props.filePath, shareToken: props.shareToken })

const session = createComparisonSession(props.beforeContent, props.afterContent, {
	filePath: props.filePath,
	noLazyImages: props.noLazyImages,
	openLink: props.openLinkHandler,
})
onBeforeUnmount(session.destroy)

const { status } = session
const view = ref<View>('documents')

watch(view, () => nextTick(session.scrollToCurrent))

function selectChange(id: string) {
	session.select(id)
	view.value = 'documents'
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
</script>

<style lang="scss">
@use './../css/comparison.scss';

// Wrapper created by createMarkdownContentComparison inside the caller's element
.text-comparison-root {
      display: flex;
      flex: 1;
      min-inline-size: 0;
      block-size: 100%;
      min-block-size: 0;
      overflow: hidden;
}

.text-comparison {
	$g: var(--default-grid-baseline);

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

	&__documents {
		display: grid;
		flex: 1;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		min-block-size: 0;
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
</style>
