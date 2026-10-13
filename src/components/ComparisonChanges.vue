<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<ComparisonChangeList
		v-if="visibleChanges.length"
		:changes="visibleChanges"
		:currentId="currentId"
		:afterDocument="session.editors.after.state.doc"
		@select="emit('select', $event)" />
	<p v-else class="text-comparison__empty" role="status">
		{{ emptyMessage }}
	</p>
</template>

<script setup lang="ts">
import type { ComparisonSession } from '../comparison/session.ts'

import ComparisonChangeList from './ComparisonChangeList.vue'

const props = defineProps<{ session: ComparisonSession }>()
const emit = defineEmits<{ select: [id: string] }>()

const { visibleChanges, currentId, emptyMessage } = props.session
</script>

<style lang="scss">
.text-comparison__empty {
	padding: calc(6 * var(--default-grid-baseline));
	text-align: center;
}
</style>
