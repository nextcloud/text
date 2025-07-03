<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<transition name="fade">
		<div v-if="isEmptyContent && !isMobileDevice" class="container-suggestions">
			<NcButton
				ref="linkFileOrFolder"
				type="secondary"
				size="normal"
				class="suggestions--button"
				@click="linkFile">
				<template #icon>
					<Document :size="20" />
				</template>
				{{ t('text', 'Link to file or folder') }}
			</NcButton>

			<NcButton
				type="secondary"
				size="normal"
				class="suggestions--button"
				:disabled="isUploadDisabled"
				:title="uploadTitle"
				@click="$callChooseLocalAttachment">
				<template #icon>
					<Upload :size="20" />
				</template>
				{{ t('text', 'Upload') }}
			</NcButton>

			<NcButton
				type="secondary"
				size="normal"
				class="suggestions--button"
				@click="insertTable">
				<template #icon>
					<TableIcon :size="20" />
				</template>
				{{ t('text', 'Insert Table') }}
			</NcButton>

			<NcButton
				type="secondary"
				size="normal"
				class="suggestions--button"
				@click="linkPicker">
				<template #icon>
					<Shape :size="20" />
				</template>
				{{ t('text', 'Smart Picker') }}
			</NcButton>
		</div>
	</transition>
</template>

<script>
import NcButton from '@nextcloud/vue/components/NcButton'
import { Document, Shape, Upload, Table as TableIcon } from '../components/icons.js'
import { useActionChooseLocalAttachmentMixin } from './Editor/MediaHandler.provider.js'
import { getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'
import { useFileMixin } from './Editor.provider.ts'
import { useEditor } from '../composables/useEditor.ts'
import { generateUrl } from '@nextcloud/router'
import { buildFilePicker } from '../helpers/filePicker.js'
import { isMobileDevice } from '../helpers/isMobileDevice.js'
import { useSyncService } from '../composables/useSyncService.ts'

export default {
	name: 'SuggestionsBar',
	components: {
		TableIcon,
		Document,
		NcButton,
		Shape,
		Upload,
	},

	mixins: [useActionChooseLocalAttachmentMixin, useFileMixin],

	setup() {
		const { editor } = useEditor()
		const { syncService } = useSyncService()
		return {
			editor,
			isMobileDevice,
			syncService,
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
		isUploadDisabled() {
			return !this.syncService?.hasOwner
		},
		uploadTitle() {
			return (
				this.isUploadDisabled
				&& t(
					'text',
					'Uploading attachments is disabled because the file is shared from another cloud.',
				)
			)
		},
	},

	mounted() {
		this.editor.on('update', this.onUpdate)
		this.onUpdate({ editor: this.editor })
	},

	beforeDestroy() {
		this.editor.off('update', this.onUpdate)
	},

	methods: {
		/**
		 * Open smart picker dialog
		 * Triggered by the "Smart Picker" button
		 */
		linkPicker() {
			getLinkWithPicker(null, true)
				.then((link) => {
					const chain = this.editor.chain()
					if (this.editor.view.state?.selection.empty) {
						chain.focus().insertPreview(link).run()
					} else {
						chain.setLink({ href: link }).focus().run()
					}
				})
				.catch((error) => {
					console.error('Smart picker promise rejected', error)
				})
		},

		/**
		 * Insert table
		 * Triggered by the "Insert table" button
		 */
		insertTable() {
			this.editor.chain().focus().insertTable()?.run()
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

			filePicker
				.pick()
				.then((file) => {
					const client = OC.Files.getClient()
					client.getFileInfo(file).then((_status, fileInfo) => {
						const url = new URL(
							generateUrl(`/f/${fileInfo.id}`),
							window.origin,
						)
						this.setLink(url.href, fileInfo.name)
						this.startPath =
							fileInfo.path
							+ (fileInfo.type === 'dir' ? `/${fileInfo.name}/` : '')
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
			this.editor.chain().insertOrSetLink(text, { href: url }).focus().run()
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
	margin-left: max(0px, (100% - var(--text-editor-max-width)) / 2);
	flex-wrap: wrap;
}

.suggestions--button {
	margin: 5px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity var(--animation-slow) ease-in-out;
}

.fade-enter-to,
.fade-leave {
	opacity: 1;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
