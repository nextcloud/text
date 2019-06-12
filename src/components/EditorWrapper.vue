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
		<div v-if="currentSession && active" id="editor-session-list">
			<div v-tooltip="lastSavedStatusTooltip" class="save-status" :class="lastSavedStatusClass">
				{{ lastSavedStatus }}
			</div>
			<avatar v-for="session in activeSessions" :key="session.id"
				:user="session.userId"
				:display-name="session.guestName ? session.guestName : session.displayName"
				:style="sessionStyle(session)" />
		</div>
		<div v-if="currentSession && active">
			<p v-if="hasSyncCollission" class="msg icon-error">
				{{ t('text', 'The document has been changed outside of the editor. The changes cannot be applied.') }}
			</p>
		</div>
		<div v-if="currentSession && active" id="editor-wrapper" :class="{'has-conflicts': hasSyncCollission, 'icon-loading': !initialLoading}">
			<div id="editor">
				<editor-menu-bar v-if="!syncError && !readOnly" v-slot="{ commands, isActive }" :editor="tiptap">
					<div class="menubar">
						<button class="icon-bold" :class="{ 'is-active': isActive.strong() }" @click="commands.strong" />
						<button class="icon-italic" :class="{ 'is-active': isActive.em() }" @click="commands.em" />
						<button class="icon-strike" :class="{ 'is-active': isActive.strike() }" @click="commands.strike" />
						<button class="icon-code" :class="{ 'is-active': isActive.code() }" @click="commands.code" />

						<button	:class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
							H1
						</button>
						<button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
							H2
						</button>
						<button :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
							H3
						</button>
						<actions>
							<action-button icon="icon-paragraph" @click="commands.heading({ level: 4 })">
								Heading 4
							</action-button>
							<action-button icon="icon-paragraph" @click="commands.heading({ level: 5 })">
								Heading 5
							</action-button>
							<action-button icon="icon-paragraph" @click="commands.heading({ level: 6 })">
								Heading 6
							</action-button>
							<action-button icon="icon-code" @click="commands.code_block()">
								Code block
							</action-button>
							<action-button icon="icon-quote" @click="commands.blockquote()">
								Blockquote
							</action-button>
						</actions>

						<button class="icon-ul" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list" />
						<button class="icon-ol" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list" />

						<button v-if="!isPublic" class="icon-image" @click="showImagePrompt(commands.image)" />
					</div>
				</editor-menu-bar>
				<editor-menu-bubble v-if="!readOnly" v-slot="{ commands, isActive, getMarkAttrs, menu }" class="menububble"
					:editor="tiptap" @hide="hideLinkMenu">
					<div class="menububble" :class="{ 'is-active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
						<form v-if="linkMenuIsActive" class="menububble__form" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
							<input ref="linkInput" v-model="linkUrl" class="menububble__input"
								type="text" placeholder="https://" @keydown.esc="hideLinkMenu">
							<button class="menububble__button icon-confirm" type="button" @click="setLinkUrl(commands.link, null)" />
						</form>

						<template v-else>
							<button
								class="menububble__button"
								:class="{ 'is-active': isActive.link() }"
								@click="showLinkMenu(getMarkAttrs('link'))">
								<span v-tooltip="isActive.link() ? 'Update Link' : 'Add Link'" class="icon-link" />
							</button>
						</template>
					</div>
				</editor-menu-bubble>
				<editor-content class="editor__content" :editor="tiptap" />
			</div>
			<read-only-editor v-if="hasSyncCollission" :content="syncError.data.outsideChange" />
		</div>

		<collision-resolve-dialog v-if="hasSyncCollission && !readOnly" @resolveUseThisVersion="resolveUseThisVersion" @resolveUseServerVersion="resolveUseServerVersion" />

		<guest-name-dialog v-if="isPublic && !guestNameConfirmed" :value="guestName" @input="setGuestName($event)" />
	</div>
</template>

<script>
import Vue from 'vue'

import { SyncService, ERROR_TYPE } from './../services/SyncService'
import { endpointUrl } from './../helpers'
import { createEditor, markdownit, createMarkdownSerializer } from './../EditorFactory'

import { EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import { Collaboration } from 'tiptap-extensions'
import { Keymap } from './../extensions'

import Avatar from 'nextcloud-vue/dist/Components/Avatar'
import Tooltip from 'nextcloud-vue/dist/Directives/Tooltip'
import Actions from 'nextcloud-vue/dist/Components/Actions'
import ActionButton from 'nextcloud-vue/dist/Components/ActionButton'

import ReadOnlyEditor from './ReadOnlyEditor'
import GuestNameDialog from './GuestNameDialog'
import CollisionResolveDialog from './CollisionResolveDialog'

const COLLABORATOR_IDLE_TIME = 5
const COLLABORATOR_DISCONNECT_TIME = 20
const EDITOR_PUSH_DEBOUNCE = 200

export default {
	name: 'Editor',
	components: {
		CollisionResolveDialog,
		Avatar,
		Actions,
		ReadOnlyEditor,
		EditorContent,
		EditorMenuBar,
		EditorMenuBubble,
		ActionButton,
		GuestNameDialog
	},
	directives: {
		Tooltip
	},
	props: {
		relativePath: {
			type: String,
			default: null
		},
		fileId: {
			type: String,
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

			guestName: '',
			guestNameConfirmed: false,

			linkUrl: null,
			linkMenuIsActive: false
		}
	},
	computed: {
		activeSessions() {
			return Object.values(this.filteredSessions).filter((session) => session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME && session.id !== this.currentSession.id && session.userId !== null)
		},
		sessionStyle() {
			return (session) => {
				return {
					'opacity': session.lastContact > Date.now() / 1000 - COLLABORATOR_IDLE_TIME ? 1 : 0.5,
					'border-color': session.color
				}
			}
		},

		lastSavedStatus() {
			return (this.hasUnsavedChanges || this.hasUnpushedChanges ? '*' : '') + this.lastSavedString
		},
		lastSavedStatusClass() {
			return this.syncError && this.lastSavedString !== '' ? 'error' : ''
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
	beforeMount() {
		const guestName = localStorage.getItem('text-guestName')
		if (guestName !== null) {
			this.guestName = guestName
		}
	},
	mounted() {
		if (this.active && (this.hasDocumentParameters) && !this.isPublic) {
			this.initSession()
		}
		setInterval(() => { this.updateLastSavedStatus() }, 2000)
	},
	beforeDestroy() {
		if (this.currentSession && this.syncService) {
			this.currentSession = null
			this.syncService.close()
			this.syncService = null
		}
	},
	methods: {
		setGuestName(guestName) {
			this.guestName = guestName
			this.guestNameConfirmed = true
			localStorage.setItem('text-guestName', this.guestName)
			this.initSession()
		},
		updateLastSavedStatus() {
			if (this.document) {
				this.lastSavedString = window.moment(this.document.lastSavedVersionTime * 1000).fromNow()
			}
		},
		initSession() {
			if (!this.hasDocumentParameters) {
				this.$emit('error', 'No valid file provided')
				return
			}
			this.syncService = new SyncService({
				shareToken: this.shareToken,
				guestName: this.guestName,
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
				.on('loaded', ({ document, session, documentSource }) => {
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
					this.$emit('update:loaded', true)
					this.tiptap.focus('end')
				})
				.on('sync', ({ steps, document }) => {
					try {
						this.tiptap.extensions.options.collaboration.update({
							version: document.currentVersion,
							steps: steps
						})
						this.syncService.state = this.tiptap.state
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
			const removedSessions = Object.keys(this.filteredSessions)
				.filter(sessionId => !currentSessionIds.includes(sessionId))

			// remove sessions
			for (let index in removedSessions) {
				Vue.delete(this.filteredSessions, removedSessions[index])
			}
			for (let index in this.sessions) {
				let session = this.sessions[index]
				if (!session.userId) {
					session.userId = session.id
				}

				if (this.filteredSessions[session.userId]) {
					// update timestamp if relevant
					if (this.filteredSessions[session.userId].lastContact < session.lastContact) {
						Vue.set(this.filteredSessions[session.userId], 'lastContact', session.lastContact)
					}
				} else {
					Vue.set(this.filteredSessions, session.userId, session)
				}
			}
		},

		showLinkMenu(attrs) {
			this.linkUrl = attrs.href
			this.linkMenuIsActive = true
			this.$nextTick(() => {
				this.$refs.linkInput.focus()
			})
		},
		hideLinkMenu() {
			this.linkUrl = null
			this.linkMenuIsActive = false
		},

		setLinkUrl(command, url) {
			command({ href: url })
			this.hideLinkMenu()
			this.tiptap.focus()
		},

		showImagePrompt(command) {
			const _command = command
			OC.dialogs.filepicker('Insert an image', (file) => {
				const src = OC.generateUrl('/core/preview.png?') + `file=${file}&x=1024&y=1024&a=true`
				_command({ src })
				// TODO: check permissions
				// TODO: check for available preview
			}, false, false)
		}
	}
}
</script>

<style scoped lang="scss">

	#editor-container {
		display: block;
		// Size that is used for modal as well
		max-width: 900px;
		width: 100vw;
		height: 100%;
		margin: 0 auto;
		border-radius: 3px;
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

	.msg.icon-error {
		padding: 12px;
		border-bottom:1px solid var(--color-error);
		padding-left: 30px;
		background-position: 8px center;
	}

	.save-status {
		padding: 6px;
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
		position: absolute;
		top: 0;
		right: 0;
		z-index: 110;
		padding: 6px;
		padding-right: 16px;
		display: flex;

		input, div {
			vertical-align: middle;
			margin-left: 3px;
		}
	}

	.menubar {
		width: 100%;
		position: fixed;
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--color-main-background-translucent);
	}

	.menubar button {
		width: 44px;
		height: 44px;
		margin: 0;
		background-size: 16px;
		border: 0;
		background-color: var(--color-main-background);
		opacity: 0.6;
		background-position: center center;
		vertical-align: top;
		&:hover, &:focus, &:active {
			background-color: var(--color-background-dark);
		}
		&.is-active {
			opacity: 1;
		}
	}

	.menububble {
		position: absolute;
		display: flex;
		z-index: 220;
		background: var(--color-main-background-translucent);
		box-shadow: 0 1px 5px var(--color-box-shadow);
		border-radius: 5px;
		padding: 0.3rem;
		margin-bottom: 0.5rem;
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.2s, visibility 0.2s;

		&.is-active {
			opacity: 1;
			visibility: visible;
		}

		&__button {
			display: inline-flex;
			border: 0;
			padding: 0.2rem 0.5rem;
			margin-right: 0.2rem;
			border-radius: 3px;
			cursor: pointer;

			&:last-child {
				margin-right: 0;
			}
		}

		&__form {
			display: flex;
			align-items: center;
		}

		&__input {
			font: inherit;
			border: none;
			background: transparent;
			min-width: 150px;
		}
	}

	.editor__content {
		max-width: 500px;
		margin: auto;
	}

</style>
<style lang="scss">
	@import './../../css/style';
	@import './../../css/prosemirror';
</style>
