<!--
  - @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->
<template>
	<NodeViewWrapper data-text-el="callout"
		class="callout"
		:class="`callout--${type}`"
		as="div">
		<component :is="icon" class="callout__icon" />
		<NodeViewContent class="callout__content" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'
import { Positive, Warn, Danger, Info } from '../components/icons.js'

const ICONS_MAP = {
	info: Info,
	success: Positive,
	error: Danger,
	warn: Warn,
}

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'Callout',
	components: {
		NodeViewWrapper,
		NodeViewContent,
	},
	props: {
		node: {
			type: Object,
			required: true,
		},
	},
	computed: {
		icon() {
			return ICONS_MAP[this.type] || Info
		},
		type() {
			return this.node?.attrs?.type || 'info'
		},
	},
}
</script>

<style lang="scss" scoped>
.callout {
	background-color: var(--callout-background, var(--color-background-hover));
	border-left-color: var(--callout-border, var(--color-primary-element));
	border-radius: var(--border-radius);
	padding: 1em;
	padding-left: 0.5em;
	border-left-width: 0.3em;
	border-left-style: solid;
	position: relative;
	margin-bottom: 0.5em;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	&+ * {
		margin-top: 0.5em;
	}

	.callout__content {
		margin-left: 1em;
		&:deep(p) {
			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	.callout__icon {
		&, :deep(svg) {
			color: var(--callout-border);
		}
	}

	// Info (default) variables
	&, &--info {
		--callout-border: var(--color-info, #006aa3);
	}

	// Warn variables
	&--warn {
		--callout-border: var(--color-warning);
	}

	// Error variables
	&--error {
		--callout-border: var(--color-error);
	}

	// Success variables
	&--success {
		--callout-border: var(--color-success);
	}
}
</style>
