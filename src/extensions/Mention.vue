<template>
	<NodeViewWrapper as="span" class="mention" contenteditable="false">
		<UserBubble :user="node.attrs.id" :display-name="username" class="mention-user-bubble">
			@{{ username }}
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
	data() {
		return {
			username: this.node.attrs.label
		}
	}
}
</script>
<style scoped>
/* This is required to properly render the bubble text (which seems linke a browser bug) */
.text-editor__wrapper div.ProseMirror .mention[contenteditable=false] :deep(*) {
    -webkit-user-modify: read-only !important;
}

.mention-user-bubble /deep/ .user-bubble__content .user-bubble__title {
	position: relative !important;
    top: -20px !important;
    left: -60px !important;
	height: 40px;
}
</style>
