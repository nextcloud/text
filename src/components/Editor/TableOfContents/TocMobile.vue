<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcModal
		size="full"
		:name="t('collectives', 'Table of contents')"
		@close="$emit('close')">
		<slot />
	</NcModal>
</template>

<script lang="ts">
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TocMobile',
	components: {
		NcModal,
	},
	methods: {
		t,
	},
})
</script>

<style lang="scss" scoped>
:deep(.modal-container__content) {
	padding-block: 12px 0;
	padding-inline: 12px 0;
}
</style>
