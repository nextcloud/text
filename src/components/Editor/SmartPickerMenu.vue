<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div contenteditable="false" class="smart-picker-menu-container">
		<NcActions :title="t('text', 'Open the Smart Picker')" :type="'tertiary'">
			<NcActionButton @click="$emit('open-smart-picker')">
				<template #icon>
					<PlusIcon />
				</template>
			</NcActionButton>
		</NcActions>
	</div>
</template>

<script>
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { NcActions, NcActionButton } from '@nextcloud/vue'

export default {
	name: 'SmartPickerMenu',
	components: {
		PlusIcon,
		NcActions,
		NcActionButton,
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
	left: -80px;
	top: 50%;
	transform: translate(0, -50%);
}
</style>
