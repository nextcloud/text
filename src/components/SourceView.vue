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
			:fileId="fileid"
			readOnly
			hideMenuBar />
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
import { defineComponent } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue'
import MarkdownContentEditor from './Editor/MarkdownContentEditor.vue'
import PlainTextReader from './PlainTextReader.vue'
import { closingSaveOf } from '../helpers/closingSaves.ts'
import { logger } from '../helpers/logger.ts'

export default defineComponent({
	name: 'SourceView',
	components: {
		NcButton,
		PencilOutlineIcon,
		PlainTextReader,
		MarkdownContentEditor,
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

		/** Shows the file without waiting for an editor this view replaces to save it */
		skipClosingSave: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['edit', 'loaded', 'errored'],

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
				// The editor this view replaces may still be saving the file
				try {
					if (!this.skipClosingSave) {
						await closingSaveOf(this.fileid)
					}
				} catch (error) {
					logger.warn('The closing editor did not save', { error })
					this.$emit('errored', new Error(t('text', 'The latest edits could not be saved before comparing. Try again to compare the file as it is stored.')))
					return
				}
				// Files are served without caching rules, so browsers may reuse an old copy
				const response = await axios.get(this.source, { responseType: 'text', headers: { 'Cache-Control': 'no-cache' } })
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
})
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
