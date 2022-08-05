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
	<Modal v-if="active" :title="fileName" @close="close">
		<Editor :file-id="fileId"
			:relative-path="relativePath"
			:active="active"
			:share-token="shareToken"
			:mime="mimeType" />
	</Modal>
</template>

<script>
import { Modal } from '@nextcloud/vue'

export default {
	name: 'PublicFilesEditor',
	components: {
		Modal,
		Editor: () => import(/* webpackChunkName: "editor" */'./Editor.vue'),
	},
	props: {
		fileId: {
			type: Number,
			default: null,
		},
		relativePath: {
			type: String,
			default: null,
		},
		active: {
			type: Boolean,
			default: false,
		},
		shareToken: {
			type: String,
			default: null,
		},
		mimeType: {
			type: String,
			default: null,
		},
	},
	computed: {
		fileName() {
			return this.relativePath.substring(this.relativePath.lastIndexOf('/') + 1)
		},
	},
	methods: {
		close() {
			this.$emit('close')
		},
	},
}
</script>
