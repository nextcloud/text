<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div id="resolve-conflicts" class="collision-resolve-dialog" :class="{'icon-loading': clicked }">
		<NcButton :wide="true"
			size="large"
			:disabled="clicked"
			data-cy="resolveThisVersion"
			@click="resolveThisVersion">
			{{ t('text', 'Overwrite version saved in the cloud') }}
			<template #icon>
				<PencilIcon :size="20" />
			</template>
		</NcButton>
		<NcButton :wide="true"
			:disabled="clicked"
			data-cy="resolveServerVersion"
			@click="resolveServerVersion">
			{{ t('text', 'Fetch version from the cloud') }}
			<template #icon>
				<CloudIcon :size="20" />
			</template>
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
		margin: auto;
		padding: 0 var(--default-grid-baseline);
		button {
			margin: 0 var(--default-grid-baseline) ;
		}
	}
</style>
