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
	<div class="text-editor__wrapper"
		:class="{
			'has-conflicts': isResolvingConflict,
			'is-rich-workspace': $isRichWorkspace,
			'is-rich-editor': $isRichEditor,
			'show-color-annotations': showAuthorAnnotations
		}">
		<slot />
	</div>
</template>

<script>
import { ERROR_TYPE } from './../../services/SyncService.js'
import { useIsRichEditorMixin, useIsRichWorkspaceMixin } from './../Editor.provider.js'
import { OUTLINE_STATE, OUTLINE_ACTIONS } from './Wrapper.provider.js'
import useStore from '../../mixins/store.js'
import { mapState } from 'vuex'

export default {
	name: 'Wrapper',
	mixins: [useStore, useIsRichEditorMixin, useIsRichWorkspaceMixin],
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[OUTLINE_STATE]: {
				get: () => this.outline,
			},
			[OUTLINE_ACTIONS]: {
				get: () => ({
					toggle: this.outlineToggle,
				}),
			},
		})

		return val
	},

	props: {
		isResolvingConflict: {
			type: Boolean,
			require: true,
		},
		hasConnectionIssue: {
			type: Boolean,
			default: false,
		},
		contentLoaded: {
			type: Boolean,
			default: true,
		},
		showAuthorAnnotations: {
			type: Boolean,
			default: false,
		},
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
	},

	data: () => ({
		outline: {
			visible: false,
			enable: false,
		},
	}),

	computed: {
		...mapState({
			viewWidth: (state) => state.text.viewWidth,
		}),
		showOutline() {
			return this.isAbleToShowOutline
				? this.outline.visible
				: false
		},
		isAbleToShowOutline() {
			if (this.$isRichWorkspace) {
				return false
			}

			return this.viewWidth > 1265
		},
	},

	watch: {
		'showOutlineOutside'() {
			this.outline.visible = this.showOutlineOutside
		},
	},

	mounted() {
		this.outline.enable = this.isAbleToShowOutline

		this.$watch(
			() => this.isAbleToShowOutline,
			(enable) => {
				// make outline state reactive through the provider
				Object.assign(this.outline, { enable })
			},
		)
	},
	methods: {
		outlineToggle() {
			this.outline.visible = !this.outline.visible
			this.$emit('outline-toggled', this.outline.visible)
		},
	},

}
</script>

<style scoped lang="scss">

	.text-editor__wrapper {
		display: flex;
		width: 100%;
		height: 100%;

		&.show-color-annotations:deep(.author-annotation) {
			padding-top: 2px;
			padding-bottom: 2px;
		}

		&:not(.show-color-annotations):deep(.author-annotation),
		&:not(.show-color-annotations):deep(.image) {
			background-color: transparent !important;
		}

		.ProseMirror {
			margin-top: 0 !important;
		}
	}

</style>
