<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<form
		:title="t('text', 'Enter your name so other people can see who is editing')"
		class="guest-name-dialog"
		@submit.prevent="setGuestName()">
		<label><AvatarWrapper :session="session" /></label>
		<NcInputField
			v-model="guestName"
			class="input-field--trailing-icon"
			:disabled="loading"
			:label="t('text', 'Enter your name')"
			:placeholder="t('text', 'Guest')"
			:success="success" />
	</form>
</template>

<script>
import { showError, showWarning } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import { update } from '../../apis/connect.ts'
import { useConnection } from '../../composables/useConnection.ts'
import { useEditor } from '../../composables/useEditor.ts'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import AvatarWrapper from './AvatarWrapper.vue'

export default {
	name: 'GuestNameDialog',
	components: {
		AvatarWrapper,
		NcInputField,
	},
	props: {
		session: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const { connection } = useConnection()
		const { editor } = useEditor()
		const { updateUser } = useEditorMethods(editor)
		return { connection, updateUser }
	},
	data() {
		return {
			guestName: '',
			loading: false,
			success: false,
		}
	},
	watch: {
		guestName() {
			this.success = false
		},
	},
	beforeMount() {
		this.guestName = this.session.guestName
	},
	methods: {
		setGuestName() {
			if (!this.connection) {
				showError(t('text', 'Not connected. Cannot update guest name.'))
				return
			}
			const previousGuestName = this.session.guestName
			this.loading = true
			update(this.guestName, this.connection)
				.then((session) => {
					this.loading = false
					this.success = true
					localStorage.setItem('nick', this.guestName)
					this.$emit('update:session', session)
					this.updateUser(session)
				})
				.catch((error) => {
					this.loading = false
					console.warn('Failed to update the session', { error })
					showWarning(t('text', 'Failed to update the guest name.'))
					this.guestName = previousGuestName
				})
		},
		t,
	},
}
</script>

<style scoped lang="scss">
form.guest-name-dialog {
	display: flex;
	align-items: center;

	&:deep(img) {
		margin: 0 !important;
	}

	input {
		margin: 0;
	}
	input[type='text'] {
		flex-grow: 1;
	}
	label {
		padding-right: 3px;
		height: 32px;
	}
}
</style>
