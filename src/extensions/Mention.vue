<template>
	<NodeViewWrapper as="span" class="mention" contenteditable="false">
		<NcUserBubble :user="node.attrs.id" :display-name="username" class="mention-user-bubble">
			@{{ username }}
		</NcUserBubble>
	</NodeViewWrapper>
</template>

<script>
import NcUserBubble from '@nextcloud/vue/dist/Components/NcUserBubble.js'
import { NodeViewWrapper } from '@tiptap/vue-2'

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
}
</script>
<style scoped>
/* This is required to properly render the bubble text (which seems linke a browser bug) */
.text-editor__wrapper div.ProseMirror .mention[contenteditable=false] :deep(*) {
	-webkit-user-modify: read-only !important;
}
</style>
