<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper class="vue-component" as="p">
		<NodeViewContent class="paragraph-content" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-2'

export default {
	name: 'ParagraphView',
	components: {
		NodeViewWrapper,
		NodeViewContent,
	},
}
</script>
<style lang="scss" scoped>

.vue-component {
	position: relative;
}
</style>
