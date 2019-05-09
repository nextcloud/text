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
	<div id="remote" ref="remote"></div>
</template>

<script>
	import {EditorState} from 'prosemirror-state'
	import {EditorView} from 'prosemirror-view'
	import {exampleSetup} from 'prosemirror-example-setup'
	import {schema, defaultMarkdownParser} from 'prosemirror-markdown'

	export default {
		name: 'ReadOnlyEditor',
		props: {
			content: {
				type: String,
				required: true
			},
		},
		data: () => {
			return {
				remoteView: null
			}
		},
		mounted() {
			this.initRemoteView()
		},
		beforeDestroy() {
			this.remoteView.destroy()
		},
		methods: {
			initRemoteView() {
				if (this.remoteView) {
					return;
				}
				this.remoteView = new EditorView(this.$refs.remote, {
					state: EditorState.create({
						doc: defaultMarkdownParser.parse(this.content),
						plugins: [
							...exampleSetup({schema})
						]
					}),
				})
				this.remoteView.setProps({editable: () => false})
			},
		}
	}
</script>

<style scoped>

</style>
