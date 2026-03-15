<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<transition name="fade">
		<div v-if="isEmptyContent && !isMobileDevice" class="container-suggestions">
			<NcButton
				ref="linkFileOrFolder"
				variant="secondary"
				size="normal"
				class="suggestions--button"
				@click="linkFile">
				<template #icon>
					<Document :size="20" />
				</template>
				{{ t('text', 'Link to file or folder') }}
			</NcButton>

			<NcButton
				variant="secondary"
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
				variant="secondary"
				size="normal"
				class="suggestions--button"
				@click="insertTable">
				<template #icon>
					<TableIcon :size="20" />
				</template>
				{{ t('text', 'Insert Table') }}
			</NcButton>

			<NcButton
				variant="secondary"
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
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'
import { Document, Shape, Table as TableIcon, Upload } from '../components/icons.js'
import { useConnection } from '../composables/useConnection.ts'
import { useEditor } from '../composables/useEditor.ts'
import { useFileProps } from '../composables/useFileProps.ts'
import { useLinkFile } from '../composables/useLinkFile.ts'
import { useNetworkState } from '../composables/useNetworkState.ts'
import { isMobileDevice } from '../helpers/isMobileDevice.js'
import { useActionChooseLocalAttachmentMixin } from './Editor/MediaHandler.provider.js'

export default {
	name: 'SuggestionsBar',
	components: {
		TableIcon,
		Document,
		NcButton,
		Shape,
		Upload,
	},

	mixins: [useActionChooseLocalAttachmentMixin],

	setup() {
		const { editor } = useEditor()
		const { openData } = useConnection()
		const { networkOnline } = useNetworkState()
		const { relativePath } = useFileProps()
		const { linkFile } = useLinkFile({ editor, relativePath })
		return {
			editor,
			isMobileDevice,
			linkFile,
			networkOnline,
			openData,
		}
	},

	data: () => {
		return {
			isEmptyContent: false,
		}
	},

	computed: {
		isUploadDisabled() {
			return !this.openData?.hasOwner || !this.networkOnline
		},
		uploadTitle() {
			if (!this.networkOnline) {
				return t('text', 'Disabled because you are currently offline.')
			}
			if (this.isUploadDisabled) {
				return t(
					'text',
					'Uploading attachments is disabled because the file is shared from another cloud.',
				)
			}
			return ''
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
					if (this.editor.view.state.selection.empty) {
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

		onUpdate({ editor }) {
			/**
			 *  Empty document has an empty document and an empty paragraph (open and close blocks)
			 */
			const EMPTY_DOCUMENT_SIZE = 4
			this.isEmptyContent = editor.state.doc.nodeSize <= EMPTY_DOCUMENT_SIZE
		},
		t,
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
