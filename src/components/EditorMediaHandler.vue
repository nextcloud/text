<!--
  - @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div class="editor editor-midia-handler"
		data-text-el="editor-midia-handler"
		:class="{ draggedOver }"
		@image-paste="onPaste"
		@dragover.prevent.stop="setDraggedOver(true)"
		@dragleave.prevent.stop="setDraggedOver(false)"
		@image-drop="onEditorDrop">
		<input ref="imageFileInput"
			data-text-el="image-file-input"
			type="file"
			accept="image/*"
			aria-hidden="true"
			class="hidden-visually"
			multiple
			@change="onImageUploadFilePicked">
		<slot />
	</div>
</template>

<script>
import { getCurrentUser } from '@nextcloud/auth'
import { showError } from '@nextcloud/dialogs'
import { mimetypesImages as IMAGE_MIMES } from '../helpers/mime.js'

import {
	useEditorMixin,
	useFileMixin,
	useSyncServiceMixin,
} from './EditorWrapper.provider.js'

import {
	ACTION_IMAGE_PROMPT,
	ACTION_CHOOSE_LOCAL_IMAGE,
	STATE_UPLOADING,
} from './EditorMediaHandler.provider.js'

export default {
	name: 'EditorMediaHandler',
	mixins: [useEditorMixin, useFileMixin, useSyncServiceMixin],
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[ACTION_IMAGE_PROMPT]: {
				get: () => this.showImagePrompt,
			},
			[ACTION_CHOOSE_LOCAL_IMAGE]: {
				get: () => this.chooseLocalImage,
			},
			[STATE_UPLOADING]: {
				get: () => this.state,
			},
		})

		return val
	},
	data() {
		return {
			draggedOver: false,
			// make it reactive to be used inject/provide
			state: {
				isUploadingImages: false,
			},
		}
	},
	computed: {
		imagePath() {
			return this.$file.relativePath.split('/').slice(0, -1).join('/')
		},
	},
	methods: {
		setDraggedOver(val) {
			this.draggedOver = val
		},
		onPaste(e) {
			this.uploadImageFiles(e.detail.files)
		},
		onEditorDrop(e) {
			this.uploadImageFiles(e.detail.files, e.detail.position)
			this.draggedOver = false
		},
		onImageUploadFilePicked(event) {
			this.uploadImageFiles(event.target.files)
			// Clear input to ensure that the change event will be emitted if
			// the same file is picked again.
			event.target.value = ''
		},
		chooseLocalImage() {
			this.$refs.imageFileInput.click()
		},
		async uploadImageFiles(files, position = null) {
			if (!files) {
				return
			}

			this.uploadingImages = true

			const uploadPromises = [...files].map((file) => {
				return this.uploadImageFile(file, position)
			})

			return Promise.all(uploadPromises)
				.catch(err => {
					console.error(err)
					showError(err?.response?.data?.error || err.message)
				})
				.then(() => {
					this.uploadingImages = false
				})
		},
		async uploadImageFile(file, position = null) {
			if (!IMAGE_MIMES.includes(file.type)) {
				showError(t('text', 'Image file format not supported'))
				return
			}

			this.state.isUploadingImages = true

			return this.$syncService.uploadImage(file)
				.then((response) => {
					this.insertAttachmentImage(response.data?.name, response.data?.id, position, response.data?.dirname)
				})
				.catch((error) => {
					console.error(error)
					showError(error?.response?.data?.error)
				})
				.then(() => {
					this.state.isUploadingImages = false
				})
		},
		showImagePrompt() {
			const currentUser = getCurrentUser()
			if (!currentUser) {
				return
			}

			OC.dialogs.filepicker(t('text', 'Insert an image'), (filePath) => {
				this.insertImagePath(filePath)
			}, false, [], true, undefined, this.imagePath)
		},
		insertImagePath(imagePath) {
			this.state.isUploadingImages = true

			return this.$syncService.insertImageFile(imagePath).then((response) => {
				this.insertAttachmentImage(response.data?.name, response.data?.id, null, response.data?.dirname)
			}).catch((error) => {
				console.error(error)
				showError(error?.response?.data?.error || error.message)
			}).then(() => {
				this.state.isUploadingImages = false
			})
		},
		insertAttachmentImage(name, fileId, position = null, dirname = '') {
			// inspired by the fixedEncodeURIComponent function suggested in
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
			const src = dirname + '/'
				+ encodeURIComponent(name).replace(/[!'()*]/g, (c) => {
					return '%' + c.charCodeAt(0).toString(16).toUpperCase()
				})
			// simply get rid of brackets to make sure link text is valid
			// as it does not need to be unique and matching the real file name
			const alt = name.replaceAll(/[[\]]/g, '')

			const chain = position
				? this.$editor.chain().focus(position)
				: this.$editor.chain()

			chain.setImage({ src, alt }).focus().run()
		},
	},
}
</script>
