<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcActionButton close-after-click @click="showTranslate">
		<template #icon>
			<TranslateVariant />
		</template>
		{{ t('text', 'Translate') }}
	</NcActionButton>
</template>

<script setup>
import { emit } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { useEditor } from '../../composables/useEditor.ts'
import { TranslateVariant } from '../icons.js'

const { editor } = useEditor()
const showTranslate = () => {
	const {
		commands,
		view: { state },
	} = editor.value
	const { from, to } = state.selection
	let selectedText = state.doc.textBetween(from, to, ' ')
	if (!selectedText.trim().length) {
		commands.selectAll()
		selectedText = state.doc.textContent
	}
	console.debug('translation click', state.selection, selectedText)
	emit('text:translate-modal:show', { content: selectedText })
}
</script>
