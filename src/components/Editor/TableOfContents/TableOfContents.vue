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
			@clicked="emit('headingClicked')" />
	</ul>
</template>

<script setup>
import TableOfContentsEntry from './TableOfContentsEntry.vue'
import { useEditorHeadings } from '../../../composables/useEditorHeadings.ts'

const emit = defineEmits(['headingClicked'])
const { headings } = useEditorHeadings()
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
