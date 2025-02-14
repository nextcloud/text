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
	<Editor v-if="!useSourceView"
		:file-id="fileid"
		:relative-path="filename"
		:active="active || isEmbedded"
		:autofocus="autofocus"
		:share-token="shareToken"
		:class="{ 'text-editor--embedding': isEmbedded }"
		:mime="mime"
		:show-outline-outside="showOutlineOutside" />
	<div v-else
		id="editor-container"
		data-text-el="editor-container"
		class="text-editor source-viewer">
		<Component :is="readerComponent" :content="content" />
		<NcButton v-if="isEmbedded" class="toggle-interactive" @click="toggleEdit">
			{{ t('text', 'Edit') }}
			<template #icon>
				<PencilIcon />
			</template>
		</NcButton>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from '@nextcloud/axios'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import PlainTextReader from './PlainTextReader.vue'
import RichTextReader from './RichTextReader.vue'
import { translate, translatePlural } from '@nextcloud/l10n'

import { getSharingToken } from '../helpers/token.js'
import getEditorInstance from './Editor.singleton.js'

Vue.prototype.t = translate
Vue.prototype.n = translatePlural

export default {
	name: 'ViewerComponent',
	components: {
		NcButton: Vue.extend(NcButton),
		PencilIcon: Vue.extend(PencilIcon),
		RichTextReader: Vue.extend(RichTextReader),
		PlainTextReader: Vue.extend(PlainTextReader),
		Editor: getEditorInstance,
	},
	provide() {
		return {
			isEmbedded: this.isEmbedded,
		}
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
		isEmbedded: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			content: '',
			hasToggledInteractiveEmbedding: false,
		}
	},
	computed: {
		/** @return {boolean} */
		useSourceView() {
			return this.source && (this.fileVersion || !this.fileid || this.isEmbedded) && !this.hasToggledInteractiveEmbedding
		},

		/** @return {boolean} */
		readerComponent() {
			return this.mime === 'text/markdown' ? RichTextReader : PlainTextReader
		},
	},

	watch: {
		source() {
			this.loadFileContent()
		},
	},

	mounted() {
		this.loadFileContent()
	},

	methods: {
		t: translate,
		async loadFileContent() {
			if (this.useSourceView) {
				const response = await axios.get(this.source)
				this.content = response.data
				this.contentLoaded = true
			}
			this.$emit('update:loaded', true)
		},
		toggleEdit() {
			this.hasToggledInteractiveEmbedding = true
		},
	},
}
</script>
<style lang="scss" scoped>
.text-editor:not(.viewer__file--hidden) {
	top: 0;
	width: 100%;
	max-width: 100%;
	height: 100%;
	left: 0;
	margin: 0 auto;
	position: relative;
	background-color: var(--color-main-background);

	&.source-viewer {
		display: block;

		.text-editor__content-wrapper {
			margin-top: var(--header-height);
		}

		.toggle-interactive {
			position: sticky;
			bottom: 0;
			right: 0;
			z-index: 1;
			margin-left: auto;
			margin-right: 0;
		}
	}

	&.text-editor--embedding {
		min-height: 400px;
	}

}
</style>
<style lang="scss">
@import './../css/variables';
@media only screen and (max-width: 512px) {
	// on mobile, modal-container has top: 50px
	.text-editor {
		top: auto;
	}
}

body .toastify.dialogs {
	// Move the dialogs below the toolbar / status
	margin-top: calc(45px + var(--default-clickable-area));
}

.viewer[data-handler='text'] .modal-wrapper .modal-container {
	bottom: 0;
}
</style>
