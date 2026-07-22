<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="raw-markdown-editor" data-text-el="raw-markdown-editor">
		<div class="raw-markdown-editor__bar">
			<span class="raw-markdown-editor__label">
				<CodeTags :size="20" />
				{{ t('text', 'Editing Markdown source') }}
			</span>
			<div class="raw-markdown-editor__actions">
				<NcButton
					v-if="changed"
					variant="tertiary"
					data-cy="discardRawEditing"
					@click="exitRawEditing({ discard: true })">
					{{ t('text', 'Discard changes') }}
				</NcButton>
				<NcButton
					variant="primary"
					data-cy="exitRawEditing"
					@click="exitRawEditing()">
					{{ t('text', 'Rich text') }}
				</NcButton>
			</div>
		</div>
		<div class="editor__content-wrapper">
			<EditorContent
				class="editor__content text-editor__content"
				:editor="editor" />
		</div>
	</div>
</template>

<script>
import { t } from '@nextcloud/l10n'
import { EditorContent } from '@tiptap/vue-3'
import NcButton from '@nextcloud/vue/components/NcButton'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import { useRawEditing } from '../../composables/useRawEditing.ts'
import { createPlainEditor, serializePlainText } from '../../EditorFactory.ts'
import { CodeTags } from '../icons.js'

export default {
	name: 'RawMarkdownEditor',

	components: {
		CodeTags,
		EditorContent,
		NcButton,
	},

	props: {
		/**
		 * Markdown source to seed the raw editor with.
		 */
		initialMarkdown: {
			type: String,
			required: true,
		},
	},

	emits: ['change'],

	setup() {
		const { exitRawEditing } = useRawEditing()
		// A detached plain editor: no Collaboration extension, so it never
		// touches the shared document while the user edits raw Markdown.
		const editor = createPlainEditor()
		const { setContent } = useEditorMethods(editor)
		return { editor, exitRawEditing, setContent, t }
	},

	data() {
		return {
			changed: false,
		}
	},

	mounted() {
		this.setContent(this.initialMarkdown, { addToHistory: false })
		this.editor.on('update', this.onUpdate)
		this.editor.commands.focus('start')
	},

	beforeUnmount() {
		this.editor?.off('update', this.onUpdate)
		this.editor?.destroy()
	},

	methods: {
		onUpdate() {
			const markdown = serializePlainText(this.editor.state.doc)
			this.changed = markdown !== this.initialMarkdown
			this.$emit('change', markdown)
		},
	},
}
</script>

<style scoped lang="scss">
.raw-markdown-editor {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 100%;
}

.raw-markdown-editor__bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--default-grid-baseline);
	padding: var(--default-grid-baseline) calc(2 * var(--default-grid-baseline));
	border-bottom: 1px solid var(--color-border);
}

.raw-markdown-editor__label {
	display: flex;
	align-items: center;
	gap: var(--default-grid-baseline);
	color: var(--color-text-maxcontrast);
}

.raw-markdown-editor__actions {
	display: flex;
	align-items: center;
	gap: var(--default-grid-baseline);
}

.editor__content-wrapper {
	display: flex;
	flex-grow: 1;
}

.editor__content {
	flex-grow: 1;
	max-width: var(--text-editor-max-width);
	margin: 0 auto;
	position: relative;
}
</style>
