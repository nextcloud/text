<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="avatar-wrapper" :style="sessionAvatarStyle">
		<NcAvatar v-if="session.userId"
			:user="session.userId ? session.userId : session.guestName"
			:is-guest="session.userId === null"
			:disable-menu="true"
			:show-user-status="false"
			:disable-tooltip="true"
			:size="size" />
		<div v-else class="avatar" :style="sessionBackgroundStyle">
			{{ guestInitial }}
		</div>
	</div>
</template>

<script>
import { NcAvatar } from '@nextcloud/vue'
export default {
	name: 'AvatarWrapper',
	components: {
		NcAvatar,
	},
	props: {
		session: {
			type: Object,
			required: true,
		},
		size: {
			type: Number,
			default: () => 32,
		},
	},
	computed: {
		sessionAvatarStyle() {
			return {
				...this.sessionBackgroundStyle,
				'border-color': this.session.color,
				'border-width': '2px',
				'border-style': 'solid',
				'--size': this.size + 'px',
				'--font-size': this.size / 2 + 'px',
			}
		},
		sessionBackgroundStyle() {
			return {
				'background-color': this.session.userId ? this.session.color + ' !important' : '#b9b9b9',
			}
		},
		guestInitial() {
			return this.session.guestName === '' ? '?' : this.session.guestName.slice(0, 1).toUpperCase()
		},
	},
}
</script>

<style lang="scss" scoped>

.avatar, .avatar-wrapper {
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
}
</style>
