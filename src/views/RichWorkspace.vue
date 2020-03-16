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
	<div v-if="enabled" id="rich-workspace" :class="{'icon-loading': !loaded || !ready, 'focus': focus, 'dark': darkTheme }">
		<div v-if="!file || (autofocus && !ready)" class="empty-workspace" @click="createNew">
			<p class="placeholder">
				{{ t('text', 'Add notes, lists or links …') }}
			</p>
		</div>

		<EditorWrapper v-if="file"
			v-show="ready"
			:key="file.id"
			:file-id="file.id"
			:relative-path="file.path"
			:share-token="shareToken"
			:active="true"
			:autohide="true"
			:mime="file.mimetype"
			:autofocus="autofocus"
			@ready="ready=true"
			@focus="focus=true"
			@blur="unfocus"
			@error="reset" />
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { subscribe } from '@nextcloud/event-bus'

const IS_PUBLIC = !!(document.getElementById('isPublic'))
const WORKSPACE_URL = generateOcsUrl('apps/text' + (IS_PUBLIC ? '/public' : ''), 2) + 'workspace'

export default {
	name: 'RichWorkspace',
	components: {
		EditorWrapper: () => import(/* webpackChunkName: "editor" */'./../components/EditorWrapper'),
	},
	props: {
		path: {
			type: String,
			required: true,
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
			darkTheme: OCA.Accessibility && OCA.Accessibility.theme === 'dark',
			enabled: OCA.Text.RichWorkspaceEnabled,
		}
	},
	computed: {
		shareToken() {
			return document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null
		},
	},
	watch: {
		path: function() {
			this.getFileInfo()
		},
		focus: function(newValue) {
			if (!newValue) {
				document.querySelector('#editor').scrollTo(0, 0)
			}
		},
	},
	async mounted() {
		if (this.enabled) {
			this.getFileInfo()
		}
		subscribe('Text::showRichWorkspace', () => {
			this.enabled = true
			this.getFileInfo()
		})
		subscribe('Text::hideRichWorkspace', () => {
			this.enabled = false
		})
	},
	methods: {
		unfocus() {
			// setTimeout(() => this.focus = false, 2000)
		},
		reset() {
			this.file = null
			this.focus = false
			this.$nextTick(() => {
				this.creating = false
				this.getFileInfo()
			})
		},
		getFileInfo() {
			this.loaded = false
			this.autofocus = false
			this.ready = false
			const params = { path: this.path }
			if (IS_PUBLIC) {
				params.shareToken = this.shareToken
			}
			axios.get(WORKSPACE_URL, { params }).then((response) => {
				const data = response.data.ocs.data
				this.folder = data.folder || null
				this.file = data.file
				this.editing = true
				this.loaded = true
			}).catch((error) => {
				const data = error.response.data.ocs.data
				this.folder = data.folder || null
				this.file = null
				this.loaded = true
				this.ready = true
				this.creating = false
			})
		},
		createNew() {
			if (this.creating) {
				return
			}
			this.creating = true
			window.FileList.createFile('Readme.md', { scrollTo: false, animate: false }).then((status, data) => {
				this.getFileInfo()
				this.autofocus = true
			})
		},
	},
}
</script>

<style scoped>
	#rich-workspace {
		padding: 0 60px;
		min-height: 90px;
		/* Slightly reduce vertical space */
		margin-bottom: -24px;
		text-align: left;
		max-height: 0;
		transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
	}

	/* For subfolders, where there are no Recommendations */
	#rich-workspace:only-child {
		margin-bottom: 0;
	}

	.empty-workspace {
		padding-top: 43px;
		color: var(--color-text-maxcontrast);
		height: 0;
	}

	#rich-workspace::v-deep div[contenteditable=false] {
		width: 100%;
		padding: 0px;
		background-color: var(--color-main-background);
		opacity: 1;
		border: none;
	}

	#rich-workspace::v-deep #editor-container {
		height: 100%;
		position: unset !important;
	}

	#rich-workspace::v-deep #editor-wrapper {
		position: unset !important;
		overflow: visible;
	}

	#rich-workspace::v-deep #editor {
		overflow: scroll !important;
		max-height: 50vh;
	}

	#rich-workspace::v-deep #editor-wrapper .ProseMirror {
		padding: 0px;
		margin: 0;
	}

	#rich-workspace::v-deep .menubar {
		z-index: 50;
		/* Slightly reduce vertical space */
		margin-bottom: -10px;
	}

	#rich-workspace::v-deep .menubar .menubar-icons {
		margin-left: 0;
	}

	#rich-workspace::v-deep .editor__content {
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

	#rich-workspace:not(.focus):not(.icon-loading):after {
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
