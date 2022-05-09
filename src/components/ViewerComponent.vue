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
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<EditorWrapper :file-id="fileid"
		:relative-path="filename"
		:active="active"
		:autofocus="autofocus"
		:share-token="shareToken"
		:mime="mime" />
</template>

<script>
export default {
	name: 'ViewerComponent',
	components: {
		EditorWrapper: () => import(/* webpackChunkName: "editor" */'./EditorWrapper.vue'),
	},
	props: {
		filename: {
			type: String,
			default: null,
		},
		fileid: {
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
	},
	beforeMount() {
		// FIXME Dirty fix to avoid recreating the component on stable16
		if (typeof this.$parent.$parent !== 'undefined' && this.$parent.$parent.onResize) {
			window.removeEventListener('resize', this.$parent.$parent.onResize)
		}
	},
}
</script>
<style lang="scss">
@media only screen and (max-width: 512px) {
	// on mobile, modal-container has top: 50px
	#editor-container {
		top: auto;
	}
}
</style>
