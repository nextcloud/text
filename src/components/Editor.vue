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
	<EditorMidiaHandler id="editor"
		class="text-editor__main">
		<slot />
	</EditorMidiaHandler>
</template>

<script>
import EditorMidiaHandler from './EditorMediaHandler.vue'

export default {
	name: 'Editor',
	components: {
		EditorMidiaHandler,
	},

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
		overflow-y: auto;
		overflow-x: hidden;
		width: 100%;
	}
</style>
