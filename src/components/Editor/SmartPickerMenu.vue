<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<FloatingMenu :editor="$editor"
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
import {
	useEditorMixin,
} from '../Editor.provider.js'
import { FloatingMenu } from '@tiptap/vue-2'

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
			const parent = this.$editor.state.selection.$anchor.parent
			const content = parent.textContent.match(/(^| )$/) ? '/' : ' /'
			this.$editor.chain().focus().insertContent(content).run()
		},
		shouldShow({ view, state }) {
			const { selection } = state
			const { parent, depth, pos } = selection.$anchor
			const isRootDepth = depth === 1
			const isEndOfLine = pos === selection.$anchor.end()
			const noLinkPickerYet = !parent.textContent.match(/(^| )\/$/)
			return view.hasFocus()
				&& this.$editor.isEditable
				&& isRootDepth
				&& isEndOfLine
				&& noLinkPickerYet
				&& selection.empty
				&& parent.isTextblock
				&& !parent.type.spec.code
		},
	},
}

</script>
