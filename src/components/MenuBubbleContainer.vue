<!--
  - @copyright Copyright (c) 2022 Max <max@nextcloud.com>
  -
  - @author Max <max@nextcloud.com>
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
	<div :style="bubblePosition">
		<slot />
	</div>
</template>

<script>

export default {
	name: 'MenuBubbleContainer',

	inject: ['editorInfo'],
	props: {
		menu: {
			type: Object,
			required: true,
		},
		isActive: {
			type: Boolean,
			required: false,
			default: false,
		},

	},

	data: () => {
		return {
			bubbleWidth: 325,
		}
	},

	computed: {
		editorWidth() {
			return this.editorInfo.width
		},
		maxLeft() {
			return this.editorWidth - this.bubbleWidth
		},
		bubblePosition() {
			if (!this.menu.top) {
				return { top: 'unset', left: 'unset' }
			}
			const offset = this.contentWrapper?.scrollTop || 0
			const left = Math.min(this.maxLeft, this.menu.left - (this.bubbleWidth / 2))
			return {
				top: `${this.menu.top + offset + 5}px`,
				left: `${left}px`,
			}
		},
	},

	// Meassure the bubble width once the editor is ready and visible.
	// At this point the bubble will be hidden but with all content inside.
	// It therefore has the width we want to use to calculate its position.
	watch: {
		'editorInfo.width': 'updateBubbleWidth',
	},

	methods: {
		updateBubbleWidth() {
			this.$nextTick(() => {
				this.bubbleWidth = this.$el?.offsetWidth ?? 325
			})
		},
	},

}
</script>
