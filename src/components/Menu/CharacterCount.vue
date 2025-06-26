<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcActionText data-text-action-entry="character-count" :name="countString">
		<template #icon>
			<AlphabeticalVariant />
		</template>
	</NcActionText>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { translatePlural as n } from '@nextcloud/l10n'
import NcActionText from '@nextcloud/vue/components/NcActionText'
import { AlphabeticalVariant } from '../icons.js'
import { useEditor } from '../Editor.provider.ts'

export default defineComponent({
	name: 'CharacterCount',
	components: {
		AlphabeticalVariant,
		NcActionText,
	},
	props: {
		visible: Boolean,
	},
	setup() {
		const { editor } = useEditor()
		const countString = ref('')
		const refresh = () => {
			if (!editor.value) {
				return
			}
			const { storage, state } = editor.value
			// characterCount is not reactive so we need this workaround
			// We also need to provide the doc as storage is a singleton in tiptap v2.
			// See ueberdosis/tiptap#6060
			const wordCount = storage.characterCount.words({ node: state.doc })
			const charCount = storage.characterCount.characters({ node: state.doc })
			const words = n('text', '%n word', '%n words', wordCount)
			const chars = n('text', '%n char', '%n chars', charCount)
			countString.value = [words, chars].join(', ')
			console.debug({ wordCount, charCount, countString: countString.value })
		}
		return { countString, editor, refresh }
	},
	watch: {
		visible: 'refresh',
	},
	created() {
		this.refresh()
	},
})
</script>
