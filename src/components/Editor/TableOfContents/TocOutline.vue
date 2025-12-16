<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<a
		data-text-el="editor-outline"
		class="editor__toc-outline"
		@mouseenter="$emit('show-toc')"
		@click="$emit('show-toc')"
		@keydown.enter="$emit('show-toc')">
		<div
			v-for="heading in headings"
			:key="heading.id"
			class="outline-line"
			:class="[
				`level${heading.level}`,
				{ active: heading.id === activeHeadingId },
			]" />
	</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TocOutline',
	props: {
		activeHeadingId: {
			type: String,
			default: null,
		},
		headings: {
			type: Array,
			required: true,
		},
	},
})
</script>

<style lang="scss" scoped>
.editor__toc-outline {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding-bottom: 12px;
}

.outline-line {
	background-color: var(--color-text-lighter);
	height: 2px;
	width: 24px;
	border-radius: 2px;
	margin-inline-start: 0;
	transition:
		background 0.2s,
		box-shadow 0.2s;

	&.active {
		background-color: var(--color-main-text);
		box-shadow: 0 0 3px var(--color-box-shadow);
	}

	&.level2 {
		width: 20px;
		margin-inline-start: 4px;
	}
	&.level3 {
		width: 16px;
		margin-inline-start: 8px;
	}
	&.level4 {
		width: 12px;
		margin-inline-start: 12px;
	}
	&.level5 {
		width: 8px;
		margin-inline-start: 16px;
	}
	&.level6 {
		width: 4px;
		margin-inline-start: 20px;
	}
}
</style>
