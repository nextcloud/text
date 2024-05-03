<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcActions class="entry-action entry-action__image-upload"
		:data-text-action-entry="actionEntry.key"
		:name="actionEntry.label"
		:title="actionEntry.label"
		:aria-label="actionEntry.label"
		:container="menuIDSelector">
		<template #icon>
			<component :is="icon"
				:name="actionEntry.label"
				:aria-label="actionEntry.label" />
		</template>
		<NcActionButton v-if="$editorUpload"
			close-after-click
			:disabled="isUploadingAttachments"
			:data-text-action-entry="`${actionEntry.key}-upload`"
			@click="$callChooseLocalAttachment">
			<template #icon>
				<Upload />
			</template>
			{{ t('text', 'Upload from computer') }}
		</NcActionButton>
		<NcActionButton v-if="!$isPublic"
			close-after-click
			:disabled="isUploadingAttachments"
			:data-text-action-entry="`${actionEntry.key}-insert`"
			@click="$callAttachmentPrompt">
			<template #icon>
				<Folder />
			</template>
			{{ t('text', 'Insert from Files') }}
		</NcActionButton>
	</NcActions>
</template>

<script>
import { NcActions, NcActionButton } from '@nextcloud/vue'
import { Loading, Folder, Upload } from '../icons.js'
import { useIsPublicMixin, useEditorUpload } from '../Editor.provider.js'
import { BaseActionEntry } from './BaseActionEntry.js'
import { useMenuIDMixin } from './MenuBar.provider.js'
import {
	useActionAttachmentPromptMixin,
	useUploadingStateMixin,
	useActionChooseLocalAttachmentMixin,
} from '../Editor/MediaHandler.provider.js'

export default {
	name: 'ActionAttachmentUpload',
	components: {
		NcActions,
		NcActionButton,
		Loading,
		Folder,
		Upload,
	},
	extends: BaseActionEntry,
	mixins: [
		useIsPublicMixin,
		useEditorUpload,
		useActionAttachmentPromptMixin,
		useUploadingStateMixin,
		useActionChooseLocalAttachmentMixin,
		useMenuIDMixin,
	],
	computed: {
		icon() {
			return this.isUploadingAttachments
				? Loading
				: this.actionEntry.icon
		},
		isUploadingAttachments() {
			return this.$uploadingState.isUploadingAttachments
		},
	},
}
</script>
