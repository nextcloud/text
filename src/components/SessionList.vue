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
	<Popover class="session-list" placement="bottom">
		<button slot="trigger"
			v-tooltip.bottom="t('text', 'Participants')"
			class="avatar-list">
			<div class="avatardiv icon-group" />
			<AvatarWrapper v-for="session in sessionsVisible"
				:key="session.id"
				:session="session"
				:size="40" />
		</button>
		<template #default>
			<div class="session-menu">
				<ul>
					<slot />
					<li v-for="session in participantsPopover"
						:key="session.id"
						:style="avatarStyle(session)">
						<AvatarWrapper :session="session" :size="32" />
						<span class="session-label">
							{{ session.userId ? session.displayName : (session.guestName ? session.guestName : t('text', 'Guest')) }}
						</span>
						<span v-if="session.userId === null" class="guest-label">({{ t('text', 'guest') }})</span>
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
import Popover from '@nextcloud/vue/dist/Components/Popover'
import Tooltip from '@nextcloud/vue/dist/Directives/Tooltip'
import AvatarWrapper from './AvatarWrapper.vue'
import store from '../mixins/store.js'

const COLLABORATOR_IDLE_TIME = 60
const COLLABORATOR_DISCONNECT_TIME = 90

export default {
	name: 'SessionList',
	components: {
		AvatarWrapper,
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
			z-index: 1;
			border-radius: 50%;
			overflow: hidden;
			box-sizing: content-box !important;
		}

		.icon-more, .icon-group, .icon-settings-dark {
			background-color: var(--color-background-dark);
			width: 44px;
			height: 44px;
			margin: 0 6px 0 0;
		}
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

			.session-label {
				padding-right: 3px;
			}
			.guest-label {
				padding-left: 3px;
				color: var(--color-text-maxcontrast);
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
