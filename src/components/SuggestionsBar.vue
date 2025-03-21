<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="isEmptyContent" class="container-suggestions">
		<NcButton ref="linkFileOrFolder"
			type="secondary"
			size="normal"
			class="suggestions--button"
			@click="linkFile">
			<template #icon>
				<Document :size="20" />
			</template>
			<template v-if="!isMobile" #default>
				{{ t('text', 'Link to file or folder') }}
			</template>
		</NcButton>

		<NcButton type="secondary"
			size="normal"
			class="suggestions--button"
			@click="$callChooseLocalAttachment">
			<template #icon>
				<Upload :size="20" />
			</template>
			<template v-if="!isMobile" #default>
				{{ t('text', 'Upload') }}
			</template>
		</NcButton>

		<NcButton type="secondary"
			size="normal"
			class="suggestions--button"
			@click="insertTable">
			<template #icon>
				<TableIcon :size="20" />
			</template>
			<template v-if="!isMobile" #default>
				{{ t('text', 'Insert Table') }}
			</template>
		</NcButton>

		<NcButton type="secondary"
			size="normal"
			class="suggestions--button"
			@click="linkPicker">
			<template #icon>
				<Shape :size="20" />
			</template>
			<template v-if="!isMobile" #default>
				{{ t('text', 'Smart Picker') }}
			</template>
		</NcButton>
	</div>
</template>

<script>
import { NcButton } from '@nextcloud/vue'
import { Document, Shape, Upload, Table as TableIcon } from '../components/icons.js'
import { useActionChooseLocalAttachmentMixin } from './Editor/MediaHandler.provider.js'
import { getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'
import { useEditorMixin, useFileMixin } from './Editor.provider.js'
import { generateUrl } from '@nextcloud/router'
import { buildFilePicker } from '../helpers/filePicker.js'
import { useIsMobile } from '@nextcloud/vue/composables/useIsMobile'

export default {
	name: 'SuggestionsBar',
	components: {
		TableIcon,
		Document,
		NcButton,
		Shape,
		Upload,
	},
	mixins: [
		useActionChooseLocalAttachmentMixin,
		useEditorMixin,
		useFileMixin,
	],

	setup() {
		const isMobile = useIsMobile()
		return {
			isMobile,
		}
	},

	data: () => {
		return {
			startPath: null,
			isEmptyContent: false,
		}
	},

	computed: {
		relativePath() {
			return this.$file?.relativePath ?? '/'
		},
	},

	mounted() {
		this.$editor.on('update', this.onUpdate)
		this.onUpdate({ editor: this.$editor })
	},

	beforeDestroy() {
		this.$editor.off('update', this.onUpdate)
	},

	methods: {
		/**
		 * Open smart picker dialog
		 * Triggered by the "Smart Picker" button
		 */
		linkPicker() {
			getLinkWithPicker(null, true)
				.then(link => {
					const chain = this.$editor.chain()
					if (this.$editor.view.state?.selection.empty) {
						chain.focus().insertPreview(link).run()
					} else {
						chain.setLink({ href: link }).focus().run()
					}
				})
				.catch(error => {
					console.error('Smart picker promise rejected', error)
				})
		},

		/**
		 * Insert table
		 * Triggered by the "Insert table" button
		 */
		insertTable() {
			this.$editor.chain().focus().insertTable()?.run()
		},

		/**
		 * Open dialog and ask user which file to link to
		 * Triggered by the "link to file or folder" button
		 */
		linkFile() {
			if (this.startPath === null) {
				this.startPath = this.relativePath.split('/').slice(0, -1).join('/')
			}

			const filePicker = buildFilePicker(this.startPath)

			filePicker.pick()
				.then((file) => {
					const client = OC.Files.getClient()
					client.getFileInfo(file).then((_status, fileInfo) => {
						const url = new URL(generateUrl(`/f/${fileInfo.id}`), window.origin)
						this.setLink(url.href, fileInfo.name)
						this.startPath = fileInfo.path + (fileInfo.type === 'dir' ? `/${fileInfo.name}/` : '')
					})
				})
				.catch(() => {
					// do not close menu but keep focus
					this.$refs.linkFileOrFolder.$el.focus()
				})
		},

		/**
		 * Save user entered URL as a link markup
		 * Triggered when the user submits the ActionInput
		 *
		 * @param {string} url href attribute of the link
		 * @param {string} text Text part of the link
		 */
		setLink(url, text) {
			this.$editor.chain().insertOrSetLink(text, { href: url }).focus().run()
		},

		onUpdate({ editor }) {
			/**
			 *  Empty document has an empty document and an empty paragraph (open and close blocks)
			 */
			const EMPTY_DOCUMENT_SIZE = 4
			this.isEmptyContent = editor.state.doc.nodeSize <= EMPTY_DOCUMENT_SIZE
		},
	},
}
</script>

<style scoped lang="scss">

.container-suggestions {
	display: flex;
	flex-grow: 1;
	margin-left: max(0px, (100% - var(--text-editor-max-width)) / 2);
}

.suggestions--button {
	margin: 5px;
}
</style>
