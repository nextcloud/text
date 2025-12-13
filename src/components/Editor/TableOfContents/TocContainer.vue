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
				:active-heading-id="activeHeadingId"
				:headings="headings"
				@outline-clicked="setDisplayToc(true)" />
			<TocDesktop v-else-if="displayToc" @close="setDisplayToc(false)">
				<TableOfContents
					:active-heading-id="activeHeadingId"
					:headings="headings" />
			</TocDesktop>
		</div>

		<!-- mobile -->
		<TocMobile v-else-if="isMobile && displayToc" @close="setDisplayToc(false)">
			<TableOfContents
				:active-heading-id="activeHeadingId"
				:headings="headings"
				:show-close="false"
				@heading-clicked="setDisplayToc(false)" />
		</TocMobile>
	</div>
</template>

<script lang="ts">
import { emit } from '@nextcloud/event-bus'
import { useIsMobile } from '@nextcloud/vue/composables/useIsMobile'
import { defineComponent } from 'vue'
import { useEditorHeadings } from '../../../composables/useEditorHeadings.ts'
import TableOfContents from './TableOfContents.vue'
import TocDesktop from './TocDesktop.vue'
import TocMobile from './TocMobile.vue'
import TocOutline from './TocOutline.vue'

export default defineComponent({
	name: 'TocContainer',
	components: {
		TableOfContents,
		TocDesktop,
		TocMobile,
		TocOutline,
	},
	setup() {
		const { displayToc, headings } = useEditorHeadings()
		const isMobile = useIsMobile()
		return { displayToc, headings, isMobile }
	},
	data() {
		return {
			intersectionObserver: null,
			visibleHeadingIds: new Set(),
			activeHeadingId: null,
		}
	},
	watch: {
		headings() {
			this.$nextTick(() => {
				this.setupIntersectionObserver()
			})
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.setupIntersectionObserver()
		})
	},
	beforeUnmount() {
		this.disconnectIntersectionObserver()
	},
	methods: {
		disconnectIntersectionObserver() {
			if (this.intersectionObserver) {
				this.intersectionObserver.disconnect()
				this.intersectionObserver = null
			}
			this.visibleHeadingIds.clear()
		},
		setupIntersectionObserver() {
			this.disconnectIntersectionObserver()

			const options = {
				root: null,
				rootMargin: '0px 0px -50% 0px',
				threshold: 0,
			}
			this.intersectionObserver = new IntersectionObserver(
				this.setActiveHeading,
				options,
			)

			this.headings.forEach((heading) => {
				const el = this.$root.$el.querySelector(`#${heading.id}`)
				if (el) {
					this.intersectionObserver.observe(el)
				}
			})
		},
		setActiveHeading(entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.visibleHeadingIds.add(entry.target.id)
				} else {
					this.visibleHeadingIds.delete(entry.target.id)
				}
			})
			const firstVisible = this.headings.find((heading) =>
				this.visibleHeadingIds.has(heading.id),
			)
			if (firstVisible) {
				this.activeHeadingId = firstVisible.id
			}
		},
		setDisplayToc(visible) {
			emit('text:toc:toggle', { visible })
		},
	},
})
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
