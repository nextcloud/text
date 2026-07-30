<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NextcloudVueNcActionButton
		v-if="canRawEdit && !rawEditing"
		:closeAfterClick="true"
		data-cy="enterRawEditing"
		@click="enterRawEditing">
		<template #icon>
			<CodeTags :size="20" />
		</template>
		{{ t('text', 'Edit Markdown source') }}
	</NextcloudVueNcActionButton>
</template>

<script setup>
import { t } from '@nextcloud/l10n'
import NextcloudVueNcActionButton from '@nextcloud/vue/components/NcActionButton'
import { useRawEditing } from '../../composables/useRawEditing.ts'
import { CodeTags } from '../icons.js'

// This component is used as a direct child of NcActions.
// Even if it actually renders NcActionButton, NcActions cannot see it due to
// rendering limitations in Vue. Rename it to NcActionButton so NcActions treats
// it correctly. See NcActions docs and WidthToggle.vue for details.
defineOptions({ name: 'NcActionButton' })

const { canRawEdit, rawEditing, enterRawEditing } = useRawEditing()
</script>
