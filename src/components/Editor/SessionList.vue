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
							v-for="client in visibleClients"
							:key="client.id"
							:client="client"
							:size="28" />
					</template>
				</NcButton>
			</div>
		</template>
		<template #default>
			<div class="session-menu">
				<slot name="lastSaved" />
				<ul>
					<GuestNameDialog
						v-if="!localClient.userId"
						:guest-name="localClient.guestName ?? ''"
						:client="localClient"
						@set-guest-name="setGuestName" />
					<slot />
					<li
						v-for="client in clientsToListInPopover"
						:key="client.clientId"
						:style="avatarStyle(client)">
						<AvatarWrapper :client="client" :size="36" />
						<span class="session-label">
							{{ client.name || client.userId || t('text', 'Guest') }}
						</span>
						<span v-if="client.userId === null" class="guest-label"
							>({{ t('text', 'guest') }})</span
						>
					</li>
					<li>
						<NcCheckboxRadioSwitch
							:checked="isFullWidth"
							@update:checked="onWidthToggle">
							{{ t('text', 'Full width editor') }}
						</NcCheckboxRadioSwitch>
					</li>
				</ul>
			</div>
		</template>
	</NcPopover>
</template>

<script>
import axios from '@nextcloud/axios'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcPopover from '@nextcloud/vue/components/NcPopover'
import AccountMultipleOutlineIcon from 'vue-material-design-icons/AccountMultipleOutline.vue'
import { Awareness } from 'y-protocols/awareness.js'
import { useClients } from '../../composables/useClients.ts'
import { useEditor } from '../../composables/useEditor.ts'
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
		NcCheckboxRadioSwitch,
	},
	props: {
		awareness: {
			type: Awareness,
			default: () => {
				return {}
			},
		},
	},
	setup(props) {
		const { editor } = useEditor()
		const { clients, localClient, setGuestName } = useClients(props, editor)
		return { clients, localClient, setGuestName }
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
		clientsToListInPopover() {
			return this.localClient?.userId ? this.remoteClients : this.clients
		},
		remoteClients() {
			return this.clients.filter(
				({ clientId }) => clientId !== this.localClient.clientId,
			)
		},
		avatarStyle() {
			return (client) => {
				return {
					opacity:
						client.lastContact
						> Date.now() / 1000 - COLLABORATOR_IDLE_TIME
							? 1
							: 0.5,
				}
			}
		},
		visibleClients() {
			return this.remoteClients.slice(0, 3)
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
