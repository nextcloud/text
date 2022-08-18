<template>
	<div data-text-el="editor-outline" class="editor--outline" :class="{ 'editor--outline-mobile': mobile }">
		<header class="editor--outline__header">
			<h2>{{ t('text', 'Outline') }}</h2>
			<NcButton type="tertiary" :aria-label="t('text', 'Close outline view')" @click="$outlineActions.toggle">
				<template #icon>
					<Close />
				</template>
			</NcButton>
		</header>
		<TableOfContents />
	</div>
</template>

<script>
import debounce from 'debounce'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
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
		visible: false,
		mobile: false,
	}),
	watch: {
		'$store.getters.hasHeadings': 'setVisible',
	},
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
	methods: {
		setVisible(val) {
			this.visible = val
		},
	},
}
</script>

<style lang="scss" scoped>
.editor--outline {
	width:  300px;
	padding: 0 10px;
	position: fixed;
	top: 104px;
	height: calc(100% - 100px);
	overflow: auto;

	&-mobile {
		box-shadow: 8px 0 17px -19px var(--color-box-shadow);
		background-color: var(--color-main-background-translucent);
		z-index: 1;
	}
}

.editor--outline__header {
	margin: 0rem;
	position: sticky;
	padding: 10px;
	display: flex;
	height: 44px;
	h2 {
		font-size: 1rem;
		margin-top: 13px;
		flex-grow: 1;
	}
}
</style>
