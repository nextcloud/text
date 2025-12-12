<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div data-text-el="editor-table-of-contents" class="editor__toc">
		<div class="editor__toc-header">
			<NcButton
				variant="tertiary"
				size="small"
				:aria-label="t('text', 'Close table of contents')"
				@click="$emit('close')">
				<template #icon>
					<CloseIcon :size="20" />
				</template>
			</NcButton>
		</div>
		<slot />
	</div>
</template>

<script lang="ts">
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { defineComponent } from 'vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default defineComponent({
	name: 'TocDesktop',
	components: {
		CloseIcon,
		NcButton,
	},
	methods: {
		t,
	},
})
</script>

<style lang="scss" scoped>
.editor__toc {
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	padding: 12px;
	padding-bottom: 24px;
	width: 200px;
	// TODO: better max height
	max-height: calc(100vh * 0.66);
	background-color: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	// --animation-duration: 0.8s;

	&-header {
		position: sticky;
		top: 0;
		width: 100%;
		display: flex;
		justify-content: end;
	}
}
</style>
