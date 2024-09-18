<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div id="editor-container"
		ref="el"
		data-text-el="editor-container"
		class="text-editor"
		tabindex="-1"
		@keydown.stop="onKeyDown">
		<DocumentStatus v-if="displayedStatus"
			:idle="idle"
			:lock="lock"
			:is-resolving-conflict="isResolvingConflict"
			:sync-error="syncError"
			:has-connection-issue="hasConnectionIssue"
			@reconnect="reconnect" />

		<SkeletonLoading v-if="showLoadingSkeleton" />
		<Wrapper v-if="displayed"
			:is-resolving-conflict="isResolvingConflict"
			:has-connection-issue="hasConnectionIssue"
			:content-loaded="contentLoaded"
			:show-outline-outside="showOutlineOutside"
			@outline-toggled="outlineToggled">
			<MainContainer v-if="hasEditor">
				<!-- Readonly -->
				<div v-if="readOnly" class="text-editor--readonly-bar">
					<slot name="readonlyBar">
						<ReadonlyBar>
							<Status :document="document"
								:dirty="dirty"
								:sessions="filteredSessions"
								:sync-error="syncError"
								:has-connection-issue="hasConnectionIssue" />
						</ReadonlyBar>
					</slot>
				</div>
				<!-- Rich Menu -->
				<template v-else>
					<MenuBar v-if="renderMenus"
						ref="menubar"
						:is-hidden="hideMenu"
						:loaded.sync="menubarLoaded">
						<Status :document="document"
							:dirty="dirty"
							:sessions="filteredSessions"
							:sync-error="syncError"
							:has-connection-issue="hasConnectionIssue" />
						<slot name="header" />
					</MenuBar>
					<div v-else class="menubar-placeholder" />
				</template>
				<ContentContainer v-show="contentLoaded"
					ref="contentWrapper" />
			</MainContainer>
			<Reader v-if="isResolvingConflict"
				:content="syncError.data.outsideChange"
				:is-rich-editor="isRichEditor" />
		</Wrapper>
		<Assistant v-if="hasEditor" />
		<Translate :show="translateModal"
			:content="translateContent"
			@insert-content="translateInsert"
			@replace-content="translateReplace"
			@close="hideTranslate" />
	</div>
</template>

<script>
import Vue, { ref, set, watch } from 'vue'
import { getCurrentUser } from '@nextcloud/auth'
import { loadState } from '@nextcloud/initial-state'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import { File } from '@nextcloud/files'
import { Collaboration } from '@tiptap/extension-collaboration'
import Autofocus from '../extensions/Autofocus.js'
import { Doc } from 'yjs'
import { useElementSize } from '@vueuse/core'

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
import ReadonlyBar from './Menu/ReadonlyBar.vue'

import { logger } from '../helpers/logger.js'
import { getDocumentState } from '../helpers/yjs.js'
import { SyncService, ERROR_TYPE, IDLE_TIMEOUT } from './../services/SyncService.js'
import SessionApi from '../services/SessionApi.js'
import createSyncServiceProvider from './../services/SyncServiceProvider.js'
import AttachmentResolver from './../services/AttachmentResolver.js'
import { extensionHighlight } from '../helpers/mappings.js'
import { createEditor, serializePlainText, loadSyntaxHighlight } from './../EditorFactory.js'
import { createMarkdownSerializer } from './../extensions/Markdown.js'
import markdownit from './../markdownit/index.js'
import { exposeForDebugging, removeFromDebugging } from '../helpers/debug.js'
import { CollaborationCursor } from '../extensions/index.js'
import DocumentStatus from './Editor/DocumentStatus.vue'
import isMobile from './../mixins/isMobile.js'
import setContent from './../mixins/setContent.js'
import MenuBar from './Menu/MenuBar.vue'
import ContentContainer from './Editor/ContentContainer.vue'
import Status from './Editor/Status.vue'
import MainContainer from './Editor/MainContainer.vue'
import Wrapper from './Editor/Wrapper.vue'
import SkeletonLoading from './SkeletonLoading.vue'
import Assistant from './Assistant.vue'
import Translate from './Modal/Translate.vue'
import { generateRemoteUrl } from '@nextcloud/router'
import { fetchNode } from '../services/WebdavClient.ts'

export default {
	name: 'Editor',
	components: {
		SkeletonLoading,
		DocumentStatus,
		Wrapper,
		MainContainer,
		ReadonlyBar,
		ContentContainer,
		MenuBar,
		Reader: () => import(/* webpackChunkName: "editor" */'./Reader.vue'),
		Status,
		Assistant,
		Translate,
	},
	mixins: [
		isMobile,
		setContent,
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
	inject: {
		isEmbedded: { default: false },
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
		hideMenu: {
			type: Boolean,
			default: false,
		},
		isDirectEditing: {
			type: Boolean,
			default: false,
		},
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
	},

	setup() {
		const el = ref(null)
		const { width } = useElementSize(el)
		watch(width, value => {
			const maxWidth = Math.floor(value) - 36
			el.value.style.setProperty('--widget-full-width', `${maxWidth}px`)
		})
		return { el, width }
	},

	data() {
		return {
			IDLE_TIMEOUT,

			document: null,
			sessions: [],
			currentSession: null,
			fileNode: null,

			filteredSessions: {},

			idle: false,
			dirty: false,
			contentLoaded: false,
			syncError: null,
			hasConnectionIssue: false,
			hasEditor: false,
			readOnly: true,
			forceRecreate: false,
			menubarLoaded: false,
			draggedOver: false,

			contentWrapper: null,
			translateModal: false,
			translateContent: '',
		}
	},
	computed: {
		isRichWorkspace() {
			return this.richWorkspace
		},
		isResolvingConflict() {
			return this.hasSyncCollission && !this.readOnly
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
		displayedStatus() {
			return this.displayed || !!this.syncError
		},
		showLoadingSkeleton() {
			return (!this.contentLoaded || !this.displayed) && !this.syncError
		},
		renderRichEditorMenus() {
			return this.contentLoaded
				&& this.isRichEditor
				&& !this.syncError
				&& !this.readOnly
		},
		renderMenus() {
			return this.contentLoaded
				&& !this.syncError
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
		subscribe('text:image-node:add', this.onAddImageNode)
		subscribe('text:image-node:delete', this.onDeleteImageNode)
		this.emit('update:loaded', true)
		subscribe('text:translate-modal:show', this.showTranslateModal)
		exposeForDebugging(this)
	},
	created() {
		this.$ydoc = new Doc()
		// The following can be useful for debugging ydoc updates
		// this.$ydoc.on('update', function(update, origin, doc, tr) {
		//   console.debug('ydoc update', update, origin, doc, tr)
		//   Y.logUpdate(update)
		// });
		this.$providers = []
		this.$editor = null
		this.$api = null
		this.$syncService = null
		this.$attachmentResolver = null
	},
	async beforeDestroy() {
		if (!this.richWorkspace) {
			window.removeEventListener('beforeprint', this.preparePrinting)
			window.removeEventListener('afterprint', this.preparePrinting)
		}
		unsubscribe('text:image-node:add', this.onAddImageNode)
		unsubscribe('text:image-node:delete', this.onDeleteImageNode)
		unsubscribe('text:translate-modal:show', this.showTranslateModal)
		if (this.dirty) {
			const timeout = new Promise((resolve) => setTimeout(resolve, 2000))
			await Promise.any([timeout, this.$syncService.save()])
		}
		await this.close()
		removeFromDebugging(this)
	},
	methods: {
		initSession() {
			if (!this.hasDocumentParameters) {
				this.emit('error', 'No valid file provided')
				return
			}
			const guestName = localStorage.getItem('nick') ? localStorage.getItem('nick') : ''

			this.$api = new SessionApi({
				guestName,
				shareToken: this.shareToken,
				filePath: this.relativePath,
				forceRecreate: this.forceRecreate,
			})

			this.$syncService = new SyncService({
				baseVersionEtag: this.$baseVersionEtag,
				serialize: this.isRichEditor
					? (content) => createMarkdownSerializer(this.$editor.schema).serialize(content ?? this.$editor.state.doc)
					: (content) => serializePlainText(content ?? this.$editor.state.doc),
				getDocumentState: () => getDocumentState(this.$ydoc),
				api: this.$api,
			})

			this.listenSyncServiceEvents()

			const syncServiceProvider = createSyncServiceProvider({
				ydoc: this.$ydoc,
				syncService: this.$syncService,
				fileId: this.fileId,
				initialSession: this.initialSession,
				disableBC: true,
			})
			this.$providers.push(syncServiceProvider)
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

		reconnect() {
			this.contentLoaded = false
			this.hasConnectionIssue = false
			this.disconnect().then(this.initSession)
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
			if (this.$editor) {
				this.$editor.setEditable(!this.readOnly)
			}
			this.lock = this.$syncService.lock
			localStorage.setItem('nick', this.currentSession.guestName)
			this.$attachmentResolver = new AttachmentResolver({
				session: this.currentSession,
				user: getCurrentUser(),
				shareToken: this.shareToken,
				currentDirectory: this.currentDirectory,
			})
			if (this.currentSession?.userId && this.relativePath?.length) {
				const node = new File({
					id: this.fileId,
					source: generateRemoteUrl(`dav/files/${this.currentSession.userId}${this.relativePath}`),
					mime: this.mime,
				})
				fetchNode(node)
					.then((n) => { this.fileNode = n })
					.catch(err => logger.warn('Failed to fetch node', { err }))
			}
		},

		onLoaded({ document, documentSource, documentState }) {
			if (!documentState) {
				this.setInitialYjsState(documentSource, { isRichEditor: this.isRichEditor })
			}

			this.$baseVersionEtag = document.baseVersionEtag
			this.hasConnectionIssue = false
			const language = extensionHighlight[this.fileExtension] || this.fileExtension;

			(this.isRichEditor ? Promise.resolve() : loadSyntaxHighlight(language))
				.then(() => {
					const session = this.currentSession
					if (!this.$editor) {
						this.$editor = createEditor({
							language,
							relativePath: this.relativePath,
							session,
							onCreate: ({ editor }) => {
								this.$syncService.startSync()
								const proseMirrorMarkdown = this.$syncService.serialize(editor.state.doc)
								this.emit('create:content', {
									markdown: proseMirrorMarkdown,
								})
							},
							onUpdate: ({ editor }) => {
								// this.debugContent(editor)
								const proseMirrorMarkdown = this.$syncService.serialize(editor.state.doc)
								this.emit('update:content', {
									markdown: proseMirrorMarkdown,
								})
							},
							extensions: [
								Autofocus.configure({
									fileId: this.fileId,
								}),
								Collaboration.configure({
									document: this.$ydoc,
								}),
								CollaborationCursor.configure({
									provider: this.$providers[0],
									user: {
										name: session?.userId
											? session.displayName
											: (session?.guestName || t('text', 'Guest')),
										color: session?.color,
										clientId: this.$ydoc.clientID,
									},
								}),
							],
							enableRichEditing: this.isRichEditor,
							isEmbedded: this.isEmbedded,
						})
						this.hasEditor = true
						this.listenEditorEvents()
					} else {
						// $editor already existed. So this is a reconnect.
						this.$syncService.startSync()
					}

				})

		},

		onChange({ document, sessions }) {
			this.updateSessions.bind(this)(sessions)
			this.document = document

			this.syncError = null
			const editable = !this.readOnly && !this.hasConnectionIssue
			if (this.$editor.isEditable !== editable) {
				this.$editor.setEditable(editable)
			}
		},

		onSync({ steps, document }) {
			this.hasConnectionIssue = this.$syncService.backend.fetcher === 0 || !this.$providers[0].wsconnected || this.$syncService.pushError > 0
			this.$nextTick(() => {
				this.emit('sync-service:sync')
			})
			if (document) {
				this.document = document
			}
		},

		onError({ type, data }) {
			this.$nextTick(() => {
				this.$editor?.setEditable(false)
				this.emit('sync-service:error')
			})

			if (type === ERROR_TYPE.LOAD_ERROR) {
				this.syncError = {
					type,
					data,
				}
			}

			if (type === ERROR_TYPE.SAVE_COLLISSION && (!this.syncError || this.syncError.type !== ERROR_TYPE.SAVE_COLLISSION)) {
				this.contentLoaded = true
				this.syncError = {
					type,
					data,
				}
			}
			if (type === ERROR_TYPE.CONNECTION_FAILED && !this.hasConnectionIssue) {
				this.hasConnectionIssue = true
				OC.Notification.showTemporary(t('text', 'Connection failed.'))
			}
			if (type === ERROR_TYPE.SOURCE_NOT_FOUND) {
				this.hasConnectionIssue = true
			}

			if (type === ERROR_TYPE.PUSH_FORBIDDEN) {
				this.hasConnectionIssue = true
				this.emit('push:forbidden')
				return
			}

			this.emit('ready')
		},

		onStateChange(state) {
			if (state.initialLoading && !this.contentLoaded) {
				this.contentLoaded = true
				if (this.autofocus && !this.readOnly) {
					this.$nextTick(() => {
						this.$editor.commands.autofocus()
					})
				}
				this.emit('ready')
			}
			if (Object.prototype.hasOwnProperty.call(state, 'dirty')) {
				// ignore initial loading and other automated changes
				if (this.$editor
					&& (this.$editor.can().undo() || this.$editor.can().redo())
				) {
					this.dirty = state.dirty
					if (this.dirty) {
						this.$syncService.autosave()
					}
				}
			}
		},

		onIdle() {
			this.$syncService.close()
			this.idle = true
			this.readOnly = true
			this.$editor.setEditable(!this.readOnly)

			this.$nextTick(() => {
				this.emit('sync-service:idle')
			})
		},

		onSave() {
			if (this.fileNode) {
				this.fileNode.mtime = new Date()
				emit('files:node:updated', this.fileNode)
			}
			this.$nextTick(() => {
				this.emit('sync-service:save')
			})
		},

		onFocus() {
			this.emit('focus')
		},

		onBlur() {
			this.emit('blur')
		},

		onAddImageNode() {
			this.emit('add-image-node')
		},

		onDeleteImageNode(imageUrl) {
			this.emit('delete-image-node', imageUrl)
		},

		async save() {
			await this.$syncService.save()
		},

		async disconnect() {
			await this.$syncService.close()
			this.unlistenSyncServiceEvents()
			this.$providers.forEach(p => p?.destroy())
			this.$providers = []
			this.$syncService = null
			// disallow editing while still showing the content
			this.readOnly = true
		},

		async close() {
			await this.$syncService.sendRemainingSteps()
				.catch(err => logger.warn('Failed to send remaining steps', { err }))
			await this.disconnect()
				.catch(err => logger.warn('Failed to disconnect', { err }))
			if (this.$editor) {
				try {
					this.unlistenEditorEvents()
					this.$editor.destroy()
					this.$editor = null
					this.hasEditor = false
				} catch (error) {
					logger.warn('Failed to destroy editor', { error })
				}
			}
			return true
		},

		/**
		 * Wrapper to emit events on our own and the parent component
		 *
		 * The parent might be either the root component of src/editor.js or Viewer.vue which collectives currently uses
		 *
		 * Ideally this would be done in a generic way in the src/editor.js API abstraction, but it seems
		 * that there is no proper way to pass any received event along in vue, the only option I've found
		 * in https://github.com/vuejs/vue/issues/230 feels too hacky to me, so we just emit twice for now
		 *
		 * @param {string} event The event name
		 * @param {any} data The data to pass along
		 */
		emit(event, data) {
			this.$emit(event, data)
			this.$parent?.$emit(event, data)
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

		/**
		 * Helper method to debug serialization of content between markdown and HTML
		 *
		 * @param {object} editor The Tiptap editor
		 */
		debugContent(editor) {
			const proseMirrorMarkdown = this.$syncService.serialize(editor.state.doc)
			const markdownItHtml = markdownit.render(proseMirrorMarkdown)

			logger.debug('markdown, serialized from editor state by prosemirror-markdown')
			console.debug(proseMirrorMarkdown)
			logger.debug('HTML, serialized from markdown by markdown-it')
			console.debug(markdownItHtml)
			logger.debug('HTML, as rendered in the browser by Tiptap')
			console.debug(editor.getHTML())
		},

		/**
		 * Helper method to debug yjs issues
		 */
		debugData() {
			const yjsData = {
				fileId: this.fileId,
				filePath: this.relativePath,
				clientId: this.$ydoc.clientID,
				pendingStructs: this.$ydoc.store.pendingStructs,
				clientVectors: [],
				documentState: this.$syncService?.getDocumentState(),
			}
			for (const client of this.$ydoc.store.clients.values()) {
				yjsData.clientVectors.push(client.at(-1).id)
			}

			return yjsData
		},

		outlineToggled(visible) {
			this.emit('outline-toggled', visible)
		},

		onKeyDown(event) {
			if (event.key === 'Escape') {
				event.preventDefault()
				return
			}

			if (event.key === 'Tab' && !event.shiftKey && !event.ctrlKey && !event.metaKey && this.$editor.isActive('codeBlock')) {
				this.$editor.commands.insertContent('\t')
				this.$editor.commands.focus()
				event.preventDefault()
				event.stopPropagation()
				return
			}

			if ((event.ctrlKey || event.metaKey) && event.key === 's') {
				this.$syncService.save()
				event.preventDefault()
			}
		},

		showTranslateModal(e) {
			this.translateContent = e.content
			this.translateModal = true
		},
		hideTranslate() {
			this.translateModal = false
		},
		translateInsert(content) {
			this.$editor.commands.command(({ tr, commands }) => {
				return commands.insertContentAt(tr.selection.to, content)
			})
			this.translateModal = false
		},
		translateReplace(content) {
			this.$editor.commands.command(({ tr, commands }) => {
				const selection = tr.selection
				const range = {
					from: selection.from,
					to: selection.to,
				}
				return commands.insertContentAt(range, content)
			})
			this.translateModal = false
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

.menubar-placeholder,
.text-editor--readonly-bar {
	position: fixed;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	opacity: 0;
	visibility: hidden;
	height: var(--default-clickable-area); // important for mobile so that the buttons are always inside the container
	padding-top:3px;
	padding-bottom: 3px;
}

.text-editor--readonly-bar,
.menubar-placeholder--with-slot {
	opacity: unset;
	visibility: unset;

	z-index: 50;
	max-width: var(--text-editor-max-width);
	margin: auto;
	width: 100%;
	background-color: var(--color-main-background);
}
</style>

<style lang="scss">
	@import './../css/variables';
	@import './../css/style';
	@import './../css/print';

	.text-editor__wrapper {
		@import './../css/prosemirror';

		// relative position for the alignment of the menububble
		.text-editor__main {
			&.draggedOver {
				background-color: var(--color-primary-element-light);
			}
			.text-editor__content-wrapper {
				position: relative;
			}
		}
	}

	.text-editor__wrapper.has-conflicts > .editor {
		width: 50%;
	}

	.text-editor__wrapper.has-conflicts > .content-wrapper {
		width: 50%;
		#read-only-editor {
			margin: 0px auto;
			padding-top: 50px;
			overflow: initial;
		}
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* Give a remote user a caret */
	.collaboration-cursor__caret {
		position: relative;
		margin-left: -1px;
		margin-right: -1px;
		border-left: 1px solid #0D0D0D;
		border-right: 1px solid #0D0D0D;
		word-break: normal;
		pointer-events: none;
	}

	/* Render the username above the caret */
	.collaboration-cursor__label {
		position: absolute;
		top: -1.4em;
		left: -1px;
		font-size: 12px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		user-select: none;
		color: #0D0D0D;
		padding: 0.1rem 0.3rem;
		border-radius: 3px 3px 3px 0;
		white-space: nowrap;
		opacity: 0;

		&.collaboration-cursor__label__active {
			opacity: 1;
		}

		&:not(.collaboration-cursor__label__active) {
			transition: opacity 0.2s 5s;
		}
	}
</style>
