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
					:class="{ 'open': isOpen }"
					@click="toggleOpen" />
			</template>
		</NcButton>
		<NodeViewContent :class="{ 'is-hidden': !isOpen }" />
	</NodeViewWrapper>
</template>

<script>
import { NcButton } from '@nextcloud/vue'
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

	computed: {
		isOpen() {
			return this.node.attrs.open
		},
	},

	methods: {
		toggleOpen() {
			this.updateAttributes({
				open: !this.isOpen,
			})
		},
	},
}
</script>

<style lang="scss" scoped>
div.details {
	display: flex;
	align-items: start;
	gap: 4px;

	border: 1px solid var(--color-border-dark) !important;
	border-radius: var(--border-radius-large);

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

	:deep(.details-content .paragraph-content:last-child) {
		margin-bottom: 0.5em;
	}
}
</style>
