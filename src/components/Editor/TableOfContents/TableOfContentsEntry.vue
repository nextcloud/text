<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<li
		:data-toc-level="heading.level"
		class="toc-list__item"
		:class="{
			visible,
			[`level${heading.level}`]: true,
		}">
		<a
			:href="`#${heading.id}`"
			class="toc-list__item-link"
			@click.prevent="goto(heading.id)">
			{{ heading.text }}
		</a>
	</li>
</template>

<script setup>
import { nextTick, toRefs } from 'vue'
import { useEditor } from '../../../composables/useEditor.ts'
import { useVisibility } from '../../../composables/useVisibility.ts'
const props = defineProps({ heading: { type: Object, required: true } })
const { heading } = toRefs(props)
const { visible } = useVisibility(heading.value.id)
const { editor } = useEditor()

const emit = defineEmits(['clicked'])

const goto = (id) => {
	const el = editor.view.dom.querySelector(`#${id}`)
	el?.scrollIntoView({ block: 'start', behavior: 'smooth' })
	nextTick(() => {
		window.history.replaceState(window.history.state, '', `#${id}`)
	})
	emit('clicked')
}
</script>

<style lang="scss" scoped>
.toc-list__item {
	color: var(--color-text-lighter);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-inline-start: var(--padding-inline-start);

	a {
		color: var(--color-text-lighter);
	}

	// Only effective on the first visible line - see next selector.
	&.visible a {
		color: var(--color-main-text);
	}

	// All following visible lines use the default style.
	.visible ~ &.visible a {
		color: var(--color-text-lighter);
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
}
</style>
