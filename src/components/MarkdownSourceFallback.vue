<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section class="text-source-fallback" data-comparison-source-fallback :aria-label="t('text', 'Complete Markdown source')">
		<p>{{ t('text', 'Complete Markdown source is shown because a detailed comparison is unavailable.') }}</p>
		<div class="text-source-fallback__documents" :class="{ 'text-source-fallback__documents--single': side }">
			<article v-if="side !== 'after'">
				<h2>{{ t('text', 'Before') }}</h2>
				<pre tabindex="0"><code>{{ beforeContent }}</code></pre>
			</article>
			<article v-if="side !== 'before'">
				<h2>{{ t('text', 'After') }}</h2>
				<pre tabindex="0"><code>{{ afterContent }}</code></pre>
			</article>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { ComparisonSide } from '../comparison/decorations.ts'

import { t } from '@nextcloud/l10n'

defineProps<{
	beforeContent: string
	afterContent: string
	/** Show only this side, as one of two panes does */
	side?: ComparisonSide
}>()
</script>

<style lang="scss">
.text-source-fallback {
	flex: 1 1 auto;
	min-block-size: 0;
	overflow: auto;
	padding: 16px;
	container-type: inline-size;

	&__documents {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;

		&--single {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	pre {
		min-block-size: 12rem;
		overflow: auto;
		white-space: pre;
		user-select: text;
	}

	@container (max-width: 759px) {
		&__documents { grid-template-columns: minmax(0, 1fr); }
	}
}
</style>
