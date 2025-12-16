<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<!-- :class="{ '--initial-render': initialRender }" -->
	<ul class="toc-list">
		<li
			v-for="heading in headings"
			:key="heading.id"
			:data-toc-level="heading.level"
			class="toc-list__item"
			:class="{
				active: heading.id === activeHeadingId,
				[`level${heading.level}`]: true,
				[`previous${heading.previous}`]: heading.previous > 0,
			}">
			<a
				:href="`#${heading.id}`"
				class="toc-list__item-link"
				@click.prevent="goto(heading)">
				{{ heading.text }}
			</a>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'TableOfContents',
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
	},
}
</script>

<style lang="scss" scoped>
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

.toc-list {
	width: 100%;
	list-style: none;
	font-size: 0.9rem;
	padding: 0;

	--level-padding: 12px;
	// animation-name: fadeInLeft;
	// animation-duration: var(--animation-duration);

	&__item {
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

		@for $i from 2 through 6 {
			&.level#{$i} {
				--padding-inline-start: calc(#{$i - 1} * var(--level-padding));
			}
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
