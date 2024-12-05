<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div data-text-el="editor-outline" class="editor--outline" :class="{ 'editor--outline-mobile': $isMobile }">
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
import { NcButton } from '@nextcloud/vue'
import TableOfContents from './TableOfContents.vue'
import { useOutlineStateMixin, useOutlineActions } from './Wrapper.provider.js'
import { Close } from './../icons.js'
import useStore from '../../mixins/store.js'
import { useIsMobileMixin } from '../Editor.provider.js'

export default {
	name: 'EditorOutline',
	components: {
		Close,
		NcButton,
		TableOfContents,
	},
	mixins: [
		useIsMobileMixin,
		useStore,
		useOutlineStateMixin,
		useOutlineActions,
	],
}
</script>

<style lang="scss" scoped>
.editor--outline {
	width:  300px;
	padding: 0 10px 10px 10px;
	position: fixed;
	overflow: auto;
	// 204px = 50px nc header + 60px collectives titlebar + 44px menubar + 50px bottom margin
	max-height: calc(100% - 204px);

	&-mobile {
		border-radius: var(--border-radius-large);
		box-shadow: 0 1px 10px var(--color-box-shadow);
		background-color: var(--color-main-background-translucent);
		z-index: 1;
	}

	&__header {
		margin: 0;
		position: sticky;
		top: 0;
		z-index: 1;
		background-color: var(--color-main-background);
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
