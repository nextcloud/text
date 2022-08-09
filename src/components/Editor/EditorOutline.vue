<template>
	<div data-text-el="editor-outline" class="editor--outline">
		<header v-if="enabled && visible" class="editor--outline__header">
			<h2>{{ t('text', 'Outline') }}</h2>
		</header>
		<TableOfContents v-if="enabled" @has-headings="setVisible" />
	</div>
</template>

<script>
import debounce from 'debounce'
import TableOfContents from './TableOfContents.vue'

export default {
	name: 'EditorOutline',
	components: {
		TableOfContents,
	},
	data: () => ({
		visible: false,
		enabled: true,
	}),
	mounted() {
		this.$onResize = debounce(() => {
			this.enabled = this.$el.clientWidth >= 275
		}, 500)

		this.$resizeObserver = new ResizeObserver(this.$onResize)
		this.$resizeObserver.observe(this.$el)

		this.$onResize()
	},
	beforeDestroy() {
		this.$resizeObserver.unobserve(this.$el)
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
	max-width: var(--text-editor-outline-max-width, 380px);
	margin: 0 0.75rem;
	position: sticky;
	top: 44px; // menu bar
}

.editor--outline__header {
	margin: 0rem;
	h2 {
		font-size: 1rem;
		margin-top: 13px;
	}
}
</style>
