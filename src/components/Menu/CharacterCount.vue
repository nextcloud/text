<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcActionText data-text-action-entry="character-count">
		<template #icon>
			<AlphabeticalVariant />
		</template>
		<template #default>
			{{ countString }}
		</template>
	</NcActionText>
</template>

<script>
import { defineComponent } from 'vue'
import { translatePlural as n } from '@nextcloud/l10n'
import { NcActionText } from '@nextcloud/vue'
import { AlphabeticalVariant } from '../icons.js'
import { useEditorMixin } from '../Editor.provider.js'

export default defineComponent({
	name: 'CharacterCount',
	components: {
		AlphabeticalVariant,
		NcActionText,
	},
	mixins: [useEditorMixin],
	props: {
		visible: Boolean,
	},
	data: () => ({
		wordCount: 0,
		charCount: 0,
	}),
	computed: {
		countString() {
			return `${n('text', '%n word', '%n words', this.wordCount)}, ${n('text', '%n char', '%n chars', this.charCount)}`
		},
	},
	watch: {
		visible: 'refresh',
	},
	created() {
		this.refresh()
	},
	methods: {
		refresh() {
			// characterCount is not reactive so we need this workaround
			this.wordCount = this.$editor.storage.characterCount.words()
			this.charCount = this.$editor.storage.characterCount.characters()
		},
	},
})
</script>
