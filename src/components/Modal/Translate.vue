<!--
  - @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
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
  -->

<template>
	<NcModal @close="$emit('close')">
		<div class="translate-dialog">
			<h2>{{ t('text', 'Translate') }}</h2>
			<textarea v-model="input" />
			<div class="language-selector">
				<label for="fromLanguage">{{ t('text', 'Source language') }}</label>
				<NcSelect v-model="fromLanguage"
					input-id="fromLanguage"
					:options="fromLanguages"
					:append-to-body="false" />
			</div>
			<div class="language-selector">
				<label for="toLanguage">{{ t('text', 'Target language') }}</label>
				<NcSelect v-model="toLanguage"
					input-id="toLanguage"
					:options="toLanguages"
					:disabled="!fromLanguage"
					:append-to-body="false" />
			</div>
			<textarea v-model="result" readonly :class="{'icon-loading': loading }" />
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
import { NcModal, NcButton, NcSelect, NcLoadingIcon } from '@nextcloud/vue'

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
	},
	props: {
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
						label: item.fromLabel,
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
						label: item.toLabel,
					})
				}
			}
			return result
		},
	},
	watch: {
		input() {
			this.result = null
			this.error = null
		},
		toLanguage() {
			this.result = null
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
	},
}
</script>

<style lang="scss" scoped>
.translate-dialog {
	margin: 24px;
}

textarea {
	display: block;
	width: 100%;
	margin-bottom: 12px;

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
