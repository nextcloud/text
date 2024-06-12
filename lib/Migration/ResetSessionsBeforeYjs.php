<?php

namespace OCA\Text\Migration;

use OCA\Text\Db\Document;
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

		if (!$appVersion || version_compare($appVersion, '3.8.1') !== -1) {
			return;
		}

		$fileIds = array_map(static function (Document $document) {
			return $document->getId();
		}, $this->documentService->getAll());

		if (!$fileIds) {
			return;
		}

		$output->startProgress(count($fileIds));
		foreach ($fileIds as $fileId) {
			$this->documentService->unlock($fileId);
			$this->documentService->resetDocument($fileId, true);
			$output->advance();
		}
		$output->finishProgress();
	}
}
