<template>
	<div data-text-el="editor-table-of-contents" class="editor--toc">
		<ul v-if="hasHeadings"
			class="editor--toc__list">
			<li v-for="(heading) in headings"
				:key="heading.id"
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
import debounce from 'debounce'
import { useEditorMixin } from '../Editor.provider.js'

const regexSpaces = /\s+/g
const regexInvalidCaracters = /[^\p{Letter}\p{Mark}\w\s-]/gu

const slugify = (str) => String(str)
	.toLowerCase()
	.replace(regexInvalidCaracters, '')
	.trim()
	.replace(regexSpaces, '-')

export default {
	name: 'TableOfContents',
	mixins: [useEditorMixin],
	data: () => ({
		headings: [],
	}),
	computed: {
		hasHeadings() {
			return this.headings.length > 0
		},
	},
	watch: {
		hasHeadings(val) {
			this.$emit('has-headings', val)
		},
	},
	mounted() {
		this.$handleUpdate = debounce(this.handleUpdate, 900)
		this.$editor.on('update', this.$handleUpdate)
		this.$nextTick(this.$handleUpdate)
	},
	beforeDestroy() {
		this.$editor.off('update', this.$handleUpdate)
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
		handleUpdate() {
			const counter = new Map()
			const headings = []
			const transaction = this.$editor.state.tr

			const getId = text => {
				const id = slugify(text)

				if (counter.has(id)) {
					const next = counter.get(id)

					// increment counter
					counter.set(id, next + 1)

					return `${id}--${next}`
				}

				// define counter
				counter.set(id, 1)

				return id
			}

			this.$editor.state.doc.descendants((node, position) => {
				if (node.type.name === 'heading') {
					const text = node.textContent
					const id = getId(text)

					if (node.attrs.id !== id) {
						const attrs = {
							...node.attrs,
							id,
						}

						transaction.setNodeMarkup(position, undefined, attrs)
					}

					headings.push({
						level: node.attrs.level,
						position,
						text,
						id,
					})
				}
			})

			transaction.setMeta('addToHistory', false)
			transaction.setMeta('preventUpdate', true)

			this.$editor.view.dispatch(transaction)

			this.headings = headings
		},
	},
}
</script>

<style lang="scss">
.editor--toc {
	opacity: 0.55;
	&:hover {
		opacity: 1;
	}
	h3 {
		padding-left: 0.75rem;
	}

	&__list {
		width: 100%;
		list-style: none;
		font-size: 0.9rem;
		padding: 0;

		animation-name: fadeInLeft;
		animation-duration: 0.8s;
	}

	&__item {
		transition: padding-left 0.8s;
		// Disable per item animation as we currently update all headings data
		// animation: initialPadding 1.5s;
		padding-left: var(--padding-left, 0rem);
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
    padding-left: 0;
  }

  to {
    padding-left: var(--padding-left, inherit);
  }
}

</style>
