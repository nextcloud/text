<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div class="text-outline-tab__container">
		<div class="header">
			<h4>{{ t('text', 'Outline') }}</h4>
		</div>
		<div class="toc">
			<li v-for="heading in headings" :key="heading.id">
				<a :href="`#${heading.id}`">{{ heading.text }}</a>
			</li>
		</div>
	</div>
</template>

<script lang="ts">
import { t } from '@nextcloud/l10n'
import { defineComponent } from 'vue'
import type { FileInfo } from '../helpers/files-sidebar.ts'
import { useEditorHeadings } from '../composables/useEditorHeadings.ts'

export default defineComponent({
	name: 'OutlineSidebarTab',

	setup() {
		const { headings } = useEditorHeadings()
		return { headings }
	},

	data() {
		return {
			fileInfo: null,
		}
	},

	mounted() {
		console.debug('headings in OutlineSidebarTab', this.headings)
	},

	methods: {
		/*
		update(headings: Array) {
			this.headings = headings
		},
		 */
		t,
	},

})
</script>

<style lang="scss" scoped>
.header {
	margin-block: 2px;
	padding-bottom: 4px;
}
</style>
