<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
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
	<NodeViewWrapper>
		<figure class="image image-view"
			data-component="image-view"
			:class="{'icon-loading': !loaded, 'image-view--failed': failed}"
			:data-src="src">
			<div v-if="canDisplayImage"
				v-click-outside="() => showIcons = false"
				class="image__view"
				@click="showIcons = true"
				@mouseover="showIcons = true"
				@mouseleave="showIcons = false">
				<transition name="fade">
					<template v-if="!failed">
						<div v-if="isMediaAttachment"
							class="media">
							<div class="media__wrapper">
								<img v-show="loaded"
									:src="imageUrl"
									class="image__main"
									@load="onLoaded">
								<div class="metadata">
									<span class="name">{{ alt }}</span>
									<span class="size">{{ attachmentMetadata.size }}</span>
								</div>
							</div>
							<div v-if="showDeleteIcon"
								class="buttons">
								<NcButton :aria-label="t('text', 'Delete this attachment')"
									:title="t('text', 'Delete this attachment')"
									@click="deleteNode">
									<template #icon>
										<DeleteIcon />
									</template>
								</NcButton>
							</div>
						</div>
						<div v-else>
							<img v-show="loaded"
								:src="imageUrl"
								class="image__main"
								@load="onLoaded">
						</div>
					</template>
					<template v-else>
						<ImageIcon class="image__main image__main--broken-icon" :size="100" />
					</template>
				</transition>
				<transition name="fade">
					<div v-if="!isMediaAttachment" v-show="loaded" class="image__caption">
						<figcaption v-if="!editable">
							{{ alt }}
						</figcaption>
						<div v-else class="image__caption__wrapper">
							<input v-show="!isMediaAttachment"
								ref="altInput"
								type="text"
								class="image__caption__input"
								:value="alt"
								@keyup.enter="updateAlt">
							<div v-if="showImageDeleteIcon"
								class="image__caption__delete">
								<NcButton :aria-label="t('text', 'Delete this image')"
									:title="t('text', 'Delete this image')"
									@click="deleteNode">
									<template #icon>
										<DeleteIcon />
									</template>
								</NcButton>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<div v-else class="image-view__cant_display">
				<transition name="fade">
					<div v-show="loaded">
						<a :href="internalLinkOrImage" target="_blank">
							<span v-if="!isSupportedImage">{{ alt }}</span>
						</a>
					</div>
				</transition>
				<transition v-if="isSupportedImage" name="fade">
					<div v-show="loaded" class="image__caption">
						<input ref="altInput"
							type="text"
							:value="alt"
							:disabled="!editable"
							@keyup.enter="updateAlt()">
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
import axios from '@nextcloud/axios'
import ClickOutside from 'vue-click-outside'
import { NcButton } from '@nextcloud/vue'
import { generateUrl } from '@nextcloud/router'
import { NodeViewWrapper } from '@tiptap/vue-2'

import store from './../mixins/store.js'
import { logger } from '../helpers/logger.js'
import { mimetypesImages as IMAGE_MIMES } from '../helpers/mime.js'
import { useAttachmentResolver } from '../components/Editor.provider.js'
import { Image as ImageIcon, Delete as DeleteIcon } from '../components/icons.js'

const getQueryVariable = (src, variable) => {
	const query = src.split('?')[1]
	if (typeof query === 'undefined') {
		return
	}
	const vars = query.split(/[&#]/)
	if (typeof vars === 'undefined') {
		return
	}
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=')
		if (decodeURIComponent(pair[0]) === variable) {
			return decodeURIComponent(pair[1])
		}
	}
}

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
			imageLoaded: false,
			loaded: false,
			failed: false,
			showIcons: false,
			imageUrl: null,
			errorMessage: null,
			attachmentType: null,
			attachmentMetadata: {},
		}
	},
	computed: {
		isMediaAttachment() {
			return this.attachmentType === this.$attachmentResolver.ATTACHMENT_TYPE_MEDIA
		},
		editable() {
			return this.editor.isEditable
		},
		showDeleteIcon() {
			return this.editable && this.showIcons
		},
		showImageDeleteIcon() {
			return this.showDeleteIcon && !this.isMediaAttachment
		},
		canDisplayImage() {
			if (!this.isSupportedImage) {
				return false
			}

			if (this.failed && this.loaded) {
				return true
			}

			return this.loaded && this.imageLoaded
		},
		imageFileId() {
			return getQueryVariable(this.src, 'fileId')
		},
		isSupportedImage() {
			return typeof this.mime === 'undefined'
				|| IMAGE_MIMES.indexOf(this.mime) !== -1
		},
		internalLinkOrImage() {
			if (this.imageFileId) {
				return generateUrl('/f/' + this.imageFileId)
			}
			return this.src
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
		t() {
			return (a, s) => window.t(a, s)
		},
		token() {
			return document.getElementById('sharingToken')
				&& document.getElementById('sharingToken').value
		},
	},
	beforeMount() {
		if (!this.isSupportedImage) {
			// TODO check if hasPreview and render a file preview if available
			this.failed = true
			this.imageLoaded = false
			this.loaded = true
			this.errorMessage = t('text', 'Unsupported image type')
			return
		}
		this.init()
			.catch(this.onImageLoadFailure)
	},
	methods: {
		async init() {
			const candidates = this.$attachmentResolver.resolve(this.src)
			return this.load(candidates)
		},
		async load(candidates) {
			const [candidate, ...fallbacks] = candidates
			return this.loadImage(candidate.url, candidate.type, candidate.name).catch((e) => {
				if (fallbacks.length > 0) {
					return this.load(fallbacks)
					// TODO if fallback works, rewrite the url with correct document ID
				}
				return Promise.reject(e)
			})
		},
		async loadImage(imageUrl, attachmentType, name = null) {
			return new Promise((resolve, reject) => {
				const img = new Image()
				img.onload = async () => {
					this.imageUrl = imageUrl
					this.imageLoaded = true
					this.loaded = true
					this.attachmentType = attachmentType
					if (attachmentType === this.$attachmentResolver.ATTACHMENT_TYPE_MEDIA) {
						await this.loadMediaMetadata(name)
					}
					resolve(imageUrl)
				}
				img.onerror = (e) => {
					reject(new LoadImageError(e, imageUrl))
				}
				img.src = imageUrl
			})
		},
		loadMediaMetadata(name) {
			const metadataUrl = this.$attachmentResolver.getMediaMetadataUrl(name)
			return axios.get(metadataUrl).then((response) => {
				this.attachmentMetadata = response.data
			}).catch((error) => {
				logger.error('Failed to load media metadata', { error })
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
				this.editor.commands.scrollIntoView()
			})
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
		align-items: center;
		width: 20px;
		height: 20px;
		position: absolute;
		right: -6px;
		bottom: 10px;
		&, svg {
			cursor: pointer;
		}
	}

	input[type='text'] {
		width: 200px;
		max-width: 80%;
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
	.media__wrapper {
		display: flex;
		border: 2px solid var(--color-border);
		border-radius: var(--border-radius-large);
		padding: 8px;

		img {
			width: 44px;
			height: 44px;
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
