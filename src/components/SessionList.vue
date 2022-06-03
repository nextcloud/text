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
	<Popover class="session-list" placement="top">
		<button slot="trigger"
			v-tooltip.bottom="t('text', 'Active people')"
			class="avatar-list">
			<div class="avatardiv icon-group" />
			<div v-for="session in sessionsVisible"
				:key="session.id"
				class="avatar-wrapper"
				:style="sessionStyle(session)">
				<Avatar :style="avatarStyle(session)"
					:user="session.userId ? session.userId : session.guestName"
					:is-guest="session.userId === null"
					:disable-menu="true"
					:show-user-status="false"
					:disable-tooltip="true"
					:size="44" />
			</div>
		</button>
		<template #default>
			<div class="session-menu">
				<ul>
					<slot />
					<li v-for="session in participantsPopover"
						:key="session.id"
						:style="avatarStyle(session)">
						<div class="avatar-wrapper"
							:style="sessionStyle(session)">
							<Avatar :user="session.userId ? session.userId : session.guestName"
								:is-guest="session.userId === null"
								:disable-menu="true"
								:show-user-status="false"
								:disable-tooltip="true"
								:size="32" />
						</div>
						{{ session.guestName ? session.guestName : session.displayName }}
					</li>
				</ul>
				<input id="toggle-color-annotations"
					v-model="showAuthorAnnotations"
					type="checkbox"
					class="checkbox">
				<label for="toggle-color-annotations">{{ t('text', 'Show author colors') }}</label>
				<p class="hint">
					{{ t('text', 'Author colors are only shown until everyone has closed the document.') }}
				</p>
			</div>
		</template>
	</Popover>
</template>

<script>
import Avatar from '@nextcloud/vue/dist/Components/Avatar'
import Popover from '@nextcloud/vue/dist/Components/Popover'
import Tooltip from '@nextcloud/vue/dist/Directives/Tooltip'
import store from '../mixins/store.js'

const COLLABORATOR_IDLE_TIME = 60
const COLLABORATOR_DISCONNECT_TIME = 90

export default {
	name: 'SessionList',
	components: {
		Avatar,
		Popover,
	},
	directives: {
		tooltip: Tooltip,
	},
	mixins: [store],
	props: {
		sessions: {
			type: Object,
			default: () => { return {} },
		},
	},
	data() {
		return {
			myName: '',
		}
	},
	computed: {
		showAuthorAnnotations: {
			get() {
				return this.$store.state.showAuthorAnnotations
			},
			set(value) {
				this.$store.dispatch('setShowAuthorAnnotations', value)
			},
		},
		participantsPopover() {
			if (this.currentSession.guestName) {
				return this.participantsWithoutCurrent
			}
			return this.participants
		},
		participantsWithoutCurrent() {
			return this.participants.filter((session) => !session.isCurrent)
		},
		participants() {
			return Object.values(this.sessions).filter((session) =>
				session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME
					&& (session.userId !== null || session.guestName !== null)
			).sort((a, b) => a.lastContact < b.lastContact)
		},
		currentSession() {
			return Object.values(this.sessions).find((session) => session.isCurrent)
		},
		sessionStyle() {
			return (session) => {
				return {
					'border-color': session.color,
					'background-color': session.color + ' !important',
				}
			}
		},
		avatarStyle() {
			return (session) => {
				return {
					opacity: session.lastContact > Date.now() / 1000 - COLLABORATOR_IDLE_TIME ? 1 : 0.5,
				}
			}
		},
		sessionsVisible() {
			return this.participantsWithoutCurrent.slice(0, 3)
		},
	},
}
</script>

<style scoped lang="scss">
	.avatar-list {
		border: none;
		background-color: var(--color-main-background);
		padding: 0;
		margin: 0;
		padding-left: 6px;
		display: inline-flex;
		flex-direction: row-reverse;

		&:focus {
			background-color: #eee;
		}

		.avatar-wrapper {
			margin: 0 -8px 0 0;
			height: 44px;
			width: 44px;
		}

		.icon-more, .icon-group, .icon-settings-dark {
			background-color: var(--color-background-dark);
			width: 44px;
			height: 44px;
			margin: 0 6px 0 0;
		}
	}

	.avatar-wrapper {
		z-index: 1;
		border-radius: 50%;
		overflow: hidden;
		box-sizing: content-box !important;
	}

	.session-menu {
		max-width: 280px;
		padding-top: 6px;
		padding-bottom: 6px;

		ul li {
			align-items: center;
			display: flex;
			padding: 6px;

			.avatar-wrapper {
				height: 32px;
				width: 32px;
				margin-right: 6px;
			}
		}
	}

	label {
		display: block;
		margin: 8px;
	}

	.hint {
		margin: 8px;
		color: var(--color-text-maxcontrast);
	}
</style>
