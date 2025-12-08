<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div data-text-el="editor-outline"
		class="editor__outline">
		<a v-if="headings.length > 1" class="outline" @click="expandHeadings">
			<div
				v-for="heading in headings"
				:key="heading.id"
				class="outline-line"
				:class="[
					`level${heading.level}`,
					{ active: heading.id === activeHeadingId },
				]" />
		</a>
	</div>
</template>

<script>
import { useEditorHeadings } from '../../composables/useEditorHeadings.ts'

export default {
	name: 'EditorOutline',
	components: {
	},
	setup() {
		const { headings } = useEditorHeadings()
		return { headings }
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
		this.setupIntersectionObserver()
	},
	beforeUnmount() {
		this.disconnectIntersectionObserver()
	},
	methods: {
		expandHeadings() {
			// TODO
			console.debug('expand headings')
		},
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
				const el = document.getElementById(heading.id)
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
	},
}
</script>

<style lang="scss" scoped>
.editor__outline {
	position: absolute;
	// Nextcloud header menu + menubar height
	top: calc(var(--header-height) + var(--default-clickable-area) + 9px);
	inset-inline-end: 0;
	max-width: 40px;
	width: 40px;
	height: 100%;
	display: flex;
}

.outline {
	display: flex;
	flex-direction: column;
	margin-top: calc(100vh / 3);
	gap: 12px;
	padding-bottom: 12px;
}

.outline-line {
	background-color: var(--color-text-lighter);
	height: 2px;
	width: 24px;
	border-radius: 2px;
	margin-inline-start: 0;
	transition: background 0.2s, box-shadow 0.2s;

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
