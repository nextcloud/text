<template>
	<div class="avatar-wrapper" :style="sessionAvatarStyle">
		<Avatar v-if="session.userId"
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
import Avatar from '@nextcloud/vue/dist/Components/Avatar'
export default {
	name: 'AvatarWrapper',
	components: {
		Avatar,
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
}
</style>
