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
		<div class="image image-view"
			data-component="image-view"
			:class="{'icon-loading': !loaded, 'image-view--failed': failed}"
			:data-src="src">
			<small v-if="errorMessage" class="image__error-message">
				{{ errorMessage }}
			</small>
			<div v-if="canDisplayImage"
				v-click-outside="() => showIcons = false"
				class="image__view"
				@click="showIcons = true"
				@mouseover="showIcons = true"
				@mouseleave="showIcons = false">
				<transition name="fade">
					<template v-if="!failed">
						<img v-show="loaded"
							:src="imageUrl"
							class="image__main"
							@load="onLoaded">
					</template>
					<template v-else>
						<ImageBroken class="image__main image__main--broken-icon" :size="100" />
					</template>
				</transition>
				<transition name="fade">
					<div v-show="loaded" class="image__caption">
						<input ref="altInput"
							type="text"
							class="image__caption__input"
							:value="alt"
							@keyup.enter="updateAlt()">
						<div v-if="editor.isEditable && showIcons"
							class="image__caption__delete"
							title="Delete this image"
							@click="deleteNode">
							<TrashCan />
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
							@keyup.enter="updateAlt()">
					</div>
				</transition>
			</div>
		</div>
	</NodeViewWrapper>
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import { NodeViewWrapper } from '@tiptap/vue-2'
import ClickOutside from 'vue-click-outside'
// import TrashCanIcon from 'vue-material-design-icons/TrashCan.vue'
import { ImageBroken, TrashCan } from '../components/icons.js'
import store from './../mixins/store.js'
import { useImageResolver } from './../components/EditorWrapper.provider.js'

const imageMimes = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
	'image/x-xbitmap',
	'image/x-ms-bmp',
	'image/bmp',
	'image/svg+xml',
	'image/webp',
]

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

class ErrorLoadImage extends Error {

	constructor(reason, imageUrl) {
		super(reason?.message || t('text', 'Fail to load image'))
		this.reason = reason
		this.imageUrl = imageUrl
	}

}

export default {
	name: 'ImageView',
	components: {
		ImageBroken,
		TrashCan,
		NodeViewWrapper,
	},
	directives: {
		ClickOutside,
	},
	mixins: [
		store,
		useImageResolver,
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
		}
	},
	computed: {
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
			const mime = getQueryVariable(this.src, 'mimetype')
			return typeof mime === 'undefined'
				|| imageMimes.indexOf(mime) !== -1
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
			this.errorMessage = t('text', 'Unsuported image')
			return
		}
		this.init()
			.catch(this.onImageLoadFailure)
	},
	methods: {
		async init() {
			const [url, fallback] = this.$imageResolver.resolve(this.src)
			return this.loadImage(url).catch((e) => {
				if (fallback) {
					return this.loadImage(fallback)
					// TODO if fallback works, rewrite the url with correct document ID
				}

				return Promise.reject(e)
			})
		},

		async loadImage(imageUrl) {
			return new Promise((resolve, reject) => {
				const img = new Image()
				img.onload = () => {
					this.imageUrl = imageUrl
					this.imageLoaded = true
					this.loaded = true
					resolve(imageUrl)
				}
				img.onerror = (e) => {
					reject(new ErrorLoadImage(e, imageUrl))
				}
				img.src = imageUrl
			})
		},
		onImageLoadFailure(err) {
			this.failed = true
			this.imageLoaded = false
			this.loaded = true
			this.errorMessage = err.message
		},
		updateAlt() {
			this.alt = this.$refs.altInput.value
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
	}

	.image__caption {
		text-align: center;
		color: var(--color-text-lighter);
		display: flex;
		align-items: center;
		justify-content: center;
		input[type='text'] {
			max-width: 80%;
			border: none;
			text-align: center;
			background-color: transparent;
		}
	}

	.image__loading {
		height: 100px;
	}

	.image__main--broken-icon, .image__error-message {
		color: var(--color-error);
	}

	.image__view {
		text-align: center;
		position: relative;

		img {
			max-width: 100%;
		}
	}

	.image__main {
		max-height: calc(100vh - 50px - 50px);
	}

	.image__error-message {
		display: block;
		text-align: center;
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

	.image__caption__delete {
		position: absolute;
		right: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 20px;
		height: 20px;
		&, svg {
			cursor: pointer;
		}
	}
</style>
