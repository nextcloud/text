<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Settings;

use OCA\Text\Service\ConfigService;
use OCA\Text\Service\VersionSummaryService;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\Settings\ISettings;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\TaskTypes\TextToTextChat;
use OCP\Util;

/**
 * Turning summaries of changes on, in the admin settings for artificial intelligence
 */
class VersionSummariesSettings implements ISettings {
	public function __construct(
		private readonly ConfigService $configService,
		private readonly VersionSummaryService $versionSummaryService,
		private readonly IManager $taskProcessing,
		private readonly IInitialState $initialState,
	) {
	}

	public function getForm(): TemplateResponse {
		$provider = null;
		if (isset($this->taskProcessing->getAvailableTaskTypes()[TextToTextChat::ID])) {
			try {
				$provider = $this->taskProcessing->getPreferredProvider(TextToTextChat::ID)->getName();
			} catch (\Exception) {
			}
		}
		$enabled = $this->configService->isVersionSummariesEnabled();
		$this->initialState->provideInitialState('version_summaries_settings', [
			'enabled' => $enabled,
			'provider' => $provider,
			'hourlyLimit' => $this->configService->getVersionSummariesHourlyLimit(),
			'userHourlyLimit' => $this->configService->getVersionSummariesUserHourlyLimit(),
			'startedLastHour' => $this->versionSummaryService->startedLastHour(),
			'maxInputBytes' => $this->configService->getVersionSummariesMaxInputBytes(),
			// Turned off, but a background job has yet to remove some
			'removalPending' => !$enabled && $this->versionSummaryService->hasSummaries(),
		]);
		Util::addScript('text', 'text-settings');
		Util::addStyle('text', 'text-settings');
		return new TemplateResponse('text', 'settings-version-summaries');
	}

	public function getSection(): string {
		return 'ai';
	}

	public function getPriority(): int {
		return 80;
	}
}
