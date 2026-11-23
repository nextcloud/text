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
		private readonly SessionService $sessionService,
		private readonly LockService $lockService,
		private readonly IRootFolder $rootFolder,
		private readonly ISetupManager $setupManager,
		private readonly LoggerInterface $logger,
	) {
	}

	/**
	 * Release the file lock of a document without active sessions,
	 * e.g. after closing the browser tab or a crash.
	 */
	public function release(Document $document): void {
		if ($document->getContextType() !== 'file'
			|| !$this->lockService->hasLock($document->getContextId())
			|| $this->sessionService->getActiveSessions((string)$document->getId()) !== []) {
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
