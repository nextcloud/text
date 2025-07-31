<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="avatar-wrapper" :style="clientAvatarStyle">
		<NcAvatar
			v-if="client.userId"
			:user="client.userId"
			:disable-menu="true"
			hide-status
			:disable-tooltip="true"
			:size="size" />
		<div v-else class="avatar" :style="clientBackgroundStyle">
			{{ guestInitial }}
		</div>
	</div>
</template>

<script>
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
export default {
	name: 'AvatarWrapper',
	components: {
		NcAvatar,
	},
	props: {
		client: {
			type: Object,
			required: true,
		},
		size: {
			type: Number,
			default: () => 32,
		},
	},
	computed: {
		clientAvatarStyle() {
			return {
				...this.clientBackgroundStyle,
				'border-color': this.client.color,
				'border-width': '2px',
				'border-style': 'solid',
				'--size': this.size + 'px',
				'--font-size': this.size / 2 + 'px',
			}
		},
		clientBackgroundStyle() {
			return {
				'background-color': this.client.userId
					? this.client.color + ' !important'
					: '#b9b9b9',
			}
		},
		guestInitial() {
			return this.client.name?.at(0)?.toUpperCase() || '?'
		},
	},
}
</script>

<style lang="scss" scoped>
.avatar,
.avatar-wrapper {
	border-radius: 50%;
	width: var(--size);
	height: var(--size);
	text-align: center;
	color: #ffffff;
	line-height: var(--size);
	font-size: var(--font-size);
	font-weight: normal;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: content-box;
}
</style>
