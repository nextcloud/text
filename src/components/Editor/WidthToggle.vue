<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcCheckboxRadioSwitch v-model="isFullWidth">
		{{ t('text', 'Full width editor') }}
	</NcCheckboxRadioSwitch>
</template>

<script setup>
import axios from '@nextcloud/axios'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import { computed, nextTick, ref, watch } from 'vue'
import { useEditor } from '../../composables/useEditor.ts'

const { editor } = useEditor()
const isFullWidth = ref(loadState('text', 'is_full_width_editor', false))
watch(isFullWidth, (checked) => {
	axios.post(generateUrl('/apps/text/settings'), {
		key: 'is_full_width_editor',
		value: checked ? '1' : '0',
	})
})

const width = computed(() => (isFullWidth.value ? '100%' : '80ch'))
const updateEditorWidth = (newWidth) => {
	document.documentElement.style.setProperty('--text-editor-max-width', newWidth)
	nextTick(() => {
		const { commands, view } = editor
		view.updateState(view.state)
		commands.focus()
	})
}
watch(width, updateEditorWidth)
updateEditorWidth(width)
</script>

<script>
</script>

<style scoped lang="scss">
.session-list {
	height: var(--default-clickable-area);
}

.avatar-list {
	width: min-content !important;
	padding-inline: var(--default-grid-baseline);

	:deep(.button-vue__icon) {
		display: inline-flex;
		flex-direction: row-reverse;
		width: min-content;

		.avatar-wrapper {
			margin: 3px -12px 3px 0;
			z-index: 1;
			overflow: hidden;
		}
	}
}

.session-menu {
	max-width: 280px;
	padding-top: 6px;
	padding-bottom: 6px;

	ul li {
		align-items: center;
		display: flex;
		padding: 6px;

		.avatar-wrapper {
			height: 36px;
			width: 36px;
			margin-right: 6px;
		}

		.session-label {
			padding-right: 3px;
		}

		.guest-label {
			padding-left: 3px;
			color: var(--color-text-maxcontrast);
		}
	}
}

label {
	display: block;
	margin: 8px;
}

.hint {
	margin: 8px;
	color: var(--color-text-maxcontrast);
}
</style>
