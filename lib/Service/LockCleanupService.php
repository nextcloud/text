<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\Db\Document;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\ISetupManager;
use Psr\Log\LoggerInterface;

class LockCleanupService {
	public function __construct(
		private readonly DocumentService $documentService,
		private readonly LockService $lockService,
		private readonly IRootFolder $rootFolder,
		private readonly ISetupManager $setupManager,
		private readonly LoggerInterface $logger,
	) {
	}

	/**
	 * Release the file lock of a document nobody changed for a while,
	 * e.g. a forgotten browser tab, a closed tab or a crash.
	 */
	public function release(Document $document): void {
		if ($document->getContextType() !== 'file'
			|| !$this->lockService->hasLock($document->getContextId())
			|| $this->documentService->hasRecentChanges((string)$document->getId())) {
			return;
		}

		$this->setupManager->tearDown();
		try {
			$file = $this->rootFolder->getFirstNodeById($document->getContextId());
			if ($file instanceof File) {
				$this->lockService->unlock($file);
			}
		} catch (\Throwable $e) {
			$this->logger->warning('Could not release the lock of document ' . $document->getId(), ['exception' => $e]);
		}
	}
}
