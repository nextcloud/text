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
			<div v-if="isRichEditor" ref="menubar" class="menubar-icons">
				<template v-for="(icon, $index) in allIcons">
					<button v-if="icon.class"
						v-show="$index < iconCount"
						:key="icon.label"
						:title="icon.label"
						:class="getIconClasses(isActive, icon)"
						@click="clickIcon(commands, icon)" />
					<template v-else>
						<div v-show="$index < iconCount || !icon.class"
							:key="icon.label"
							v-click-outside="() => hideChildMenu(icon)"
							class="submenu">
							<button :class="childIconClasses(isActive, icon.children, )"
								:title="icon.label"
								@click.prevent="toggleChildMenu(icon)" />
							<div :class="{open: isChildMenuVisible(icon)}" class="popovermenu menu-center">
								<PopoverMenu :menu="childPopoverMenu(isActive, commands, icon.children, icon)" />
							</div>
						</div>
					</template>
				</template>
				<Actions>
					<template v-for="(icon, $index) in allIcons">
						<ActionButton v-if="icon.class && isHiddenInMenu($index)"
							:key="icon.class"
							:icon="icon.class"
							@click="clickIcon(commands, icon)">
							{{ icon.label }}
						</ActionButton>
						<!--<template v-else-if="!icon.class && isHiddenInMenu($index)">
							<ActionButton v-for="childIcon in icon.children"
								:key="childIcon.class"
								:icon="childIcon.class"
								@click="clickIcon(commands, childIcon)">
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
import { optimalPath } from './../helpers/files'

import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import PopoverMenu from '@nextcloud/vue/dist/Components/PopoverMenu'
import ClickOutside from 'vue-click-outside'
import { getCurrentUser } from '@nextcloud/auth'

export default {
	name: 'MenuBar',
	components: {
		EditorMenuBar,
		ActionButton,
		PopoverMenu,
		Actions,
	},
	directives: {
		Tooltip,
		ClickOutside,
	},
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
	},
	data: () => {
		return {
			windowWidth: 0,
			windowHeight: 0,
			forceRecompute: 0,
			submenuVisibility: {},
			lastImagePath: null,
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
					'is-active': icon.isActive(isActive),
				}
				classes[icon.class] = true
				return classes
			}
		},
		isChildMenuVisible() {
			return (icon) => {
				return Object.prototype.hasOwnProperty.call(this.submenuVisibility, icon.label) ? this.submenuVisibility[icon.label] : false
			}
		},
		allIcons() {
			if (this.isPublic) {
				return this.icons
			}
			return [...this.icons, {
				label: t('text', 'Insert image'),
				class: 'icon-image',
				isActive: () => {
				},
				action: (commands) => {
					this.showImagePrompt(commands.image)
				},
			}]
		},
		childPopoverMenu() {
			return (isActive, commands, icons, parent) => {
				const popoverMenuItems = []
				for (const index in icons) {
					popoverMenuItems.push({
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
			return iconCount
		},
		imagePath() {
			return this.lastImagePath
				|| this.filePath.split('/').slice(0, -1).join('/')
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
		showImagePrompt(command) {
			const currentUser = getCurrentUser()
			if (!currentUser) {
				return
			}
			const _command = command
			OC.dialogs.filepicker(t('text', 'Insert an image'), (file) => {
				const client = OC.Files.getClient()
				client.getFileInfo(file).then((_status, fileInfo) => {
					this.lastImagePath = fileInfo.path

					// dirty but works so we have the information stored in markdown
					const appendMeta = {
						mimetype: fileInfo.mimetype,
						hasPreview: fileInfo.hasPreview,
					}
					const path = optimalPath(this.filePath, `${fileInfo.path}/${fileInfo.name}`)
					const encodedPath = path.split('/').map(encodeURIComponent).join('/')
					const meta = Object.entries(appendMeta).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')
					const src = `${encodedPath}?fileId=${fileInfo.id}#${meta}`

					_command({
						src,
						alt: fileInfo.name,
					})
				})
			}, false, [], true, undefined, this.imagePath)
		},
		showLinkPrompt(command) {
			const currentUser = OC.getCurrentUser()
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
	},
}
</script>

<style scoped lang="scss">
	.menubar {
		position: fixed;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		display: flex;
		z-index: 10010; // above modal-header so buttons are clickable
		background-color: var(--color-main-background-translucent);
		height: 44px;

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
		&.is-active,
		&:hover,
		&:focus {
			opacity: 1;
		}

		&.icon-undo, &.icon-redo {
			opacity: .4;
		}
	}

	.menubar .submenu {
		display: inline-block;
		width: 44px;
		height: 44px;
		position: relative;
		vertical-align: top;
	}
</style>
