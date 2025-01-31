<template>
	<div class="container-suggestions">
		<NcButton ref="linkFileOrFolder"
			type="tertiary"
			size="normal"
			@click="linkFile">
			<template #icon>
				<Document :size="20" />
			</template>
			{{ t('text', 'Link to file or folder') }}
		</NcButton>

		<NcButton type="tertiary"
			size="normal"
			@click="$callChooseLocalAttachment">
			<template #icon>
				<Document :size="20" />
			</template>
			{{ t('text', 'Upload') }}
		</NcButton>

		<NcButton type="tertiary"
			size="normal"
			@click="insertTable">
			<template #icon>
				<Table :size="20" />
			</template>
			{{ t('text', 'Insert Table') }}
		</NcButton>

		<NcButton type="tertiary"
			size="normal"
			@click="linkPicker">
			<template #icon>
				<Shape :size="20" />
			</template>
			{{ t('text', 'Smart Picker') }}
		</NcButton>
	</div>
</template>

<script>
import { NcButton } from '@nextcloud/vue'
import { Document, Table, Shape } from './icons.js'
import { useActionChooseLocalAttachmentMixin } from './Editor/MediaHandler.provider.js'
import { getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'
import { useEditorMixin, useFileMixin } from './Editor.provider.js'
import { generateUrl } from '@nextcloud/router'
import { buildFilePicker } from '../helpers/filePicker.js'

export default {
	name: 'SuggestionsBar',
	components: {
		Table,
		Document,
		NcButton,
		Shape,
	},
	mixins: [
		useActionChooseLocalAttachmentMixin,
		useEditorMixin,
		useFileMixin,
	],

	data: () => {
		return {
			startPath: null,
		}
	},

	computed: {
		relativePath() {
			return this.$file?.relativePath ?? '/'
		},
	},

	methods: {
		/**
		 * Open smart picker dialog
		 * Triggered by the "Smart Picker" button
		 */
		linkPicker() {
			getLinkWithPicker(null, true)
				.then(link => {
					const chain = this.$editor.chain()
					if (this.$editor.view.state?.selection.empty) {
						chain.focus().insertPreview(link).run()
					} else {
						chain.setLink({ href: link }).focus().run()
					}
				})
				.catch(error => {
					console.error('Smart picker promise rejected', error)
				})
		},

		/**
		 * Insert table
		 * Triggered by the "Insert table" button
		 */
		insertTable() {
			this.$editor.chain().focus().insertTable()?.run()
		},

		/**
		 * Open dialog and ask user which file to link to
		 * Triggered by the "link to file or folder" button
		 */
		linkFile() {
			if (this.startPath === null) {
				this.startPath = this.relativePath.split('/').slice(0, -1).join('/')
			}

			const filePicker = buildFilePicker(this.startPath)

			filePicker.pick()
				.then((file) => {
					const client = OC.Files.getClient()
					client.getFileInfo(file).then((_status, fileInfo) => {
						const url = new URL(generateUrl(`/f/${fileInfo.id}`), window.origin)
						this.setLink(url.href, fileInfo.name)
						this.startPath = fileInfo.path + (fileInfo.type === 'dir' ? `/${fileInfo.name}/` : '')
					})
				})
				.catch(() => {
					// do not close menu but keep focus
					this.$refs.linkFileOrFolder.$el.focus()
				})
		},

		/**
		 * Save user entered URL as a link markup
		 * Triggered when the user submits the ActionInput
		 *
		 * @param {string} url href attribute of the link
		 * @param {string} text Text part of the link
		 */
		setLink(url, text) {
			this.$editor.chain().setOrInsertLink(url, text).focus().run()
		},
	},

}

</script>

<style scoped lang="scss">

.container-suggestions {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	align-content: flex-end;
	position: sticky;
}
</style>
