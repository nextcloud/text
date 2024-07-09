<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="text-editor__wrapper"
		:class="{
			'has-conflicts': hasSyncCollission,
			'is-rich-workspace': $isRichWorkspace,
			'is-rich-editor': $isRichEditor,
		}">
		<slot />
	</div>
</template>

<script>
import { ERROR_TYPE } from './../../services/SyncService.js'
import { useIsRichEditorMixin, useIsRichWorkspaceMixin } from './../Editor.provider.js'
import { OUTLINE_STATE, OUTLINE_ACTIONS } from './Wrapper.provider.js'
import useStore from '../../mixins/store.js'
import { mapState } from 'vuex'

export default {
	name: 'Wrapper',
	mixins: [useStore, useIsRichEditorMixin, useIsRichWorkspaceMixin],
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[OUTLINE_STATE]: {
				get: () => this.outline,
			},
			[OUTLINE_ACTIONS]: {
				get: () => ({
					toggle: this.outlineToggle,
				}),
			},
		})

		return val
	},

	props: {
		syncError: {
			type: Object,
			default: null,
		},
		hasConnectionIssue: {
			type: Boolean,
			default: false,
		},
		contentLoaded: {
			type: Boolean,
			default: true,
		},
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
	},

	data: () => ({
		outline: {
			visible: false,
			enable: false,
		},
	}),

	computed: {
		...mapState({
			viewWidth: (state) => state.text.viewWidth,
		}),

		hasSyncCollission() {
			return this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
		},
		showOutline() {
			return this.isAbleToShowOutline
				? this.outline.visible
				: false
		},
		isAbleToShowOutline() {
			if (this.$isRichWorkspace) {
				return false
			}

			return this.viewWidth > 1265
		},
	},

	watch: {
		'showOutlineOutside'() {
			this.outline.visible = this.showOutlineOutside
		},
	},

	mounted() {
		this.outline.enable = this.isAbleToShowOutline

		this.$watch(
			() => this.isAbleToShowOutline,
			(enable) => {
				// make outline state reactive through the provider
				Object.assign(this.outline, { enable })
			},
		)

		document.addEventListener('keydown', this.handleKeyDown)
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this.handleKeyDown)
	},
	methods: {
		outlineToggle() {
			this.outline.visible = !this.outline.visible
			this.$emit('outline-toggled', this.outline.visible)
		},
		handleKeyDown(event) {
			if (event.ctrlKey && event.altKey && event.key === 'h') {
				this.outlineToggle()
			}
		},
	},

}
</script>

<style scoped lang="scss">

	.text-editor__wrapper {
		display: flex;
		width: 100%;
		height: 100%;

		.ProseMirror {
			margin-top: 0 !important;
		}
	}

</style>
