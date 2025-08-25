<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<form :title="t('text', 'Enter your name so other people can see who is editing')" class="guest-name-dialog" @submit.prevent="setGuestName()">
		<label><AvatarWrapper :session="session" :size="32" /></label>
		<input v-model="guestName"
			type="text"
			:aria-label="t('text', 'Edit guest name')"
			:placeholder="t('text', 'Guest')">
		<input type="submit"
			class="icon-confirm"
			:aria-label="t('text', 'Save guest name')"
			value="">
	</form>
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import AvatarWrapper from './AvatarWrapper.vue'
import { useSyncServiceMixin } from '../Editor.provider.js'

export default {
	name: 'GuestNameDialog',
	components: {
		AvatarWrapper,
		NcButton,
		NcInputField,
		PencilOutlineIcon,
	},
	mixins: [
		useSyncServiceMixin,
	],
	props: {
		session: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			editing: false,
			guestName: '',
			guestNameBuffered: '',
			loading: false,
		}
	},
	computed: {
		avatarUrl() {
			const size = 32
			const avatarUrl = generateUrl(
				'/avatar/guest/{user}/{size}',
				{
					user: this.guestNameBuffered,
					size,
				})
			return window.location.protocol + '//' + window.location.host + avatarUrl
		},
	},
	beforeMount() {
		this.guestName = this.$syncService.guestName
		this.updateBufferedGuestName()
	},
	methods: {
		setGuestName() {
			const previousGuestName = this.$syncService.guestName
			this.$syncService.updateSession(this.guestName).then(() => {
				localStorage.setItem('nick', this.guestName)
				this.updateBufferedGuestName()
			}).catch((e) => {
				this.guestName = previousGuestName
			})
		},
		updateBufferedGuestName() {
			this.guestNameBuffered = this.guestName
		},
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
	}
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
		localStorage.setItem('nick', guestName.value)
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
		align-items: center;
		padding: 6px;

		&:deep(img) {
			margin: 0 !important;
		}

		input[type=text] {
			flex-grow: 1;
		}
		label {
			padding-right: 3px;
			height: 32px;
		}
	}
</style>
