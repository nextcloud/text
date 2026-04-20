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
			@submit.prevent="setGuestName">
			<NcInputField
				v-model="guestName"
				maxlength="60"
				:disabled="loading"
				:label="t('text', 'Enter your name')"
				:placeholder="t('text', 'Guest')" />
			<NcButton
				variant="primary"
				:aria-label="t('text', 'submit')"
				@click="setGuestName">
				<template #icon>
					<CheckIcon :size="20" />
				</template>
			</NcButton>
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
			</NcButton>
		</template>
	</li>
</template>

<script setup>
import { showError, showWarning } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import { ref, watch } from 'vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
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
watch(
	() => props.session.guestName,
	(newName) => {
		if (!editing.value) {
			guestName.value = newName
		}
	},
)
const setGuestName = async () => {
	if (!connection.value) {
		showError(t('text', 'Not connected. Cannot update guest name.'))
		return
	}
	const previousGuestName = props.session.guestName
	loading.value = true
	try {
		const session = await update(guestName.value, connection.value)
		loading.value = false
		editing.value = false
		try {
			localStorage.setItem('nick', session.guestName)
		} catch (e) {
			console.warn('Could not store guest name in local storage.', e)
		}
		emit('update:session', session)
		updateUser(session)
	} catch (error) {
		loading.value = false
		console.warn('Failed to update the session', { error })
		showWarning(t('text', 'Failed to update the guest name.'))
		guestName.value = previousGuestName
	}
}
</script>

<style scoped lang="scss">
form.guest-name-dialog {
	display: flex;
	width: calc(var(--session-max-width) - 12px);

	&:deep(img) {
		margin: 0 !important;
	}

	button {
		margin-inline-start: 3px;
	}
}

ul li {
	align-items: center;
	display: flex;
	/* to match the form */
	width: calc(var(--session-max-width) - 12px);

	/* match the input in the form */
	.avatar-wrapper,
	button,
	.session-label {
		margin-block-start: 6px;
	}

	.avatar-wrapper {
		margin-inline-end: 6px;
	}

	.session-label {
		padding-inline-end: 3px;
		/* keep some room for the avatar and edit button */
		max-width: calc(var(--session-max-width) - 100px);
		overflow-wrap: break-word;
	}

	.guest {
		color: var(--color-text-maxcontrast);
	}

	button {
		margin-inline-start: auto;
	}
}
</style>
