<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license AGPL-3.0-or-later
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
	<div v-if="enabled" id="rich-workspace" :class="{'icon-loading': !loaded || !ready, 'focus': focus, 'dark': darkTheme, 'creatable': canCreate }">
		<Editor v-if="file"
			v-show="ready"
			:key="file.path"
			:file-id="file.id"
			:relative-path="file.path"
			:share-token="shareToken"
			:mime="file.mimetype"
			:autofocus="autofocus"
			:autohide="autohide"
			active
			rich-workspace
			@ready="ready=true"
			@focus="onFocus"
			@blur="onBlur"
			@error="reset" />
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'

const IS_PUBLIC = !!(document.getElementById('isPublic'))
const WORKSPACE_URL = generateOcsUrl('apps/text' + (IS_PUBLIC ? '/public' : '') + '/workspace', 2)

export default {
	name: 'RichWorkspace',
	components: {
		Editor: () => import(/* webpackChunkName: "editor" */'./../components/Editor.vue'),
	},
	props: {
		path: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			focus: false,
			folder: null,
			file: null,
			loaded: false,
			ready: false,
			autofocus: false,
			autohide: true,
			darkTheme: OCA.Accessibility && OCA.Accessibility.theme === 'dark',
			enabled: OCA.Text.RichWorkspaceEnabled,
		}
	},
	computed: {
		shareToken() {
			return document.getElementById('sharingToken')?.value
		},
		canCreate() {
			return !!(this.folder && (this.folder.permissions & OC.PERMISSION_CREATE))
		},
	},
	watch: {
		path() {
			this.getFileInfo()
		},
		focus(newValue) {
			if (!newValue) {
				document.querySelector('#rich-workspace .text-editor__main').scrollTo(0, 0)
			}
		},
	},
	mounted() {
		if (this.enabled) {
			this.getFileInfo()
		}
		subscribe('Text::showRichWorkspace', this.showRichWorkspace)
		subscribe('Text::hideRichWorkspace', this.hideRichWorkspace)

		this.listenKeydownEvents()

	},
	beforeDestroy() {
		unsubscribe('Text::showRichWorkspace', this.showRichWorkspace)
		unsubscribe('Text::hideRichWorkspace', this.hideRichWorkspace)

		this.unlistenKeydownEvents()
	},
	methods: {
		onBlur() {
			this.listenKeydownEvents()
		},
		onFocus() {
			this.focus = true
			this.unlistenKeydownEvents()
		},
		reset() {
			this.file = null
			this.focus = false
			this.$nextTick(() => {
				this.creating = false
				this.getFileInfo()
			})
		},
		getFileInfo(autofocus) {
			this.loaded = false
			this.autofocus = false
			this.ready = false
			const params = { path: this.path }
			if (IS_PUBLIC) {
				params.shareToken = this.shareToken
			}
			return axios.get(WORKSPACE_URL, { params })
				.then((response) => {
					const data = response.data.ocs.data
					this.folder = data.folder || null
					this.file = data.file
					this.editing = true
					this.loaded = true
					this.autofocus = autofocus || false
					return true
				})
				.catch((error) => {
					if (error.response.data.ocs && error.response.data.ocs.data.folder) {
						this.folder = error.response.data.ocs.data.folder
					} else {
						this.folder = null
					}
					this.file = null
					this.loaded = true
					this.ready = true
					this.creating = false
					return false
				})
		},
		showRichWorkspace(event) {
			this.enabled = true
			this.getFileInfo(event?.autofocus || false)
		},
		hideRichWorkspace() {
			this.enabled = false
		},
		listenKeydownEvents() {
			window.addEventListener('keydown', this.onKeydown)
		},
		unlistenKeydownEvents() {
			clearInterval(this.$_timeoutAutohide)

			window.removeEventListener('keydown', this.onKeydown)
		},
		onTimeoutAutohide() {
			this.autohide = true
		},
		onKeydown(e) {
			if (e.key !== 'Tab') {
				return
			}

			// remove previous timeout
			clearInterval(this.$_timeoutAutohide)

			this.autohide = false

			// schedule to normal behaviour
			this.$_timeoutAutohide = setTimeout(this.onTimeoutAutohide, 7000) // 7s
		},
	},
}
</script>

<style lang="scss" scoped>
	#rich-workspace {
		padding: 0 50px;
		/* Slightly reduce vertical space */
		margin-bottom: -24px;
		text-align: left;
		max-height: 0;
		transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
		z-index: 61;
		position: relative;
		&.creatable {
			min-height: 100px;
		}
	}

	/* For subfolders, where there are no Recommendations */
	#rich-workspace:only-child {
		margin-bottom: 0;
	}

	.empty-workspace {
		cursor: pointer;
		display: block;
		padding-top: 43px;
		color: var(--color-text-maxcontrast);
	}

	#rich-workspace:deep(div[contenteditable=false]) {
		width: 100%;
		padding: 0px;
		background-color: var(--color-main-background);
		opacity: 1;
		border: none;
	}

	#rich-workspace:deep(.text-editor) {
		height: 100%;
		position: unset !important;
		top: auto !important;
	}

	#rich-workspace:deep(.text-editor__wrapper) {
		position: unset !important;
		overflow: visible;
	}

	#rich-workspace:deep(.text-editor__main) {
		overflow: visible !important;
	}

	#rich-workspace:deep(.content-wrapper) {
		overflow: scroll !important;
		max-height: calc(40vh - 50px);
		padding-left: 10px;
		padding-bottom: 10px;
	}

	#rich-workspace:deep(.text-editor__wrapper .ProseMirror) {
		padding: 0px;
		margin: 0;
	}

	#rich-workspace:deep(.editor__content) {
		margin: 0;
	}

	#rich-workspace.focus {
		max-height: 50vh;
	}

	#rich-workspace:not(.focus) {
		max-height: 30vh;
		position: relative;
		overflow: hidden;
	}

	#rich-workspace:not(.focus):not(.icon-loading):not(.empty):after {
		content: '';
		position: absolute;
		z-index: 1;
		bottom: 0;
		left: 0;
		pointer-events: none;
		background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color-main-background));
		width: 100%;
		height: 4em;
	}

	#rich-workspace.dark:not(.focus):not(.icon-loading):after {
		background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--color-main-background));
	}

	@media only screen and (max-width: 1024px) {
		#rich-workspace:not(.focus) {
			max-height: 30vh;
		}
	}
</style>
