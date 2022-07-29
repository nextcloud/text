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
	<div id="editor-wrapper"
		class="text-editor__wrapper"
		:class="{
			'has-conflicts': hasSyncCollission,
			'icon-loading': !contentLoaded && !hasConnectionIssue,
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

export default {
	name: 'Wrapper',
	mixins: [useIsRichEditorMixin, useIsRichWorkspaceMixin],

	props: {
		syncError: {
			type: Object,
			default: null,
		},
		hasConnectionIssue: {
			type: Boolean,
			require: true,
		},
		contentLoaded: {
			type: Boolean,
			require: true,
		},
		showAuthorAnnotations: {
			type: Boolean,
			require: true,
		},
	},

	computed: {
		hasSyncCollission() {
			return this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
		},
	},

}
</script>

<style scoped lang="scss">

	.text-editor__wrapper {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;

		&.show-color-annotations::v-deep(.author-annotation) {
			padding-top: 2px;
			padding-bottom: 2px;
		}

		&:not(.show-color-annotations)::v-deep(.author-annotation),
		&:not(.show-color-annotations)::v-deep(.image) {
			background-color: transparent !important;
		}

		.ProseMirror {
			margin-top: 0 !important;
		}
		&.icon-loading {
			.text-editor__main {
				opacity: 0.3;
			}
		}
	}

</style>
