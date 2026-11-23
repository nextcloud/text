<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\Db\Document;
use OCP\Files\ISetupManager;
use Psr\Log\LoggerInterface;

class LockCleanupService {
	public function __construct(
		private readonly SessionService $sessionService,
		private readonly DocumentService $documentService,
		private readonly ISetupManager $setupManager,
		private readonly LoggerInterface $logger,
	) {
	}

	/**
	 * Release the file lock of a document without active sessions,
	 * e.g. after closing the browser tab or a crash.
	 */
	public function release(Document $document): void {
		if (!$this->documentService->hasLock($document->getId())
			|| $this->sessionService->getActiveSessions($document->getId()) !== []) {
			return;
		}

		$this->setupManager->tearDown();
		try {
			$this->documentService->unlock($document->getId());
		} catch (\Throwable $e) {
			$this->logger->warning('Could not release the lock of document ' . $document->getId(), ['exception' => $e]);
		}
	}
}
