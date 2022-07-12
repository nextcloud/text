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
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div id="editor-container" data-text-el="editor-container" class="text-editor">
		<DocumentStatus v-if="displayed"
			:idle="idle"
			:sync-error="syncError"
			:has-connection-issue="hasConnectionIssue"
			@reconnect="reconnect" />
		<Wrapper v-if="displayed"
			:sync-error="syncError"
			:has-connection-issue="hasConnectionIssue"
			:content-loaded="contentLoaded"
			:show-author-annotations="showAuthorAnnotations">
			<Main v-if="$editor">
				<MenuBar v-if="renderMenus"
					ref="menubar"
					:autohide="autohide"
					:loaded.sync="menubarLoaded">
					<Status :document="document"
						:dirty="dirty"
						:sessions="filteredSessions"
						:sync-error="syncError"
						:has-connection-issue="hasConnectionIssue"
						:last-saved-string="lastSavedString" />
					<slot name="header" />
				</MenuBar>
				<div v-if="!menubarLoaded" class="menubar-placeholder" />
				<Content v-show="contentLoaded"
					ref="contentWrapper">
					<MenuBubble v-if="renderMenus"
						:content-wrapper="contentWrapper"
						:file-path="relativePath" />
				</Content>
			</Main>
			<Reader v-if="hasSyncCollission"
				:content="syncError.data.outsideChange"
				:is-rich-editor="isRichEditor" />
		</Wrapper>

		<CollisionResolveDialog v-if="hasSyncCollission && !readOnly"
			@resolve-use-this-version="resolveUseThisVersion"
			@resolve-use-server-version="resolveUseServerVersion" />
	</div>
</template>

<script>
import moment from '@nextcloud/moment'
import { getCurrentUser } from '@nextcloud/auth'

import {
	EDITOR,
	FILE,
	IMAGE_RESOLVER,
	IS_MOBILE,
	IS_PUBLIC,
	IS_RICH_EDITOR,
	IS_RICH_WORKSPACE,
} from './Editor.provider.js'

import ImageResolver from './../services/ImageResolver.js'
import { createEditor } from './../EditorFactory.js'

import DocumentStatus from './Editor/DocumentStatus.vue'
import isMobile from './../mixins/isMobile.js'
import store from './../mixins/store.js'
import MenuBar from './Menu/MenuBar.vue'
import Content from './Editor/Content.vue'
import Status from './Editor/Status.vue'
import Main from './Editor/Main.vue'
import Wrapper from './Editor/Wrapper.vue'

export default {
	name: 'Editor',
	components: {
		DocumentStatus,
		Wrapper,
		Main,
		Content,
		MenuBar,
		MenuBubble: () => import(/* webpackChunkName: "editor-rich" */'./MenuBubble.vue'),
		Reader: () => import(/* webpackChunkName: "editor" */'./Reader.vue'),
		Status,
		CollisionResolveDialog: () => import(/* webpackChunkName: "editor" */'./CollisionResolveDialog.vue'),
	},
	mixins: [
		isMobile,
		store,
	],
	provide() {
		const val = {}

		// providers aren't naturally reactive
		// and $editor will start as null
		// using getters we can always provide the
		// actual $editor, and other values without being reactive
		Object.defineProperties(val, {
			[EDITOR]: {
				get: () => this.$editor,
			},
			[FILE]: {
				get: () => this.fileData,
			},
			[IMAGE_RESOLVER]: {
				get: () => this.$imageResolver,
			},
			[IS_PUBLIC]: {
				get: () => this.isPublic,
			},
			[IS_RICH_EDITOR]: {
				get: () => this.isRichEditor,
			},
			[IS_RICH_WORKSPACE]: {
				get: () => this.isRichWorkspace,
			},
			[IS_MOBILE]: {
				get: () => this.isMobile,
			},
		})

		return val
	},
	props: {
		richWorkspace: {
			type: Boolean,
			require: false,
			default: false,
		},
		relativePath: {
			type: String,
			default: '',
		},
		fileId: {
			type: Number,
			default: null,
		},
		active: {
			type: Boolean,
			default: false,
		},
		autofocus: {
			type: Boolean,
			default: true,
		},
		shareToken: {
			type: String,
			default: null,
		},
		mime: {
			type: String,
			default: null,
		},
		autohide: {
			type: Boolean,
			default: false,
		},
		isDirectEditing: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			document: null,
			idle: false,
			dirty: false,
			contentLoaded: false,
			lastSavedString: '',
			syncError: null,
			hasConnectionIssue: false,
			readOnly: true,
			forceRecreate: false,
			menubarLoaded: false,
			draggedOver: false,

			saveStatusPolling: null,
			contentWrapper: null,
		}
	},
	computed: {
		isRichWorkspace() {
			return this.richWorkspace
		},
		showAuthorAnnotations() {
			return this.$store.state.showAuthorAnnotations
		},

		hasSyncCollission() {
			return false // this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
		},
		hasDocumentParameters() {
			return this.fileId || this.shareToken || this.initialSession
		},
		isPublic() {
			return this.isDirectEditing || (document.getElementById('isPublic') && document.getElementById('isPublic').value === '1')
		},
		isRichEditor() {
			return loadState('text', 'rich_editing_enabled', true) && this.mime === 'text/markdown'
		},
		fileExtension() {
			return this.relativePath ? this.relativePath.split('/').pop().split('.').pop() : 'txt'
		},
		currentDirectory() {
			return this.relativePath
				? this.relativePath.split('/').slice(0, -1).join('/')
				: '/'
		},
		displayed() {
			return this.active
		},
		renderMenus() {
			return this.contentLoaded
				&& this.isRichEditor
				&& !this.syncError
				&& !this.readOnly
		},
		imagePath() {
			return this.relativePath.split('/').slice(0, -1).join('/')
		},
		fileData() {
			return {
				fileId: this.fileId,
				relativePath: this.relativePath,
				document: {
					...this.document,
				},
			}
		},
	},
	watch: {
		displayed() {
			this.$nextTick(() => {
				this.contentWrapper = this.$refs.contentWrapper
			})
		},
	},
	mounted() {
		if (this.active && (this.hasDocumentParameters)) {
			this.initSession()
		}
		this.$parent.$emit('update:loaded', true)
	},
	created() {
		this.$editor = null
		this.$imageResolver = new ImageResolver({
			user: getCurrentUser(),
			shareToken: this.shareToken,
			currentDirectory: this.currentDirectory,
		})
		this.saveStatusPolling = setInterval(() => {
			this.updateLastSavedStatus()
		}, 2000)
	},
	beforeDestroy() {
		// TODO: do we need a replacement?
		// this.close()
	},
	methods: {
		updateLastSavedStatus() {
			if (this.document) {
				this.lastSavedString = moment(this.document.lastSavedVersionTime * 1000).fromNow()
			}
		},

		initSession() {
			if (!this.hasDocumentParameters) {
				this.$parent.$emit('error', 'No valid file provided')
				return
			}
			// const guestName = localStorage.getItem('nick') ? localStorage.getItem('nick') : ''
			this.$editor = createEditor({
				content: '',
				onCreate: ({ editor }) => console.debug(editor),
				onUpdate: ({ editor }) => editor,
				extensions: [],
				enableRichEditing: this.isRichEditor,
			})
			this.$editor.on('focus', () => {
				this.$emit('focus')
			})
			this.$editor.on('blur', () => {
				this.$emit('blur')
			})
			this.forceRecreate = false
			// TODO: used to be set based on the session... what do we do now?
			this.lock = null
			this.contentLoaded = true
			this.readOnly = false
			this.$emit('ready')
		},

		resolveUseThisVersion() {
			// TODO: implement with yjs
			this.$editor.setOptions({ editable: !this.readOnly })
		},

		resolveUseServerVersion() {
			// TODO: implement with yjs
		},

		reconnect() {
			this.contentLoaded = false
			this.hasConnectionIssue = false
			this.$editor.destroy()
			this.initSession()
			this.idle = false
		},

	},
}
</script>

<style scoped lang="scss">
	.modal-container .text-editor {
		top: 0;
		height: calc(100vh - var(--header-height));
	}

	.text-editor {
		display: block;
		width: 100%;
		max-width: 100%;
		height: 100%;
		left: 0;
		margin: 0 auto;
		position: relative;
		background-color: var(--color-main-background);
	}

	.text-editor .text-editor__wrapper.has-conflicts {
		height: calc(100% - 50px);

		.text-editor__main, #read-only-editor {
			width: 50%;
			height: 100%;
		}
	}

	#body-public {
		height: auto;
	}

	#files-public-content {
		.text-editor {
			top: 0;
			width: 100%;

			.text-editor__main {
				overflow: auto;
				z-index: 20;
			}
			.has-conflicts .text-editor__main {
				padding-top: 0;
			}
		}
	}

	.menubar-placeholder {
		position: fixed;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		opacity: 0;
		visibility: hidden;
		height: 44px; // important for mobile so that the buttons are always inside the container
		padding-top:3px;
		padding-bottom: 3px;
	}

</style>

<style lang="scss">
	@import './../../css/style';

	.text-editor__wrapper {
		@import './../../css/prosemirror';

		&:not(.is-rich-editor) .ProseMirror {
			pre {
				background-color: var(--color-main-background);

				&::before {
					content: attr(data-language);
					text-transform: uppercase;
					display: block;
					text-align: right;
					font-weight: bold;
					font-size: 0.6rem;
				}
				code {
					.hljs-comment,
					.hljs-quote {
						color: #999999;
					}
					.hljs-variable,
					.hljs-template-variable,
					.hljs-attribute,
					.hljs-tag,
					.hljs-name,
					.hljs-regexp,
					.hljs-link,
					.hljs-selector-id,
					.hljs-selector-class {
						color: #f2777a;
					}
					.hljs-number,
					.hljs-meta,
					.hljs-built_in,
					.hljs-builtin-name,
					.hljs-literal,
					.hljs-type,
					.hljs-params {
						color: #f99157;
					}
					.hljs-string,
					.hljs-symbol,
					.hljs-bullet {
						color: #99cc99;
					}
					.hljs-title,
					.hljs-section {
						color: #ffcc66;
					}
					.hljs-keyword,
					.hljs-selector-tag {
						color: #6699cc;
					}
					.hljs-emphasis {
						font-style: italic;
					}
					.hljs-strong {
						font-weight: 700;
					}
				}
			}
		}

		// relative position for the alignment of the menububble
		.text-editor__main {
			&.draggedOver {
				background-color: var(--color-primary-light);
			}
			.text-editor__content-wrapper {
				position: relative;
			}
		}
	}

	// Required in order to make the public pages behave the same if talk is enabled or not
	// as Talk overwrites the public page styles and changes the DOM layout for the sidebar injection
	#files-public-content {
		height: 100%;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

</style>
