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
	<div id="editor-container">
		<div v-if="currentSession && active">
			<p v-if="hasSyncCollission" class="msg icon-error">
				{{ t('text', 'The document has been changed outside of the editor. The changes cannot be applied.') }}
			</p>
		</div>
		<div v-if="currentSession && active" id="editor-wrapper" :class="{'has-conflicts': hasSyncCollission, 'icon-loading': !initialLoading}">
			<div id="editor">
				<menu-bar v-if="!syncError && !readOnly" ref="menubar" :editor="tiptap">
					<div v-if="currentSession && active" id="editor-session-list">
						<guest-name-dialog v-if="isPublic && currentSession.guestName" :sync-service="syncService" />
						<div v-tooltip="lastSavedStatusTooltip" class="save-status" :class="lastSavedStatusClass">
							{{ lastSavedStatus }}
						</div>
						<session-list :sessions="filteredSessions" />
					</div>
				</menu-bar>
				<menu-bubble v-if="!readOnly" :editor="tiptap" />
				<editor-content class="editor__content" :editor="tiptap" />
			</div>
			<read-only-editor v-if="hasSyncCollission" :content="syncError.data.outsideChange" />
		</div>

		<collision-resolve-dialog v-if="hasSyncCollission && !readOnly" @resolveUseThisVersion="resolveUseThisVersion" @resolveUseServerVersion="resolveUseServerVersion" />
	</div>
</template>

<script>
import Vue from 'vue'

import { SyncService, ERROR_TYPE } from './../services/SyncService'
import { endpointUrl, getRandomGuestName } from './../helpers'
import { createEditor, markdownit, createMarkdownSerializer } from './../EditorFactory'

import { EditorContent } from 'tiptap'
import { Collaboration } from 'tiptap-extensions'
import { Keymap } from './../extensions'
import isMobile from './../mixins/isMobile'

import Tooltip from 'nextcloud-vue/dist/Directives/Tooltip'

const EDITOR_PUSH_DEBOUNCE = 200

export default {
	name: 'EditorWrapper',
	components: {
		EditorContent,
		MenuBar: () => import('./MenuBar'),
		MenuBubble: () => import('./MenuBubble'),
		ReadOnlyEditor: () => import('./ReadOnlyEditor'),
		CollisionResolveDialog: () => import('./CollisionResolveDialog'),
		GuestNameDialog: () => import('./GuestNameDialog'),
		SessionList: () => import('./SessionList')
	},
	directives: {
		Tooltip
	},
	mixins: [
		isMobile
	],
	props: {
		relativePath: {
			type: String,
			default: null
		},
		fileId: {
			type: Number,
			default: null
		},
		active: {
			type: Boolean,
			default: false
		},
		shareToken: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			tiptap: null,
			/** @type SyncService */
			syncService: null,

			document: null,
			sessions: [],
			currentSession: null,

			filteredSessions: {},

			dirty: false,
			initialLoading: false,
			lastSavedString: '',
			syncError: null,
			readOnly: true,
			forceRecreate: false,

			saveStatusPolling: null
		}
	},
	computed: {
		lastSavedStatus() {
			let status = (this.dirtyStateIndicator ? '*' : '')
			if (!this.isMobile) {
				status += this.lastSavedString
			}
			return status
		},
		lastSavedStatusClass() {
			return this.syncError && this.lastSavedString !== '' ? 'error' : ''
		},
		dirtyStateIndicator() {
			return this.hasUnpushedChanges || this.hasUnsavedChanges
		},
		lastSavedStatusTooltip() {
			let message = t('text', 'Last save {lastSave}', { lastSave: this.lastSavedString })
			if (this.hasSyncCollission) {
				message = t('text', 'The document has been changed outside of the editor. The changes cannot be applied.')
			}
			if (this.hasUnpushedChanges) {
				message += ' - ' + t('text', 'Unpushed changes')
			}
			if (this.hasUnsavedChanges) {
				message += ' - ' + t('text', 'Unsaved changes')
			}
			return { content: message, placement: 'bottom' }
		},
		hasSyncCollission() {
			return this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
		},
		hasUnpushedChanges() {
			return this.dirty
		},
		hasUnsavedChanges() {
			return this.document && this.document.lastSavedVersion < this.document.currentVersion
		},
		backendUrl() {
			return (endpoint) => {
				return endpointUrl(endpoint, !!this.shareToken)
			}
		},
		hasDocumentParameters() {
			return this.fileId || this.shareToken
		},
		isPublic() {
			return document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'
		}
	},
	watch: {
		lastSavedStatus: function() { this.$refs.menubar.redrawMenuBar() }
	},
	mounted() {
		if (this.active && (this.hasDocumentParameters)) {
			this.initSession()
		}
	},
	created() {
		this.saveStatusPolling = setInterval(() => {
			this.updateLastSavedStatus()
		}, 2000)
	},
	beforeDestroy() {
		clearInterval(this.saveStatusPolling)
		if (this.currentSession && this.syncService) {
			this.currentSession = null
			this.syncService.close()
			this.syncService = null
		}
	},
	methods: {
		updateLastSavedStatus() {
			if (this.document) {
				this.lastSavedString = window.moment(this.document.lastSavedVersionTime * 1000).fromNow()
			}
		},
		initSession() {
			if (!this.hasDocumentParameters) {
				this.$parent.$emit('error', 'No valid file provided')
				return
			}
			const guestName = localStorage.getItem('text-guestName') ? localStorage.getItem('text-guestName') : getRandomGuestName()
			this.syncService = new SyncService({
				shareToken: this.shareToken,
				guestName,
				forceRecreate: this.forceRecreate,
				serialize: (document) => {
					const markdown = (createMarkdownSerializer(this.tiptap.nodes, this.tiptap.marks)).serialize(document)
					console.debug('serialized document', { markdown })
					return markdown
				}
			})
				.on('opened', ({ document, session }) => {
					this.currentSession = session
					this.document = document
					this.readOnly = document.readOnly
					localStorage.setItem('text-guestName', this.currentSession.guestName)
				})
				.on('change', ({ document, sessions }) => {
					if (this.document.baseVersionEtag !== '' && document.baseVersionEtag !== this.document.baseVersionEtag) {
						this.resolveUseServerVersion()
						return
					}
					this.updateSessions.bind(this)(sessions)
					this.document = document

					this.syncError = null
					this.tiptap.setOptions({ editable: !this.readOnly })

				})
				.on('loaded', ({ documentSource }) => {
					this.tiptap = createEditor({
						content: markdownit.render(documentSource),
						onUpdate: ({ state }) => {
							this.syncService.state = state
						},
						extensions: [
							new Collaboration({
								// the initial version we start with
								// version is an integer which is incremented with every change
								version: this.document.initialVersion,
								clientID: this.currentSession.id,
								// debounce changes so we can save some bandwidth
								debounce: EDITOR_PUSH_DEBOUNCE,
								onSendable: ({ sendable }) => {
									// This is not working properly with polling and the careful retry logic
									this.syncService.sendSteps()
								}
							}),
							new Keymap({
								'Ctrl-s': () => {
									this.syncService.save()
									return true
								}
							})
						]
					})
					this.syncService.state = this.tiptap.state
					this.$parent.$emit('update:loaded', true)
				})
				.on('sync', ({ steps, document }) => {
					try {
						this.tiptap.extensions.options.collaboration.update({
							version: document.currentVersion,
							steps: steps
						})
						this.syncService.state = this.tiptap.state
						this.updateLastSavedStatus()
					} catch (e) {
						console.error('Failed to update steps in collaboration plugin', e)
						// TODO: we should recreate the editing session when this happens
					}
					this.document = document
				})
				.on('error', (error, data) => {
					if (error === ERROR_TYPE.SAVE_COLLISSION && (!this.syncError || this.syncError.type !== ERROR_TYPE.SAVE_COLLISSION)) {
						this.initialLoading = true
						this.syncError = {
							type: ERROR_TYPE.SAVE_COLLISSION,
							data: data
						}
						this.tiptap.setOptions({ editable: false })

					}
				})
				.on('stateChange', (state) => {
					if (state.initialLoading && !this.initialLoading) {
						this.initialLoading = true
						this.tiptap.focus('start')
					}
					if (state.hasOwnProperty('dirty')) {
						this.dirty = state.dirty
					}
				})
			this.syncService.open({ fileId: this.fileId, filePath: this.filePath })
			this.forceRecreate = false
		},

		resolveUseThisVersion() {
			this.syncService.forceSave()
			this.tiptap.setOptions({ editable: !this.readOnly })
		},

		resolveUseServerVersion() {
			this.forceRecreate = true
			this.syncService.close()
			this.syncService = null
			this.tiptap.destroy()
			this.initSession()
		},

		updateSessions(sessions) {
			this.sessions = sessions.sort((a, b) => b.lastContact - a.lastContact)
			let currentSessionIds = this.sessions.map((session) => session.userId)
			let currentGuestIds = this.sessions.map((session) => session.guestId)

			const removedSessions = Object.keys(this.filteredSessions)
				.filter(sessionId => !currentSessionIds.includes(sessionId) && !currentGuestIds.includes(sessionId))

			for (let index in removedSessions) {
				Vue.delete(this.filteredSessions, removedSessions[index])
			}
			for (let index in this.sessions) {
				let session = this.sessions[index]
				const sessionKey = session.displayName ? session.userId : session.id
				if (this.filteredSessions[sessionKey]) {
					// update timestamp if relevant
					if (this.filteredSessions[sessionKey].lastContact < session.lastContact) {
						Vue.set(this.filteredSessions[sessionKey], 'lastContact', session.lastContact)
					}
				} else {
					Vue.set(this.filteredSessions, sessionKey, session)
				}
				if (session.id === this.currentSession.id) {
					Vue.set(this.filteredSessions[sessionKey], 'isCurrent', true)
				}
			}
		}
	}
}
</script>

<style scoped lang="scss">
	#editor-container {
		display: block;
		width: 100vw;
		max-width: 100%;
		height: calc(100% - 50px);
		top: 50px;
		left: 0;
		margin: 0 auto;
		position: relative;
		background-color: var(--color-main-background);
	}

	#editor-wrapper {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		&.icon-loading {
			#editor {
				opacity: 0.3;
			}
		}
	}

	#editor, .editor {
		background: var(--color-main-background);
		color: var(--color-main-text);
		background-clip: padding-box;
		border-radius: var(--border-radius);
		padding: 0;
		position: relative;
		overflow-y: scroll;
		overflow-x: hidden;
		width: 100%;
	}

	.msg.icon-error {
		padding: 12px;
		border-bottom:1px solid var(--color-error);
		padding-left: 30px;
		background-position: 8px center;
	}

	.save-status {
		padding: 9px;
		text-overflow: ellipsis;
		color: var(--color-text-lighter);

		&.error {
			background-color: var(--color-error);
			color: var(--color-main-background);
			border-radius: 3px;
		}
	}

	#editor-container #editor-wrapper.has-conflicts {
		height: calc(100% - 50px);

		#editor, #read-only-editor {
			width: 50%;
			height: 100%;
		}
	}

	#editor-session-list {
		padding: 9px;
		padding-right: 16px;
		display: flex;

		input, div {
			vertical-align: middle;
			margin-left: 3px;
		}
	}

	.editor__content {
		max-width: 630px;
		margin: auto;
		& /deep/ .ProseMirror {
			padding-bottom: 200px;
		}
	}

	#body-public {
		height: auto;
	}

	#files-public-content {
		height: auto;
		#editor-wrapper {
			position: relative;
		}
		#editor-container {
			top: 0;

			#editor::v-deep .menubar {
				// sticky position is not working as body is our scroll container
				position: fixed;
				top: 50px;
				width: 100%;
			}

			#editor {
				padding-top: 50px;
			}
		}
	}

	.ie {
		#editor::v-deep .menubar {
			// sticky position is not working as body is our scroll container
			position: fixed;
			top: 50px;
			width: 100%;
		}
		.editor__content::v-deep .ProseMirror {
				padding-top: 50px;
		}
	}

</style>
<style lang="scss">
	@import './../../css/style';
	@import './../../css/prosemirror';
</style>
