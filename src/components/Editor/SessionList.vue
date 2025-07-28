<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcPopover class="session-list" placement="bottom">
		<template #trigger="{ attrs }">
			<div>
				<NcButton
					:title="label"
					:aria-label="label"
					type="tertiary"
					class="avatar-list"
					v-bind="attrs">
					<template #icon>
						<AccountMultipleOutlineIcon :size="20" />
						<AvatarWrapper
							v-for="session in sessionsVisible"
							:key="session.id"
							:session="session"
							:size="28" />
					</template>
				</NcButton>
			</div>
		</template>
		<template #default>
			<div class="session-menu">
				<slot name="lastSaved" />
				<ul>
					<slot />
					<li
						v-for="session in participantsPopover"
						:key="session.id"
						:style="avatarStyle(session)">
						<AvatarWrapper :session="session" :size="36" />
						<span class="session-label">
							{{
								session.userId
									? session.displayName
									: session.guestName
										? session.guestName
										: t('text', 'Guest')
							}}
						</span>
						<span v-if="session.userId === null" class="guest-label"
							>({{ t('text', 'guest') }})</span
						>
					</li>
					<li>
						<WidthToggle />
					</li>
				</ul>
			</div>
		</template>
	</NcPopover>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcPopover from '@nextcloud/vue/components/NcPopover'
import AccountMultipleOutlineIcon from 'vue-material-design-icons/AccountMultipleOutline.vue'
import {
	COLLABORATOR_DISCONNECT_TIME,
	COLLABORATOR_IDLE_TIME,
} from '../../services/SyncService.ts'
import AvatarWrapper from './AvatarWrapper.vue'
import WidthToggle from './WidthToggle.vue'

export default {
	name: 'SessionList',
	components: {
		AccountMultipleOutlineIcon,
		AvatarWrapper,
		NcButton,
		NcPopover,
		WidthToggle,
	},
	props: {
		sessions: {
			type: Object,
			default: () => {
				return {}
			},
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
			return Object.values(this.sessions)
				.filter(
					(session) =>
						session.lastContact
							> Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME
						&& (session.userId !== null || session.guestName !== null),
				)
				.sort((a, b) => a.lastContact < b.lastContact)
		},
		currentSession() {
			return Object.values(this.sessions).find((session) => session.isCurrent)
		},
		avatarStyle() {
			return (session) => {
				return {
					opacity:
						session.lastContact
						> Date.now() / 1000 - COLLABORATOR_IDLE_TIME
							? 1
							: 0.5,
				}
			}
		},
		sessionsVisible() {
			return this.participantsWithoutCurrent.slice(0, 3)
		},
	},
	methods: {
		t,
	},
}
</script>

<style scoped lang="scss">
.session-list {
	height: var(--default-clickable-area);
}

.avatar-list {
	width: min-content !important;
	padding-inline: var(--default-grid-baseline);

	:deep(.button-vue__icon) {
		display: inline-flex;
		flex-direction: row-reverse;
		width: min-content;

		.avatar-wrapper {
			margin: 3px -12px 3px 0;
			z-index: 1;
			overflow: hidden;
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
