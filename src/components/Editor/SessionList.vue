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
					variant="tertiary"
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
					<GuestNameDialog
						v-if="showGuestNameDialog"
						:session.sync="currentGuestSession" />
					<li
						v-for="session in sessionList"
						:key="session.id"
						:style="avatarStyle(session)">
						<AvatarWrapper :session="session" />
						<span
							class="session-label"
							:class="!session.userId && 'guest'">
							{{ displayNameOrGuestName(session) }}
						</span>
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
import { COLLABORATOR_IDLE_TIME } from '../../services/SyncService.ts'
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
		const { currentGuestSession, currentSession, sessions } =
			useSessions(syncService)
		return { currentGuestSession, currentSession, sessions, isPublic }
	},
	computed: {
		label() {
			return t('text', 'Active people')
		},
		sessionList() {
			return this.showGuestNameDialog ? this.remoteSessions : this.sessions
		},
		remoteSessions() {
			return this.sessions.filter(
				(session) => session.id !== this.currentSession?.id,
			)
		},
		showGuestNameDialog() {
			return this.isPublic && this.currentGuestSession
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
		displayNameOrGuestName: (session) => {
			if (session.userId) {
				return session.displayName
			}
			const guestName = session.guestName || t('text', 'Guest')
			return `${guestName} (${t('text', 'guest')})`
		},
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
	--session-max-width: 280px;
	max-width: var(--session-max-width);
	padding-block-start: 6px;
	padding-block-end: 6px;

	ul li {
		align-items: center;
		display: flex;
		padding: 6px;

		.avatar-wrapper {
			margin-inline-end: 6px;
		}

		.session-label {
			padding-inline-end: 3px;
			/* keep some room for the avatar and edit button */
			max-width: calc(var(--session-max-width) - 60px);
			overflow-wrap: break-word;
		}

		.guest-label,
		.guest {
			color: var(--color-text-maxcontrast);
		}

		.guest-label {
			padding-inline-start: 3px;
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
