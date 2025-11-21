<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcDialog
		v-if="show"
		:name="
			isBlock
			// TRANSLATORS LaTeX formula, LaTeX is a system to display complex maths and scientific notation/formulae
			// TRANSLATORS There are two ways to show these formulae, Inline, or Display
			// TRANSLATORS Inline means it appears with other content, eg "something [the formula] something"
			// TRANSLATORS Display means it appears on its own, akin to a paragraph
			// TRANSLATORS This is the title of a modal dialog to edit a LaTeX formula
				? t('text', 'Edit display formula')
				: t('text', 'Edit inline formula')
		"
		size="large"
		@closing="$emit('close')">
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
	methods: {
		save() {
			this.$emit('save', this.localLatex)
		},
		t,
	},
}
</script>
