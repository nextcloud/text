<?php

namespace OCA\Text\Migration;

use OCA\Text\Service\DocumentService;
use OCP\IConfig;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class ResetSessionsBeforeYjs implements IRepairStep {
	private IConfig $config;
	private DocumentService $documentService;

	public function __construct(IConfig $config,
		DocumentService $documentService) {
		$this->config = $config;
		$this->documentService = $documentService;
	}

	/**
	 * @return string
	 */
	public function getName(): string {
		return 'Force-reset all Text document sessions';
	}

	public function run(IOutput $output): void {
		$appVersion = $this->config->getAppValue('text', 'installed_version');

		if (!$appVersion || version_compare($appVersion, '3.9.2') !== -1) {
			return;
		}

		$this->documentService->clearAll();
	}
}
