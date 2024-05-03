<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NodeViewWrapper as="span" class="mention" contenteditable="false">
		<NcUserBubble :user="node.attrs.id"
			:display-name="username"
			:primary="isCurrentUser"
			class="mention-user-bubble">
			@{{ username }}
		</NcUserBubble>
	</NodeViewWrapper>
</template>

<script>
import { NcUserBubble } from '@nextcloud/vue'
import { NodeViewWrapper } from '@tiptap/vue-2'
import { getCurrentUser } from '@nextcloud/auth'

export default {
	name: 'Mention',
	components: {
		NcUserBubble,
		NodeViewWrapper,
	},
	props: {
		updateAttributes: {
			type: Function,
			required: true,
		},

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
.text-editor__wrapper div.ProseMirror .mention[contenteditable=false] :deep(*) {
	-webkit-user-modify: read-only !important;
}
</style>
