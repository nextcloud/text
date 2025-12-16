<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		class="text-editor__wrapper"
		:class="{
			'has-conflicts': isResolvingConflict,
			'is-rich-workspace': isRichWorkspace,
			'is-rich-editor': isRichEditor,
		}">
		<slot />
	</div>
</template>

<script>
import { useEditorFlags } from '../../composables/useEditorFlags.ts'
import { READ_ONLY_ACTIONS } from './Wrapper.provider.js'

export default {
	name: 'Wrapper',
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[READ_ONLY_ACTIONS]: {
				get: () => ({
					toggle: this.readOnlyToggle,
				}),
			},
		})

		return val
	},

	props: {
		isResolvingConflict: {
			type: Boolean,
			default: false,
		},
		hasConnectionIssue: {
			type: Boolean,
			default: false,
		},
		contentLoaded: {
			type: Boolean,
			default: true,
		},
	},

	setup() {
		const { isRichEditor, isRichWorkspace } = useEditorFlags()
		return { isRichEditor, isRichWorkspace }
	},

	methods: {
		readOnlyToggle() {
			this.$emit('read-only-toggled')
		},
	},
}
</script>

<style scoped lang="scss">
.text-editor__wrapper {
	display: flex;
	flex-grow: 1;

	width: 100%;

	.ProseMirror {
		margin-top: 0 !important;
	}
}
</style>
