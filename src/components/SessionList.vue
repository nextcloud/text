<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div class="session-list">
		<div class="avatar-list" @click="popoverVisible=!popoverVisible">
			<div v-if="sessionsPopover.length > 0" class="avatardiv icon-more" />
			<avatar v-for="session in sessionsVisible" :key="session.id"
				:url="avatarUrl(session)" :disable-tooltip="true" :style="sessionStyle(session)"
				:size="32" />
		</div>
		<popover-menu v-show="sessionsPopover.length > 0 && popoverVisible" :menu="sessionsPopover" class="popovermenu menu-right" />
	</div>
</template>

<script>
import Avatar from 'nextcloud-vue/dist/Components/Avatar'
import PopoverMenu from 'nextcloud-vue/dist/Components/PopoverMenu'

const COLLABORATOR_IDLE_TIME = 10
const COLLABORATOR_DISCONNECT_TIME = 30

export default {
	name: 'SessionList',
	components: {
		Avatar,
		PopoverMenu
	},
	props: {
		sessions: {
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			popoverVisible: '',
			myName: ''
		}
	},
	computed: {
		avatarUrl() {
			return (session) => {
				const user = !session.guestName ? session.userId : session.guestName
				const size = 32
				const guest = !!session.guestName
				const avatarUrl = OC.generateUrl(
					guest ? '/avatar/guest/{user}/{size}' : '/avatar/{user}/{size}',
					{
						user: user,
						size: size
					})
				return window.location.protocol + '//' + window.location.host + avatarUrl
			}
		},
		activeSessions() {
			return Object.values(this.sessions).filter((session) =>
				session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME && !session.isCurrent && session.userId !== null)
		},
		sessionStyle() {
			return (session) => {
				return {
					'opacity': session.lastContact > Date.now() / 1000 - COLLABORATOR_IDLE_TIME ? 1 : 0.5
					// 'border-color': session.color
				}
			}
		},
		sessionsVisible() {
			return this.activeSessions.slice(0, 3)
		},
		sessionsPopover() {
			return [
				...this.activeSessions.slice(3).map((session) => {
					return {
						href: '#',
						icon: this.avatarUrl(session),
						text: session.guestName ? session.guestName : session.displayName
					}
				})
			]
		}
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
	.session-list {
		position: relative;

		/deep/ .popovermenu {
			margin-right: -4px;
			img {
				padding: 0;
				width: 32px !important;
				height: 32px !important;
				margin: 6px;
				border-radius: 50%;
			}
		}
	}

	.avatar-list {
		display: inline-flex;
		flex-direction: row-reverse;

		.avatardiv,
		/deep/ .avatardiv {
			width: 36px;
			height: 36px;
			margin-right: -8px;
			border: 2px solid var(--color-main-background);
			background-color: var(--color-main-background) !important;
			box-sizing: content-box !important;
			&.icon-more {
				width: 32px;
				height: 32px;
				opacity: .5;
				background-color: var(--color-background-dark) !important;
			}
		}
	}
</style>
