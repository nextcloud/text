<template>
	<NodeViewWrapper as="span" class="mention" contenteditable="false">
		<UserBubble :user="node.attrs.id" :display-name="node.attrs.id.trim()">
			@{{ node.attrs.id.trim() }}
		</UserBubble>
	</NodeViewWrapper>
</template>

<script>
import UserBubble from '@nextcloud/vue/dist/Components/UserBubble'
import { NodeViewWrapper } from '@tiptap/vue-2'

export default {
	name: 'Mention',
	components: {
		UserBubble,
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
}
</script>
<style scoped>
/* This is required to properly render the bubble text (which seems linke a browser bug) */
.text-editor__wrapper div.ProseMirror .mention[contenteditable=false] :deep(*) {
    -webkit-user-modify: read-only !important;
}
</style>
