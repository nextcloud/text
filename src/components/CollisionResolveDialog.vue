<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div id="resolve-conflicts" class="collision-resolve-dialog" :class="{'icon-loading': clicked }">
		<NcButton :disabled="clicked" data-cy="resolveThisVersion" @click="resolveThisVersion">
			{{ t('text', 'Use current version') }}
		</NcButton>
		<NcButton :disabled="clicked" data-cy="resolveServerVersion" @click="resolveServerVersion">
			{{ t('text', 'Use the saved version') }}
		</NcButton>
	</div>
</template>

<script>
import {
	useEditorMixin,
	useIsRichEditorMixin,
	useSyncServiceMixin,
} from './Editor.provider.js'
import CloudIcon from 'vue-material-design-icons/Cloud.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import { NcButton } from '@nextcloud/vue'
import setContent from './../mixins/setContent.js'
export default {
	name: 'CollisionResolveDialog',
	components: {
		NcButton,
		PencilIcon,
		CloudIcon,
	},
	mixins: [
		useEditorMixin,
		useIsRichEditorMixin,
		setContent,
		useSyncServiceMixin,
	],
	props: {
		syncError: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			clicked: false,
		}
	},
	methods: {
		resolveThisVersion() {
			this.clicked = true
			this.$syncService.forceSave().then(() => this.$syncService.syncUp())
			this.$editor.setEditable(!this.readOnly)
		},
		resolveServerVersion() {
			const { outsideChange } = this.syncError.data
			this.clicked = true
			this.$editor.setEditable(!this.readOnly)
			this.setContent(outsideChange, { isRichEditor: this.$isRichEditor })
			this.$syncService.forceSave().then(() => this.$syncService.syncUp())
		},
	},
}
</script>

<style scoped lang="scss">
	#resolve-conflicts {
		display: flex;
		width: 100%;
		margin: auto;
		button {
			margin: 0 var(--default-grid-baseline) ;
		}
	}
</style>
