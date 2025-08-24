<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<li>
		<form
			v-if="editing"
			:title="
				t('text', 'Enter your name so other people can see who is editing')
			"
			class="guest-name-dialog"
			@submit.prevent="setGuestName()">
			<label><AvatarWrapper :session="session" /></label>
			<NcInputField
				v-model="guestName"
				class="input-field--trailing-icon"
				:disabled="loading"
				:label="t('text', 'Enter your name')"
				:placeholder="t('text', 'Guest')" />
		</form>
		<template v-else>
			<AvatarWrapper :session="session" />
			<span class="session-label guest">
				{{ guestName || t('text', 'you') }}
			</span>
			<NcButton :aria-label="t('text', 'edit')" @click="editing = true">
				<template #icon>
					<PencilOutlineIcon :size="20" />
				</template>
				{{ t('text', 'edit') }}
			</NcButton>
		</template>
	</li>
</template>

<script setup>
import { showError, showWarning } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import { ref } from 'vue'
import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue'
import { update } from '../../apis/connect.ts'
import { useConnection } from '../../composables/useConnection.ts'
import { useEditor } from '../../composables/useEditor.ts'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'
import AvatarWrapper from './AvatarWrapper.vue'

const props = defineProps({
	session: {
		type: Object,
		required: true,
	},
})
const emit = defineEmits(['update:session'])
const { connection } = useConnection()
const { editor } = useEditor()
const { updateUser } = useEditorMethods(editor)
const editing = ref(false)
const loading = ref(false)
const guestName = ref(props.session.guestName)

const setGuestName = () => {
	if (!connection.value) {
		showError(t('text', 'Not connected. Cannot update guest name.'))
		return
	}
	const previousGuestName = props.session.guestName
	loading.value = true
	update(guestName.value, connection.value)
		.then((session) => {
			loading.value = false
			editing.value = false
			localStorage.setItem('nick', guestName.value)
			emit('update:session', session)
			updateUser(session)
		})
		.catch((error) => {
			loading.value = false
			console.warn('Failed to update the session', { error })
			showWarning(t('text', 'Failed to update the guest name.'))
			guestName.value = previousGuestName
		})
}
</script>

<style scoped lang="scss">
form.guest-name-dialog {
	display: flex;
	align-items: center;
	/* Full width - 12 px combined padding of the list */
	width: calc(var(--session-max-width) - 12px);

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
		padding-inline-end: 3px;
	}
}
ul li {
	align-items: center;
	display: flex;
	padding: 6px;
	/* to match the form */
	width: calc(var(--session-max-width) - 12px);

	.avatar-wrapper {
		margin-block-start: 6px; /* to match NcInputField */
		margin-inline-end: 6px;
	}

	.session-label {
		padding-inline-end: 3px;
	}

	.guest {
		color: var(--color-text-maxcontrast);
	}

	button {
		margin-inline-start: auto;
	}
}
</style>
