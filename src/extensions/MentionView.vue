<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper as="span" class="mention" contenteditable="false">
		<NcUserBubble
			:user="node.attrs.id"
			:displayName="username"
			:primary="isCurrentUser"
			class="mention-user-bubble">
			@{{ username }}
		</NcUserBubble>
	</NodeViewWrapper>
</template>

<script>
import { getCurrentUser } from '@nextcloud/auth'
import { NodeViewWrapper } from '@tiptap/vue-3'
// import NcUserBubble from '@nextcloud/vue/components/NcUserBubble'

export default {
	name: 'MentionView',
	components: {
		NcUserBubble,
		NodeViewWrapper,
	},

	props: {
		node: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			username: this.node.attrs.label,
		}
	},

	computed: {
		isCurrentUser() {
			return this.node.attrs.id === getCurrentUser()?.uid
		},
	},
}
</script>

<style scoped>
/* This is required to properly render the bubble text (which seems linke a browser bug) */
.text-editor__wrapper div.ProseMirror .mention[contenteditable='false'] :deep(*) {
	-webkit-user-modify: read-only !important;
}
</style>
