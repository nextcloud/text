<?php

namespace OCA\Text\Service;

use OCP\AppFramework\Services\IInitialState;
use OCP\Translation\ITranslationManager;

class InitialStateProvider {
	public function __construct(
		private IInitialState $initialState,
		private ConfigService $configService,
		private ITranslationManager $translationManager,
		private ?string $userId
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
			'default_file_extension',
			$this->configService->getDefaultFileExtension()
		);

		$this->initialState->provideInitialState(
			'rich_editing_enabled',
			$this->configService->isRichEditingEnabled()
		);

		$this->initialState->provideInitialState(
			'translation_can_detect',
			$this->translationManager->canDetectLanguage()
		);

		$this->initialState->provideInitialState(
			'translation_languages',
			$this->translationManager->getLanguages()
		);
	}

	public function provideFileId(int $fileId): void {
		$this->initialState->provideInitialState('file_id', $fileId);
	}
}
