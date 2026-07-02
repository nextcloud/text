<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NextcloudVueNcActionText data-text-action-entry="character-count" :name="countString">
		<template #icon>
			<AlphabeticalVariant />
		</template>
	</NextcloudVueNcActionText>
</template>

<script>
import { translatePlural as n } from '@nextcloud/l10n'
import { defineComponent, ref } from 'vue'
import NextcloudVueNcActionText from '@nextcloud/vue/components/NcActionText'
import { useEditor } from '../../composables/useEditor.ts'
import { logger } from '../../helpers/logger.ts'
import { AlphabeticalVariant } from '../icons.js'

export default defineComponent({
	// This component is used as a direct child of NcActions.
	// Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
	// Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
	// Hotfix - rename the component to NcActionButton because it represents and renders it.
	name: 'NcActionText',
	components: {
		AlphabeticalVariant,
		NextcloudVueNcActionText,
	},

	props: {
		visible: {
			type: Boolean,
			default: false,
		},
	},

	setup() {
		const { editor } = useEditor()
		const countString = ref('')
		const refresh = () => {
			const { storage, state } = editor
			// characterCount is not reactive so we need this workaround
			// We also need to provide the doc as storage is a singleton in tiptap v2.
			// See ueberdosis/tiptap#6060
			const wordCount = storage.characterCount.words({ node: state.doc })
			const charCount = storage.characterCount.characters({ node: state.doc })
			const words = n('text', '%n word', '%n words', wordCount)
			const chars = n('text', '%n char', '%n chars', charCount)
			countString.value = [words, chars].join(', ')
			logger.debug({ wordCount, charCount, countString: countString.value })
		}
		return { countString, refresh }
	},

	watch: {
		visible: 'refresh',
	},

	created() {
		this.refresh()
	},
})
</script>
