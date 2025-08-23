<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="avatar-wrapper" :style="sessionAvatarStyle">
		<NcAvatar
			v-if="session.userId"
			:user="session.userId"
			:is-guest="false"
			:disable-menu="true"
			hide-status
			:disable-tooltip="true"
			:size="size" />
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
		size: {
			type: Number,
			default: () =>
				Number.parseInt(
					window
						.getComputedStyle(document.body)
						.getPropertyValue('--default-clickable-area'),
				),
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
				'background-color': this.session.userId
					? this.session.color + ' !important'
					: 'var(--color-background-dark)',
			}
		},
		guestInitial() {
			return this.session.guestName === ''
				? '?'
				: this.session.guestName.slice(0, 1).toUpperCase()
		},
	},
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
	overflow: hidden;
}

.avatar,
.avatar-wrapper {
	border-radius: 50%;
	width: var(--size);
	height: var(--size);
	text-align: center;
	color: var(--color-text-maxcontrast);
	line-height: var(--size);
	font-size: var(--font-size);
	font-weight: normal;
	display: flex;
	justify-content: center;
	align-items: center;
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
