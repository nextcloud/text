<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcModal :show="show"
		size="large"
		:name="t('text', 'Translate')"
		@close="$emit('close')">
		<div class="translate-dialog">
			<h2>{{ t('text', 'Translate') }}</h2>
			<em>{{ t('text', 'To translate individual parts of the text, select it before using the translate function.') }}</em>
			<div class="wrapper">
				<div class="col">
					<div class="language-selector">
						<label for="fromLanguage">{{ t('text', 'Translate from') }}</label>
						<NcSelect v-model="fromLanguage"
							input-id="fromLanguage"
							:placeholder="t('text', 'Select language')"
							:aria-label-combobox="t('text', 'Translate from')"
							:options="fromLanguages"
							:disabled="disableFromLanguageSelect"
							:append-to-body="false" />
					</div>
					<NcTextArea ref="input"
						:value.sync="input"
						:label="t('text', 'Text to translate from')"
						autofocus
						data-cy="translate-input"
						input-class="translate-textarea"
						resize="none"
						@focus="onInputFocus" />
				</div>
				<div class="col">
					<div class="language-selector">
						<label for="toLanguage">{{ t('text', 'to') }}</label>
						<NcSelect v-model="toLanguage"
							input-id="toLanguage"
							:placeholder="t('text', 'Select language')"
							:aria-label-combobox="t('text', 'Translate to')"
							:options="toLanguages"
							:disabled="!fromLanguage"
							:append-to-body="false" />
					</div>
					<NcTextArea ref="result"
						:value.sync="result"
						:label="t('text', 'Translated text result')"
						readonly
						input-class="translate-textarea"
						resize="none"
						:class="{'icon-loading': loading }" />
				</div>
			</div>
			<div class="translate-actions">
				<NcLoadingIcon v-if="loading" />
				<NcButton v-if="!result"
					type="primary"
					:disabled="loading"
					@click="translate">
					{{ t('text', 'Translate') }}
				</NcButton>
				<NcButton v-if="result && content" type="secondary" @click="contentReplace">
					{{ t('text', 'Replace') }}
				</NcButton>
				<NcButton v-if="result" type="primary" @click="contentInsert">
					{{ t('text', 'Insert') }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>

<script>
import axios from '@nextcloud/axios'
import { loadState } from '@nextcloud/initial-state'
import { generateOcsUrl } from '@nextcloud/router'
import { NcModal, NcButton, NcSelect, NcLoadingIcon, NcTextArea } from '@nextcloud/vue'
import { useIsMobileMixin } from '../Editor.provider.js'

const detectLanguageEntry = {
	id: null,
	label: t('text', 'Detect language'),
}

export default {
	name: 'Translate',
	components: {
		NcModal,
		NcButton,
		NcSelect,
		NcLoadingIcon,
		NcTextArea,
	},
	mixins: [
		useIsMobileMixin,
	],
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		content: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			input: 'Hallo welt. Das ist ein Test.',
			result: '',
			fromLanguage: loadState('text', 'translation_can_detect', false) === true ? detectLanguageEntry : null,
			toLanguage: null,
			languages: loadState('text', 'translation_languages', []),
			canDetect: loadState('text', 'translation_can_detect'),
			loading: false,
			error: null,
			disableFromLanguageSelect: true,
		}
	},
	computed: {
		fromLanguages() {
			const result = this.canDetect ? [detectLanguageEntry] : []
			const set = new Set()
			for (const item of this.languages) {
				if (!set.has(item.from)) {
					set.add(item.from)
					result.push({
						id: item.from,
						label: !this.$isMobile ? item.fromLabel : t('text', 'Translate from {language}', { language: item.fromLabel }),
					})
				}
			}
			return result
		},
		toLanguages() {
			if (this.fromLanguage === null) {
				return []
			}

			const languages = this.languages.filter(l => {
				if (this.fromLanguage.id === null) {
					return true
				}
				return l.from === this.fromLanguage.id
			})
			const result = []
			const set = new Set()
			for (const item of languages) {
				if (!set.has(item.to)) {
					set.add(item.to)
					result.push({
						id: item.to,
						label: !this.$isMobile ? item.toLabel : t('text', 'Translate to {language}', { language: item.toLabel }),
					})
				}
			}
			return result
		},
	},
	watch: {
		content() {
			this.input = this.content
		},
		input() {
			this.result = ''
			this.error = null
			this.autosize()
		},
		toLanguage() {
			this.result = ''
			this.error = null
		},
	},
	mounted() {
		this.input = this.content
	},
	methods: {
		async translate() {
			this.loading = true
			try {
				const result = await axios.post(generateOcsUrl('translation/translate'), {
					text: this.input,
					fromLanguage: this.fromLanguage?.id ?? null,
					toLanguage: this.toLanguage.id,
				})
				this.result = result.data.ocs.data.text
			} catch (e) {
				console.error('Failed to translate', e)
				this.error = t('text', 'Translation failed')
			} finally {
				this.loading = false
			}
		},
		async contentInsert() {
			this.$emit('insert-content', this.result)
		},
		async contentReplace() {
			this.$emit('replace-content', this.result)
		},
		autosize() {
			this.$refs.input.$refs.input.style.overflowY = 'hidden'
			this.$refs.input.$refs.input.style.height = 'auto'
			const height = this.$refs.input.$refs.input.scrollHeight + 10
			this.$refs.input.$refs.input.style.height = height + 'px'
			this.$refs.result.$refs.input.style.height = height + 'px'
			this.$refs.input.$refs.input.style.overflowY = 'auto'
		},
		onInputFocus() {
			this.disableFromLanguageSelect = false
			this.autosize()
		},
	},
}
</script>

<style lang="scss" scoped>
.translate-dialog {
	margin: 24px;

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-column-gap: 16px;
		margin-top: calc(var(--default-grid-baseline) * 6);

		.language-selector {
			font-weight: bold;
			flex-wrap: wrap;
			gap: var(--default-grid-baseline);
		}

		.col {
			grid-row: 1/2;
		}
	}

	:deep(.translate-textarea) {
		display: block;
		width: 100%;
		margin-bottom: 12px;
		height: auto;
		resize: none;
		box-sizing: border-box;
		overflow-y: auto;
		min-height: 62px;
		max-height: 58vh;
	}
}

@media (max-width: 670px) {
	.translate-dialog {
		.wrapper {
			display: block;
		}

		.language-selector {
			.select {
				width: 100%;
			}
		}

		:deep(.translate-textarea) {
			max-height: 20vh;
		}
	}

	label {
		&[for="fromLanguage"],
		&[for="toLanguage"] {
			display: none;
		}
	}
}

.language-selector {
	display: flex;
	align-items: center;
	margin-bottom: 12px;

	label {
		flex-grow: 1;
	}
}

.translate-actions {
	display: flex;
	justify-content: flex-end;

	button {
		margin-left: 12px;
	}
}
</style>
