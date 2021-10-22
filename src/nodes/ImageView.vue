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
	<div class="image" :class="{'icon-loading': !loaded}" :data-src="src">
		<div v-if="imageLoaded && isSupportedImage" class="image__view">
			<transition name="fade">
				<img v-show="loaded"
					:src="imageUrl"
					class="image__main"
					@load="onLoaded">
			</transition>
			<transition name="fade">
				<div v-show="loaded" class="image__caption">
					<input ref="altInput"
						type="text"
						:value="alt"
						@keyup.enter="updateAlt()">
				</div>
			</transition>
		</div>
		<div v-else>
			<transition name="fade">
				<div v-show="loaded">
					<a :href="internalLinkOrImage" target="_blank">
						<span v-if="!isSupportedImage">{{ alt }}</span>
					</a>
				</div>
			</transition><transition v-if="isSupportedImage" name="fade">
				<div v-show="loaded" class="image__caption">
					<input ref="altInput"
						type="text"
						:value="alt"
						@keyup.enter="updateAlt()">
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import path from 'path'
import { generateUrl, generateRemoteUrl } from '@nextcloud/router'
import { getCurrentUser } from '@nextcloud/auth'

const imageMimes = [
	'image/png',
	'image/jpeg',
	'image/gif',
	'image/x-xbitmap',
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

export default {
	name: 'ImageView',
	props: ['node', 'options', 'updateAttrs', 'view'], // eslint-disable-line
	data() {
		return {
			imageLoaded: false,
			loaded: false,
			failed: false,
		}
	},
	computed: {
		davUrl() {
			if (getCurrentUser()) {
				const uid = getCurrentUser().uid
				const encoded = encodeURI(this.filePath)
				return generateRemoteUrl(`dav/files/${uid}${encoded}`)
			} else {
				return generateUrl('/s/{token}/download?path={dirname}&files={basename}',
					{
						token: this.token,
						dirname: this.options.currentDirectory,
						basename: this.basename,
					})
			}
		},
		imageUrl() {
			if (this.src.startsWith('text://')) {
				const imageFileName = getQueryVariable(this.src, 'imageFileName')
				const textFileId = getQueryVariable(this.src, 'textFileId')
				if (getCurrentUser()) {
					return generateUrl('/apps/text/image?textFileId={textFileId}&imageFileName={imageFileName}',
						{
							textFileId,
							imageFileName,
						})
				} else {
					return generateUrl('/apps/text/public/image?textFileId={textFileId}&imageFileName={imageFileName}&token={token}',
						{
							textFileId,
							imageFileName,
							token: this.token,
						})
				}
			}
			if (this.isRemoteUrl || this.isPreviewUrl) {
				return this.src
			}
			if (this.hasPreview && this.mime !== 'image/gif') {
				return this.previewUrl
			}
			return this.davUrl
		},
		isRemoteUrl() {
			return this.src.startsWith('http://')
				|| this.src.startsWith('https://')
		},
		isPreviewUrl() {
			return this.src.match(/^(\/index.php)?\/core\/preview/)
				|| this.src.match(/^(\/index.php)?\/apps\/files_sharing\/publicpreview\//)
		},
		basename() {
			return decodeURI(this.src.split('?')[0])
		},
		fileId() {
			return getQueryVariable(this.src, 'fileId')
		},
		filePath() {
			const f = [
				this.options.currentDirectory,
				this.basename,
			].join('/')
			return path.normalize(f)
		},
		hasPreview() {
			return getQueryVariable(this.src, 'hasPreview') === 'true'
		},
		previewUrl() {
			const fileQuery = (this.fileId)
				? `?fileId=${this.fileId}&file=${encodeURIComponent(this.filePath)}`
				: `?file=${encodeURIComponent(this.filePath)}`
			const query = fileQuery + '&x=1024&y=1024&a=true'

			if (getCurrentUser()) {
				return generateUrl('/core/preview') + query
			} else {
				return generateUrl(`/apps/files_sharing/publicpreview/${this.token}${query}`)
			}
		},
		mime() {
			return getQueryVariable(this.src, 'mimetype')
		},
		mimeIcon() {
			if (this.mime) {
				const mimeIconUrl = window.OC.MimeType.getIconUrl(this.mime)
				return { backgroundImage: `url(${mimeIconUrl})` }
			}
			return {}
		},
		isSupportedImage() {
			return typeof this.mime === 'undefined'
				|| imageMimes.indexOf(this.mime) !== -1
		},
		internalLinkOrImage() {
			const fileId = getQueryVariable(this.src, 'fileId')
			if (fileId) {
				return generateUrl('/f/' + fileId)
			}
			return this.src
		},
		src: {
			get() {
				return this.node.attrs.src || ''
			},
			set(src) {
				this.updateAttrs({
					src,
				})
			},
		},
		alt: {
			get() {
				return this.node.attrs.alt ? this.node.attrs.alt : ''
			},
			set(alt) {
				this.updateAttrs({
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
			return
		}
		const img = new Image()
		img.src = this.imageUrl
		img.onload = () => {
			this.imageLoaded = true
		}
		img.onerror = () => {
			this.failed = true
			this.imageLoaded = false
			this.loaded = true
		}
	},
	methods: {
		updateAlt() {
			this.alt = this.$refs.altInput.value
		},
		onLoaded() {
			this.loaded = true
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
		input[type='text'] {
			width: 100%;
			border: none;
			text-align: center;
		}
	}

	.image__loading {
		height: 100px;
	}

	.image__view {
		text-align: center;
		img {
			max-width: 100%;
		}
	}

	.image__main {
		max-height: calc(100vh - 50px - 50px);
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
