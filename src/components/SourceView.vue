<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		id="editor-container"
		data-text-el="editor-container"
		class="text-editor source-viewer">
		<Component
			:is="readerComponent"
			:content="content"
			:file-id="fileid"
			:read-only="true"
			:show-menu-bar="false" />
		<NcButton
			v-if="isEmbedded"
			class="toggle-interactive"
			@click="$emit('edit')">
			{{ t('text', 'Edit') }}
			<template #icon>
				<PencilOutlineIcon />
			</template>
		</NcButton>
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { getClient, getRootPath } from '@nextcloud/files/dav'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import Vue from 'vue'
import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue'
import MarkdownContentEditor from './Editor/MarkdownContentEditor.vue'
import PlainTextReader from './PlainTextReader.vue'

export default {
	name: 'SourceView',
	components: {
		NcButton: Vue.extend(NcButton),
		PencilOutlineIcon: Vue.extend(PencilOutlineIcon),
		PlainTextReader: Vue.extend(PlainTextReader),
		MarkdownContentEditor: Vue.extend(MarkdownContentEditor),
	},
	inject: ['isEmbedded'],
	props: {
		filename: {
			type: String,
			default: null,
		},
		fileid: {
			type: Number,
			default: null,
		},
		mime: {
			type: String,
			default: null,
		},
		source: {
			type: String,
			default: undefined,
		},
		isEncrypted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			content: '',
		}
	},
	computed: {
		isMarkdown() {
			return (
				this.mime === 'text/markdown' || this.mime === 'text/x-web-markdown'
			)
		},

		readerComponent() {
			return this.isMarkdown ? MarkdownContentEditor : PlainTextReader
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
		async loadFileContent() {
			if (this.isEncrypted) {
				this.content = await this.fetchDecryptedContent()
				this.contentLoaded = true
			} else {
				const response = await axios.get(this.source)
				this.content = response.data
				this.contentLoaded = true
			}
			this.$emit('loaded', true)
		},
		async fetchDecryptedContent() {
			const client = getClient()
			const response = await client.getFileContents(
				`${getRootPath()}${this.filename}`,
				{ details: true },
			)
			const blob = new Blob([response.data], {
				type: response.headers['content-type'],
			})
			const reader = new FileReader()
			reader.readAsText(blob)
			return new Promise((resolve) => {
				reader.onload = () => {
					resolve(reader.result)
				}
			})
		},
		t,
	},
}
</script>
<style lang="scss" scoped>
.source-viewer {
	display: block;

	.editor__content-wrapper {
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
</style>
