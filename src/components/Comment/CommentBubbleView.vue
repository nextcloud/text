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
				:title="t('text', 'Close')"
				@click="close">
				<template #icon>
					<CloseIcon :size="16" />
				</template>
			</NcButton>
		</div>
		<div v-if="commentNode" ref="itemsContainer" class="comment-bubble__items">
			<div v-for="(item, i) in items" :key="i" class="comment-bubble__item">
				<div class="comment-bubble__meta">
					<NcAvatar
						v-if="item.author"
						:user="item.author"
						:displayName="item.authorLabel"
						:size="24"
						disableTooltip
						disableMenu />
					<span class="comment-bubble__author">
						<span class="comment-bubble__author-name">{{ item.authorLabel || t('text', 'Guest') }}</span>
						<span v-if="!item.author" class="comment-bubble__author-guest">({{ t('text', 'guest') }})</span>
					</span>
					<NcDateTime
						v-if="item.timestamp"
						class="comment-bubble__timestamp"
						:timestamp="item.timestamp"
						relativeTime="long"
						ignoreSeconds />
					<NcButton
						v-if="isEditable && !isGuestWithoutNick"
						variant="tertiary"
						size="small"
						:title="t('text', 'Edit')"
						@click="startEdit(i)">
						<template #icon>
							<PencilIcon :size="16" />
						</template>
					</NcButton>
					<NcButton
						v-if="isEditable"
						variant="tertiary"
						size="small"
						:title="t('text', 'Delete')"
						@click="deleteItem(i)">
						<template #icon>
							<DeleteIcon :size="16" />
						</template>
					</NcButton>
				</div>
				<template v-if="editingItemIndex === i">
					<NcRichContenteditable
						ref="editInput"
						v-model="editText"
						multiline
						class="comment-bubble__body-edit comment-bubble__composer-input"
						@submit="saveEdit"
						@keydown.escape.prevent.stop="cancelEdit" />
					<div class="comment-bubble__edit-actions">
						<NcButton
							variant="primary"
							size="small"
							:title="t('text', 'Save')"
							@click="saveEdit">
							<template #icon>
								<CheckIcon :size="16" />
							</template>
							{{ t('text', 'Save') }}
						</NcButton>
						<NcButton
							size="small"
							:title="t('text', 'Cancel')"
							@click="cancelEdit">
							<template #icon>
								<CloseIcon :size="16" />
							</template>
							{{ t('text', 'Cancel') }}
						</NcButton>
					</div>
				</template>
				<!-- The passed HTML got sanitized by ProseMirror's DOMSerializer -->
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-else class="comment-bubble__body ProseMirror" v-html="item.body" />
			</div>
		</div>
		<div v-if="isEditable && isGuestWithoutNick" class="comment-bubble__guest-name">
			<p class="comment-bubble__guest-name-hint">
				{{ t('text', 'Enter your name to comment') }}
			</p>
			<div class="comment-bubble__guest-name-row">
				<NcTextField
					v-model="guestNickInput"
					:label="t('text', 'Guest')"
					:placeholder="t('text', 'Guest')"
					@keydown.enter.prevent="submitGuestName" />
				<NcButton variant="primary" size="small" @click="submitGuestName">
					<template #icon>
						<CheckIcon :size="16" />
					</template>
				</NcButton>
			</div>
		</div>
		<div v-else-if="isEditable && editingItemIndex === null" class="comment-bubble__composer">
			<NcRichContenteditable
				ref="replyInput"
				v-model="replyText"
				:placeholder="t('text', 'Add a comment…')"
				:aria-label="t('text', 'Add a comment…')"
				:userData
				multiline
				class="comment-bubble__composer-input"
				@submit="submitReply" />
			<NcButton
				variant="primary"
				size="small"
				@click="submitReply">
				{{ isFirstComment ? t('text', 'Comment') : t('text', 'Reply') }}
			</NcButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'

import { getCurrentUser } from '@nextcloud/auth'
import { t } from '@nextcloud/l10n'
import { DOMSerializer } from '@tiptap/pm/model'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcDateTime from '@nextcloud/vue/components/NcDateTime'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import { createMarkdownSerializer } from '../../extensions/Markdown.ts'

const props = defineProps<{
	editor: Editor
	referenceId: string
}>()

const DRAFT_KEY_PREFIX = 'text-comment-draft-'

const itemsContainer = ref<HTMLElement | null>(null)
const replyText = ref(sessionStorage.getItem(`${DRAFT_KEY_PREFIX}${props.referenceId}`) ?? '')
const editInput = ref<InstanceType<typeof NcRichContenteditable>[] | null>(null)
const replyInput = ref<InstanceType<typeof NcRichContenteditable> | null>(null)
const userData = ref<Record<string, object>>({})

const editorVersion = ref(0)
const isEditable = ref(props.editor.isEditable)
/**
 * Increment editor version on editor updates
 */
function onUpdate() {
	editorVersion.value++
	isEditable.value = props.editor.isEditable
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
	const domSerializer = DOMSerializer.fromSchema(props.editor.schema)
	const mdSerializer = createMarkdownSerializer(props.editor.schema)
	const result: { author: string, authorLabel: string, timestamp: Date | null, body: string, markdownBody: string }[] = []
	commentNode.value.forEach((item) => {
		const fragment = domSerializer.serializeFragment(item.content)
		const wrapper = document.createElement('div')
		wrapper.appendChild(fragment)
		result.push({
			author: item.attrs.author,
			authorLabel: item.attrs.authorLabel,
			timestamp: item.attrs.timestamp ? new Date(item.attrs.timestamp) : null,
			body: wrapper.innerHTML,
			markdownBody: mdSerializer.serialize(item).trim(),
		})
	})
	return result
})

const isFirstComment = computed(() => items.value.length === 0 || (items.value.length === 1 && !items.value[0].body))

// Persist draft as user types
watch(replyText, (val) => {
	const key = `${DRAFT_KEY_PREFIX}${props.referenceId}`
	if (val.trim()) {
		sessionStorage.setItem(key, val)
	} else {
		sessionStorage.removeItem(key)
	}
})

// Restore draft when bubble opens or switches to a different comment
watch(() => props.referenceId, (id) => {
	replyText.value = sessionStorage.getItem(`${DRAFT_KEY_PREFIX}${id}`) ?? ''
})

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
	props.editor.commands.addOrUpdateCommentReply(props.referenceId, replyText.value.trim())
	sessionStorage.removeItem(`${DRAFT_KEY_PREFIX}${props.referenceId}`)
	replyText.value = ''
	nextTick(() => {
		if (itemsContainer.value) {
			itemsContainer.value?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' })
		}
	})
}

const editingItemIndex = ref<number | null>(null)
const editText = ref('')

/**
 * Start to edit an existent comment
 *
 * @param index the comment item index
 */
function startEdit(index: number) {
	editingItemIndex.value = index
	editText.value = items.value[index].markdownBody
	nextTick(() => {
		editInput.value?.[0].focus()
	})
}

/**
 * Save the edit of an existing comment
 */
function saveEdit() {
	const index = editingItemIndex.value
	if (index === null) {
		return
	}
	const original = items.value[index]?.markdownBody ?? ''
	if (editText.value.trim() && editText.value.trim() !== original.trim()) {
		props.editor.commands.addOrUpdateCommentReply(props.referenceId, editText.value.trim(), index)
	}
	editingItemIndex.value = null
	editText.value = ''
}

/**
 * Cancel to edit an existing comment
 */
function cancelEdit() {
	editingItemIndex.value = null
	editText.value = ''
}

/**
 * Delete a comment item
 *
 * @param index the item index
 */
function deleteItem(index: number) {
	props.editor.commands.deleteCommentReply(props.referenceId, index)
}

const isGuest = !getCurrentUser()
const guestNick = ref(localStorage.getItem('nick') ?? '')
const guestNickInput = ref('')

const isGuestWithoutNick = computed(() => isGuest && !guestNick.value)
/**
 * Submit guest name
 */
function submitGuestName() {
	if (!guestNickInput.value.trim()) {
		return
	}
	guestNick.value = guestNickInput.value.trim()
	localStorage.setItem('nick', guestNick.value)
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
	display: flex;
	flex-direction: column;
	max-height: min(80vh, 700px);
	width: 300px;

	background: var(--color-main-background);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	box-shadow: 0 2px 8px var(--color-box-shadow);

	&__header {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(2 * var(--default-grid-baseline));
		padding-bottom: var(--default-grid-baseline);
	}

	&__title {
		font-weight: bold;
		font-size: 0.9em;
		color: var(--color-text-maxcontrast);
	}

	&__items {
		flex: 1 1 auto; // take available space
		overflow-y: auto;
		padding: calc(2 * var(--default-grid-baseline));
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
		display: flex;
		align-items: baseline;
		gap: var(--default-grid-baseline);
		min-width: 0;
		overflow: hidden;
		font-size: 0.9em;
	}

	&__author-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
		flex-shrink: 1;
		font-weight: 600;
	}

	&__author-guest {
		white-space: nowrap;
		flex-shrink: 0;
		color: var(--color-text-maxcontrast);
	}

	&__timestamp {
		white-space: nowrap;
		color: var(--color-text-maxcontrast);
		font-size: 0.8em;
		margin-inline-start: auto;
	}

	&__body {
		font-size: 0.9em;
		line-height: 1.4;
		white-space: pre-wrap;
		word-break: break-word;
		// Overwrite some ProseMirror styles
		height: unset;
		padding: 0;
	}

	&__composer {
		display: flex;
		flex-direction: column;
		gap: var(--default-grid-baseline);
		padding: calc(2 * var(--default-grid-baseline));
		padding-top: var(--default-grid-baseline);
	}

	&__composer-input {
		font-size: 0.9em;
	}

	&__edit-actions {
		display: flex;
		gap: var(--default-grid-baseline);
		margin-top: var(--default-grid-baseline);
	}

	&__guest-name {
		padding: calc(2 * var(--default-grid-baseline));
		display: flex;
		flex-direction: column;
		gap: var(--default-grid-baseline);

		&-hint {
			font-size: 0.9em;
			color: var(--color-text-maxcontrast);
			margin: 0;
		}

		&-row {
			display: flex;
			align-items: center;
			gap: var(--default-grid-baseline);
		}
	}
}
</style>
