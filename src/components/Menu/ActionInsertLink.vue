<!--
	- @copyright Copyright (c) 2022
	-
	- @license AGPL-3.0-or-later
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
	<NcActions ref="menu"
		class="entry-action entry-action__insert-link"
		aria-haspopup
		:aria-label="actionEntry.label"
		:class="activeClass"
		:container="menuIDSelector"
		:data-text-action-entry="actionEntry.key"
		:title="actionEntry.label">
		<template #icon>
			<component :is="icon"
				:title="actionEntry.label"
				:aria-label="actionEntry.label"
				aria-haspopup />
		</template>
		<NcActionButton v-if="state.active"
			close-after-click
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
			close-after-click
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
import { FilePicker, FilePickerType } from '@nextcloud/dialogs'
import { loadState } from '@nextcloud/initial-state'

import { getMarkAttributes, isActive } from '@tiptap/core'

import { Document, Loading, LinkOff, Web, Shape } from '../icons.js'
import { BaseActionEntry } from './BaseActionEntry.js'
import { optimalPath } from '../../helpers/files.js'
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
			href: null,
			isInputMode: false,
			startPath: null,
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

			const filePicker = new FilePicker(
				t('text', 'Select file or folder to link to'),
				false, // multiselect
				[], // mime filter
				true, // modal
				FilePickerType.Choose, // type
				true, // directories
				this.startPath, // path
			)

			filePicker.pick().then((file) => {
				const client = OC.Files.getClient()
				client.getFileInfo(file).then((_status, fileInfo) => {
					const path = optimalPath(this.relativePath, `${fileInfo.path}/${fileInfo.name}`)
					const encodedPath = path.split('/').map(encodeURIComponent).join('/') + (fileInfo.type === 'dir' ? '/' : '')
					const href = `${encodedPath}?fileId=${fileInfo.id}`
					this.setLink(href, fileInfo.name)
					this.startPath = fileInfo.path + (fileInfo.type === 'dir' ? `/${fileInfo.name}/` : '')
				})
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
				// Close menu manually as autoclose does not work form ActionInput
				this.$refs.menu.closeMenu()
				this.isInputMode = false
				this.href = null
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
			// Check if any text is selected, if not insert the lunk using the given text property
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
		},
		linkPicker() {
			getLinkWithPicker(null, true)
				.then(link => {
					this.$editor
						.chain()
						.focus()
						.insertContent(link + ' ')
						.run()
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
