<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div contenteditable="false" class="smart-picker-menu-container">
		<NcButton :aria-label="t('text', 'Open the Smart Picker')" :type="'tertiary'" @click="$emit('open-smart-picker')">
			<template #icon>
				<PlusIcon />
			</template>
		</NcButton>
	</div>
</template>

<script>
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { NcButton } from '@nextcloud/vue'

export default {
	name: 'SmartPickerMenu',
	components: {
		PlusIcon,
		NcButton,
	},
}

</script>
<style lang="scss" scoped>

div[contenteditable=false] {
	padding: 0;
	margin: 0;
}

.smart-picker-menu-container {
	position: absolute;
	width: 0 !important;
	left: -84px;
	top: 50%;
	transform: translate(0, -50%);
}
</style>
