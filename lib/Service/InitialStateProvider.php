<?php

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\AppFramework\Services\IInitialState;
use OCP\TaskProcessing\IManager;

class InitialStateProvider {
	private const ASSISTANT_TASK_TYPES = [
		'core:text2text',
		'core:text2text:formalization',
		'core:text2text:headline',
		'core:text2text:reformulation',
		'core:text2text:simplification',
		'core:text2text:summary',
		'core:text2text:topics',
	];

	public function __construct(
		private IInitialState $initialState,
		private ConfigService $configService,
		private IManager $taskProcessingManager,
		private ?string $userId,
	) {
	}

	public function provideState(): void {
		$this->initialState->provideInitialState(
			'workspace_available',
			$this->configService->isRichWorkspaceAvailable()
		);

		$this->initialState->provideInitialState(
			'workspace_enabled',
			$this->configService->isRichWorkspaceEnabledForUser($this->userId)
		);

		$this->initialState->provideInitialState(
			'open_read_only_enabled',
			$this->configService->isOpenReadOnlyEnabled()
		);

		$this->initialState->provideInitialState(
			'default_file_extension',
			$this->configService->getDefaultFileExtension()
		);

		$this->initialState->provideInitialState(
			'rich_editing_enabled',
			$this->configService->isRichEditingEnabled()
		);

		$taskTypes = $this->taskProcessingManager->getAvailableTaskTypes();
		$fromLanguages = $taskTypes['core:text2text:translate']['inputShapeEnumValues']['origin_language'] ?? [];
		$toLanguages = $taskTypes['core:text2text:translate']['inputShapeEnumValues']['target_language'] ?? [];

		$this->initialState->provideInitialState(
			'translation_languages',
			[
				'from' => $fromLanguages,
				'to' => $toLanguages,
			]
		);

		$filteredTypes = array_filter($taskTypes, static function (string $taskType) {
			return in_array($taskType, self::ASSISTANT_TASK_TYPES, true);
		}, ARRAY_FILTER_USE_KEY);
		$this->initialState->provideInitialState(
			'taskprocessing',
			array_map(static function (string $typeId, array $taskType) {
				$taskType['id'] = $typeId;
				return $taskType;
			}, array_keys($filteredTypes), array_values($filteredTypes)),
		);

		$this->initialState->provideInitialState(
			'notify_push',
			$this->configService->isNotifyPushSyncEnabled(),
		);

		$this->initialState->provideInitialState(
			'is_full_width_editor',
			$this->configService->isFullWidthEditor($this->userId),
		);
	}

	public function provideFileId(int $fileId): void {
		$this->initialState->provideInitialState('file_id', $fileId);
	}

	public function provideFile(array $fileData): void {
		$this->initialState->provideInitialState('file', $fileData);
	}

	public function provideDirectEditToken(string $token): void {
		$this->initialState->provideInitialState('directEditingToken', $token);
	}
}
