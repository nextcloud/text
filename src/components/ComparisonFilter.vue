<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<label v-if="session.formattingCount" class="text-comparison__filter">
		<input v-model="hideFormatting" type="checkbox">
		{{ t('text', 'Hide formatting-only changes') }}
	</label>
</template>

<script setup lang="ts">
import type { ComparisonSession } from '../comparison/session.ts'

import { t } from '@nextcloud/l10n'

const props = defineProps<{ session: ComparisonSession }>()

const hideFormatting = props.session.hideFormatting
</script>

<style lang="scss">
.text-comparison__filter {
	display: flex;
	align-items: center;
	gap: var(--default-grid-baseline);
	color: var(--color-text-maxcontrast);

	// The global margin of inputs would make this header taller than the other pane's
	input {
		margin: 0;
	}
}
</style>
