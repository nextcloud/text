<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
 -->

<template>
	<NodeViewWrapper data-text-el="details"
		class="details"
		as="div">
		<NcButton type="tertiary" size="small">
			<template #icon>
				<TriangleSmallDownIcon :size="20"
					class="button-open"
					:class="{ 'open': open }"
					@click="toggleOpen" />
			</template>
		</NcButton>
		<NodeViewContent class="details-container" :class="{ 'is-hidden': !open }" />
	</NodeViewWrapper>
</template>

<script>
import NcButton from '@nextcloud/vue/components/NcButton'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import TriangleSmallDownIcon from 'vue-material-design-icons/TriangleSmallDown.vue'

export default {
	name: 'DetailsView',

	components: {
		NcButton,
		NodeViewContent,
		NodeViewWrapper,
		TriangleSmallDownIcon,
	},

	props: {
		node: {
			type: Object,
			required: true,
		},
		updateAttributes: {
			type: Function,
			required: true,
		},
	},

	data() {
		return {
			open: false,
		}
	},

	watch: {
		'node.attrs.openDetails'() {
			this.openByAttr()
		},
	},

	beforeMount() {
		this.openByAttr()
	},

	methods: {
		toggleOpen() {
			this.open = !this.open
		},
		openByAttr() {
			if (this.node.attrs.openDetails) {
				this.open = true
				this.updateAttributes({ openDetails: false })
			}
		},
	},
}
</script>

<style lang="scss" scoped>
div.details {
	display: flex;
	align-items: start;
	margin-bottom: 0.5em;
	gap: 4px;

	border: 1px solid var(--color-border-dark) !important;
	border-radius: var(--border-radius-large);

	.details-container {
		width: 100%;
		margin-right: 12px;
	}

	:deep(summary) {
		font-weight: bold;
	}

	.is-hidden {
		:deep(.details-content) {
			display: none;
		}
	}

	.button-open {
		transform: rotate(-90deg);

		&.open {
			transform: rotate(0deg);
			transition: transform var(--animation-slow);
		}
	}

	:deep(.details-content p:last-child) {
		margin-bottom: 0.5em;
	}
}
</style>
