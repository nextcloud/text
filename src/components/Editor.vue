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
	<div id="editor-container" v-if="session">
		<div id="editor-session-list">
			<avatar :user="session.userId" style="border: 2px solid #000;" :style="{'border-color': session.color}"></avatar>
			<avatar :user="name"></avatar>
			<input v-model="name" />
		</div>
		<div id="editor2"></div>
	</div>
</template>

<script>
	import axios from 'nextcloud-axios'
	import { initEditor } from './../collab';
	import { Avatar } from 'nextcloud-vue';

	export default {
		name: 'Editor',
		components: {
			Avatar
		},
		beforeMount () {
			this.initSession()
		},
		props: {
			path: {
				default: '/example.md'
			},
		},
		data() {
			return {
				document: null,
				content: null,
				session: null,
				name: 'Guest'
			}
		},
		methods: {
			initSession() {
				axios.get(OC.generateUrl('/apps/text/session/create'), {
					// TODO: viewer should provide the file id so we can use it in all places (also for public pages)
					params: {file: this.path}
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
						initEditor(null, 2, response.data, fileContent.data);
						this.$emit('loaded')
						// TODO: resize viewer
					});
				});

			},
		}
	}
</script>

<style scoped lang="scss">

	#editor-container {
		display: block;
		max-width: 900px;
		width: 100vw;
		margin: 0 auto;
		position: relative;
	}

	#editor-session-list {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		padding: 3px;

		input, div {
			vertical-align: middle;
		}
	}

</style>
<style lang="scss">
	@import './../../css/style';
</style>
