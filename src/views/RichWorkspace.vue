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
	<div id="rich-workspace" :class="{'icon-loading': !loaded || !ready }">
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
			:mime="file.mimetype"
			:autofocus="autofocus"
			@ready="ready=true" />
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'

const IS_PUBLIC = !!(document.getElementById('isPublic'))
const WORKSPACE_URL = generateOcsUrl('apps/text' + (IS_PUBLIC ? '/public' : ''), 2) + 'workspace'

export default {
	name: 'RichWorkspace',
	components: {
		EditorWrapper: () => import(/* webpackChunkName: "editor" */'./../components/EditorWrapper')
	},
	props: {
		path: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			file: null,
			loaded: false,
			ready: false,
			autofocus: false
		}
	},
	computed: {
		shareToken() {
			return document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null
		}
	},
	watch: {
		path: function() {
			this.getFileInfo()
		}
	},
	async mounted() {
		this.getFileInfo()
	},
	methods: {
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
				this.file = data.file
				this.editing = true
				this.loaded = true
			}).catch(() => {
				this.file = null
				this.loaded = true
				this.ready = true
			})
		},
		createNew() {
			if (this.creating) {
				return
			}
			this.creating = true
			window.FileList.createFile('README.md', { scrollTo: false, animate: false }).then((status, data) => {
				this.getFileInfo()
				this.autofocus = true
				this.creating = false
			})
		}
	}
}
</script>

<style scoped>
	#rich-workspace {
		padding: 0 60px;
		min-height: 90px;
		text-align: left;
	}

	.empty-workspace {
		margin-top: 54px;
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
	}

	#rich-workspace::v-deep #editor-wrapper .ProseMirror {
		padding: 0px;
		margin: 0;
	}

	#rich-workspace::v-deep .menubar .menubar-icons {
		margin-left: 0;
	}

	#rich-workspace::v-deep .editor__content {
		margin: 0;
	}
</style>
