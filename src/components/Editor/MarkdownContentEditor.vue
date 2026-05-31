<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<Wrapper :contentLoaded="true">
		<MainContainer>
			<template v-if="showMenuBar">
				<MenuBar v-if="!readOnly" :autohide="false" />
				<slot v-else name="readonlyBar">
					<ReadonlyBar />
				</slot>
			</template>
			<ContentContainer :readOnly="readOnly" />
		</MainContainer>
	</Wrapper>
</template>

<script>
import { getCurrentUser } from '@nextcloud/auth'
import { Editor } from '@tiptap/core'
import { UndoRedo } from '@tiptap/extensions'
import { provide, watch } from 'vue'
/* eslint-disable import/no-named-as-default */
import MenuBar from '../Menu/MenuBar.vue'
import ReadonlyBar from '../Menu/ReadonlyBar.vue'
import ContentContainer from './ContentContainer.vue'
import MainContainer from './MainContainer.vue'
import Wrapper from './Wrapper.vue'
import { provideEditor } from '../../composables/useEditor.ts'
import { editorFlagsKey } from '../../composables/useEditorFlags.ts'
import { provideEditorHeadings } from '../../composables/useEditorHeadings.ts'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import { provideEditorWidth } from '../../composables/useEditorWidth.ts'
import { useOpenLinkHandler } from '../../composables/useOpenLinkHandler.ts'
import { FocusTrap, RichText } from '../../extensions/index.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import AttachmentResolver from '../../services/AttachmentResolver.js'
import { ATTACHMENT_RESOLVER } from '../Editor.provider.ts'

export default {
	name: 'MarkdownContentEditor',
	components: { ContentContainer, ReadonlyBar, MenuBar, MainContainer, Wrapper },
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[ATTACHMENT_RESOLVER]: {
				get: () => this.$attachmentResolver ?? null,
			},
		})

		return val
	},

	props: {
		fileId: {
			type: Number,
			default: null,
		},

		content: {
			type: String,
			required: true,
		},

		readOnly: {
			type: Boolean,
			default: false,
		},

		relativePath: {
			type: String,
			default: '',
		},

		shareToken: {
			type: String,
			default: null,
		},

		showMenuBar: {
			type: Boolean,
			default: true,
		},
	},

	emits: ['update:content'],

	setup(props) {
		const { openLinkHandler } = useOpenLinkHandler()
		const extensions = [
			RichText.configure({
				extensions: [UndoRedo],
				openLink: openLinkHandler.openLink,
			}),
			FocusTrap,
		]
		const editor = new Editor({ extensions })

		const { setEditable, setContent } = useEditorMethods(editor)
		const { updateHeadings } = provideEditorHeadings(editor)
		watch(
			() => props.content,
			(content) => {
				setContent(content)
			},
		)

		setEditable(!props.readOnly)
		watch(
			() => props.readOnly,
			(readOnly) => {
				setEditable(!readOnly)
			},
		)

		provide(editorFlagsKey, {
			isPublic: false,
			isRichEditor: true,
			isRichWorkspace: false,
			useTableOfContents: true,
		})
		provideEditor(editor)

		const { applyEditorWidth } = provideEditorWidth(true)
		applyEditorWidth()

		return { editor, setContent, updateHeadings }
	},

	created() {
		// Set content after the setup function
		// as it may render other vue components such as preview toggle
		// which breaks the context of the setup function.
		this.setContent(this.content, { addToHistory: false })
		this.updateHeadings()
		this.editor.on('create', () => {
			this.$emit('ready')
		})
		this.editor.on('update', ({ editor }) => {
			const markdown = createMarkdownSerializer(editor.schema).serialize(editor.state.doc)
			this.$emit('update:content', {
				json: editor.state.doc,
				markdown,
			})
		})
		if (this.fileId) {
			this.$attachmentResolver = new AttachmentResolver({
				currentDirectory: this.relativePath?.match(/.*\//),
				user: getCurrentUser(),
				shareToken: this.shareToken,
				fileId: this.fileId,
			})
		}
	},

	beforeUnmount() {
		this.editor.destroy()
	},
}

</script>

<style lang="scss">
@use './../../css/prosemirror';
@use './../../css/print';
</style>
