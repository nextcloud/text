<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section class="text-source-fallback" data-comparison-source-fallback :aria-label="t('text', 'Complete Markdown source')">
		<p>{{ t('text', 'Complete Markdown source is shown because a detailed comparison is unavailable.') }}</p>
		<div class="text-source-fallback__documents">
			<article>
				<h2>{{ t('text', 'Before') }}</h2>
				<pre tabindex="0"><code>{{ beforeContent }}</code></pre>
			</article>
			<article>
				<h2>{{ t('text', 'After') }}</h2>
				<pre tabindex="0"><code>{{ afterContent }}</code></pre>
			</article>
		</div>
	</section>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

defineProps<{ beforeContent: string, afterContent: string }>()
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
