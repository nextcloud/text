<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection
		:name="t('text', 'Summaries of changes in Text')"
		:description="t('text', 'Let people summarize the changes between two versions of a Markdown file in Files and Collectives.')">
		<NcCheckboxRadioSwitch
			:modelValue="enabled"
			:loading="saving"
			:disabled="saving"
			type="switch"
			@update:modelValue="save">
			{{ t('text', 'Allow summaries of changes') }}
		</NcCheckboxRadioSwitch>
		<NcNoteCard v-if="failed" type="error">
			{{ t('text', 'Could not save the setting.') }}
		</NcNoteCard>
		<NcNoteCard v-if="removalPending" type="warning">
			{{ t('text', 'Some summaries and requests could not be removed yet. A background job tries again every 5 minutes.') }}
		</NcNoteCard>

		<p v-if="provider" class="text-version-summaries-settings__provider">
			{{ t('text', 'AI provider: {provider}', { provider }, undefined, { escape: false, sanitize: false }) }}
		</p>
		<NcNoteCard v-else type="warning">
			{{ t('text', 'No AI provider for chat is set up. Choose one in the Artificial intelligence settings above.') }}
		</NcNoteCard>

		<h3 class="text-version-summaries-settings__heading">
			{{ t('text', 'Limits') }}
		</h3>
		<div class="text-version-summaries-settings__limits">
			<NcInputField
				v-model="hourlyLimit"
				type="number"
				min="0"
				:label="t('text', 'Summaries per hour for this Nextcloud')"
				@change="saveLimit('hourlyLimit')" />
			<NcInputField
				v-model="userHourlyLimit"
				type="number"
				min="0"
				:label="t('text', 'Summaries per hour for each person')"
				@change="saveLimit('userHourlyLimit')" />
		</div>
		<div class="text-version-summaries-settings__usage">
			<p>{{ n('text', '{count} summary started in the last hour.', '{count} summaries started in the last hour.', settings.startedLastHour, { count: settings.startedLastHour }) }}</p>
			<p>{{ t('text', 'Both versions and the instructions together may have at most {size}.', { size: formatFileSize(settings.maxInputBytes) }) }}</p>
			<p>{{ t('text', 'Summaries are requested for this Nextcloud, not for a person, so quotas per person set in the AI provider may not apply to them.') }}</p>
		</div>

		<h3 class="text-version-summaries-settings__heading">
			{{ t('text', 'What is sent and kept') }}
		</h3>
		<ul class="text-version-summaries-settings__notice">
			<li>{{ t('text', 'When someone asks for a summary, both complete versions are sent to the AI provider. The provider may keep its own copy.') }}</li>
			<li>{{ t('text', 'Nextcloud keeps the request, unencrypted, until a background job removes it. The job runs every 5 minutes: it removes finished requests, and cancels and removes those not finished after a day.') }}</li>
			<li>{{ t('text', 'The same job removes summaries after 30 days. Everyone who can open both versions and download the file sees them.') }}</li>
			<li>{{ t('text', 'Someone who loses access to the file can no longer see its summaries. A request they already made is still sent to the AI provider and not recalled.') }}</li>
			<li>{{ t('text', 'Error messages of the AI provider and rejected answers can appear in the server log, and they can contain text of the versions.') }}</li>
			<li>{{ t('text', 'Turning summaries off stops new ones and removes stored summaries and pending requests. It cannot recall text already sent.') }}</li>
		</ul>
	</NcSettingsSection>
</template>

<script setup lang="ts">
import axios from '@nextcloud/axios'
import { formatFileSize } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { n, t } from '@nextcloud/l10n'
import { generateOcsUrl } from '@nextcloud/router'
import { ref } from 'vue'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import NcSettingsSection from '@nextcloud/vue/components/NcSettingsSection'

const settings = loadState<{
	enabled: boolean
	provider: string | null
	hourlyLimit: number
	userHourlyLimit: number
	startedLastHour: number
	maxInputBytes: number
	removalPending: boolean
}>('text', 'version_summaries_settings')
const enabled = ref(settings.enabled)
const provider = settings.provider
const hourlyLimit = ref(String(settings.hourlyLimit))
const userHourlyLimit = ref(String(settings.userHourlyLimit))
/** The limits as stored */
const storedLimits = { hourlyLimit: settings.hourlyLimit, userHourlyLimit: settings.userHourlyLimit }
const removalPending = ref(settings.removalPending)
const saving = ref(false)
const failed = ref(false)

const url = generateOcsUrl('apps/text/settings/version-summaries')

/** Saves of the limits, one after the other, so the server stores the last one */
let limitSaves: Promise<void> = Promise.resolve()

/**
 * Turn summaries on or off.
 *
 * @param value Whether they are on.
 */
async function save(value: boolean) {
	// Shown at once, and set back if it fails, so the switch never shows what is not stored
	enabled.value = value
	saving.value = true
	failed.value = false
	try {
		const { data } = await axios.put(url, { enabled: value })
		enabled.value = data.ocs.data.enabled
		removalPending.value = data.ocs.data.removed === false
	} catch {
		enabled.value = !value
		failed.value = true
	} finally {
		saving.value = false
	}
}

/**
 * Store one limit, as a whole number of at least 0.
 *
 * @param key Which limit.
 */
function saveLimit(key: 'hourlyLimit' | 'userHourlyLimit') {
	const field = key === 'hourlyLimit' ? hourlyLimit : userHourlyLimit
	// An empty field is no limit of 0, which would allow no summary at all
	if (String(field.value).trim() === '' || !Number.isFinite(Number(field.value))) {
		field.value = String(storedLimits[key])
		return
	}
	const normalized = () => Math.max(0, Math.floor(Number(field.value) || 0))
	const value = normalized()
	failed.value = false
	limitSaves = limitSaves.then(async () => {
		try {
			const { data } = await axios.put(url, { [key]: value })
			storedLimits[key] = data.ocs.data[key]
			// Unless edited again meanwhile
			if (normalized() === value) {
				field.value = String(data.ocs.data[key])
			}
		} catch {
			failed.value = true
		}
	})
	return limitSaves
}
</script>

<style scoped lang="scss">
.text-version-summaries-settings {
	&__provider {
		margin-block: var(--default-grid-baseline);
	}

	&__limits {
		display: flex;
		flex-wrap: wrap;
		gap: calc(4 * var(--default-grid-baseline));
		max-inline-size: 700px;

		> * {
			flex: 1 1 250px;
		}
	}

	&__usage {
		max-inline-size: 700px;
		margin-block: calc(2 * var(--default-grid-baseline));
		color: var(--color-text-maxcontrast);

		p + p {
			margin-block-start: var(--default-grid-baseline);
		}
	}

	&__heading {
		margin-block: calc(4 * var(--default-grid-baseline)) var(--default-grid-baseline);
		font-size: var(--default-font-size);
		font-weight: bold;
	}

	&__notice {
		max-inline-size: 700px;
		padding-inline-start: 1.25em;
		list-style: disc;
		color: var(--color-text-maxcontrast);

		li {
			padding-block: calc(var(--default-grid-baseline) / 2);
		}
	}
}
</style>
