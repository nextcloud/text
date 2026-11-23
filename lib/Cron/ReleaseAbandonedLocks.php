<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Cron;

use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockCleanupService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\IJobList;
use OCP\BackgroundJob\QueuedJob;

/**
 * Release the file locks of all documents without active sessions, in batches.
 * Catches up on locks left behind before the Cleanup job released them.
 */
class ReleaseAbandonedLocks extends QueuedJob {
	public const BATCH_SIZE = 1000;

	public function __construct(
		ITimeFactory $time,
		private readonly DocumentService $documentService,
		private readonly LockCleanupService $lockCleanupService,
		private readonly IJobList $jobList,
	) {
		parent::__construct($time);
	}

	/**
	 * @param array{after?: string} $argument
	 */
	protected function run($argument): void {
		$documents = $this->documentService->getDocumentsAfter((int)($argument['after'] ?? '0'), self::BATCH_SIZE);
		foreach ($documents as $document) {
			$this->lockCleanupService->release($document);
		}

		$last = end($documents);
		if ($last !== false && count($documents) === self::BATCH_SIZE) {
			$this->jobList->add(self::class, ['after' => (string)$last->getId()]);
		}
	}
}
