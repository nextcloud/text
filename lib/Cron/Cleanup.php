<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Cron;

use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockCleanupService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use OCP\Files\ISetupManager;
use OCP\Files\NotPermittedException;
use Psr\Log\LoggerInterface;

class Cleanup extends TimedJob {
	public function __construct(
		ITimeFactory $time,
		private readonly SessionService $sessionService,
		private readonly DocumentService $documentService,
		private readonly AttachmentService $attachmentService,
		private readonly LoggerInterface $logger,
		private readonly ISetupManager $setupManager,
		private readonly LockCleanupService $lockCleanupService,
	) {
		parent::__construct($time);
		$this->setInterval(SessionService::SESSION_VALID_TIME);
	}

	/**
	 * @param array $argument
	 */
	protected function run($argument): void {
		// Before removing inactive sessions, as they identify the documents to unlock
		$this->logger->debug('Run cleanup job for locks of inactive documents');
		$this->unlockInactiveDocuments();

		$this->logger->debug('Run cleanup job for text documents');
		foreach ($this->documentService->getAllPendingAttachmentCleanup() as $document) {
			if ($this->documentService->hasUnsavedChanges($document)) {
				$this->documentService->markAttachmentCleanup($document);
				continue;
			}
			$this->setupManager->tearDown();
			try {
				$this->attachmentService->cleanupAttachments($document->getContextId());
			} catch (NotPermittedException $e) {
				// Retrying will not help until the document is saved again, so mark it as cleaned up anyway
				$this->logger->warning('Could not clean up attachments of file ' . $document->getContextId() . ', deleting is not permitted', ['exception' => $e]);
			}
			$this->documentService->markAttachmentCleanup($document);
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

	/**
	 * Release the file locks of documents whose last session became inactive since the previous run
	 */
	private function unlockInactiveDocuments(): void {
		// Overlap with the previous run, the job does not run at exact intervals
		$since = $this->lastRun - 2 * SessionService::SESSION_VALID_TIME;
		foreach ($this->sessionService->getDocumentIdsInactiveSince($since) as $documentId) {
			$document = $this->documentService->getDocument($documentId);
			if ($document !== null) {
				$this->lockCleanupService->release($document);
			}
		}
	}
}
