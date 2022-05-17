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
	<Actions class="entry-image-upload-action entry-action"
		:data-action-entry="actionEntry._key"
		:title="actionEntry.label"
		:aria-label="actionEntry.label"
		aria-haspopup>
		<template #icon>
			<component :is="$isUploadingImages ? 'Loading' : actionEntry.icon"
				:title="actionEntry.label"
				:aria-label="actionEntry.label"
				aria-haspopup />
		</template>
		<ActionButton close-after-click
			:disabled="$isUploadingImages"
			@click="$callChooseLocalImage">
			<template #icon>
				<Upload />
			</template>
			{{ t('text', 'Upload from computer') }}
		</ActionButton>
		<ActionButton v-if="!$isPublic"
			close-after-click
			:disabled="$isUploadingImages"
			@click="$callImagePrompt">
			<template #icon>
				<Folder />
			</template>
			{{ t('text', 'Insert from Files') }}
		</ActionButton>
	</Actions>
</template>

<script>
import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'

import { Loading, Folder, Upload } from '../../components/icons.js'
import { useIsPublicMixin } from '../EditorWrapper.provider.js'
import { BaseActionEntry } from './ActionEntry.mixin.js'
import {
	useActionImagePromptMixin,
	useIsUploadingImagesMixin,
	useActionChooseLocalImageMixin,
} from '../EditorDraggable.provider.js'

export default {
	name: 'ImageUploadAction',
	components: {
		Actions,
		ActionButton,
		Loading,
		Folder,
		Upload,
	},
	extends: BaseActionEntry,
	mixins: [
		useIsPublicMixin,
		useActionImagePromptMixin,
		useIsUploadingImagesMixin,
		useActionChooseLocalImageMixin,
	],
}
</script>
