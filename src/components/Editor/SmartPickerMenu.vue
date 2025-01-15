<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<FloatingMenu :editor="$editor"
		:tippy-options="tippyOptions()"
		:should-show="shouldShow">
		<NcActions :title="t('text', 'Open the Smart Picker')" :type="'tertiary'">
			<NcActionButton @click="openSmartPicker()">
				<template #icon>
					<PlusIcon />
				</template>
			</NcActionButton>
		</NcActions>
	</FloatingMenu>
</template>

<script>
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { NcActions, NcActionButton } from '@nextcloud/vue'
import { posToDOMRect } from '@tiptap/core'
import { FloatingMenu } from '@tiptap/vue-2'
import { useEditorMixin } from '../Editor.provider.js'

export default {
	name: 'SmartPickerMenu',
	components: {
		FloatingMenu,
		PlusIcon,
		NcActions,
		NcActionButton,
	},
	mixins: [
		useEditorMixin,
	],
	methods: {
		async openSmartPicker() {
			const { selection } = this.$editor.state
			const { textContent } = selection.$anchor.parent
			const eol = selection.$anchor.end()
			const contentToInsert = textContent.match(/(^| )$/) ? '/' : ' /'
			this.$editor.chain()
				.focus()
				.setTextSelection(eol)
				.insertContent(contentToInsert)
				.run()
		},
		shouldShow({ view, state }) {
			const { selection } = state
			const { parent, depth, pos } = selection.$anchor
			const isRootDepth = depth === 1
			const noLinkPickerYet = !parent.textContent.match(/(^| )\/$/)
			return view.hasFocus()
				&& this.$editor.isEditable
				&& isRootDepth
				&& noLinkPickerYet
				&& selection.empty
				&& parent.isTextblock
				&& !parent.type.spec.code
		},
		tippyOptions() {
			return {
				getReferenceClientRect: () => {
					const { view, state } = this.$editor
					const eol = state.selection.$anchor.end()
					return posToDOMRect(view, eol, eol)
				},
			}
		},
	},
}

</script>
