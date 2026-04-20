<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="editor__toc-container">
		<!-- desktop -->
		<div v-if="!isMobile" class="editor__toc-content">
			<TocOutline
				v-if="!displayToc && headings.length > 1"
				@show-toc="setDisplayToc(true)" />
			<TocDesktop v-else-if="displayToc" @close="setDisplayToc(false)">
				<TableOfContents />
			</TocDesktop>
		</div>

		<!-- mobile -->
		<TocMobile v-else-if="isMobile && displayToc" @close="setDisplayToc(false)">
			<TableOfContents
				:show-close="false"
				@heading-clicked="setDisplayToc(false)" />
		</TocMobile>
	</div>
</template>

<script setup>
import { emit } from '@nextcloud/event-bus'
import { useIsMobile } from '@nextcloud/vue/composables/useIsMobile'
import { useEditorHeadings } from '../../../composables/useEditorHeadings.ts'
import { provideIntersectionObserver } from '../../../composables/useVisibility.ts'
import TableOfContents from './TableOfContents.vue'
import TocDesktop from './TocDesktop.vue'
import TocMobile from './TocMobile.vue'
import TocOutline from './TocOutline.vue'

provideIntersectionObserver()
const { displayToc, headings } = useEditorHeadings()
const isMobile = useIsMobile()
const setDisplayToc = (visible) => {
	emit('text:toc:toggle', { visible })
}
</script>

<style lang="scss" scoped>
.editor__toc-container {
	position: absolute;
	top: 0;
	inset-inline-end: 0;
	max-width: 40px;
	width: 40px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.editor__toc-content {
	position: sticky;
	// Toolbar height + 34px
	top: calc(var(--default-clickable-area) + 9px + 34px);
	margin-top: calc(var(--default-clickable-area) + 9px + 34px);
	margin-inline-end: 12px;
}
</style>
