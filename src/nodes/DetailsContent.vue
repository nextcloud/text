<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
 -->

<template>
	<NodeViewWrapper class="details-content" as="div">
		<NodeViewContent />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2'

export default {
	name: 'DetailsContent',

	components: {
		NodeViewContent,
		NodeViewWrapper,
	},
}
</script>
