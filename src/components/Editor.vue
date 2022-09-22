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
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div data-text-el="editor-container" class="text-editor" @keydown.esc.stop.prevent="() => {}">
		<DocumentStatus v-if="displayed"
			:idle="idle"
			:lock="lock"
			:sync-error="syncError"
			:has-connection-issue="hasConnectionIssue"
			@reconnect="reconnect" />
		<Wrapper v-if="displayed"
			:sync-error="syncError"
			:has-connection-issue="hasConnectionIssue"
			:content-loaded="contentLoaded"
			:show-author-annotations="showAuthorAnnotations">
			<MainContainer v-if="$editor">
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
				<ContentContainer v-show="contentLoaded"
					ref="contentWrapper">
					<MenuBubble v-if="renderMenus"
						:content-wrapper="contentWrapper"
						:file-path="relativePath" />
				</ContentContainer>
			</MainContainer>
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
import Vue, { set } from 'vue'
import escapeHtml from 'escape-html'
import moment from '@nextcloud/moment'
import { getVersion, receiveTransaction } from 'prosemirror-collab'
import { Step } from 'prosemirror-transform'
import { getCurrentUser } from '@nextcloud/auth'
import { loadState } from '@nextcloud/initial-state'

import {
	EDITOR,
	FILE,
	ATTACHMENT_RESOLVER,
	IS_MOBILE,
	IS_PUBLIC,
	IS_RICH_EDITOR,
	IS_RICH_WORKSPACE,
	SYNC_SERVICE,
} from './Editor.provider.js'

import { logger } from '../helpers/logger.js'
import { SyncService, ERROR_TYPE, IDLE_TIMEOUT } from './../services/SyncService.js'
import AttachmentResolver from './../services/AttachmentResolver.js'
import { extensionHighlight } from '../helpers/mappings.js'
import { createEditor, serializePlainText, loadSyntaxHighlight } from './../EditorFactory.js'
import { createMarkdownSerializer } from './../extensions/Markdown.js'
import markdownit from './../markdownit/index.js'
import markdownitFrontMatter from 'markdown-it-front-matter'

import { Collaboration, Keymap, UserColor } from './../extensions/index.js'
import DocumentStatus from './Editor/DocumentStatus.vue'
import isMobile from './../mixins/isMobile.js'
import store from './../mixins/store.js'
import MenuBar from './Menu/MenuBar.vue'
import ContentContainer from './Editor/ContentContainer.vue'
import Status from './Editor/Status.vue'
import MainContainer from './Editor/MainContainer.vue'
import Wrapper from './Editor/Wrapper.vue'

const EDITOR_PUSH_DEBOUNCE = 200

export default {
	name: 'Editor',
	components: {
		DocumentStatus,
		Wrapper,
		MainContainer,
		ContentContainer,
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
			[SYNC_SERVICE]: {
				get: () => this.$syncService,
			},
			[FILE]: {
				get: () => this.fileData,
			},
			[ATTACHMENT_RESOLVER]: {
				get: () => this.$attachmentResolver,
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
		initialSession: {
			type: Object,
			default: null,
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
			IDLE_TIMEOUT,

			document: null,
			sessions: [],
			currentSession: null,

			filteredSessions: {},

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
			return this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
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
			return this.currentSession && this.active
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
		if (!this.richWorkspace) {
			/* If the editor is shown in the viewer we need to hide the content,
			   if richt workspace is used we **must** not hide the content */
			window.addEventListener('beforeprint', this.preparePrinting)
			window.addEventListener('afterprint', this.preparePrinting)
		}
		this.$parent.$emit('update:loaded', true)
	},
	created() {
		this.$editor = null
		this.$syncService = null
		this.$attachmentResolver = null
		this.saveStatusPolling = setInterval(() => {
			this.updateLastSavedStatus()
		}, 2000)
	},
	beforeDestroy() {
		this.close()
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
			const guestName = localStorage.getItem('nick') ? localStorage.getItem('nick') : ''

			this.$syncService = new SyncService({
				guestName,
				shareToken: this.shareToken,
				filePath: this.relativePath,
				forceRecreate: this.forceRecreate,
				serialize: (document) => {
					if (this.isRichEditor) {
						return (createMarkdownSerializer(this.$editor.schema)).serialize(document)
					}
					return serializePlainText(this.$editor)

				},
			})

			this.listenSyncServiceEvents()

			this.$syncService.open({
				fileId: this.fileId,
				filePath: this.relativePath,
				initialSession: this.initialSession,
			}).catch((e) => {
				this.hasConnectionIssue = true
			})
			this.forceRecreate = false
		},

		listenEditorEvents() {
			this.$editor.on('focus', this.onFocus)
			this.$editor.on('blur', this.onBlur)
		},
		unlistenEditorEvents() {
			this.$editor.off('focus', this.onFocus)
			this.$editor.off('blur', this.onBlur)
		},

		listenSyncServiceEvents() {
			this.$syncService
				.on('opened', this.onOpened)
				.on('change', this.onChange)
				.on('loaded', this.onLoaded)
				.on('sync', this.onSync)
				.on('error', this.onError)
				.on('stateChange', this.onStateChange)
				.on('idle', this.onIdle)
				.on('save', this.onSave)
		},

		unlistenSyncServiceEvents() {
			this.$syncService
				.off('opened', this.onOpened)
				.off('change', this.onChange)
				.off('loaded', this.onLoaded)
				.off('sync', this.onSync)
				.off('error', this.onError)
				.off('stateChange', this.onStateChange)
				.off('idle', this.onIdle)
				.off('save', this.onSave)
		},

		resolveUseThisVersion() {
			this.$syncService.forceSave()
			this.$editor.setOptions({ editable: !this.readOnly })
		},

		resolveUseServerVersion() {
			this.forceRecreate = true
			this.reconnect()
		},

		reconnect() {
			this.contentLoaded = false
			this.hasConnectionIssue = false

			const connect = () => {
				this.unlistenSyncServiceEvents()
				this.unlistenEditorEvents()
				this.$syncService = null
				this.$editor.destroy()
				this.initSession()
			}

			if (this.$syncService) {
				this.$syncService
					.close()
					.then(connect)
					.catch((e) => {
					// Ignore issues closing the session since those might happen due to network issues
					})
			} else {
				connect()
			}

			this.idle = false
		},

		updateSessions(sessions) {
			this.sessions = sessions.sort((a, b) => b.lastContact - a.lastContact)

			// Make sure we get our own session updated
			// This should ideally be part of a global store where we can have that updated on the actual name change for guests
			const currentUpdatedSession = this.sessions.find(session => session.id === this.currentSession.id)
			set(this, 'currentSession', currentUpdatedSession)

			const currentSessionIds = this.sessions.map((session) => session.userId)
			const currentGuestIds = this.sessions.map((session) => session.guestId)

			const removedSessions = Object.keys(this.filteredSessions)
				.filter(sessionId => !currentSessionIds.includes(sessionId) && !currentGuestIds.includes(sessionId))

			for (const index in removedSessions) {
				Vue.delete(this.filteredSessions, removedSessions[index])
			}
			for (const index in this.sessions) {
				const session = this.sessions[index]
				const sessionKey = session.displayName ? session.userId : session.id
				if (this.filteredSessions[sessionKey]) {
					// update timestamp if relevant
					if (this.filteredSessions[sessionKey].lastContact < session.lastContact) {
						set(this.filteredSessions[sessionKey], 'lastContact', session.lastContact)
					}
				} else {
					set(this.filteredSessions, sessionKey, session)
				}
				if (session.id === this.currentSession.id) {
					set(this.filteredSessions[sessionKey], 'isCurrent', true)
				}
			}
		},

		onOpened({ document, session }) {
			this.currentSession = session
			this.document = document
			this.readOnly = document.readOnly
			this.lock = this.$syncService.lock
			localStorage.setItem('nick', this.currentSession.guestName)
			this.$store.dispatch('setCurrentSession', this.currentSession)
			this.$attachmentResolver = new AttachmentResolver({
				session: this.currentSession,
				user: getCurrentUser(),
				shareToken: this.shareToken,
				currentDirectory: this.currentDirectory,
			})
		},

		onLoaded({ documentSource }) {
			let frontMatter = ''
			const rendered = !this.isRichEditor
				? `<pre>${escapeHtml(documentSource)}</pre>`
				: markdownit.use(markdownitFrontMatter, (fm) => {
					frontMatter = `<pre id="frontmatter"><code>${escapeHtml(fm)}</code></pre>`
				}).render(documentSource)

			this.hasConnectionIssue = false
			const content = frontMatter + rendered
			const language = extensionHighlight[this.fileExtension] || this.fileExtension;

			(this.isRichEditor ? Promise.resolve() : loadSyntaxHighlight(language))
				.then(() => {
					this.$editor = createEditor({
						session: this.currentSession,
						content,
						onCreate: ({ editor }) => {
							this.$syncService.state = editor.state
							this.$syncService.startSync()
						},
						onUpdate: ({ editor }) => {
							this.$syncService.state = editor.state
						},
						extensions: [
							Collaboration.configure({
								// the initial version we start with
								// version is an integer which is incremented with every change
								version: this.document.initialVersion,
								clientID: this.currentSession.id,
								// debounce changes so we can save some bandwidth
								debounce: EDITOR_PUSH_DEBOUNCE,
								onSendable: ({ sendable }) => {
									if (this.$syncService) {
										this.$syncService.sendSteps()
									}
								},
								update: ({ steps, version, editor }) => {
									const { state, view, schema } = editor
									if (getVersion(state) > version) {
										return
									}
									const tr = receiveTransaction(
										state,
										steps.map(item => Step.fromJSON(schema, item.step)),
										steps.map(item => item.clientID),
									)
									tr.setMeta('clientID', steps.map(item => item.clientID))
									view.dispatch(tr)
								},
							}),
							Keymap.configure({
								'Mod-s': () => {
									this.$syncService.save()
									return true
								},
							}),
							UserColor.configure({
								clientID: this.currentSession.id,
								color: (clientID) => {
									const session = this.sessions.find(item => '' + item.id === '' + clientID)
									return session?.color
								},
								name: (clientID) => {
									const session = this.sessions.find(item => '' + item.id === '' + clientID)
									return session?.userId ? session.displayName : (session?.guestName ? session.guestName : t('text', 'Guest'))
								},
							}),
						],
						enableRichEditing: this.isRichEditor,
					})

					this.listenEditorEvents()

					this.$syncService.state = this.$editor.state
				})

		},

		onChange({ document, sessions }) {
			if (this.document.baseVersionEtag !== '' && document.baseVersionEtag !== this.document.baseVersionEtag) {
				this.resolveUseServerVersion()
				return
			}
			this.updateSessions.bind(this)(sessions)
			this.document = document

			this.syncError = null
			this.$editor.setOptions({ editable: !this.readOnly })
		},

		onSync({ steps, document }) {
			this.hasConnectionIssue = false
			try {
				const collaboration = this.$editor.extensionManager.extensions.find(e => e.name === 'collaboration')
				collaboration.options.update({
					version: document.currentVersion,
					steps,
					editor: this.$editor,
				})
				this.$syncService.state = this.$editor.state
				this.updateLastSavedStatus()
				this.$nextTick(() => {
					this.$emit('sync-service:sync')
				})
			} catch (error) {
				logger.error('Failed to update steps in collaboration plugin', { error })
				// TODO: we should recreate the editing session when this happens
			}
			this.document = document
		},

		onError({ type, data }) {
			this.$editor.setOptions({ editable: false })

			this.$nextTick(() => {
				this.$emit('sync-service:error')
			})

			if (type === ERROR_TYPE.SAVE_COLLISSION && (!this.syncError || this.syncError.type !== ERROR_TYPE.SAVE_COLLISSION)) {
				this.contentLoaded = true
				this.syncError = {
					type,
					data,
				}
			}
			if (type === ERROR_TYPE.CONNECTION_FAILED && !this.hasConnectionIssue) {
				this.hasConnectionIssue = true
				// FIXME: ideally we just try to reconnect in the service, so we don't loose steps
				OC.Notification.showTemporary('Connection failed, reconnecting')
				if (data.retry !== false) {
					setTimeout(this.reconnect.bind(this), 5000)
				}
			}
			if (type === ERROR_TYPE.SOURCE_NOT_FOUND) {
				this.hasConnectionIssue = true
			}
			this.$emit('ready')
		},

		onStateChange(state) {
			if (state.initialLoading && !this.contentLoaded) {
				this.contentLoaded = true
				if (this.autofocus && !this.readOnly) {
					this.$nextTick(() => {
						this.$editor.commands.focus()
					})
				}
				this.$emit('ready')
				// TODO: remove $parent access
				this.$parent.$emit('ready', true)
			}
			if (Object.prototype.hasOwnProperty.call(state, 'dirty')) {
				this.dirty = state.dirty
			}
		},

		onIdle() {
			this.$syncService.close()
			this.idle = true
			this.readOnly = true
			this.$editor.setOptions({ editable: !this.readOnly })

			this.$nextTick(() => {
				this.$emit('sync-service:idle')
			})
		},

		onSave() {
			this.$nextTick(() => {
				this.$emit('sync-service:save')
			})
		},
		onFocus() {
			this.$emit('focus')
		},
		onBlur() {
			this.$emit('blur')
		},

		async close() {
			clearInterval(this.saveStatusPolling)
			window.removeEventListener('beforeprint', this.preparePrinting)
			window.removeEventListener('afterprint', this.preparePrinting)

			if (this.currentSession && this.$syncService) {
				try {
					await this.$syncService.close()
					this.unlistenSyncServiceEvents()
					this.currentSession = null
					this.$syncService = null
				} catch (e) {
					// Ignore issues closing the session since those might happen due to network issues
				}
			}
			if (this.$editor) {
				try {
					this.unlistenEditorEvents()
					this.$editor.destroy()
					this.$editor = null
				} catch (error) {
					logger.warn('Failed to destroy editor', { error })
				}
			}
			return true
		},

		/** @param {Event} event The passed event */
		preparePrinting(event) {
			const content = document.getElementById('content')
			// Hide Content behind modal, this also hides the sidebar if open
			if (content && event.type === 'beforeprint') {
				content.style.display = 'none'
			} else if (content) {
				content.style.display = ''
			}
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
	@import './../../css/print';

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
