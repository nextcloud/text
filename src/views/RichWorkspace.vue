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
	<div v-if="enabled" id="rich-workspace" :class="{'icon-loading': !loaded || !ready, 'focus': focus, 'dark': darkTheme, 'creatable': canCreate}">
		<div v-if="showEmptyWorkspace" class="empty-workspace" @click="createNew">
			<p class="placeholder">
				{{ t('text', 'Add notes, lists or links …') }}
			</p>
		</div>

		<EditorWrapper v-if="file"
			v-show="ready"
			:key="file.path"
			:file-id="file.id"
			:relative-path="filepath"
			:share-token="shareToken"
			:active="true"
			:autohide="true"
			:mime="file.mimetype"
			:autofocus="autofocus"
			@ready="ready=true; loaded=true"
			@focus="focus=true"
			@blur="unfocus"
			@error="reset" />
	</div>
</template>

<script>
import { subscribe } from '@nextcloud/event-bus'

export default {
	name: 'RichWorkspace',
	components: {
		EditorWrapper: () => import(/* webpackChunkName: "editor" */'./../components/EditorWrapper'),
	},
	props: {
		file: {
			type: Object,
			default: null,
		},
		folder: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			focus: false,
			loaded: false,
			ready: false,
			autofocus: false,
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
		showEmptyWorkspace() {
			return (!this.file || (this.autofocus && !this.ready)) && this.canCreate
		},
		filepath() {
			const { path, name } = this.file
			return path + (path.endsWith('/') ? '' : '/') + name
		},
	},
	watch: {
		focus(newValue) {
			if (!newValue) {
				document.querySelector('#editor').scrollTo(0, 0)
			}
		},
	},
	async mounted() {
		subscribe('Text::showRichWorkspace', () => {
			this.enabled = true
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
			this.focus = false
			this.$nextTick(() => {
				this.creating = false
			})
		},
		createNew() {
			if (this.creating) {
				return
			}
			this.creating = true
			this.autofocus = true
			if (!this.file) {
				window.FileList.createFile('Readme.md', { scrollTo: false, animate: false })
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
		&.creatable {
			min-height: 90px;
		}
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
		top: auto !important;
	}

	#rich-workspace::v-deep #editor-wrapper {
		position: unset !important;
		overflow: visible;
	}

	#rich-workspace::v-deep #editor {
		overflow: visible !important;
	}

	#rich-workspace::v-deep .content-wrapper {
		overflow: scroll !important;
		max-height: calc(40vh - 50px);
		padding-left: 10px;
		padding-bottom: 60px; /* ensure menububble fits below */
	}

	#rich-workspace::v-deep #editor-wrapper .ProseMirror {
		padding: 0px;
		margin: 0;
	}

	#rich-workspace::v-deep .menubar {
		z-index: 61;
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

	html.ie {
		#rich-workspace::v-deep {
			#editor-container {
				position: initial;
			}

			#editor-wrapper {
				position: relative !important;
				top: auto !important;
			}

			#editor {
				display: flex;
				flex-direction: column;
				overflow: hidden !important;
			}

			.menubar {
				position: relative;
				overflow: hidden;
				flex-shrink: 0;
				height: 44px;
				top: auto;
			}

			#editor > div:nth-child(2) {
				min-height: 44px;
				overflow-x: hidden;
				overflow-y: auto;
				flex-shrink: 1;
			}
		}
	}

</style>
