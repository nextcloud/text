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
				<template v-for="icon in iconsToShow">
					<button v-if="icon.class" :key="icon.label"
						:class="getIconClasses(isActive, icon)" @click="clickIcon(commands, icon)" />
					<template v-else>
						<div :key="icon.label" class="submenu">
							<button v-click-outside="() => hideChildMenu(icon)" :class="childIconClass(isActive, icon.children, )" @click.prevent="toggleChildMenu(icon)" />
							<div :class="{open: isChildMenuVisible(icon)}" class="popovermenu menu-center">
								<popover-menu :menu="childPopoverMenu(isActive, commands, icon.children, icon)" />
							</div>
						</div>
					</template>
				</template>
				<actions>
					<template v-for="icon in iconsToShowInMenu">
						<action-button v-if="icon.class" :key="icon.class"
							:icon="icon.class" @click="clickIcon(commands, icon)">
							{{ icon.label }}
						</action-button>
						<template v-else>
							<action-button v-for="childIcon in icon.children" :key="childIcon.class" :icon="childIcon.class"
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
import { iconBar } from './../mixins/menubar'

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
	mixins: [
		iconBar
	],
	props: {
		editor: {
			type: Object,
			required: false,
			default: null
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
