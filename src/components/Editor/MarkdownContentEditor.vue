<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<Wrapper
		:content-loaded="true"
		:show-outline-outside="showOutlineOutside"
		@outline-toggled="outlineToggled">
		<MainContainer>
			<template v-if="showMenuBar">
				<MenuBar v-if="!readOnly" :autohide="false" />
				<slot v-else name="readonlyBar">
					<ReadonlyBar />
				</slot>
			</template>
			<ContentContainer />
		</MainContainer>
	</Wrapper>
</template>

<script>
import { Editor } from '@tiptap/core'
import MenuBar from '../Menu/MenuBar.vue'
import MainContainer from './MainContainer.vue'
import Wrapper from './Wrapper.vue'
/* eslint-disable import/no-named-as-default */
import { getCurrentUser } from '@nextcloud/auth'
import History from '@tiptap/extension-history'
import { provide, watch } from 'vue'
import { provideEditor } from '../../composables/useEditor.ts'
import { editorFlagsKey } from '../../composables/useEditorFlags.ts'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import { FocusTrap, RichText } from '../../extensions/index.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import markdownit from '../../markdownit/index.js'
import AttachmentResolver from '../../services/AttachmentResolver.js'
import { ATTACHMENT_RESOLVER } from '../Editor.provider.ts'
import ReadonlyBar from '../Menu/ReadonlyBar.vue'
import ContentContainer from './ContentContainer.vue'

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
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:content'],

	setup(props) {
		const extensions = [
			RichText.configure({
				extensions: [History],
			}),
			FocusTrap,
		]
		const editor = new Editor({
			content: markdownit.render(props.content),
			extensions,
		})

		const { setEditable, setContent } = useEditorMethods(editor)
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

		provideEditor(editor)
		provide(editorFlagsKey, {
			isPublic: false,
			isRichEditor: true,
			isRichWorkspace: false,
		})
		return { editor }
	},

	created() {
		this.editor.on('create', () => {
			this.$emit('ready')
			this.$parent.$emit('ready')
		})
		this.editor.on('update', ({ editor }) => {
			const markdown = createMarkdownSerializer(editor.schema).serialize(
				editor.state.doc,
			)
			this.emit('update:content', {
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

	beforeDestroy() {
		this.editor.destroy()
	},

	methods: {
		outlineToggled(visible) {
			this.emit('outline-toggled', visible)
		},

		/**
		 * Wrapper to emit events on our own and the parent component
		 *
		 * The parent might be either the root component of src/editor.js or Viewer.vue which collectives currently uses
		 *
		 * Ideally this would be done in a generic way in the src/editor.js API abstraction, but it seems
		 * that there is no proper way to pass any received event along in vue, the only option I've found
		 * in https://github.com/vuejs/vue/issues/230 feels too hacky to me, so we just emit twice for now
		 *
		 * @param {string} event The event name
		 * @param {any} data The data to pass along
		 */
		emit(event, data) {
			this.$emit(event, data)
			this.$parent?.$emit(event, data)
		},
	},
}
</script>

<style lang="scss">
@import './../../css/prosemirror';
@import './../../css/print';
</style>
