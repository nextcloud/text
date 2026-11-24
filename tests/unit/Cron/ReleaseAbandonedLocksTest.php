<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Cron\ReleaseAbandonedLocks;
use OCA\Text\Db\Document;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockCleanupService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\IJobList;
use PHPUnit\Framework\MockObject\MockObject;

class ReleaseAbandonedLocksTest extends \PHPUnit\Framework\TestCase {
	private DocumentService&MockObject $documentService;
	private LockCleanupService&MockObject $lockCleanupService;
	private IJobList&MockObject $jobList;
	private ReleaseAbandonedLocks $job;

	public function setUp(): void {
		$this->documentService = $this->createMock(DocumentService::class);
		$this->lockCleanupService = $this->createMock(LockCleanupService::class);
		$this->jobList = $this->createMock(IJobList::class);
		$this->job = new class($this->createMock(ITimeFactory::class), $this->documentService, $this->lockCleanupService, $this->jobList) extends ReleaseAbandonedLocks {
			public function run($argument): void {
				parent::run($argument);
			}
		};
	}

	/**
	 * @return list<Document>
	 */
	private function documents(int $count, int $firstId): array {
		return array_map(
			fn (int $id) => Document::fromRow(['id' => $id]),
			range($firstId, $firstId + $count - 1),
		);
	}

	public function testReleasesLastBatch(): void {
		$documents = $this->documents(2, 101);
		$this->documentService->expects(self::once())
			->method('getDocumentsAfter')->with(100, ReleaseAbandonedLocks::BATCH_SIZE)
			->willReturn($documents);
		$this->lockCleanupService->expects(self::exactly(2))->method('release');
		$this->jobList->expects(self::never())->method('add');

		$this->job->run(['after' => '100']);
	}

	public function testQueuesNextBatch(): void {
		$documents = $this->documents(ReleaseAbandonedLocks::BATCH_SIZE, 1);
		$this->documentService->method('getDocumentsAfter')->with(0)->willReturn($documents);
		$this->lockCleanupService->expects(self::exactly(ReleaseAbandonedLocks::BATCH_SIZE))->method('release');
		$this->jobList->expects(self::once())
			->method('add')->with(ReleaseAbandonedLocks::class, ['after' => (string)ReleaseAbandonedLocks::BATCH_SIZE]);

		$this->job->run([]);
	}
}
