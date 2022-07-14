<!--
  - @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->
<template>
	<NcActions class="entry-action entry-action__image-upload"
		:data-text-action-entry="actionEntry.key"
		:title="actionEntry.label"
		:aria-label="actionEntry.label"
		role="menu"
		aria-haspopup>
		<template #icon>
			<component :is="icon"
				:title="actionEntry.label"
				:aria-label="actionEntry.label"
				aria-haspopup />
		</template>
		<NcActionButton close-after-click
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
import NcActions from '@nextcloud/vue/dist/Components/NcActions.js'
import NcActionButton from '@nextcloud/vue/dist/Components/NcActionButton.js'

import { Loading, Folder, Upload } from '../icons.js'
import { useIsPublicMixin } from '../Editor.provider.js'
import { BaseActionEntry } from './BaseActionEntry.js'
import {
	useActionAttachmentPromptMixin,
	useUploadingStateMixin,
	useActionChooseLocalAttachmentMixin,
} from '../Editor/MediaHandler.provider.js'

export default {
	name: 'ActionImageUpload',
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
		useActionAttachmentPromptMixin,
		useUploadingStateMixin,
		useActionChooseLocalAttachmentMixin,
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
