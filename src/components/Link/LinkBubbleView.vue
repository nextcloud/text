<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div :key="key" class="link-view-bubble">
		<!-- link header with buttons -->
		<div class="link-view-bubble__header">
			<div class="link-view-bubble__title">
				{{ title }}
			</div>
			<!-- copy link -->
			<NcButton :title="copyLinkTooltip"
				:aria-label="copyLinkTooltip"
				type="tertiary"
				@click="copyLink">
				<template #icon>
					<CheckIcon v-if="copySuccess" :size="20" />
					<NcLoadingIcon v-else-if="copyLoading" :size="20" />
					<ContentCopyIcon v-else :size="20" />
				</template>
			</NcButton>

			<!-- edit/save -->
			<div v-if="isEditable" class="edit-buttons">
				<NcButton v-if="!edit"
					:title="t('text', 'Edit link')"
					:aria-label="t('text', 'Edit link')"
					type="tertiary"
					@click="startEdit">
					<template #icon>
						<PencilIcon :size="20" />
					</template>
				</NcButton>
				<NcButton v-else
					:title="t('text', 'Save changes')"
					:aria-label="t('text', 'Save changes')"
					type="tertiary"
					@click="updateLink">
					<template #icon>
						<CheckIcon :size="20" />
					</template>
				</NcButton>

				<!-- remove link / dismiss changes -->
				<NcButton v-if="!edit"
					:title="t('text', 'Remove link')"
					:aria-label="t('text', 'Remove link')"
					type="tertiary"
					@click="removeLink">
					<template #icon>
						<LinkOffIcon :size="20" />
					</template>
				</NcButton>
				<NcButton v-else
					:title="t('text', 'Cancel')"
					:aria-label="t('text', 'Cancel')"
					type="tertiary"
					@click="stopEdit">
					<template #icon>
						<CloseIcon :size="20" />
					</template>
				</NcButton>
			</div>
		</div>

		<!-- link edit form -->
		<div v-if="isEditable && edit" class="link-view-bubble__edit">
			<NcTextField name="newHref"
				:label="t('text', 'URL')"
				:value.sync="newHref"
				@keypress.enter.prevent="updateLink" />
		</div>

		<!-- link preview -->
		<NcReferenceList v-else-if="showPreview"
			ref="referencelist"
			:text="sanitizedHref"
			:limit="1"
			:interactive="false"
			:display-fallback="true"
			class="link-view-bubble__reference-list"
			@loaded="onReferenceListLoaded" />
	</div>
</template>

<script>
import { NcButton, NcLoadingIcon, NcTextField } from '@nextcloud/vue'
import { NcReferenceList } from '@nextcloud/vue/dist/Components/NcRichText.js'
import { translate as t } from '@nextcloud/l10n'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import ContentCopyIcon from 'vue-material-design-icons/ContentCopy.vue'
import LinkOffIcon from 'vue-material-design-icons/LinkOff.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'

import CopyToClipboardMixin from '../../mixins/CopyToClipboardMixin.js'

const PROTOCOLS_WITH_PREVIEW = ['http:', 'https:']

export default {
	name: 'LinkBubbleView',

	components: {
		CheckIcon,
		CloseIcon,
		ContentCopyIcon,
		NcButton,
		NcLoadingIcon,
		NcReferenceList,
		NcTextField,
		LinkOffIcon,
		PencilIcon,
	},

	mixins: [
		CopyToClipboardMixin,
	],

	props: {
		editor: {
			type: Object,
			required: true,
		},
		href: {
			type: String,
			default: null,
		},
	},

	data() {
		return {
			isEditable: false,
			edit: false,
			newHref: null,
			referenceTitle: null,
		}
	},

	computed: {
		key() {
			return this.href || 'no-href'
		},

		copyLinkTooltip() {
			if (this.copied) {
				if (this.copySuccess) {
					return ''
				}
				return t('text', 'Cannot copy, please copy the link manually')
			}
			return t('text', 'Copy link to clipboard')
		},

		/**
		 * NcReferenceList only accepts full URLs with origin.
		 */
		sanitizedHref() {
			const url = new URL(this.href, window.location)
			return url.href
		},

		title() {
			return this.referenceTitle ? this.referenceTitle : this.sanitizedHref
		},

		showPreview() {
			const url = new URL(this.href, window.location)
			return this.href && PROTOCOLS_WITH_PREVIEW.includes(url.protocol)
		},
	},

	watch: {
		key() {
			this.resetBubble()
		},
	},

	beforeMount() {
		this.isEditable = this.editor.isEditable
		this.editor.on('update', ({ editor }) => {
			this.isEditable = editor.isEditable
		})
	},

	methods: {
		t,

		resetBubble() {
			this.edit = false
			this.newHref = null
			this.referenceTitle = null
		},

		async copyLink() {
			await this.copyToClipboard(this.href)
		},

		onReferenceListLoaded() {
			this.referenceTitle = this.$refs.referencelist.firstReference?.openGraphObject?.name ?? null
		},

		startEdit() {
			this.edit = true
			this.newHref = this.href
		},

		stopEdit() {
			this.edit = false
			this.newHref = null
		},

		updateLink() {
			if (this.href !== this.newHref) {
				this.setLinkUrl(this.newHref)
			}
			this.stopEdit()
		},

		setLinkUrl(href) {
			// Store current selection to restore it after setLink
			const selection = { ...this.editor.view.state.selection }
			const { ranges } = selection
			const from = Math.min(...ranges.map(range => range.$from.pos))
			const to = Math.max(...ranges.map(range => range.$to.pos))

			console.debug('selection', selection)
			this.editor.chain()
				.extendMarkRange('link')
				.setLink({ href })
				.setTextSelection({ from, to })
				.focus()
				.run()
		},

		removeLink() {
			this.editor.chain()
				// Explicitly hide bubble to prevent flickering before it's removed
				.hideLinkBubble()
				.unsetLink()
				.focus()
				.run()
			this.stopEdit()
		},
	},
}
</script>

<style lang="scss" scoped>
.link-view-bubble {
	padding: 4px;
	width: 350px;
	background-color: var(--color-main-background);
	border-radius: var(--border-radius-large);
	filter: drop-shadow(0 1px 10px var(--color-box-shadow));
	box-sizing: initial !important;

	&__header {
		display: flex;
		justify-content: flex-end;

		.edit-buttons {
			display: flex;
		}
	}

	&__title {
		align-self: center;
		padding-left: calc(var(--default-grid-baseline, 4px) * 3);
		margin-right: auto;

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	&__reference-list {
		padding: 4px;
		padding-top: 0;

		:deep(a.widget-default) {
			margin: 0;
			border: 0;
			border-radius: unset;
		}

		:deep(img.widget-default--image) {
			border-radius: var(--border-radius-large);
		}
	}

	&__edit {
		padding: 4px;
		padding-top: 0;

		.input-field {
			margin-bottom: 12px;
		}
	}
}
</style>
