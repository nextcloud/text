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
	<EditorMenuBar v-slot="{ commands, isActive, focused }" :editor="editor">
		<div class="menubar" :class="{ 'is-focused': focused, 'autohide': autohide }">
			<input
				ref="imageFileInput"
				type="file"
				accept="image/*"
				aria-hidden="true"
				class="hidden-visually"
				@change="onImageUploadFilePicked">
			<div v-if="isRichEditor" ref="menubar" class="menubar-icons">
				<template v-for="(icon, $index) in allIcons">
					<EmojiPicker v-if="icon.class === 'icon-emoji'"
						:key="icon.label"
						class="menuitem-emoji"
						@select="emojiObject => addEmoji(commands, allIcons.find(i => i.class === 'icon-emoji'), emojiObject)">
						<button v-tooltip="t('text', 'Insert emoji')"
							class="icon-emoji"
							:aria-label="t('text', 'Insert emoji')"
							:aria-haspopup="true" />
					</EmojiPicker>
					<Actions v-else-if="icon.class === 'icon-image'"
						:key="icon.label"
						ref="imageActions"
						class="submenu"
						:default-icon="'icon-image'"
						@close="onImageActionClose">
						<button slot="icon"
							:class="{ 'icon-image': true, 'loading-small': uploadingImage }"
							:title="icon.label"
							:aria-label="icon.label"
							:aria-haspopup="true" />
						<ActionButton
							icon="icon-upload"
							:close-after-click="true"
							@click="onUploadImage(commands.image)">
							{{ t('text', 'Upload from computer') }}
						</ActionButton>
						<ActionButton v-if="!isPublic"
							icon="icon-folder"
							:close-after-click="true"
							@click="showImagePrompt(commands.image)">
							{{ t('text', 'Insert from Files') }}
						</ActionButton>
						<ActionButton v-show="!showImageLinkPrompt"
							icon="icon-link"
							:close-after-click="false"
							@click="showImageLinkPrompt = true">
							{{ t('text', 'Insert from link') }}
						</ActionButton>
						<ActionInput v-show="showImageLinkPrompt"
							icon="icon-link"
							:value="imageLink"
							@update:value="onImageLinkUpdateValue"
							@submit="onImageLinkSubmit(commands.image)">
							{{ t('text', 'Image link to insert') }}
						</ActionInput>
					</Actions>
					<button v-else-if="icon.class"
						v-show="$index < iconCount"
						:key="icon.label"
						v-tooltip="getLabelAndKeys(icon)"
						:class="getIconClasses(isActive, icon)"
						:disabled="disabled(commands, icon)"
						@click="clickIcon(commands, icon)" />
					<template v-else>
						<div v-show="$index < iconCount || !icon.class"
							:key="icon.label"
							v-click-outside="() => hideChildMenu(icon)"
							class="submenu">
							<button v-tooltip="getLabelAndKeys(icon)"
								:class="childIconClasses(isActive, icon.children, )"
								@click.prevent="toggleChildMenu(icon)" />
							<div :class="{open: isChildMenuVisible(icon)}" class="popovermenu menu-center">
								<PopoverMenu :menu="childPopoverMenu(isActive, commands, icon.children, icon)" />
							</div>
						</div>
					</template>
				</template>
				<Actions>
					<template v-for="(icon, $index) in allIcons">
						<ActionButton v-if="icon.class && isHiddenInMenu($index) && !(icon.class === 'icon-emoji')"
							:key="icon.class"
							v-tooltip="getKeys(icon)"
							:icon="icon.class"
							:close-after-click="true"
							@click="clickIcon(commands, icon)">
							{{ icon.label }}
						</ActionButton>
						<!--<template v-else-if="!icon.class && isHiddenInMenu($index)">
							<ActionButton v-for="childIcon in icon.children"
								:key="childIcon.class"
								:icon="childIcon.class"
								@click="clickIcon(commands, childIcon)">
								v-tooltip="getKeys(childIcon)"
								{{ childIcon.label }}
							</ActionButton>
						</template>-->
					</template>
				</Actions>
			</div>
			<slot>
				Left side
			</slot>
		</div>
	</EditorMenuBar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'
import Tooltip from '@nextcloud/vue/dist/Directives/Tooltip'
import menuBarIcons from './../mixins/menubar'
import isMobile from './../mixins/isMobile'

import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import ActionInput from '@nextcloud/vue/dist/Components/ActionInput'
import PopoverMenu from '@nextcloud/vue/dist/Components/PopoverMenu'
import EmojiPicker from '@nextcloud/vue/dist/Components/EmojiPicker'
import ClickOutside from 'vue-click-outside'
import { getCurrentUser } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'

const imageMimes = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
	'image/x-xbitmap',
	'image/x-ms-bmp',
	'image/bmp',
	'image/svg+xml',
	'image/webp',
]

export default {
	name: 'MenuBar',
	components: {
		EditorMenuBar,
		ActionButton,
		ActionInput,
		PopoverMenu,
		Actions,
		EmojiPicker,
	},
	directives: {
		Tooltip,
		ClickOutside,
	},
	mixins: [
		isMobile,
	],
	props: {
		editor: {
			type: Object,
			required: false,
			default: null,
		},
		isRichEditor: {
			type: Boolean,
			default: true,
		},
		autohide: {
			type: Boolean,
			default: false,
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
		filePath: {
			type: String,
			required: false,
			default: '',
		},
		fileId: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	data: () => {
		return {
			windowWidth: 0,
			windowHeight: 0,
			forceRecompute: 0,
			submenuVisibility: {},
			lastImagePath: null,
			showImageLinkPrompt: false,
			uploadingImage: false,
			imageLink: '',
			icons: [...menuBarIcons],
		}
	},
	computed: {
		isHiddenInMenu() {
			return ($index) => $index - this.iconCount >= 0
		},
		getIconClasses() {
			return (isActive, icon) => {
				const classes = {
					'is-active': typeof icon.isActive === 'function' ? icon.isActive(isActive) : false,
				}
				classes[icon.class] = true
				return classes
			}
		},
		disabled() {
			return (commands, menuItem) => {
				return false
				// FIXME with this we seem to be running into an endless rerender loop, so this needs more investigation at some later point
				// typeof menuItem.isDisabled === 'function' ? menuItem.isDisabled()(commands) : false
			}
		},
		isChildMenuVisible() {
			return (icon) => {
				return Object.prototype.hasOwnProperty.call(this.submenuVisibility, icon.label) ? this.submenuVisibility[icon.label] : false
			}
		},
		allIcons() {
			let icons = this.icons
			if (!this.isPublic) {
				icons = [...icons, {
					label: t('text', 'Insert image'),
					class: 'icon-image',
					isActive: () => {
					},
					action: (commands) => {
						this.showImagePrompt(commands.image)
					},
				}]
			}

			return [...icons, {
				label: t('text', 'Formatting help'),
				class: 'icon-info',
				isActive: () => {
				},
				action: (commands) => {
					this.$emit('show-help')
				},
			}]
		},
		childPopoverMenu() {
			return (isActive, commands, icons, parent) => {
				const popoverMenuItems = []
				for (const index in icons) {
					popoverMenuItems.push({
						// text: this.getLabelAndKeys(icons[index]),
						text: icons[index].label,
						icon: icons[index].class,
						action: () => {
							icons[index].action(commands)
							this.hideChildMenu(parent)
						},
						active: icons[index].isActive(isActive),
					})
				}
				return popoverMenuItems
			}
		},
		childIconClasses() {
			return (isActive, icons) => {
				const icon = this.childIcon(isActive, icons)
				return this.getIconClasses(isActive, icon)
			}
		},
		childIcon() {
			return (isActive, icons) => {
				for (const index in icons) {
					const icon = icons[index]
					if (icon.isActive(isActive)) {
						return icon
					}
				}
				return icons[0]
			}
		},
		iconCount() {
			this.forceRecompute // eslint-disable-line
			this.windowWidth // eslint-disable-line
			const menuBarWidth = this.$refs.menubar && this.$refs.menubar.clientWidth > 200 ? this.$refs.menubar.clientWidth : 200
			const iconCount = Math.max((Math.floor(menuBarWidth / 44) - 2), 0)
			return iconCount - 1
		},
		imagePath() {
			return this.lastImagePath
				|| this.filePath.split('/').slice(0, -1).join('/')
		},
		sharingToken() {
			return document.getElementById('sharingToken')
				&& document.getElementById('sharingToken').value
		},
	},
	mounted() {
		window.addEventListener('resize', this.getWindowWidth)
		this.checkInterval = setInterval(() => {
			const isWidthAvailable = (this.$refs.menubar && this.$refs.menubar.clientWidth > 0)
			if (this.isRichEditor && isWidthAvailable) {
				this.redrawMenuBar()
			}
			if (!this.isRichEditor || isWidthAvailable) {
				clearInterval(this.checkInterval)
			}
		}, 100)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getWindowWidth)
	},
	methods: {
		redrawMenuBar() {
			this.$nextTick(() => {
				this.getWindowWidth()
				this.forceRecompute++
			})
		},
		clickIcon(commands, icon) {
			this.editor.focus()
			return icon.action(commands)
		},
		getWindowWidth(event) {
			this.windowWidth = document.documentElement.clientWidth
		},
		getWindowHeight(event) {
			this.windowHeight = document.documentElement.clientHeight
		},
		hideChildMenu(icon) {
			this.$set(this.submenuVisibility, icon.label, false)
		},
		toggleChildMenu(icon) {
			const lastValue = Object.prototype.hasOwnProperty.call(this.submenuVisibility, icon.label) ? this.submenuVisibility[icon.label] : false
			this.$set(this.submenuVisibility, icon.label, !lastValue)
		},
		onImageActionClose() {
			this.showImageLinkPrompt = false
		},
		onUploadImage(command) {
			this.imageCommand = command
			this.$refs.imageFileInput.click()
		},
		onImageUploadFilePicked(event) {
			this.uploadingImage = true
			const files = event.target.files
			const image = files[0]
			if (!imageMimes.includes(image.type)) {
				showError(t('text', 'Image format not supported'))
				this.imageCommand = null
				this.uploadingImage = false
				return
			}

			// Clear input to ensure that the change event will be emitted if
			// the same file is picked again.
			event.target.value = ''

			const formData = new FormData()
			formData.append('image', image)
			formData.append('textFileId', this.fileId)
			if (this.isPublic) {
				formData.append('shareToken', this.sharingToken)
			}
			const url = this.isPublic
				? generateUrl('/apps/text/public/image/upload')
				: generateUrl('/apps/text/image/upload')
			axios.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then((response) => {
				this.insertAttachmentImage(response.data?.name, response.data?.id, this.imageCommand, response.data?.textFileId)
			}).catch((error) => {
				console.error(error)
				showError(error?.response?.data?.error)
			}).then(() => {
				this.imageCommand = null
				this.uploadingImage = false
			})
		},
		onImageLinkUpdateValue(newImageLink) {
			// this avoids the input being reset on each file polling
			this.imageLink = newImageLink
		},
		onImageLinkSubmit(command) {
			this.uploadingImage = true
			this.showImageLinkPrompt = false
			this.$refs.imageActions[0].closeMenu()

			const params = {
				textFileId: this.fileId,
				link: this.imageLink,
			}
			if (this.isPublic) {
				params.shareToken = this.sharingToken
			}
			const url = this.isPublic
				? generateUrl('/apps/text/public/image/link')
				: generateUrl('/apps/text/image/link')
			axios.post(url, params).then((response) => {
				this.insertAttachmentImage(response.data?.name, response.data?.id, command, response.data?.textFileId)
			}).catch((error) => {
				console.error(error)
				showError(error?.response?.data?.error)
			}).then(() => {
				this.uploadingImage = false
				this.imageLink = ''
			})
		},
		onImagePathSubmit(imagePath, command) {
			this.uploadingImage = true
			this.$refs.imageActions[0].closeMenu()

			const params = {
				textFileId: this.fileId,
				imagePath,
			}
			const url = generateUrl('/apps/text/image/filepath')
			axios.post(url, params).then((response) => {
				this.insertAttachmentImage(response.data?.name, response.data?.id, command, response.data?.textFileId)
			}).catch((error) => {
				console.error(error)
				showError(error?.response?.data?.error)
			}).then(() => {
				this.uploadingImage = false
			})
		},
		showImagePrompt(command) {
			const currentUser = getCurrentUser()
			if (!currentUser) {
				return
			}
			OC.dialogs.filepicker(t('text', 'Insert an image'), (file) => {
				this.onImagePathSubmit(file, command)
			}, false, [], true, undefined, this.imagePath)
		},
		insertAttachmentImage(name, fileId, command, textFileId) {
			const src = 'text://image?textFileId=' + textFileId + '&imageFileId=' + fileId
			command({
				src,
				alt: name,
			})
		},
		showLinkPrompt(command) {
			const currentUser = getCurrentUser()
			if (!currentUser) {
				return
			}
			const _command = command
			OC.dialogs.filepicker('Insert a link', (file) => {
				const client = OC.Files.getClient()
				client.getFileInfo(file).then((_status, fileInfo) => {
					this.lastLinkPath = fileInfo.path
					const path = this.optimalPathTo(`${fileInfo.path}/${fileInfo.name}`)
					const encodedPath = path.split('/').map(encodeURIComponent).join('/')
					const href = `${encodedPath}?fileId=${fileInfo.id}`

					_command({
						href,
					})
				})
			}, false, [], true, undefined, this.linkPath)
		},
		optimalPathTo(targetFile) {
			const absolutePath = targetFile.split('/')
			const relativePath = this.relativePathTo(targetFile).split('/')
			return relativePath.length < absolutePath.length
				? relativePath.join('/')
				: targetFile
		},
		relativePathTo(targetFile) {
			const current = this.filePath.split('/')
			const target = targetFile.split('/')
			current.pop() // ignore filename
			while (current[0] === target[0]) {
				current.shift()
				target.shift()
			}
			return current.fill('..').concat(target).join('/')
		},
		addEmoji(commands, icon, emojiObject) {
			return icon.action(commands, emojiObject)
		},
		keysString(keyChar, modifiers = []) {
			const translations = {
				ctrl: t('text', 'Ctrl'),
				alt: t('text', 'Alt'),
				shift: t('text', 'Shift'),
			}
			return Object.entries(translations)
				.filter(([k, v]) => modifiers.includes(k))
				.map(([k, v]) => v)
				.concat(keyChar.toUpperCase())
				.join('+')
		},
		getKeys(icon) {
			return (icon.keyChar && !this.isMobile)
				? `(${this.keysString(icon.keyChar, icon.keyModifiers)})`
				: ''
		},
		getLabelAndKeys(icon) {
			return [icon.label, this.getKeys(icon)].join(' ')
		},
	},
}
</script>

<style scoped lang="scss">
	.menubar {
		--background-blur: blur(10px);
		position: fixed;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		display: flex;
		justify-content: flex-end;
		z-index: 10021; // above modal-header and menububble so menubar is always on top
		background-color: var(--color-main-background-translucent);
		-webkit-backdrop-filter: var(--background-blur);
		backdrop-filter: var(--background-blur);
		min-height: 50px; // important for mobile so that the buttons are always inside the container
		padding-top:3px;
		padding-bottom: 3px;

		&.autohide {
			visibility: hidden;
			opacity: 0;
			transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
			&.is-focused {
				visibility: visible;
				opacity: 1;
			}
		}
		.menubar-icons {
			flex-grow: 1;
			margin-left: calc((100% - 660px) / 2);
		}
		@media (max-width: 660px) {
			.menubar-icons {
				margin-left: 0;
			}
		}
		&::v-deep .action-item__menu ul {
			max-height: calc(100vh - 88px);
			overflow: scroll;
		}
	}

	.menubar button {
		position: relative;
		width: 44px;
		height: 44px;
		margin: 0;
		background-size: 16px;
		border: 0;
		background-color: transparent;
		opacity: .5;
		color: var(--color-main-text);
		background-position: center center;
		vertical-align: top;
		&:hover, &:focus, &:active {
			background-color: var(--color-background-dark);
		}

		&.is-active::before {
			transform: translateX(-50%);
			border-radius: 100%;
			position: absolute;
			background: var(--color-primary-element);
			bottom: 3px;
			height: 6px;
			width: 6px;
			content: '';
			left: 50%;

		}
		&.is-active,
		&:hover,
		&:focus {
			opacity: 1;
		}

		&.icon-undo,
		&.icon-redo {
			opacity: .8;

			&:disabled {
				opacity: .4;
			}
		}
	}

	.menubar .submenu, .menubar .menuitem-emoji {
		display: inline-block;
		width: 44px;
		height: 44px;
		position: relative;
		vertical-align: top;
	}
</style>
