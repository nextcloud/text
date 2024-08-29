<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcActions class="entry-action entry-action__insert-link"
		:title="actionEntry.label"
		:aria-label="actionEntry.label"
		:class="activeClass"
		:container="menuIDSelector"
		:data-text-action-entry="actionEntry.key"
		:name="actionEntry.label"
		:open="menuOpen"
		@update:open="(open) => { menuOpen = menuOpen || open }">
		<template #icon>
			<component :is="icon"
				:name="actionEntry.label"
				:aria-label="actionEntry.label" />
		</template>
		<NcActionButton v-if="state.active"
			:data-text-action-entry="`${actionEntry.key}-remove`"
			@click="removeLink">
			<template #icon>
				<LinkOff />
			</template>
			{{ t('text', 'Remove link') }}
		</NcActionButton>
		<NcActionButton v-if="!isUsingDirectEditing"
			ref="buttonFile"
			:data-text-action-entry="`${actionEntry.key}-file`"
			@click="linkFile">
			<template #icon>
				<Document />
			</template>
			{{ t('text', 'Link to file or folder') }}
		</NcActionButton>
		<NcActionInput v-if="isInputMode"
			type="text"
			:value.sync="href"
			:data-text-action-entry="`${actionEntry.key}-input`"
			@submit="linkWebsite">
			<template #icon>
				<Web />
			</template>
			{{ t('text', 'Link to website') }}
		</NcActionInput>
		<NcActionButton v-else
			:data-text-action-entry="`${actionEntry.key}-website`"
			@click="linkWebsite">
			<template #icon>
				<Web />
			</template>
			{{ state.active ? t('text', 'Update link') : t('text', 'Link to website') }}
		</NcActionButton>
		<NcActionButton :data-text-action-entry="`${actionEntry.key}-picker`"
			@click="linkPicker">
			<template #icon>
				<Shape />
			</template>
			{{ t('text', 'Open the Smart Picker') }}
		</NcActionButton>
	</NcActions>
</template>

<script>
import { NcActions, NcActionButton, NcActionInput } from '@nextcloud/vue'
import { getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'
import { FilePickerType, getFilePickerBuilder } from '@nextcloud/dialogs'
import { generateUrl } from '@nextcloud/router'
import { loadState } from '@nextcloud/initial-state'

import { getMarkAttributes, isActive } from '@tiptap/core'

import { Document, Loading, LinkOff, Web, Shape } from '../icons.js'
import { BaseActionEntry } from './BaseActionEntry.js'
import { useFileMixin } from '../Editor.provider.js'
import { useMenuIDMixin } from './MenuBar.provider.js'

export default {
	name: 'ActionInsertLink',
	components: {
		NcActions,
		NcActionButton,
		NcActionInput,
		Document,
		Loading,
		LinkOff,
		Web,
		Shape,
	},
	extends: BaseActionEntry,
	mixins: [
		useFileMixin,
		useMenuIDMixin,
	],
	data: () => {
		return {
			href: '',
			isInputMode: false,
			startPath: null,
			/** Open state of the actions menu */
			menuOpen: false,
			isUsingDirectEditing: loadState('text', 'directEditingToken', null) !== null,
		}
	},
	computed: {
		activeClass() {
			return this.state.active ? 'is-active' : ''
		},
		relativePath() {
			return this.$file?.relativePath ?? '/'
		},
	},
	methods: {
		/**
		 * Open dialog and ask user which file to link to
		 * Triggered by the "link file" button
		 */
		linkFile() {
			if (this.startPath === null) {
				this.startPath = this.relativePath.split('/').slice(0, -1).join('/')
			}

			const filePicker = getFilePickerBuilder(t('text', 'Select file or folder to link to'))
				.startAt(this.startPath)
				.allowDirectories(true)
				.setMultiSelect(false)
				.setType(FilePickerType.Choose)
				.build()

			filePicker.pick()
				.then((file) => {
					const client = OC.Files.getClient()
					client.getFileInfo(file).then((_status, fileInfo) => {
						const url = new URL(generateUrl(`/f/${fileInfo.id}`), window.origin)
						this.setLink(url.href, fileInfo.name)
						this.startPath = fileInfo.path + (fileInfo.type === 'dir' ? `/${fileInfo.name}/` : '')
					})
					this.menuOpen = false
				})
				.catch(() => {
					// do not close menu but keep focus
					this.$refs.buttonFile.$el.focus()
				})
		},
		/**
		 * Allow user to enter an URL manually
		 * Triggered when by the "link url" button
		 *
		 * @param {Event} event Triggering event
		 */
		linkWebsite(event) {
			if (event?.type === 'submit') {
				const href = [...event.target.elements].filter(e => e?.type === 'text')[0].value
				this.menuOpen = false
				this.isInputMode = false
				this.href = ''
				return this.setLink(href, href)
			}

			if (isActive(this.$editor.state, 'link')) {
				const attrs = getMarkAttributes(this.$editor.state, 'link')
				this.href = attrs.href
			}
			this.isInputMode = true
		},
		/**
		 * Save user entered URL as a link markup
		 * Triggered when the user submits the ActionInput
		 *
		 * @param {string} url href attribute of the link
		 * @param {string} text Text part of the link
		 */
		setLink(url, text) {
			// Heuristics for determining if we need a https:// prefix.
			const noPrefixes = [
				/^[a-zA-Z]+:/, // url with protocol ("mailTo:email@domain.tld")
				/^\//, // absolute path
				/\?fileId=/, // relative link with fileId
				/^\.\.?\//, // relative link starting with ./ or ../
				/^[^.]*[/$]/, // no dots before first '/' - not a domain name
				/^#/, // url fragment
			]
			if (url && !noPrefixes.find(regex => url.match(regex))) {
				url = 'https://' + url
			}

			// Avoid issues when parsing urls later on in markdown that might be entered in an invalid format (e.g. "mailto: example@example.com")
			const href = url.replaceAll(' ', '%20')
			const chain = this.$editor.chain()
			// Check if any text is selected, if not insert the link using the given text property
			if (this.$editor.view.state?.selection.empty) {
				chain.insertContent({
					type: 'paragraph',
					content: [{
						type: 'text',
						marks: [{
							type: 'link',
							attrs: {
								href,
							},
						}],
						text,
					}],
				})
			} else {
				chain.setLink({ href })
			}
			chain.focus().run()
		},
		/**
		 * Remove link markup at current position
		 * Triggered by the "remove link" button
		 */
		removeLink() {
			this.$editor.chain().unsetLink().focus().run()
			this.menuOpen = false
		},
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
	},
}
</script>

<style scoped>
	.action {
		/* to unify width of ActionInput and ActionButton */
		min-width: 218px;
	}
</style>
