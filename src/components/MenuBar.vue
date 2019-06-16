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
	<editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
		<div class="menubar">
			<div ref="menubar" class="menubar-icons">
				<template v-for="(icon, $index) in allIcons">
					<button v-if="icon.class" v-show="$index < iconCount" :key="icon.label"
						:class="getIconClasses(isActive, icon)" @click="clickIcon(commands, icon)" />
					<template v-else>
						<div v-show="$index < iconCount" :key="icon.label" v-click-outside="() => hideChildMenu(icon)"
							class="submenu">
							<button :class="childIconClass(isActive, icon.children, )" @click.prevent="toggleChildMenu(icon)" />
							<div :class="{open: isChildMenuVisible(icon)}" class="popovermenu menu-center">
								<popover-menu :menu="childPopoverMenu(isActive, commands, icon.children, icon)" />
							</div>
						</div>
					</template>
				</template>
				<actions>
					<template v-for="(icon, $index) in allIcons">
						<action-button v-if="icon.class && isHiddenInMenu($index)" :key="icon.class"
							:icon="icon.class" @click="clickIcon(commands, icon)">
							{{ icon.label }}
						</action-button>
						<template v-else-if="!icon.class && isHiddenInMenu($index)">
							<action-button v-for="childIcon in icon.children" :key="childIcon.class"
								:icon="childIcon.class"
								@click="clickIcon(commands, childIcon)">
								{{ childIcon.label }}
							</action-button>
						</template>
					</template>
				</actions>
			</div>
			<slot>
				Left side
			</slot>
		</div>
	</editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'
import Tooltip from 'nextcloud-vue/dist/Directives/Tooltip'
import menuBarIcons from './../mixins/menubar'
import { fetchFileInfo } from './../helpers'

import Actions from 'nextcloud-vue/dist/Components/Actions'
import ActionButton from 'nextcloud-vue/dist/Components/ActionButton'
import PopoverMenu from 'nextcloud-vue/dist/Components/PopoverMenu'
import ClickOutside from 'vue-click-outside'

export default {
	name: 'MenuBar',
	components: {
		EditorMenuBar,
		ActionButton,
		PopoverMenu,
		Actions
	},
	directives: {
		Tooltip,
		ClickOutside
	},
	props: {
		editor: {
			type: Object,
			required: false,
			default: null
		}
	},
	data: () => {
		return {
			windowWidth: 0,
			windowHeight: 0,
			forceRecompute: 0,
			submenuVisibility: {},
			icons: [...menuBarIcons]
		}
	},
	computed: {
		isPublic() {
			return document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'
		},
		isHiddenInMenu() {
			return ($index) => $index - this.iconCount >= 0
		},
		getIconClasses() {
			return (isActive, icon) => {
				let classes = {
					'is-active': icon.isActive(isActive)
				}
				classes[icon.class] = true
				return classes
			}
		},
		isChildMenuVisible() {
			return (icon) => {
				return this.submenuVisibility.hasOwnProperty(icon.label) ? this.submenuVisibility[icon.label] : false
			}
		},
		allIcons() {
			if (this.isPublic) {
				return this.icons
			}
			return [...this.icons, {
				label: 'Insert image',
				class: 'icon-image',
				isActive: () => {
				},
				action: (commands) => {
					this.showImagePrompt(commands.image)
				}
			}]
		},
		childPopoverMenu() {
			return (isActive, commands, icons, parent) => {
				let popoverMenuItems = []
				for (const index in icons) {
					popoverMenuItems.push({
						text: icons[index].label,
						icon: icons[index].class,
						action: () => {
							icons[index].action(commands)
							this.hideChildMenu(parent)
						},
						active: icons[index].isActive(isActive)
					})
				}
				return popoverMenuItems
			}
		},
		childIconClass() {
			return (isActive, icons) => {
				for (const index in icons) {
					var icon = icons[index]
					if (icon.isActive(isActive)) {
						return icon.class
					}
				}
				return 'icon-h1'
			}
		},
		iconCount() {
			this.forceRecompute // eslint-disable-line
			this.windowWidth // eslint-disable-line
			const menuBarWidth = this.$refs.menubar ? this.$refs.menubar.clientWidth : this.windowWidth - 200
			const iconCount = Math.max((Math.floor(menuBarWidth / 44) - 2), 0)
			return iconCount
		}
	},
	beforeMount() {
		this.redrawMenuBar()
	},
	mounted() {
		window.addEventListener('resize', this.getWindowWidth)
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
			const lastValue = this.submenuVisibility.hasOwnProperty(icon.label) ? this.submenuVisibility[icon.label] : false
			this.$set(this.submenuVisibility, icon.label, !lastValue)
		},
		showImagePrompt(command) {
			const currentUser = OC.getCurrentUser()
			if (!currentUser) {
				return
			}
			const _command = command
			OC.dialogs.filepicker('Insert an image', (file) => {
				fetchFileInfo(currentUser.uid, file).then((info) => {
					const fileInfo = info[0]
					console.debug(fileInfo)
					const previewUrl = OC.generateUrl('/core/preview?') + `fileId=${fileInfo.id}&x=1024&y=1024&a=true`
					const internalLink = OC.generateUrl('/f/' + fileInfo.id)

					// dirty but works so we have the information stored in markdown
					const appendMeta = {
						mimetype: fileInfo.mimetype,
						hasPreview: fileInfo.hasPreview,
						fileId: fileInfo.id
					}
					const src = (fileInfo.hasPreview ? previewUrl : internalLink)
						+ '#'
						+ Object.entries(appendMeta).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')

					_command({
						src: src,
						alt: fileInfo.name
					})
				})
			}, false, false, true)
		}
	}
}
</script>

<style scoped lang="scss">
	.menubar {
		position: fixed;
		position: sticky;
		top: 0;
		display: flex;
		z-index: 10010; // above modal-header so buttons are clickable
		background-color: var(--color-main-background-translucent);
		height: 44px;
		.menubar-icons {
			flex-grow: 1;
			margin-left: calc((100vw - 660px) / 2);
		}
		@media (max-width: 660px) {
			.menubar-icons {
				margin-left: 0;
			}
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
	}

	.menubar .submenu {
		display: inline-block;
		width: 44px;
		height: 44px;
		position: relative;
		vertical-align: top;
	}
</style>
