<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<article
		class="text-comparison__document"
		:class="`text-comparison__document--${side}`"
		:aria-label="session.labels[side]">
		<header class="text-comparison__document-header">
			<h2>{{ session.labels[side] }}</h2>
			<span>{{ session.legends[side] }}</span>
		</header>
		<div ref="scroller" class="text-comparison__document-scroller">
			<EditorContent :editor="session.editors[side]" />
		</div>
	</article>
</template>

<script setup lang="ts">
import type { ComparisonSide } from '../comparison/decorations.ts'
import type { ComparisonSession } from '../comparison/session.ts'

import { EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const props = defineProps<{
	session: ComparisonSession
	side: ComparisonSide
}>()

const scroller = useTemplateRef<HTMLElement>('scroller')

onMounted(() => props.session.attachScroller(props.side, scroller.value))
onBeforeUnmount(() => props.session.attachScroller(props.side, null))
</script>

<style lang="scss">
@use './../css/prosemirror.scss';

.text-comparison__document {
	$g: var(--default-grid-baseline);

	display: flex;
	flex-direction: column;
	min-inline-size: 0;
	min-block-size: 0;

	& + & {
		border-inline-start: 1px solid var(--color-border);
	}

	&-header {
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

	&-scroller {
		flex: 1;
		min-block-size: 0;
		padding-inline: calc(4 * $g);
		overflow: auto;

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

		&.text-comparison-change--added {
			box-shadow: inset 0 0 0 2px var(--color-success);
		}

		&.text-comparison-change--removed {
			box-shadow: inset 0 0 0 2px var(--color-error);
		}

		&.text-comparison-change--attribute {
			box-shadow: inset 0 0 0 2px var(--color-warning);
		}
	}

	.text-comparison-change--current {
		outline: 2px solid var(--color-primary-element);
		outline-offset: 2px;
	}

	// Spacers must render at exactly the requested height, whatever the editor styles for divs
	.ProseMirror > .text-comparison-spacer {
		display: block;
		box-sizing: content-box;
		min-block-size: 0;
		margin: 0;
		padding: 0;
		border: 0;
	}
}
</style>
