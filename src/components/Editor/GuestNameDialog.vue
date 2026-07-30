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
			@submit.prevent="setGuestNameHandler">
			<NcInputField
				v-model="guestName"
				maxlength="60"
				:disabled="loading"
				:label="t('text', 'Enter your name')"
				:placeholder="t('text', 'Guest')" />
			<NcButton
				variant="primary"
				:aria-label="t('text', 'submit')"
				@click="setGuestNameHandler">
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
import { showWarning } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { ref, watch } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue'
import AvatarWrapper from './AvatarWrapper.vue'
import { useEditor } from '../../composables/useEditor.ts'
import { useGuestName } from '../../composables/useGuestName.ts'

const props = defineProps({
	session: {
		type: Object,
		required: true,
	},
})
const emit = defineEmits(['update:session'])
const { editor } = useEditor()
const { setGuestName } = useGuestName(editor)
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
/**
 *
 */
async function setGuestNameHandler() {
	loading.value = true
	try {
		const session = await setGuestName(guestName.value)
		if (session) {
			editing.value = false
			emit('update:session', session)
		}
	} catch {
		showWarning(t('text', 'Failed to update the guest name.'))
		guestName.value = props.session.guestName
	} finally {
		loading.value = false
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
