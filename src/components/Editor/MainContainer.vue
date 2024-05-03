<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
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
