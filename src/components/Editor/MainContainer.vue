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
	<div class="editor">
		<MediaHandler v-if="$editorUpload" class="text-editor__main">
			<slot />
		</MediaHandler>
		<slot v-else />
	</div>
</template>

<script>
import MediaHandler from './MediaHandler.vue'
import { useEditorUpload } from '../Editor.provider.js'

export default {
	name: 'MainContainer',
	components: {
		MediaHandler,
	},
	mixins: [
		useEditorUpload,
	],
}
</script>

<style scoped lang="scss">
	.text-editor__main, .editor {
		background: var(--color-main-background);
		color: var(--color-main-text);
		background-clip: padding-box;
		border-radius: var(--border-radius);
		padding: 0;
		position: relative;
		width: 100%;
	}
</style>
