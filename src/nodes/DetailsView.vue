<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
 -->

<template>
	<NodeViewWrapper data-text-el="details" class="details" as="div">
		<NcButton
			variant="tertiary"
			size="small"
			:aria-label="t('text', open ? 'Collapse details' : 'Expand details')"
			:aria-expanded="open"
			@click="toggleOpen">
			<template #icon>
				<TriangleSmallDownIcon
					:size="20"
					class="button-open"
					:class="{ open: open }" />
			</template>
		</NcButton>
		<NodeViewContent class="details-container" :class="{ 'is-hidden': !open }" />
	</NodeViewWrapper>
</template>

<script>
import { t } from '@nextcloud/l10n'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
import NcButton from '@nextcloud/vue/components/NcButton'
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
		editor: {
			type: Object,
			required: true,
		},

		node: {
			type: Object,
			required: true,
		},

		getPos: {
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
		'node.attrs.open': function(open) {
			this.open = open
		},
	},

	beforeMount() {
		this.open = this.node.attrs.open || this.selectionInside(this.nodeRange())
		this.editor.on('selectionUpdate', this.onSelectionUpdate)
	},

	beforeUnmount() {
		this.editor.off('selectionUpdate', this.onSelectionUpdate)
	},

	methods: {
		t,

		toggleOpen() {
			this.open = !this.open
		},

		onSelectionUpdate() {
			if (this.open) {
				return
			}
			this.open = this.selectionInside(this.contentRange())
		},

		nodeRange() {
			const from = this.getPos()
			return { from, to: from + this.node.nodeSize }
		},

		contentRange() {
			const { from, to } = this.nodeRange()
			return {
				from: from + 1 + this.node.firstChild.nodeSize,
				to: to - 1,
			}
		},

		selectionInside({ from, to }) {
			const { selection } = this.editor.state
			return selection.from >= from && selection.to <= to
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
		margin-inline-end: 12px;
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
