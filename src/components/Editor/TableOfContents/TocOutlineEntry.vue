<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="outline-line" :class="[`level${heading.level}`, { visible }]" />
</template>

<script setup>
import { toRefs } from 'vue'
import { useVisibility } from '../../../composables/useVisibility.ts'
const props = defineProps({ heading: { type: Object, required: true } })
const { heading } = toRefs(props)
const { visible } = useVisibility(heading.value.id)
</script>
