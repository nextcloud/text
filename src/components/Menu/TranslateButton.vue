<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcActionButton v-if="canTranslate" close-after-click @click="showTranslate">
		<template #icon>
			<TranslateVariant />
		</template>
		{{ t('text', 'Translate') }}
	</NcActionButton>
</template>

<script setup>
import { emit } from '@nextcloud/event-bus'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { useEditor } from '../../composables/useEditor.ts'
import { TranslateVariant } from '../icons.js'

const { editor } = useEditor()
const languages = loadState('text', 'translation_languages', {})
console.debug(languages)
const canTranslate = Boolean(languages.from?.length)

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
	emit('text:translate-modal:show', { content: selectedText })
}
</script>
