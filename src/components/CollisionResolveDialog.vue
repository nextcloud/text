<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
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
import { useEditorMixin, useSyncServiceMixin } from './Editor.provider.js'
import { NcButton } from '@nextcloud/vue'
import markdownit from './../markdownit/index.js'
export default {
	name: 'CollisionResolveDialog',
	components: {
		NcButton,
	},
	mixins: [
		useEditorMixin,
		useSyncServiceMixin,
	],
	props: {
		syncError: {
			type: Object,
			default: null,
		}
	},
	data() {
		return {
			clicked: false,
		}
	},
	methods: {
		resolveThisVersion() {
			this.clicked = true
			this.$syncService.forceSave()
			this.$editor.setOptions({ editable: !this.readOnly })
			this.$syncService.startSync()
		},
		resolveServerVersion() {
			this.clicked = true
			const markdownItHtml = markdownit.render(this.syncError.data.outsideChange)
			this.$editor.setOptions({ editable: !this.readOnly })
			this.$editor.commands.setContent(markdownItHtml)
			this.$syncService.forceSave()
			this.$syncService.startSync()
		},
	},
}
</script>

<style scoped lang="scss">
	#resolve-conflicts {
		display: flex;
		width: 100%;
		margin: auto;
		padding: 20px 0;

		button {
			margin: auto;
		}
	}
</style>
