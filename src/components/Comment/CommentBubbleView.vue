<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="comment-bubble">
		<div class="comment-bubble__header">
			<span class="comment-bubble__title">{{ t('text', 'Comments') }}</span>
			<NcButton
				variant="tertiary"
				size="small"
				:aria-label="t('text', 'Close')"
				@click="close">
				<template #icon>
					<CloseIcon :size="16" />
				</template>
			</NcButton>
		</div>
		<div v-if="commentNode" class="comment-bubble__items">
			<div v-for="(item, i) in items" :key="i" class="comment-bubble__item">
				<div class="comment-bubble__meta">
					<NcAvatar
						v-if="item.author"
						:user="item.author"
						:displayName="item.authorLabel"
						:size="24"
						disableTooltip
						disableMenu />
					<span class="comment-bubble__author">{{ item.authorLabel || t('text', 'Guest') }}</span>
					<NcDateTime
						v-if="item.timestamp"
						class="comment-bubble__timestamp"
						:timestamp="item.timestamp"
						relativeTime="long"
						ignoreSeconds />
				</div>
				<div class="comment-bubble__body">
					{{ item.body }}
				</div>
			</div>
		</div>
		<div class="comment-bubble__composer">
			<textarea
				ref="replyInput"
				v-model="replyText"
				class="comment-bubble__composer-input"
				:placeholder="t('text', 'Add a comment…')"
				rows="2"
				@keydown.ctrl.enter.prevent="submitReply"
				@keydown.meta.enter.prevent="submitReply" />
			<NcButton
				variant="primary"
				size="small"
				:disabled="!replyText.trim()"
				@click="submitReply">
				{{ isFirstComment ? t('text', 'Comment') : t('text', 'Reply') }}
			</NcButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'

import { t } from '@nextcloud/l10n'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcDateTime from '@nextcloud/vue/components/NcDateTime'
import CloseIcon from 'vue-material-design-icons/Close.vue'

const props = defineProps<{
	editor: Editor
	referenceId: string
}>()

const replyText = ref('')
const replyInput = ref<HTMLTextAreaElement | null>(null)

const editorVersion = ref(0)
/**
 * Increment editor version on editor updates
 */
function onUpdate() {
	editorVersion.value++
}
onMounted(() => {
	props.editor.on('update', onUpdate)
	// Focus input field when comment bubble is opened.
	// The ProseMirror transaction that opens the bubble steals focus after finishing, so focus with a delay.
	setTimeout(() => replyInput.value?.focus(), 50)
})
onUnmounted(() => props.editor.off('update', onUpdate))

const commentNode = computed<Node | null>(() => {
	void editorVersion.value
	let found: Node | null = null
	props.editor.state.doc.descendants((node) => {
		if (found) {
			return false
		}
		if (node.type.name === 'comment' && node.attrs.referenceId === props.referenceId) {
			found = node
			return false
		}
	})
	return found
})

const items = computed(() => {
	if (!commentNode.value) {
		return []
	}
	const result: { author: string, authorLabel: string, timestamp: Date | null, body: string }[] = []
	commentNode.value.forEach((item) => {
		result.push({
			author: item.attrs.author,
			authorLabel: item.attrs.authorLabel,
			timestamp: item.attrs.timestamp ? new Date(item.attrs.timestamp) : null,
			body: item.textContent,
		})
	})
	return result
})

const isFirstComment = computed(() => items.value.length === 0 || (items.value.length === 1 && !items.value[0].body))

// Focus input field when switching between comment references.
// The ProseMirror transaction that opens the bubble steals focus after finishing, so focus with a delay.
watch(() => props.referenceId, () => {
	setTimeout(() => replyInput.value?.focus(), 50)
})

/**
 * Submit comment reply
 */
function submitReply() {
	if (!replyText.value.trim()) {
		return
	}
	props.editor.commands.addCommentReply(props.referenceId, replyText.value)
	replyText.value = ''
}

/**
 * Close the comment bubble
 */
function close() {
	props.editor.commands.hideCommentBubble()
}
</script>

<style scoped lang="scss">
.comment-bubble {
	background: var(--color-main-background);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	box-shadow: 0 2px 8px var(--color-box-shadow);
	padding: calc(2 * var(--default-grid-baseline));
	min-width: 280px;
	max-width: 380px;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--default-grid-baseline);
	}

	&__title {
		font-weight: bold;
		font-size: 0.9em;
		color: var(--color-text-maxcontrast);
	}

	&__items {
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--default-grid-baseline));
	}

	&__meta {
		display: flex;
		align-items: center;
		gap: var(--default-grid-baseline);
		margin-bottom: var(--default-grid-baseline);
	}

	&__author {
		font-weight: 600;
		font-size: 0.9em;
	}

	&__timestamp {
		color: var(--color-text-maxcontrast);
		font-size: 0.8em;
		margin-inline-start: auto;
	}

	&__body {
		font-size: 0.9em;
		line-height: 1.4;
		white-space: pre-wrap;
		word-break: break-word;
	}

	&__composer {
		display: flex;
		flex-direction: column;
		gap: var(--default-grid-baseline);
		margin-top: var(--default-grid-baseline);
		border-top: 1px solid var(--color-border);
		padding-top: var(--default-grid-baseline);
	}

	&__composer-input {
		width: 100%;
		resize: none;
		border: 1px solid var(--color-border-maxcontrast);
		border-radius: var(--border-radius);
		padding: var(--default-grid-baseline);
		font-size: 0.9em;
		background: var(--color-main-background);
		color: var(--color-main-text);
		font-family: inherit;
		box-sizing: border-box;
	}
}
</style>
