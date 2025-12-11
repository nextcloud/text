<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<!-- :class="{ '--initial-render': initialRender }" -->
	<div data-text-el="editor-table-of-contents" class="editor__toc">
		<div v-if="showClose" class="editor__toc-header">
			<NcButton
				variant="tertiary"
				size="small"
				:aria-label="t('text', 'Close table of contents')"
				@click="$emit('close')">
				<template #icon>
					<CloseIcon :size="20" />
				</template>
			</NcButton>
		</div>
		<ul class="editor__toc-list">
			<li
				v-for="heading in headings"
				:key="heading.id"
				:data-toc-level="heading.level"
				class="editor__toc-item"
				:class="{
					active: heading.id === activeHeadingId,
					[`level${heading.level}`]: true,
					[`previous${heading.previous}`]: heading.previous > 0,
				}">
				<a
					:href="`#${heading.id}`"
					class="editor__toc__item-link"
					@click.prevent="goto(heading)">
					{{ heading.text }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default {
	name: 'TableOfContents',
	components: {
		CloseIcon,
		NcButton,
	},
	props: {
		activeHeadingId: {
			type: String,
			default: null,
		},
		headings: {
			type: Array,
			required: true,
		},
		showClose: {
			type: Boolean,
			default: true,
		},
	},
	/*
	data: () => ({
		initialRender: true,
	}),
	mounted() {
		setTimeout(() => {
			this.initialRender = false
		}, 1000)
	},
	 */
	methods: {
		goto(heading) {
			const el = this.$root.$el.querySelector(`#${heading.id}`)
			el?.scrollIntoView({ block: 'start', behavior: 'smooth' })
			this.$nextTick(() => {
				window.history.replaceState(
					window.history.state,
					'',
					`#${heading.id}`,
				)
			})
			this.$emit('heading-clicked')
		},
		t,
	},
}
</script>

<style lang="scss">
/*
.--initial-render {
	.editor__toc {
		&-item {
			--initial-padding-inline-start: 0;
			animation: initialPadding 1.5s;
		}
	}
}
 */

.editor__toc {
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	--level-padding: 12px;

	padding: 12px;
	padding-bottom: 24px;
	width: 200px;
	// TODO: better max height
	max-height: calc(100vh * 0.66);
	background-color: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	// --animation-duration: 0.8s;

	&-header {
		position: sticky;
		top: 0;
		width: 100%;
		display: flex;
		justify-content: end;
	}

	&-list {
		width: 100%;
		list-style: none;
		font-size: 0.9rem;
		padding: 0;

		// animation-name: fadeInLeft;
		// animation-duration: var(--animation-duration);
	}

	&-item {
		// transform: translateX(var(--padding-inline-start, 0rem));
		color: var(--color-text-lighter);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-inline-start: var(--padding-inline-start);
		// animation: initialPadding calc(var(--animation-duration) * 2);

		a {
			color: var(--color-text-lighter);
		}

		&.active a {
			color: var(--color-main-text);
		}

		a:hover {
			color: var(--color-primary-element-hover);
		}

		&-link {
			scroll-margin-top: calc(
				var(--default-clickable-area) + 4 * var(--default-grid-baseline)
			);
		}

		&.level1 {
			--padding-inline-start: calc(0 * var(--level-padding));
			font-weight: 600;
			&:not(:nth-child(1)) {
				margin-top: 0.5rem;
			}
		}

		&.level2 {
			--padding-inline-start: calc(1 * var(--level-padding));
		}

		&.level3 {
			--padding-inline-start: calc(2 * var(--level-padding));
		}

		&.level4 {
			--padding-inline-start: calc(3 * var(--level-padding));
		}

		&.level5 {
			--padding-inline-start: calc(4 * var(--level-padding));
		}

		&.level6 {
			--padding-inline-start: calc(5 * var(--level-padding));
		}

		&.previous1 {
			--initial-padding-inline-start: calc(0 * var(--level-padding));
		}

		&.previous2 {
			--initial-padding-inline-start: calc(1 * var(--level-padding));
		}

		&.previous3 {
			--initial-padding-inline-start: calc(2 * var(--level-padding));
		}

		&.previous4 {
			--initial-padding-inline-start: calc(3 * var(--level-padding));
		}

		&.previous5 {
			--initial-padding-inline-start: calc(4 * var(--level-padding));
		}

		&.previous6 {
			--initial-padding-inline-start: calc(5 * var(--level-padding));
		}
	}
}

/**
@keyframes initialPadding {
	from {
		transform: translateX(var(--initial-padding-inline-start, initial));
	}

	to {
		transform: translateX(var(--padding-inline-start, 0rem));
	}
}
 */
</style>
