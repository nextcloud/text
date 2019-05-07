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
	<div id="editor-container" v-if="session && active">
		<div id="editor-session-list">
			<div class="save-status" :class="lastSavedStatusClass" v-tooltip="lastSavedStatusTooltip">{{ lastSavedStatus }}</div>
			<avatar v-for="session in activeSessions" :key="session.id" :user="session.userId" :displayName="session.displayName" :style="sessionStyle(session)"></avatar>
		</div>
		<div id="editor-wrapper" :class="{'has-conflicts': syncError && syncError.type === ERROR_TYPE.SAVE_COLLISSION, 'icon-loading': !initialLoading}">
			<div id="editor"></div>
			<div id="remote" v-if="syncError && syncError.type === ERROR_TYPE.SAVE_COLLISSION"></div>
		</div>
		<div v-if="syncError && syncError.type === ERROR_TYPE.SAVE_COLLISSION" id="resolve-conflicts">
			<button @click="resolveUseThisVersion">Use your version</button>
			<button @click="resolveUseServerVersion">Use the server version</button>
		</div>
	</div>
</template>

<script>
	const COLLABORATOR_IDLE_TIME = 5;
	const COLLABORATOR_DISCONNECT_TIME = 20;
	const EDITOR_PUSH_DEBOUNCE = 200;

	import axios from 'nextcloud-axios'
	import { EditorSync, ERROR_TYPE } from './../collab'
	import { Avatar } from 'nextcloud-vue'
	import Tooltip from 'nextcloud-vue/dist/Directives/Tooltip'
	import {collab, receiveTransaction, sendableSteps, getVersion} from 'prosemirror-collab'
	import {EditorState} from 'prosemirror-state'
	import {EditorView} from 'prosemirror-view'
	import {exampleSetup} from 'prosemirror-example-setup'
	import {schema, defaultMarkdownParser, defaultMarkdownSerializer} from 'prosemirror-markdown'
	import debounce from 'lodash/debounce'
	import bind from 'lodash/bind'
	import {baseKeymap} from "prosemirror-commands"
	import {keymap} from "prosemirror-keymap"


	export default {
		name: 'Editor',
		components: {
			Avatar
		},
		directives: {
			Tooltip
		},
		beforeMount () {
			if (this.active || this.shareToken) {
				this.initSession()
			}
		},
		beforeDestroy() {
			delete this.authority;
		},
		props: {
			relativePath: {
				default: null
			},
			fileId: {
				default: null
			},
			active: {
				default: false
			},
			shareToken: {
				default: null
			}
		},
		data() {
			return {
				editor: null,
				remoteView: null,
				/** @type EditorSync */
				authority: null,
				document: null,
				content: null,
				session: null,
				sessions: [],
				name: 'Guest',
				dirty: false,
				initialLoading: false,
				lastSavedString: '',
				syncError: null,
				ERROR_TYPE: ERROR_TYPE
			}
		},
		computed: {
			activeSessions() {
				// TODO: filter out duplicate user ids
				return this.sessions.filter((session) => session.lastContact > Date.now()/1000-COLLABORATOR_DISCONNECT_TIME)
			},
			sessionStyle() {
				return (session) => {
					return {
						'opacity': session.lastContact > Date.now()/1000-COLLABORATOR_IDLE_TIME ? 1 : 0.5,
						'border-color': session.color
					}
				}
			},
			lastSavedStatus() {
				let flags = ''
				// unpushed changes or unsaved transactions
				if (this.dirty || (this.authority && this.document.lastSavedVersion !== getVersion(this.authority.view.state))) {
					flags = '* '
				}
				return flags + this.lastSavedString
			},
			lastSavedStatusClass() {
				if (!this.syncError) {
					return '';
				}
				return 'error';
			},
			lastSavedStatusTooltip() {
				if (!this.syncError) {
					return {}
				}
				// TODO: move to v-popover, trigger reloadEditor for now
				// TODO: implement conflict resolving
				return {
					content: 'The document has been changed outside of the editor. The changes cannot be applied.',
					show: true,
					trigger: 'manual',
					placement: 'bottom'
				}
			}
		},
		methods: {
			reloadEditor() {

			},
			updateLastSavedStatus() {
				this.lastSavedString = moment(this.document.lastSavedVersionTime*1000).fromNow();
			},
			initSession() {
				var self = this;
				if (!this.relativePath && !this.shareToken) {
					console.error('No relative path given')
					this.$emit('error', 'No relative path given')
					return;
				}
				axios.get(OC.generateUrl('/apps/text/session/create'), {
					// TODO: viewer should provide the file id so we can use it in all places (also for public pages)
					params: {
						file: this.relativePath,
						shareToken: this.shareToken
					}
				}).then((response) => {
					this.document = response.data.document;
					this.session = response.data.session;
					axios.get(OC.generateUrl('/apps/text/session/fetch',),
						{
							params: {
								documentId: this.document.id,
								sessionId: this.session.id,
								token: this.session.token
							}
						}
					).then((fileContent) => {
						const {editor, authority} = this.initEditor(response.data, fileContent.data);
						this.authority = authority
						this.authority.onSync((data) => {
							this.syncError = null
							if (data.document) {
								this.document = data.document
							}
							this.sessions = data.sessions
						})
						this.authority.onError((error, data) => {
							if (error === ERROR_TYPE.SAVE_COLLISSION) {
								this.syncError = {
									type: ERROR_TYPE.SAVE_COLLISSION,
									data: data
								}
								this.$nextTick(() => {
									this.initRemoteView()
								})
							}
						})
						this.authority.onStateChange(() => {
							this.dirty = this.authority.dirty
							if (!this.initialLoading) {
								this.initialLoading = !this.authority.dirty
							}
						})

						setInterval(() => { this.updateLastSavedStatus() }, 2000)
						this.$emit('update:loaded', true)
					});
				}).catch((error) => {
					console.error(error.response)
					this.$emit('error', error.response.status)
				})

			},

			initRemoteView() {
				if (this.remoteView) {
					return;
				}
				this.remoteView = new EditorView(document.querySelector("#remote"), {
					state: EditorState.create({
						doc: defaultMarkdownParser.parse(this.syncError.data.outsideChange),
						plugins: [
							...exampleSetup({schema})
						]
					}),
					focus() { this.view.focus() },
					destroy() { this.view.destroy() }
				})
				view.setProps({editable: () => false})
			},

			resolveUseThisVersion() {
				this.authority.forceSave()
				this.removeRemoteView()
			},

			resolveUseServerVersion() {
				this.removeRemoteView()
			},

			removeRemoteView() {
				this.remoteView.destroy()
			},

			initEditor: (data, fileContent) => {
				const authority = new EditorSync(defaultMarkdownParser.parse(fileContent), data)

				const sendStepsDebounce = () => {
					console.log('debounced SENDSTEPS')
					authority.sendSteps()
				}
				const sendStepsDebounced = debounce(sendStepsDebounce, EDITOR_PUSH_DEBOUNCE, { maxWait: 500 })

				const view = new EditorView(document.querySelector("#editor"), {
					state: EditorState.create({
						doc: authority.doc,
						plugins: [
							...exampleSetup({schema}),
							collab({
								version: authority.steps.length,
								clientID: data.session.id
							})
						]
					}),
					focus() { this.view.focus() },
					destroy() { this.view.destroy() },
					dispatchTransaction: (transaction) => {
						const state = view.state.apply(transaction);
						view.updateState(state);
						sendStepsDebounced()
					},

				})
				authority.view = view;
				authority.fetchSteps()
				return {
					view: view,
					authority: authority
				}
			},
			onSync(syncState) {
				this.sessions = syncState.sessions
				this.document = syncState.document
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
		height: 100%;
		&.icon-loading {
			#editor {
				opacity: 0.3;
			}
		}
	}

	#resolve-conflicts {
		display: flex;
		button {
			margin: auto;
		}
	}

	#editor {
		height: 100%;
		overflow-y: scroll;
	}

	#editor-container.has-conflicts {
		#remove, #editor {
			width: 50%;
		}

		#remote .ProseMirror-menubar {
			visibility: hidden;
		}
	}

	#editor-session-list {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		padding: 3px;
		display: flex;

		input, div {
			vertical-align: middle;
			margin-left: 3px;
		}
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

</style>
<style lang="scss">
	@import './../../css/style';
</style>
