<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcPopover class="session-list" placement="bottom">
		<template #trigger="{ attrs }">
			<div>
				<NcButton :title="label"
					:aria-label="label"
					type="tertiary"
					class="avatar-list"
					v-bind="attrs">
					<template #icon>
						<AccountMultipleIcon :size="20" />
						<AvatarWrapper v-for="session in sessionsVisible"
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
					<slot />
					<li v-for="session in participantsPopover"
						:key="session.id"
						:style="avatarStyle(session)">
						<AvatarWrapper :session="session" />
						<span class="session-label" :class="!session.userId && 'guest'">
							{{
								session.userId ? session.displayName : (session.guestName ? session.guestName : t('text', 'Guest'))
							}}
						</span>
						<span v-if="session.userId === null" class="guest-label">({{ t('text', 'guest') }})</span>
					</li>
					<li>
						<NcCheckboxRadioSwitch :checked="isFullWidth" @update:checked="onWidthToggle">
							{{ t('text', 'Full width editor') }}
						</NcCheckboxRadioSwitch>
					</li>
				</ul>
			</div>
		</template>
	</NcPopover>
</template>

<script>
import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcPopover from '@nextcloud/vue/components/NcPopover'
import AccountMultipleIcon from 'vue-material-design-icons/AccountMultiple.vue'
import AvatarWrapper from './AvatarWrapper.vue'
import { COLLABORATOR_DISCONNECT_TIME, COLLABORATOR_IDLE_TIME } from '../../services/SyncService.js'
import { loadState } from '@nextcloud/initial-state'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

export default {
	name: 'SessionList',
	components: {
		AccountMultipleIcon,
		AvatarWrapper,
		NcButton,
		NcPopover,
		NcCheckboxRadioSwitch,
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
		const isFullWidth = loadState('text', 'is_full_width_editor', false)
		return {
			myName: '',
			isFullWidth,
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
		sessionsForTriggerButton() {
			return this.remoteSessions.slice(0, 3)
		},
	},
	methods: {
		onWidthToggle(checked) {
			this.isFullWidth = checked
			this.$emit('editor-width-change', checked ? '100%' : '80ch')

			axios.post(generateUrl('/apps/text/settings'), {
				key: 'is_full_width_editor',
				value: checked ? '1' : '0',
			})
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
		}

		.guest-label, .guest {
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
