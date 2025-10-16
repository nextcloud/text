<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcActions
		data-text-link-options="select"
		class="link-options"
		:open.sync="open"
		@open="onOpen">
		<template #icon>
			<DotsVerticalIcon :size="20" />
		</template>
		<NcActionCaption :name="t('text', 'Preview options')" />
		<NcActionRadio
			data-text-preview-option="text-only"
			name="preview-option"
			value="text-only"
			:model-value="type"
			@change="(e) => toggle(e.currentTarget.value)">
			{{ t('text', 'Text only') }}
		</NcActionRadio>
		<NcActionRadio
			data-text-preview-option="link-preview"
			name="preview-option"
			value="link-preview"
			:model-value="type"
			@change="(e) => toggle(e.currentTarget.value)">
			{{ t('text', 'Show link preview') }}
		</NcActionRadio>

		<NcActionSeparator />

		<!-- Open link -->
		<NcActionButton v-if="href" close-after-click @click="openLink">
			<template #icon>
				<OpenIcon :size="20" />
			</template>
			{{ t('text', 'Open in new tab') }}
		</NcActionButton>

		<!-- Copy link -->
		<NcActionButton v-if="href" close-after-click @click="copyLink">
			<template #icon>
				<CheckIcon v-if="copySuccess" :size="20" />
				<NcLoadingIcon v-else-if="copyLoading" :size="20" />
				<ContentCopyIcon v-else :size="20" />
			</template>
			{{ t('text', 'Copy link') }}
		</NcActionButton>

		<!-- Remove link -->
		<NcActionButton close-after-click @click="deleteNode">
			<template #icon>
				<DeleteOutlineIcon :size="20" />
			</template>
			{{ t('text', 'Remove link') }}
		</NcActionButton>
	</NcActions>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionCaption from '@nextcloud/vue/components/NcActionCaption'
import NcActionRadio from '@nextcloud/vue/components/NcActionRadio'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import ContentCopyIcon from 'vue-material-design-icons/ContentCopy.vue'
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
import OpenIcon from 'vue-material-design-icons/OpenInNew.vue'
import DeleteOutlineIcon from 'vue-material-design-icons/TrashCanOutline.vue'
import CopyToClipboardMixin from '../../mixins/CopyToClipboardMixin.js'

export default {
	name: 'PreviewOptions',

	components: {
		CheckIcon,
		ContentCopyIcon,
		DotsVerticalIcon,
		NcActions,
		NcActionButton,
		NcActionCaption,
		NcActionRadio,
		NcActionSeparator,
		NcLoadingIcon,
		DeleteOutlineIcon,
		OpenIcon,
	},

	mixins: [CopyToClipboardMixin],

	props: {
		type: {
			type: String,
			required: true,
		},
		href: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			open: false,
		}
	},

	computed: {
		isPreview() {
			return this.type === 'link-preview'
		},
	},

	methods: {
		onOpen() {
			this.$emit('open')
		},
		toggle(type) {
			this.open = false
			this.$emit('toggle', type)
		},
		openLink() {
			if (!this.href) return
			window.open(this.href, '_blank').focus()
		},
		async copyLink() {
			await this.copyToClipboard(this.href)
		},
		deleteNode() {
			this.$emit('delete')
		},
		t,
	},
}
</script>

<style lang="scss" scoped>
div[contenteditable='false'] {
	padding: 0;
	margin: 0;
}
</style>
