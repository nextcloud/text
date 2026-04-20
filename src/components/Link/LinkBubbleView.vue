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
			<!-- open link -->
			<NcButton
				:title="t('text', 'Open link')"
				:aria-label="t('text', 'Open link')"
				variant="tertiary"
				@click="openLink(href)">
				<template #icon>
					<OpenInNewIcon :size="20" />
				</template>
			</NcButton>

			<!-- edit/save -->
			<div v-if="isEditable" class="edit-buttons">
				<NcButton
					v-if="!edit"
					:title="t('text', 'Edit link')"
					:aria-label="t('text', 'Edit link')"
					variant="tertiary"
					@click="startEdit">
					<template #icon>
						<PencilOutlineIcon :size="20" />
					</template>
				</NcButton>
				<NcButton
					v-else
					:title="t('text', 'Save changes')"
					:aria-label="t('text', 'Save changes')"
					variant="tertiary"
					@click="updateLink">
					<template #icon>
						<CheckIcon :size="20" />
					</template>
				</NcButton>
			</div>

			<!-- preview options / dismiss changes -->
			<PreviewOptions
				v-if="isEditable && !edit"
				:href="href"
				type="text-only"
				@toggle="setPreview"
				@delete="removeLink" />
			<NcButton
				v-else
				:title="t('text', 'Cancel')"
				:aria-label="t('text', 'Cancel')"
				variant="tertiary"
				@click="stopEdit">
				<template #icon>
					<CloseIcon :size="20" />
				</template>
			</NcButton>
		</div>

		<!-- link edit form -->
		<div v-if="isEditable && edit" class="link-view-bubble__edit">
			<NcTextField
				ref="hrefField"
				name="newHref"
				:label="t('text', 'URL')"
				:value.sync="newHref"
				@keyup.enter.prevent="updateLink" />
		</div>

		<!-- link preview -->
		<NcReferenceList
			v-else-if="showPreview"
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
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import { NcReferenceList } from '@nextcloud/vue/dist/Components/NcRichText.js'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import OpenInNewIcon from 'vue-material-design-icons/OpenInNew.vue'
import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue'

import { useOpenLinkHandler } from '../Editor.provider.ts'
import PreviewOptions from '../Editor/PreviewOptions.vue'

const PROTOCOLS_WITH_PREVIEW = ['http:', 'https:']

export default {
	name: 'LinkBubbleView',

	components: {
		PreviewOptions,
		CheckIcon,
		CloseIcon,
		NcButton,
		NcReferenceList,
		NcTextField,
		OpenInNewIcon,
		PencilOutlineIcon,
	},

	mixins: [useOpenLinkHandler],

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
			edit: true,
			newHref: null,
			referenceTitle: null,
		}
	},

	computed: {
		key() {
			return this.href || 'no-href'
		},

		/**
		 * NcReferenceList only accepts full URLs with origin.
		 */
		sanitizedHref() {
			try {
				const url = new URL(this.href, window.location)
				return url.href
			} catch {
				return this.href
			}
		},

		title() {
			return this.referenceTitle ? this.referenceTitle : this.sanitizedHref
		},

		showPreview() {
			try {
				const url = new URL(this.href, window.location)
				return this.href && PROTOCOLS_WITH_PREVIEW.includes(url.protocol)
			} catch {
				return false
			}
		},
	},

	watch: {
		key() {
			this.resetBubble()
			this.startEditIfEmpty()
		},
	},

	beforeMount() {
		this.isEditable = this.editor.isEditable
		this.editor.on('update', ({ editor }) => {
			this.isEditable = editor.isEditable
		})
	},

	methods: {
		resetBubble() {
			this.edit = false
			this.newHref = null
			this.referenceTitle = null
		},

		openLink(href) {
			this.$openLinkHandler.openLink(href)
		},

		onReferenceListLoaded() {
			this.referenceTitle =
				this.$refs.referencelist.firstReference?.openGraphObject?.name
				?? null
		},

		setPreview() {
			this.editor.chain().hideLinkBubble().setPreview().run()
		},

		startEdit() {
			this.edit = true
			this.newHref = this.href
			this.$nextTick(() => {
				this.$refs.hrefField.focus()
			})
		},

		startEditIfEmpty() {
			if (this.isEditable && !this.href) {
				this.startEdit()
			}
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
			const from = Math.min(...ranges.map((range) => range.$from.pos))
			const to = Math.max(...ranges.map((range) => range.$to.pos))

			console.debug('selection', selection)
			this.editor
				.chain()
				.extendMarkRange('link')
				.setLink({ href })
				.setTextSelection({ from, to })
				.focus()
				.run()
		},

		removeLink() {
			this.editor
				.chain()
				// Explicitly hide bubble to prevent flickering before it's removed
				.hideLinkBubble()
				.unsetLink()
				.focus()
				.run()
			this.stopEdit()
		},
		t,
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
