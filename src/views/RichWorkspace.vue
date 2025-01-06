<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="enabled && localHasRichWorkspace"
		id="rich-workspace"
		:class="{'focus': focus, 'dark': darkTheme }">
		<RichTextReader v-if="!loaded || !ready" :content="content" class="rich-workspace--preview" />
		<Editor v-if="file"
			v-show="ready"
			:key="file.path"
			:file-id="file.id"
			:relative-path="file.path"
			:share-token="shareToken"
			:mime="file.mimetype"
			:autofocus="autofocus"
			:hide-menu="hideMenu"
			active
			rich-workspace
			@ready="ready=true"
			@focus="onFocus"
			@error="reset" />
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import getEditorInstance from '../components/Editor.singleton.js'
import RichTextReader from '../components/RichTextReader.vue'
import { loadState } from '@nextcloud/initial-state'

const IS_PUBLIC = !!(document.getElementById('isPublic'))
const WORKSPACE_URL = generateOcsUrl('apps/text' + (IS_PUBLIC ? '/public' : '') + '/workspace', 2)
const descriptionFile = t('text', 'Readme') + '.' + loadState('text', 'default_file_extension')
const SUPPORTED_STATIC_FILENAMES = [descriptionFile, 'Readme.md', 'README.md', 'readme.md']

export default {
	name: 'RichWorkspace',
	components: {
		RichTextReader,
		Editor: getEditorInstance,
	},
	props: {
		content: {
			type: String,
			default: '',
		},
		path: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		hasRichWorkspace: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			// Keep track of a local copy of the hasRichWorkspace state as it might change after initial rendering (e.g. when adding/removing the readme)
			localHasRichWorkspace: false,
			focus: false,
			folder: null,
			file: null,
			loaded: false,
			ready: false,
			autofocus: false,
			hideMenu: true,
			darkTheme: OCA.Accessibility && OCA.Accessibility.theme === 'dark',
			enabled: OCA.Text.RichWorkspaceEnabled,
		}
	},
	computed: {
		shareToken() {
			return document.getElementById('sharingToken')?.value
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
		hasRichWorkspace(value) {
			this.localHasRichWorkspace = value
		},
	},
	mounted() {
		this.localHasRichWorkspace = this.hasRichWorkspace
		if (this.enabled && this.hasRichWorkspace) {
			this.getFileInfo()
		}
		subscribe('Text::showRichWorkspace', this.showRichWorkspace)
		subscribe('Text::hideRichWorkspace', this.hideRichWorkspace)
		subscribe('files:node:created', this.onFileCreated)
		subscribe('files:node:deleted', this.onFileDeleted)
		subscribe('files:node:renamed', this.onFileRenamed)

		this.listenKeydownEvents()

	},
	beforeDestroy() {
		unsubscribe('Text::showRichWorkspace', this.showRichWorkspace)
		unsubscribe('Text::hideRichWorkspace', this.hideRichWorkspace)
		unsubscribe('files:node:created', this.onFileCreated)
		unsubscribe('files:node:deleted', this.onFileDeleted)
		unsubscribe('files:node:renamed', this.onFileRenamed)

		this.unlistenKeydownEvents()
	},
	methods: {
		onFocus() {
			this.focus = true
			this.hideMenu = false
			this.unlistenKeydownEvents()
		},
		reset() {
			this.localHasRichWorkspace = false
			this.file = null
			this.focus = false
			this.$nextTick(() => {
				this.creating = false
				this.getFileInfo()
			})
		},
		getFileInfo(autofocus) {
			if (!this.enabled) {
				return
			}
			this.file = null
			this.ready = false
			this.loaded = true
			this.autofocus = false
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
					this.localHasRichWorkspace = true
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
			window.removeEventListener('keydown', this.onKeydown)
		},
		onKeydown(e) {
			if (e.key === 'Tab') {
				this.hideMenu = false
			}
		},
		onFileCreated(node) {
			if (SUPPORTED_STATIC_FILENAMES.includes(node.basename)) {
				this.localHasRichWorkspace = true
				this.getFileInfo(true)
			}
		},
		onFileDeleted(node) {
			if (node.path === this.file?.path) {
				this.localHasRichWorkspace = false
			}
		},
		onFileRenamed(node) {
			if (SUPPORTED_STATIC_FILENAMES.includes(node.basename)) {
				this.localHasRichWorkspace = true
			} else if (node.fileid === this.file?.id && node.path !== this.file?.path) {
				this.localHasRichWorkspace = false
			}
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
	}

	.rich-workspace--preview {
		margin-top: var(--default-clickable-area);

		&:deep(div[contenteditable='false']) {
			margin: 0;
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

	#rich-workspace:deep(.table-wrapper .content) {
		tr {
			th, td {
				flex-grow: 1;
			}

			th {
				div {
					width: 100%;
				}

				.action-item div {
					display: flex;
					justify-content: flex-end;
				}
			}
		}
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

	#rich-workspace:not(.focus):not(.empty):after {
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

	#rich-workspace.dark:not(.focus):after {
		background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--color-main-background));
	}

	@media only screen and (max-width: 1024px) {
		#rich-workspace:not(.focus) {
			max-height: 30vh;
		}
	}
</style>
