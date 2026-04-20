<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<ul class="toc-list">
		<TableOfContentsEntry
			v-for="heading in headings"
			:key="heading.id"
			:heading="heading"
			@clicked="emit('heading-clicked')" />
	</ul>
</template>

<script setup>
import { useEditorHeadings } from '../../../composables/useEditorHeadings.ts'
import TableOfContentsEntry from './TableOfContentsEntry.vue'

const { headings } = useEditorHeadings()
const emit = defineEmits(['heading-clicked'])
</script>

<style lang="scss" scoped>
.toc-list {
	width: 100%;
	list-style: none;
	font-size: 0.9rem;
	padding: 0;
	--level-padding: 12px;
}
</style>
