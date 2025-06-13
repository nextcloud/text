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
			{{ t('text', 'Overwrite the file and save the current changes') }}
		</NcButton>
		<NcButton :wide="true"
			:disabled="clicked"
			data-cy="resolveServerVersion"
			@click="resolveServerVersion">
			{{ t('text', 'Discard the current changes and load the latest version') }}
		</NcButton>
	</div>
</template>

<script>
import {
	useEditorMixin,
	useIsRichEditorMixin,
	useSyncServiceMixin,
} from './Editor.provider.js'
import NcButton from '@nextcloud/vue/components/NcButton'
import setContent from './../mixins/setContent.js'
export default {
	name: 'CollisionResolveDialog',
	components: {
		NcButton,
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
		position: sticky;
		display: flex;
		z-index: 1;
		margin: auto;
		padding: 0 var(--default-grid-baseline);
		button {
			margin: 0 var(--default-grid-baseline) ;
		}
	}
</style>
