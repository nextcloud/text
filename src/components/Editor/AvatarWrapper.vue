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
			hide-status
			:disable-tooltip="true" />
		<div v-else class="avatar" :style="sessionBackgroundStyle">
			<template v-if="session.guestName">
				{{ guestInitial }}
			</template>
			<AccountOutlineIcon v-else />
		</div>
	</div>
</template>

<script>
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import AccountOutlineIcon from 'vue-material-design-icons/AccountOutline.vue'

export default {
	name: 'AvatarWrapper',
	components: {
		NcAvatar,
		AccountOutlineIcon,
	},
	props: {
		session: {
			type: Object,
			required: true,
		},
	},
	computed: {
		sessionAvatarStyle() {
			return {
				...this.sessionBackgroundStyle,
				'border-color': this.session.color,
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
	color: var(--color-text-maxcontrast);
	line-height: var(--size);
	font-size: calc(var(--size) / 2);
	font-weight: normal;
	display: flex;
	justify-content: center;
	align-items: center;
	border-width: 2px;
	border-style: solid;
}

/* Prepare for vue 3 / nextcloud-vue 9.
 *
 * This css rule is already bleeding in from other apps (notifications).
 * Let's adopt to it already.
 */
.v-popper--theme-dropdown,
.v-popper--theme-dropdown * {
	box-sizing: border-box;
}
</style>
