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
	<div v-if="currentSession && active" id="editor-container">
		<div id="editor-session-list">
			<div v-tooltip="lastSavedStatusTooltip" class="save-status" :class="lastSavedStatusClass">
				{{ lastSavedStatus }}
			</div>
			<avatar v-for="session in activeSessions" :key="session.id" :user="session.userId"
				:display-name="session.displayName" :style="sessionStyle(session)" />
		</div>
		<div>
			<p v-if="hasSyncCollission" class="msg icon-error">
				{{ t('text', 'The document has been changed outside of the editor. The changes cannot be applied.') }}
			</p>
		</div>
		<div id="editor-wrapper" :class="{'has-conflicts': hasSyncCollission, 'icon-loading': !initialLoading}">
			<div v-once id="editor" ref="editor" />
			<read-only-editor v-if="hasSyncCollission" :content="syncError.data.outsideChange" />
		</div>
		<div v-if="hasSyncCollission" id="resolve-conflicts">
			<button @click="resolveUseThisVersion">
				Use your version
			</button>
			<button @click="resolveUseServerVersion">
				Use the server version
			</button>
		</div>
	</div>
</template>

<script>
import debounce from 'lodash/debounce'

import { EditorSync, ERROR_TYPE } from './../EditorSync'
import SyncService from './../services/SyncService'
import { endpointUrl } from './../helpers'

import {collab, getVersion, receiveTransaction, sendableSteps} from 'prosemirror-collab'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { exampleSetup } from 'prosemirror-example-setup'
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'
import { keymap } from 'prosemirror-keymap'

import Avatar from 'nextcloud-vue/dist/Components/Avatar'
import ReadOnlyEditor from './ReadOnlyEditor'
import Tooltip from 'nextcloud-vue/dist/Directives/Tooltip'

const COLLABORATOR_IDLE_TIME = 5
const COLLABORATOR_DISCONNECT_TIME = 20
const EDITOR_PUSH_DEBOUNCE = 200

export default {
	name: 'Editor',
	components: {
		Avatar,
		ReadOnlyEditor
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
			/** @type EditorSync */
			authority: null,
			/** @type SyncService */
			syncService: null,
			document: null,
			currentSession: null,
			sessions: [],
			filteredSessions: {},
			name: null,
			dirty: false,
			initialLoading: false,
			lastSavedString: '',
			syncError: null
		}
	},
	computed: {
		activeSessions() {
			// TODO: filter out duplicate user ids
			return Object.values(this.filteredSessions).filter((session) => session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME)
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
			return this.authority && this.document.lastSavedVersion !== getVersion(this.authority.view.state)
		},
		backendUrl() {
			return (endpoint) => {
				return endpointUrl(endpoint, !!this.shareToken)
			}
		},
		hasDocumentParameters() {
			return this.fileId || this.shareToken
		}
	},
	mounted() {
		if (this.active && (this.hasDocumentParameters)) {
			this.initSession()
		}
		setInterval(() => { this.updateLastSavedStatus() }, 2000)
	},
	beforeDestroy() {
		if (this.currentSession && this.syncService) {
			this.currentSession = null
			this.syncService.close()
			this.syncService = null
			this.view.destroy()
		}
	},
	methods: {
		updateLastSavedStatus() {
			if (this.document) {
				this.lastSavedString = window.moment(this.document.lastSavedVersionTime * 1000).fromNow()
			}
		},
		initSession () {
			if (!this.hasDocumentParameters) {
				this.$emit('error', 'No valid file provided')
				return
			}
			this.syncService = new SyncService({
				shareToken: this.shareToken,
				schema: schema,
				serialize: (document) => {
					return defaultMarkdownSerializer.serialize(document)
				}
			})
				.on('opened', ({document, session}) => {
					this.currentSession = session
					this.document = document
				})
				.on('change', ({document, sessions}) => {
					this.sessions = sessions.sort((a,b) => b.lastContact - a.lastContact)
					this.filteredSessions = {}
					for (let index in this.sessions) {
						let session = this.sessions[index]
						if (!session.userId) {
							session.userId = session.id
						}
						if (this.filteredSessions.hasOwnProperty(session.userId)) {
							if (this.filteredSessions[session.userId].lastContact < session.lastContact) {
								this.filteredSessions[session.userId] = session
							}
						} else {
							this.filteredSessions[session.userId] = session
						}
					}
					console.log(this.filteredSessions)

					this.document = document
				})
				.on('loaded', ({document, session, documentSource}) => {
					const documentData = {document, session}
					const initialDocument = defaultMarkdownParser.parse(documentSource)

					const sendStepsDebounce = () => this.syncService.sendSteps()
					const sendStepsDebounced = debounce(sendStepsDebounce, EDITOR_PUSH_DEBOUNCE, { maxWait: 5000 })

					this.view = new EditorView(this.$refs.editor, {
						state: EditorState.create({
							doc: initialDocument,
							plugins: [
								keymap({
									'Ctrl-s': () => {
										//authority.manualSave()
										//authority.fetchSteps()
										return true
									}
								}),
								...exampleSetup({ schema, floatingMenu: false }),
								collab({
									version: this.syncService.steps.length,
									clientID: this.currentSession.id
								})
							]
						}),
						dispatchTransaction: (transaction) => {
							const state = this.view.state.apply(transaction)
							this.view.updateState(state)
							this.syncService.state = state
							sendStepsDebounced()
						}

					})
					this.syncService.state = this.view.state
					this.$emit('update:loaded', true)
				})
				.on('sync', (steps) => {
					let newData = this.syncService.stepsSince(getVersion(this.view.state))
					this.view.dispatch(
						receiveTransaction(this.view.state, newData.steps, newData.clientIDs)
					)
					this.syncService.state = this.view.state

				})
				.on('stateChange', (state) => {
					if (state.initialLoading && !this.initialLoading) {
						this.initialLoading = true
					}
					this.dirty = state.dirty
				})
			this.syncService.open({ fileId: this.fileId, filePath: this.filePath})
		},

		resolveUseThisVersion() {
			this.authority.forceSave()
			this.authority.view.setProps({ editable: () => true })
		},

		resolveUseServerVersion() {
			this.authority.view.destroy()
			this.initSession()
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

	#resolve-conflicts {
		display: flex;
		position: fixed;
		z-index: 10000;
		bottom: 0;
		max-width: 900px;
		width: 100vw;
		margin: auto;
		padding: 20px 0;

		button {
			margin: auto;
			box-shadow: 0 0 10px var(--color-box-shadow);
		}
	}

	#editor-container #editor-wrapper.has-conflicts {
		height: calc(100% - 50px);

		#remote, #editor {
			width: 50%;
			height: 100%;
		}

		.ProseMirror-menubar {
			visibility: hidden;
		}
	}

	#editor-session-list {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		padding: 6px;
		display: flex;

		input, div {
			vertical-align: middle;
			margin-left: 3px;
		}
	}

</style>
<style lang="scss">
	@import './../../css/style';

	#files-public-content {
		width: 100% !important;
	}

	#viewer-content.modal-mask .modal-wrapper .modal-container {
		border-radius: 3px !important;
	}

	.modal-container #editor-container {
		position: absolute;
		max-height: calc(100% - 100px);
	}

</style>
