<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NextcloudVueNcActionCheckbox
		v-if="canToggleWidth"
		:modelValue="isFullWidth"
		@update:modelValue="setFullWidth">
		{{ t('text', 'Full width editor') }}
	</NextcloudVueNcActionCheckbox>
</template>

<script setup>
import { t } from '@nextcloud/l10n'
import NextcloudVueNcActionCheckbox from '@nextcloud/vue/components/NcActionCheckbox'
import { useEditorWidth } from '../../composables/useEditorWidth.ts'

// This component is used as a direct child of NcActions.
// Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
// Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
// Hotfix - rename the component to NcActionCheckbox because it represents and renders it.
defineOptions({ name: 'NcActionCheckbox' })

const { canToggleWidth, isFullWidth, setFullWidth } = useEditorWidth()
</script>
