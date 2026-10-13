<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="visibleChanges.length" class="text-comparison__navigation">
		<NcButton
			variant="tertiary"
			:aria-label="t('text', 'Previous change')"
			:disabled="visibleChanges.length < 2"
			@click="session.move(-1)">
			{{ t('text', 'Previous') }}
		</NcButton>
		<span aria-hidden="true">{{ status }}</span>
		<NcButton
			variant="tertiary"
			:aria-label="t('text', 'Next change')"
			:disabled="visibleChanges.length < 2"
			@click="session.move(1)">
			{{ t('text', 'Next') }}
		</NcButton>
	</div>
</template>

<script setup lang="ts">
import type { ComparisonSession } from '../comparison/session.ts'

import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'

const props = defineProps<{ session: ComparisonSession }>()

const { visibleChanges, status } = props.session
</script>

<style lang="scss">
.text-comparison__navigation {
	display: flex;
	align-items: center;
	gap: var(--default-grid-baseline);
	margin-inline-start: auto;
}
</style>
