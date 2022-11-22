<template>
	<div data-text-el="editor-outline" class="editor--outline" :class="{ 'editor--outline-mobile': mobile }">
		<header class="editor--outline__header">
			<NcButton class="editor--outline__btn-close"
				type="tertiary"
				:aria-label="t('text', 'Close outline view')"
				@click="$outlineActions.toggle">
				<template #icon>
					<Close />
				</template>
			</NcButton>
			<h2>{{ t('text', 'Outline') }}</h2>
		</header>
		<TableOfContents />
	</div>
</template>

<script>
import debounce from 'debounce'
import { NcButton } from '@nextcloud/vue'
import TableOfContents from './TableOfContents.vue'
import { useOutlineStateMixin, useOutlineActions } from './Wrapper.provider.js'
import { Close } from './../icons.js'
import useStore from '../../mixins/store.js'

export default {
	name: 'EditorOutline',
	components: {
		Close,
		NcButton,
		TableOfContents,
	},
	mixins: [useStore, useOutlineStateMixin, useOutlineActions],
	data: () => ({
		mobile: false,
	}),
	mounted() {
		this.$onResize = debounce(() => {
			this.mobile = this.$el.parentElement.clientWidth < 320
		}, 10)

		this.$resizeObserver = new ResizeObserver(this.$onResize)
		this.$resizeObserver.observe(this.$el.parentElement)

		this.$onResize()
	},
	beforeDestroy() {
		this.$resizeObserver.unobserve(this.$el.parentElement)
		this.$resizeObserver = null
		this.$onResize = null
	},
}
</script>

<style lang="scss" scoped>
.editor--outline {
	width:  300px;
	padding: 0 10px 10px 10px;
	position: fixed;
	overflow: auto;

	&-mobile {
		box-shadow: 8px 0 17px -19px var(--color-box-shadow);
		background-color: var(--color-main-background-translucent);
		z-index: 1;
	}

	&__header {
		margin: 0;
		position: sticky;
		padding: 0.6em 0.6em 0.6em 0;
		display: flex;
		align-items: center;

		h2 {
			font-size: 1rem;
			line-height: 1.1rem;
			flex-grow: 1;
			padding: 0;
			margin: 0;
		}
	}
}
</style>
