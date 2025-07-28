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
import { t } from '@nextcloud/l10n'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import { nextTick, watch } from 'vue'
import { useEditor } from '../../composables/useEditor.ts'
import { useEditorWidth } from '../../composables/useEditorWidth.ts'

const { editor } = useEditor()
const { isFullWidth } = useEditorWidth()

const redrawEditor = () => {
	nextTick(() => {
		const { commands, view } = editor
		view.updateState(view.state)
		commands.focus()
	})
}
watch(isFullWidth, redrawEditor)
</script>
