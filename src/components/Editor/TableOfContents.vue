<template>
	<div data-text-el="editor-table-of-contents" :class="{ '--initial-render': initialRender }" class="editor--toc">
		<ul class="editor--toc__list">
			<li v-for="(heading) in headings"
				:key="heading.uuid"
				:data-toc-level="heading.level"
				class="editor--toc__item"
				:class="`editor--toc__item--${heading.level}`">
				<a :href="`#${heading.id}`" @click.prevent="goto(heading)">
					{{ heading.text }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { useEditorMixin } from '../Editor.provider.js'
import useStore from '../../mixins/store.js'

export default {
	name: 'TableOfContents',
	mixins: [useStore, useEditorMixin],
	data: () => ({
		initialRender: true,
	}),
	computed: {
		headings() {
			return this.$store.state.headings
		},
	},
	watch: {
		hasHeadings(val) {
			this.$emit('has-headings', val)
		},
	},
	mounted() {

		setTimeout(() => {
			this.initialRender = false
		}, 1000)
	},
	methods: {
		goto(heading) {
			this.$editor
				.chain()
				.focus()
				.setTextSelection(heading.position)
				.scrollIntoView()
				.run()

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
			animation-fill-mode: forwards;
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

		a:hover {
			color: var(--color-primary-hover);
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
