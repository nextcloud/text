<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper :contenteditable="isEditable">
		<figure class="image image-view"
			data-component="image-view"
			:data-attachment-type="attachmentType"
			:class="{'icon-loading': !loaded, 'image-view--failed': failed}"
			:data-src="src">
			<div v-if="canDisplayImage"
				v-click-outside="() => showIcons = false"
				class="image__view"
				@mouseover="showIcons = true"
				@mouseleave="showIcons = false">
				<transition name="fade">
					<template v-if="!failed">
						<div v-if="isMediaAttachment"
							contenteditable="false"
							class="media"
							@click="handleAttachmentClick">
							<div class="media__wrapper">
								<img v-show="loaded"
									:src="imageUrl"
									:alt="alt"
									class="image__main"
									@load="onLoaded">
								<div class="metadata">
									<span class="name">{{ alt }}</span>
									<span class="size">{{ attachmentSize }}</span>
								</div>
							</div>
							<div v-if="showDeleteIcon"
								class="buttons">
								<NcButton :aria-label="t('text', 'Delete this attachment')"
									:title="t('text', 'Delete this attachment')"
									@click="onDelete">
									<template #icon>
										<DeleteIcon />
									</template>
								</NcButton>
							</div>
						</div>
						<div v-else class="media" contenteditable="false">
							<img v-show="loaded"
								:src="imageUrl"
								:alt="alt"
								class="image__main"
								@click="handleImageClick"
								@load="onLoaded">
						</div>
					</template>
					<template v-else>
						<ImageIcon class="image__main image__main--broken-icon" :size="100" />
					</template>
				</transition>
				<transition name="fade">
					<div v-if="!isMediaAttachment"
						v-show="loaded"
						class="image__caption"
						:title="alt">
						<figcaption v-if="!isEditable">
							{{ alt }}
						</figcaption>
						<div v-else class="image__caption__wrapper">
							<input v-show="!isMediaAttachment"
								ref="altInput"
								type="text"
								class="image__caption__input"
								:value="alt"
								@blur="updateAlt"
								@keyup="updateAlt">
							<div v-if="showImageDeleteIcon"
								contenteditable="false"
								class="image__caption__delete">
								<NcButton :aria-label="t('text', 'Delete this image')"
									:title="t('text', 'Delete this image')"
									@click="onDelete">
									<template #icon>
										<DeleteIcon />
									</template>
								</NcButton>
							</div>
						</div>
					</div>
				</transition>
				<div class="image__modal">
					<ShowImageModal :images="embeddedImageList"
						:start-index="imageIndex"
						:show="showImageModal"
						@close="showImageModal=false" />
				</div>
			</div>
			<div v-else class="image-view__cant_display">
				<transition name="fade">
					<div v-show="loaded" class="image__caption">
						<input ref="altInput"
							type="text"
							:value="alt"
							:disabled="!isEditable"
							@blur="updateAlt"
							@keyup.enter="updateAlt">
					</div>
				</transition>
			</div>
			<small v-if="errorMessage" class="image__error-message">
				{{ errorMessage }}
			</small>
		</figure>
	</NodeViewWrapper>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import { mapGetters } from 'vuex'
import { NcButton } from '@nextcloud/vue'
import { showError } from '@nextcloud/dialogs'
import ShowImageModal from '../components/ImageView/ShowImageModal.vue'
import store from '../mixins/store.js'
import { useAttachmentResolver } from '../components/Editor.provider.js'
import { emit } from '@nextcloud/event-bus'
import { NodeViewWrapper } from '@tiptap/vue-2'
import { Image as ImageIcon, Delete as DeleteIcon } from '../components/icons.js'

class LoadImageError extends Error {

	constructor(reason, imageUrl) {
		super(reason?.message || t('text', 'Failed to load'))
		this.reason = reason
		this.imageUrl = imageUrl
	}

}

export default {
	name: 'ImageView',
	components: {
		ImageIcon,
		DeleteIcon,
		NcButton,
		ShowImageModal,
		NodeViewWrapper,
	},
	directives: {
		ClickOutside,
	},
	mixins: [
		store,
		useAttachmentResolver,
	],
	props: ['editor', 'node', 'extension', 'updateAttributes', 'deleteNode'], // eslint-disable-line
	data() {
		return {
			attachment: null,
			imageLoaded: false,
			loaded: false,
			failed: false,
			showIcons: false,
			imageUrl: null,
			errorMessage: null,
			attachmentSize: null,
			showImageModal: false,
			imageIndex: null,
			isEditable: false,
			embeddedImageList: [],
		}
	},
	computed: {
		...mapGetters({
			imageAttachments: 'text/imageAttachments',
		}),
		attachmentType() {
			if (this.attachment) {
				return this.attachment.isImage ? 'image' : 'media'
			} else {
				return null
			}
		},
		isMediaAttachment() {
			return this.attachmentType === 'media'
		},
		showDeleteIcon() {
			return this.isEditable && this.showIcons
		},
		showImageDeleteIcon() {
			return this.showDeleteIcon && !this.isMediaAttachment
		},
		canDisplayImage() {
			if (this.failed && this.loaded) {
				return true
			}

			return this.loaded && this.imageLoaded
		},
		src: {
			get() {
				return this.node.attrs.src || ''
			},
			set(src) {
				this.updateAttributes({
					src,
				})
			},
		},
		alt: {
			get() {
				return this.node.attrs.alt ? this.node.attrs.alt : ''
			},
			set(alt) {
				this.updateAttributes({
					alt,
				})
			},
		},
	},
	beforeMount() {
		this.isEditable = this.editor.isEditable
		this.editor.on('update', ({ editor }) => {
			this.isEditable = editor.isEditable
		})
		this.loadPreview()
			.catch(this.onImageLoadFailure)
	},
	methods: {
		async loadPreview() {
			this.attachment = await this.$attachmentResolver.resolve(this.src)
			if (!this.attachment.previewUrl) {
				throw new Error('Attachment source was not resolved')
			}
			return new Promise((resolve, reject) => {
				const img = new Image()
				img.onload = async () => {
					this.imageUrl = this.attachment.previewUrl
					this.imageLoaded = true
					this.loaded = true
					this.attachmentSize = this.attachment.size
				}
				img.onerror = (e) => {
					reject(new LoadImageError(e, this.attachment.previewUrl))
				}
				img.src = this.attachment.previewUrl
			})
		},
		onImageLoadFailure(err) {
			this.failed = true
			this.imageLoaded = false
			this.loaded = true
			this.errorMessage = err.message

			if (err instanceof LoadImageError) {
				this.errorMessage = `${this.errorMessage} ${this.src}`
			}

			this.$emit('error', { error: err, src: this.src })
		},
		updateAlt(event) {
			this.updateAttributes({
				alt: event.target.value,
			})
		},
		onLoaded() {
			this.loaded = true
			this.$nextTick(() => {
				this.$refs.altInput?.focus()
			})
		},
		async updateEmbeddedImageList() {
			this.embeddedImageList = []
			// Get all images that succeeded to load
			const imageViews = Array.from(document.querySelectorAll('figure[data-component="image-view"][data-attachment-type="image"]:not(.image-view--failed).image-view'))
			for (const imgv of imageViews) {
				const src = imgv.getAttribute('data-src')
				if (!this.embeddedImageList.find(i => i.src === src)) {
					// Don't add duplicates (e.g. when several editors are loaded in HTML document)
					const attachment = await this.$attachmentResolver.resolve(imgv.getAttribute('data-src'))
					this.embeddedImageList.push({
						src,
						...attachment,
					})
				}
			}
		},
		handleAttachmentClick() {
			// Open in viewer if possible
			if (OCA.Viewer
				// Viewer is not in use
				&& !OCA.Viewer.file
				// Viewer supports mimetype
				&& OCA.Viewer.mimetypes.indexOf(this.attachment.mimetype) !== -1
				// Attachment has davPath, i.e. is native attachment and not in public share
				//  (in public share we probably don't have DAV access)
				&& this.attachment.davPath) {
				// Viewer exists, is not in use and supports mimetype
				OCA.Viewer.open({ path: this.attachment.davPath })
				return
			}

			// Download file
			window.location.assign(this.attachment.fullUrl)
		},
		async handleImageClick() {
			await this.updateEmbeddedImageList()
			this.imageIndex = this.embeddedImageList.findIndex(i => (i.src === this.src))
			if (this.imageIndex !== -1) {
				this.showImageModal = true
			} else {
				console.error('Could not find image in attachments list', this.attachment)
				showError(t('text', 'Could not find image in attachments list.'))
			}
		},
		onDelete() {
			emit('text:image-node:delete', this.imageUrl)
			this.deleteNode()
		},
	},
}
</script>

<style scoped lang="scss">
.image {
	margin: 0;
	padding: 0;

	&, * {
		-webkit-user-modify: read-only !important;
	}
}

.image__caption {
	text-align: center;
	color: var(--color-text-lighter);
	display: flex;
	align-items: center;
	justify-content: center;
	&__wrapper {
		position: relative;
	}
	&__delete {
		display: flex;
		flex-basis: 20%;
		align-items: center;
		width: 20px !important;
		height: 20px;
		position: absolute;
		bottom: -1px;
		right: -3px;
		&, svg {
			cursor: pointer;
		}
	}
	.image__caption__wrapper {
		flex-basis: 80%;
	}
	input[type='text'] {
		width: 85%;
		text-align: center;
		background-color: transparent;
		border: none !important;
		color: var(--color-text-maxcontrast) !important;

		&:focus {
			border: 2px solid var(--color-border-dark) !important;
			color: var(--color-main-text) !important;
		}
	}
	figcaption {
		color: var(--color-text-maxcontrast) !important;
		max-width: 80%;
		text-align: center;
		width: fit-content;
	}
}

.image__loading {
	height: 100px;
}

.image__main {
	max-height: calc(100vh - 50px - 50px);
}

.image__main--broken-icon, .image__error-message {
	color: var(--color-text-maxcontrast);
}

.image__error-message {
	display: block;
	text-align: center;
}

.image__view {
	text-align: center;
	position: relative;

	img {
		max-width: 100%;
	}

	&:hover {
		input[type='text'] {
			border: 2px solid var(--color-border-dark) !important;
			color: var(--color-main-text) !important;
		}
	}
}

.media {
	display: flex;
	align-items: center;
	justify-content: left;
	padding-bottom: 0;

	.media__wrapper {
		display: flex;
		border: 2px solid var(--color-border);
		border-radius: var(--border-radius-large);
		padding: 8px;

		img {
			width: var(--default-clickable-area);
			height: var(--default-clickable-area);
		}

		.metadata {
			margin-left: 8px;
			display: flex;
			flex-direction: column;
			align-items: start;

			span {
				line-height: 20px;
				font-weight: normal;

				&.size {
					color: var(--color-text-maxcontrast);
				}
			}
		}
	}
	.buttons {
		margin-left: 8px;
	}
}

.fade-enter-active {
	transition: opacity .3s ease-in-out;
}

.fade-enter-to {
	opacity: 1;
}

.fade-enter {
	opacity: 0;
}
</style>
