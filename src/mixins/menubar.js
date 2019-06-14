/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import Vue from 'vue'

const icons = [
	{
		label: t('text', 'Undo'),
		class: 'icon-undo',
		isActive: (isActive) => {},
		action: (command) => command.undo()
	},
	{
		label: 'Redo',
		class: 'icon-redo',
		isActive: (isActive) => {},
		action: (command) => command.redo()
	},
	{
		label: 'Bold',
		class: 'icon-bold',
		isActive: (isActive) => isActive.strong(),
		action: (command) => {
			return command.strong()
		}
	},
	{
		label: 'Italic',
		class: 'icon-italic',
		isActive: (isActive) => isActive.em(),
		action: (command) => {
			return command.em()
		}
	},
	{
		label: 'Strikethough',
		class: 'icon-strike',
		isActive: (isActive) => isActive.strike(),
		action: (command) => {
			return command.strike()
		}
	},
	{
		label: 'Paragraph',
		class: 'icon-paragraph',
		isActive: (isActive) => {},
		action: (command) => {
			return command.paragraph()
		}
	},
	{
		label: 'Headings',
		visible: false,
		children: [
			{
				label: 'Heading 1',
				class: 'icon-h1',
				isActive: (isActive) => isActive.heading({ level: 1 }),
				action: (command) => {
					return command.heading({ level: 1 })
				}
			},
			{
				label: 'Heading 2',
				class: 'icon-h2',
				isActive: (isActive) => isActive.heading({ level: 2 }),
				action: (command) => {
					return command.heading({ level: 2 })
				}
			},
			{
				label: 'Heading 3',
				class: 'icon-h3',
				isActive: (isActive) => isActive.heading({ level: 3 }),
				action: (command) => {
					return command.heading({ level: 3 })
				}
			},
			{
				label: 'Heading 4',
				class: 'icon-h4',
				isActive: (isActive) => isActive.heading({ level: 4 }),
				action: (command) => {
					return command.heading({ level: 4 })
				}
			},
			{
				label: 'Heading 5',
				class: 'icon-h5',
				isActive: (isActive) => isActive.heading({ level: 5 }),
				action: (command) => {
					return command.heading({ level: 5 })
				}
			}
		]
	},
	{
		label: 'Unordered list',
		class: 'icon-ul',
		isActive: (isActive) => isActive.bullet_list(),
		action: (command) => {
			return command.bullet_list()
		}
	},
	{
		label: 'Ordered list',
		class: 'icon-ol',
		isActive: (isActive) => isActive.ordered_list(),
		action: (command) => {
			return command.ordered_list()
		}
	},
	{
		label: 'Blockquote',
		class: 'icon-quote',
		isActive: (isActive) => isActive.blockquote(),
		action: (command) => {
			return command.blockquote()
		}
	},
	{
		label: 'Code block',
		class: 'icon-code',
		isActive: (isActive) => isActive.code_block(),
		action: (command) => {
			return command.code_block()
		}
	},
	{
		label: 'Insert image',
		class: 'icon-image',
		isActive: () => {},
		click: (commands) => {
			this.showImagePrompt(commands.image)
		}
	}
]

const iconBar = {
	mounted() {
		this.getWindowWidth()
		this.$nextTick(() => {
			window.addEventListener('resize', this.getWindowWidth)
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getWindowWidth)
	},
	data: () => {
		return {
			windowWidth: 0,
			windowHeight: 0,
			forceRecompute: 0,
			submenuVisibility: {}
		}
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
		showChildMenu(icon) {
			Vue.set(this.submenuVisibility, icon.label, true)
		},
		hideChildMenu(icon) {
			Vue.set(this.submenuVisibility, icon.label, false)
		},
		toggleChildMenu(icon) {
			const lastValue = this.submenuVisibility.hasOwnProperty(icon.label) ? this.submenuVisibility[icon.label] : false
			Vue.set(this.submenuVisibility, icon.label, !lastValue)
		}
	},
	computed: {
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
		iconsToShow() {
			return icons.slice(0, (this.iconCount - 1 > 0) ? this.iconCount - 1 : 0)
		},
		iconsToShowInMenu() {
			return icons.slice((this.iconCount - 1 > 0) ? this.iconCount - 1 : 0, icons.length)
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
			const menuBarWidth = this.$refs.menubar ? this.$refs.menubar.clientWidth : 0
			const iconCount = Math.max((Math.floor(menuBarWidth / 44) - 1), 0)
			return iconCount
		}
	}
}
export { icons, iconBar }
