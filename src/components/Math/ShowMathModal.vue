<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcDialog
		v-if="show"
		:name="
			isBlock
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
