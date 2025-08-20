<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcPopover
		:no-focus-trap="!showGuestNameDialog"
		class="session-list"
		placement="bottom">
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
							v-for="session in sessionsForTriggerButton"
							:key="session.id"
							:session="session" />
					</template>
				</NcButton>
			</div>
		</template>
		<template #default>
			<div class="session-menu">
				<slot name="lastSaved" />
				<ul>
					<li>
						<GuestNameDialog
							v-if="showGuestNameDialog"
							:session.sync="currentSession" />
					</li>
					<li
						v-for="session in sessionList"
						:key="session.id"
						:style="avatarStyle(session)">
						<AvatarWrapper :session="session" />
						<span
							class="session-label"
							:class="!session.userId && 'guest'">
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
import { useEditorFlags } from '../../composables/useEditorFlags.ts'
import { useSessions } from '../../composables/useSessions.ts'
import { useSyncService } from '../../composables/useSyncService.ts'
import {
	COLLABORATOR_DISCONNECT_TIME,
	COLLABORATOR_IDLE_TIME,
} from '../../services/SyncService.ts'
import AvatarWrapper from './AvatarWrapper.vue'
import GuestNameDialog from './GuestNameDialog.vue'

export default {
	name: 'SessionList',
	components: {
		AccountMultipleOutlineIcon,
		AvatarWrapper,
		GuestNameDialog,
		NcButton,
		NcPopover,
	},
	setup() {
		const { isPublic } = useEditorFlags()
		const { syncService } = useSyncService()
		const { currentSession, filteredSessions } = useSessions(syncService)
		return { currentSession, filteredSessions, isPublic }
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
		sessionList() {
			return this.showGuestNameDialog ? this.remoteSessions : this.allSessions
		},
		remoteSessions() {
			return this.allSessions.filter((session) => !session.isCurrent)
		},
		allSessions() {
			return Object.values(this.filteredSessions)
				.filter(
					(session) =>
						session.lastContact
							> Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME
						&& (session.userId !== null || session.guestName !== null),
				)
				.sort((a, b) => a.lastContact < b.lastContact)
		},
		showGuestNameDialog() {
			return (
				this.isPublic && this.currentSession && !this.currentSession.userId
			)
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
		sessionsForTriggerButton() {
			return this.remoteSessions.slice(0, 3)
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

/* Needs to be more specific than 0,2,0 (NcButton) */
.button-vue--icon-only.avatar-list {
	width: min-content !important;
	padding-inline: var(--default-grid-baseline);

	:deep(.button-vue__icon) {
		display: inline-flex;
		flex-direction: row-reverse;
		width: min-content;

		.avatar-wrapper {
			margin: 3px -12px 3px 0;
			z-index: 1;
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
			margin-right: 6px;
		}

		.session-label {
			padding-right: 3px;
		}

		.guest-label,
		.guest {
			color: var(--color-text-maxcontrast);
		}

		.guest-label {
			padding-left: 3px;
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
