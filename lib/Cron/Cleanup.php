<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */



namespace OCA\Text\Cron;

use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use Psr\Log\LoggerInterface;

class Cleanup extends TimedJob {
	public function __construct(
		ITimeFactory $time,
		private readonly SessionService $sessionService,
		private readonly DocumentService $documentService,
		private readonly AttachmentService $attachmentService,
		private readonly LoggerInterface $logger,
	) {
		parent::__construct($time);
		$this->setInterval(SessionService::SESSION_VALID_TIME);
	}

	/**
	 * @param array $argument
	 */
	protected function run($argument): void {
		$this->logger->debug('Run cleanup job for text documents');
		foreach ($this->documentService->getAll() as $document) {
			if ($this->sessionService->countAllSessions($document->getId()) > 0) {
				// Do not reset if there are any sessions left
				// Inactive sessions will get removed further down and will trigger a reset next time
				continue;
			}

			try {
				$this->documentService->resetDocument($document->getId());
			} catch (DocumentHasUnsavedChangesException) {
			}
			$this->attachmentService->cleanupAttachments($document->getId());
		}

		$this->logger->debug('Run cleanup job for text sessions');
		$removedSessions = $this->sessionService->removeInactiveSessionsWithoutSteps();
		$this->logger->debug('Removed ' . $removedSessions . ' inactive sessions');

		$this->logger->debug('Run cleanup job for old sessions');
		$removedOldSessions = $this->sessionService->removeOldSessions();
		$this->logger->debug('Removed ' . $removedOldSessions . ' old sessions');

		$this->logger->debug('Run cleanup job for orphaned steps');
		$removedSteps = $this->sessionService->removeOrphanedSteps();
		$this->logger->debug('Removed ' . $removedSteps . ' orphaned steps');

		$this->logger->debug('Run cleanup job for obsolete documents folders');
		$this->documentService->cleanupOldDocumentsFolders();
	}
}
