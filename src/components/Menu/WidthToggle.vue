<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcActionCheckbox :checked="isFullWidth" @update:checked="setFullWidth">
		{{ t('text', 'Full width editor') }}
	</NcActionCheckbox>
</template>

<script setup>
import { t } from '@nextcloud/l10n'
import NcActionCheckbox from '@nextcloud/vue/components/NcActionCheckbox'
import { useEditorWidth } from '../../composables/useEditorWidth.ts'

const { isFullWidth, setFullWidth } = useEditorWidth()
</script>
