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
		<div id="editor2"></div>
	</div>
</template>

<script>
	const COLLABORATOR_IDLE_TIME = 5;
	const COLLABORATOR_DISCONNECT_TIME = 20;

	import axios from 'nextcloud-axios'
	import { initEditor, ERROR_TYPE } from './../collab';
	import { Avatar } from 'nextcloud-vue';
	import Tooltip from 'nextcloud-vue/dist/Directives/Tooltip'
	import {sendableSteps, getVersion} from 'prosemirror-collab';


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
				document: null,
				content: null,
				session: null,
				sessions: [],
				name: 'Guest',
				dirty: false,
				lastSavedString: '',
				syncError: null
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
						const {editor, authority} = initEditor(null, 2, response.data, fileContent.data, this);
						this.authority = authority
						this.authority.onSync((data) => {
							if (data.document) {
								this.document = data.document
							}
						})
						this.authority.onError((error, data) => {
							if (error === ERROR_TYPE.SAVE_COLLISSION) {
								this.syncError = {
									type: ERROR_TYPE.SAVE_COLLISSION,
									data: data
								}
							}
						})
						this.authority.onStateChange(() => {
							this.dirty = this.authority.dirty
						})

						setInterval(() => { this.updateLastSavedStatus() }, 2000)
						this.$emit('update:loaded', true)
					});
				}).catch((error) => {
					console.error(error.response)
					this.$emit('error', error.response.status)
				})

			},
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

	#editor2 {
		height: 100%;
		overflow-y: scroll;
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
