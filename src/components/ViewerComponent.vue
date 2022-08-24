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
	<Editor v-if="isEditable"
		:file-id="fileid"
		:relative-path="filename"
		:active="active"
		:autofocus="autofocus"
		:share-token="shareToken"
		:mime="mime"
		:show-outline-outside="showOutlineOutside" />
	<Component :is="readerComponent" v-else :content="content" />
</template>

<script>
import axios from '@nextcloud/axios'
import PlainTextReader from './PlainTextReader.vue'
import RichTextReader from './RichTextReader.vue'

import { getSharingToken } from '../helpers/token.js'

export default {
	name: 'ViewerComponent',
	components: {
		RichTextReader,
		PlainTextReader,
		Editor: () => import(/* webpackChunkName: "editor" */'./Editor.vue'),
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
			default: () => getSharingToken(),
		},
		mime: {
			type: String,
			default: null,
		},
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
		permissions: {
			type: String,
			default: '',
		},
		source: {
			type: String,
			default: undefined,
		},
	},
	data() {
		return {
			content: '',
		}
	},
	computed: {
		/** @return {boolean} */
		isEditable() {
			return this.permissions.includes('W')
		},

		/** @return {boolean} */
		readerComponent() {
			return this.mime === 'text/markdown' ? RichTextReader : PlainTextReader
		},
	},

	watch: {
		active() {
			this.loadFileContent()
		},
	},

	beforeMount() {
		// FIXME Dirty fix to avoid recreating the component on stable16
		if (typeof this.$parent.$parent !== 'undefined' && this.$parent.$parent.onResize) {
			window.removeEventListener('resize', this.$parent.$parent.onResize)
		}
	},

	mounted() {
		this.loadFileContent()
	},

	methods: {
		async loadFileContent() {
			if (!this.isEditable && this.content === '') {
				const response = await axios.get(this.source)
				this.content = response.data
				this.contentLoaded = true
				this.$emit('update:loaded', true)
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.text-editor {
	overflow: scroll;
}
</style>
<style lang="scss">
@media only screen and (max-width: 512px) {
	// on mobile, modal-container has top: 50px
	.text-editor {
		top: auto;
	}
}
</style>
