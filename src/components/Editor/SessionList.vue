<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcPopover class="session-list" placement="bottom">
		<template #trigger="{ attrs }">
			<div>
				<button :title="label"
					:aria-label="label"
					class="avatar-list"
					v-bind="attrs">
					<div class="avatardiv icon-group" />
					<AvatarWrapper v-for="session in sessionsVisible"
						:key="session.id"
						:session="session"
						:size="30" />
				</button>
			</div>
		</template>
		<template #default>
			<div class="session-menu">
				<slot name="lastSaved" />
				<ul>
					<slot />
					<li v-for="session in participantsPopover"
						:key="session.id"
						:style="avatarStyle(session)">
						<AvatarWrapper :session="session" :size="36" />
						<span class="session-label">
							{{ session.userId ? session.displayName : (session.guestName ? session.guestName : t('text', 'Guest')) }}
						</span>
						<span v-if="session.userId === null" class="guest-label">({{ t('text', 'guest') }})</span>
					</li>
				</ul>
			</div>
		</template>
	</NcPopover>
</template>

<script>
import { NcPopover } from '@nextcloud/vue'
import AvatarWrapper from './AvatarWrapper.vue'
import { COLLABORATOR_IDLE_TIME, COLLABORATOR_DISCONNECT_TIME } from '../../services/SyncService.js'

export default {
	name: 'SessionList',
	components: {
		AvatarWrapper,
		NcPopover,
	},
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
		label() {
			return t('text', 'Active people')
		},
		participantsPopover() {
			if (this.currentSession?.guestName) {
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
					&& (session.userId !== null || session.guestName !== null),
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
	.session-list {
		height: var(--default-clickable-area);
	}
	.avatar-list {
		border: none;
		background-color: var(--color-main-background);
		padding: 0;
		margin: 0;
		padding-left: 3px;
		display: inline-flex;
		flex-direction: row-reverse;

		.avatar-wrapper {
			margin: 0 -12px 0 0;
			z-index: 1;
			border-radius: 50%;
			overflow: hidden;
			box-sizing: content-box !important;
			height: calc(var(--default-clickable-area) - 4px);
			width: calc(var(--default-clickable-area) - 4px);
		}

		.icon-more, .icon-group, .icon-settings-dark {
			width: var(--default-clickable-area);
			height: var(--default-clickable-area);
			margin: 0 3px 0 0;

			&:hover {
				background-color: var(--color-background-hover);
			}
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
				height: 36px;
				width: 36px;
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
