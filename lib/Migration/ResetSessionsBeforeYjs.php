<?php

namespace OCA\Text\Migration;

use OCA\Text\Db\SessionMapper;
use OCA\Text\Service\DocumentService;
use OCP\IConfig;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class ResetSessionsBeforeYjs implements IRepairStep {
	private IConfig $config;
	private SessionMapper $sessionMapper;
	private DocumentService $documentService;

	public function __construct(IConfig $config,
								SessionMapper $sessionMapper,
								DocumentService $documentService) {
		$this->config = $config;
		$this->sessionMapper = $sessionMapper;
		$this->documentService = $documentService;
	}

	/**
	 * @return string
	 */
	public function getName(): string {
		return 'Force-reset all Text sessions before Yjs migration';
	}

	/**
	 * @param IOutput $output
	 *
	 * @return void
	 */
	public function run(IOutput $output): void {
		$appVersion = $this->config->getAppValue('text', 'installed_version');

		if (!$appVersion || version_compare($appVersion, '3.7.2') !== -1) {
			return;
		}

		$sessions = $this->sessionMapper->findAllDocuments();
		if (!$sessions) {
			return;
		}

		$output->startProgress(count($sessions));
		foreach ($sessions as $session) {
			$documentId = $session->getDocumentId();
			$this->documentService->unlock($documentId);
			$this->documentService->resetDocument($documentId, true);
			$output->advance();
		}
		$output->finishProgress();
	}
}
