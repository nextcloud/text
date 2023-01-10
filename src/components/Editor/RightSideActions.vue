<template>
	<div class="right-side-actions">
		<div class="user-avatar__icon user-avatar__icon--with-avatar"
			:style="avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : null">
		</div>
		<a :download="basename"
			:href="fullPathToFile">
			<Button class="download__button"
				type="primary">
				Download
			</Button>
		</a>
		<Actions>
			<ActionButton icon="icon-edit"
				:close-after-click="true"
				@click="showSidebar">
				Open sidebar
			</ActionButton>
			<ActionButton icon="icon-delete"
				:close-after-click="true"
				@click="onDelete">
				Delete
			</ActionButton>
		</Actions>
	</div>
</template>

<script>

import axios from '@nextcloud/axios'
import { getCurrentUser } from '@nextcloud/auth'
import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import Button from '@nextcloud/vue/dist/Components/Button'
import { getRootPath } from '../../helpers/files.js'
import { getAvatarUrl } from '../../helpers'

export default {
	name: 'RightSideActions',

	components: {
		Actions,
		ActionButton,
		Button,
	},

	props: {
		basename: {
			type: String,
			default: null,
		},
		relativePath: {
			type: String,
			default: '',
		},
	},

	computed: {
		avatarUrl() {
			let currentUser = getCurrentUser() 
			return currentUser ? getAvatarUrl(currentUser?.uid, 44) : null
		},
		fullPathToFile() {
			return getRootPath() + this.relativePath
		}
	},

	methods: {
		async onDelete() {
			try {
				const url = this.fullPathToFile
				await axios.delete(url)
				this.closeEditor()
			} catch (error) {
				showError(error)
			}
		},
		async showSidebar() {
			// Open the sidebar sharing tab
			if (OCA?.Files?.Sidebar) {
				await OCA.Files.Sidebar.open(this.relativePath)
			}
		},
	}
}
</script>

<style scoped lang="scss">
	$clickable-area: 35px;
	$usericon-padding: 10px;

	.right-side-actions {
		display: flex;
	}

	.user-avatar__icon {
		position: relative;
		top: 5px;
		width: $clickable-area;
		min-width: $clickable-area;
		height: $clickable-area;
		margin: 0 5px !important;
		border-radius: $clickable-area;
		background-color: var(--color-background-darker);
		background-repeat: no-repeat;
		background-position: center;
		background-size: $clickable-area - 2 * $usericon-padding;
		&--with-avatar {
			color: inherit;
			background-size: cover;
		}
	}

	.download__button {
		border: 1px solid white !important;
	}
</style>

<style lang="scss">
	// It makes the app right sidebar appear under the Menubar instead
	// of Hiding a part of it
	// The value used is the max-length of the Menubar
	#app-sidebar-vue {
		top: 44px !important;
	}
</style>
