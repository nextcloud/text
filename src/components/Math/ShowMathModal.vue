<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcDialog v-if="show" :name="dialogTitle" size="large" @closing="$emit('close')">
		<NcTextArea
			v-model="localLatex"
			:label="t('text', 'LaTeX formula')"
			:rows="isBlock ? 8 : 4"
			resize="both" />
		<template #actions>
			<NcButton @click="$emit('close')">
				{{ t('text', 'Cancel') }}
			</NcButton>
			<NcButton type="primary" @click="save">
				{{ t('text', 'Save') }}
			</NcButton>
		</template>
	</NcDialog>
</template>

<script>
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import NcTextArea from '@nextcloud/vue/components/NcTextArea'

export default {
	name: 'ShowMathModal',
	components: {
		NcDialog,
		NcTextArea,
		NcButton,
	},
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		latex: {
			type: String,
			required: true,
		},
		isBlock: {
			type: Boolean,
			required: true,
		},
	},
	emits: ['close', 'save'],
	data() {
		return {
			localLatex: this.latex,
		}
	},
	computed: {
		dialogTitle() {
			if (this.isBlock) {
				// TRANSLATORS LaTeX formula, LaTeX is a system to display complex maths and scientific notation/formulae
				// TRANSLATORS Block means it appears on its own, akin to a paragraph
				// TRANSLATORS This is the title of a modal dialog to edit a LaTeX formula in Block mode
				return t('text', 'Edit block formula')
			}
			// TRANSLATORS LaTeX formula, LaTeX is a system to display complex maths and scientific notation/formulae
			// TRANSLATORS Inline means it appears with other content, eg "something [the formula] something"
			// TRANSLATORS This is the title of a modal dialog to edit a LaTeX formula in Inline mode
			return t('text', 'Edit inline formula')
		},
	},
	methods: {
		save() {
			this.$emit('save', this.localLatex)
		},
		t,
	},
}
</script>
