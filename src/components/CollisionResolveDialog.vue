<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		id="resolve-conflicts"
		class="collision-resolve-dialog"
		:class="{ 'icon-loading': clicked }">
		<NcButton
			:wide="true"
			size="large"
			:disabled="clicked"
			data-cy="useEditorVersion"
			@click="useEditorVersion">
			{{ textForSource[editorSource] }}
		</NcButton>
		<NcButton
			:wide="true"
			:disabled="clicked"
			data-cy="useReaderVersion"
			@click="useReaderVersion">
			{{ textForSource[readerSource] }}
		</NcButton>
	</div>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { useEditor } from '../composables/useEditor.ts'
import { useEditorMethods } from '../composables/useEditorMethods.ts'
import { useSaveService } from '../composables/useSaveService.ts'
import { useSyncService } from '../composables/useSyncService.ts'
import { logger } from '../helpers/logger.ts'
export default {
	name: 'CollisionResolveDialog',
	components: {
		NcButton,
	},
	props: {
		otherVersion: {
			type: String,
			required: true,
		},
		readerSource: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		if (!['local', 'server'].includes(props.readerSource)) {
			logger.warn('Invalid reader source', props)
		}
		const { editor } = useEditor()
		const { syncService } = useSyncService()
		const { saveService } = useSaveService()
		const { setContent, setEditable } = useEditorMethods(editor)
		const editorSource = props.readerSource === 'local' ? 'server' : 'local'
		const textForSource = {
			local: t('text', 'Overwrite the file and save the unsaved changes'),
			server: t('text', 'Discard the changes and edit the latest version'),
		}
		return {
			editorSource,
			textForSource,
			setContent,
			setEditable,
			saveService,
			syncService,
			t,
		}
	},
	data() {
		return {
			clicked: false,
		}
	},
	methods: {
		useEditorVersion() {
			this.clicked = true
			this.saveService.forceSave().then(() => {
				this.syncService.syncUp()
				this.$emit('resolved')
			})
			this.setEditable(!this.readOnly)
		},
		useReaderVersion() {
			this.clicked = true
			this.setEditable(!this.readOnly)
			this.setContent(this.otherVersion)
			this.saveService.forceSave().then(() => {
				this.syncService.syncUp()
				this.$emit('resolved')
			})
		},
	},
}
</script>

<style scoped lang="scss">
#resolve-conflicts {
	position: sticky;
	top: 0;
	display: flex;
	z-index: 1;
	margin: auto;
	padding: 0 var(--default-grid-baseline);
	button {
		margin: 0 var(--default-grid-baseline);
	}
}
</style>
