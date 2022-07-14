<?php

namespace OCA\Text\Service;

use OCP\AppFramework\Services\IInitialState;

class InitialStateProvider {
	private IInitialState $initialState;
	private ConfigService $configService;
	private ?string $userId;

	public function __construct(IInitialState $initialState, ConfigService $configService, ?string $userId) {
		$this->initialState = $initialState;
		$this->configService = $configService;
		$this->userId = $userId;
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
	}
}
