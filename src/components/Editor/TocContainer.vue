<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="editor__toc-container">
		<!-- desktop -->
		<div v-if="isDesktopDisplay" class="editor__toc-content">
			<TocOutline
				v-if="!displayToc"
				:active-heading-id="activeHeadingId"
				:headings="headings"
				@outline-clicked="setDisplayToc(true)" />
			<TableOfContents
				v-else
				:active-heading-id="activeHeadingId"
				:headings="headings"
				@close="setDisplayToc(false)" />
		</div>

		<!-- mobile -->
		<NcModal
			v-else-if="isMobile && displayToc"
			size="full"
			:name="t('collecitves', 'Table of contents')"
			@close="setDisplayToc(false)">
			<TableOfContents
				:active-heading-id="activeHeadingId"
				:headings="headings"
				:show-close="false"
				@heading-clicked="setDisplayToc(false)" />
		</NcModal>
	</div>
</template>

<script lang="ts">
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import { useIsMobile } from '@nextcloud/vue/composables/useIsMobile'
import { defineComponent } from 'vue'
import TableOfContents from './TableOfContents.vue'
import TocOutline from './TocOutline.vue'
import { useEditorHeadings } from '../../composables/useEditorHeadings.ts'

export default defineComponent({
	name: 'TocContainer',
	components: {
		NcModal,
		TableOfContents,
		TocOutline,
	},
	setup() {
		const { displayToc, headings, setDisplayToc } = useEditorHeadings()
		const isMobile = useIsMobile()
		return { displayToc, headings, isMobile, setDisplayToc }
	},
	data() {
		return {
			intersectionObserver: null,
			visibleHeadingIds: new Set(),
			activeHeadingId: null,
		}
	},
	computed: {
		isDesktopDisplay() {
			return !this.isMobile && this.headings.length > 1
		},
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
				this.visibleHeadingIds.has(heading.id)
			)
			if (firstVisible) {
				this.activeHeadingId = firstVisible.id
			}
		},
		t,
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
	// Toolbar height + 24px
	top: calc(var(--default-clickable-area) + 9px + 34px);
	margin-inline-end: 12px;
}
</style>
