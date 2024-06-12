<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div data-text-el="editor-table-of-contents" :class="{ '--initial-render': initialRender }" class="editor--toc">
		<ul class="editor--toc__list">
			<li v-for="(heading) in headings"
				:key="heading.id"
				:data-toc-level="heading.level"
				class="editor--toc__item"
				:class="{
					[`editor--toc__item--${heading.level}`]: true,
					[`editor--toc__item--previous-${heading.previous}`]: heading.previous > 0,
				}">
				<a :href="`#${heading.id}`" @click.prevent="goto(heading)">
					{{ heading.text }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { useEditorMixin } from '../Editor.provider.js'
import useStore from '../../mixins/store.js'

export default {
	name: 'TableOfContents',
	mixins: [useStore, useEditorMixin],
	data: () => ({
		initialRender: true,
	}),
	computed: {
		...mapState({
			headings: (state) => state.text.headings,
		}),
	},
	mounted() {
		setTimeout(() => {
			this.initialRender = false
		}, 1000)
	},
	methods: {
		goto(heading) {
			document.getElementById(heading.id).scrollIntoView()

			this.$nextTick(() => {
				window.location.hash = heading.id
			})
		},
	},
}
</script>

<style lang="scss">
.--initial-render {
	.editor--toc {
		&__item {
			--initial-padding-left: 0;
			animation: initialPadding 1.5s;
		}
	}
}

.editor--toc {
	padding: 0 10px;
	color: var(--color-main-text-maxcontrast);
	--animation-duration: 0.8s;

	h3 {
		padding-left: 0.75rem;
	}

	&__list {
		width: 100%;
		list-style: none;
		font-size: 0.9rem;
		padding: 0;

		animation-name: fadeInLeft;
		animation-duration: var(--animation-duration);
	}

	&__item {
		transform: translateX(var(--padding-left, 0rem));
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		animation: initialPadding calc(var(--animation-duration) * 2);
		width: calc(100% - var(--padding-left));

		a:hover {
			color: var(--color-primary-element-hover);
		}

		&--1 {
			--padding-left: 0rem;
			font-weight: 600;
			&:not(:nth-child(1)) {
				margin-top: 0.5rem;
			}
		}

		&--2 {
			--padding-left: 1rem;
		}

		&--3 {
			--padding-left: 2rem;
		}

		&--4 {
			--padding-left: 3rem;
		}

		&--5 {
			--padding-left: 4rem;
		}

		&--6 {
			--padding-left: 5rem;
		}

		&--previous-1 {
			--initial-padding-left: 0rem
		}

		&--previous-2 {
			--initial-padding-left: 1rem
		}

		&--previous-3 {
			--initial-padding-left: 2rem
		}

		&--previous-4 {
			--initial-padding-left: 3rem
		}

		&--previous-5 {
			--initial-padding-left: 4rem
		}

		&--previous-6 {
			--initial-padding-left: 5rem
		}
	}
}

@keyframes initialPadding {
  from {
	transform: translateX(var(--initial-padding-left, initial));
  }

  to {
	transform: translateX(var(--padding-left, 0rem));
  }
}

</style>
