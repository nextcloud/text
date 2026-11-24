<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Db\Document;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockCleanupService;
use OCA\Text\Service\LockService;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\ISetupManager;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;

class LockCleanupServiceTest extends \PHPUnit\Framework\TestCase {
	private DocumentService&MockObject $documentService;
	private LockService&MockObject $lockService;
	private IRootFolder&MockObject $rootFolder;
	private ISetupManager&MockObject $setupManager;
	private LoggerInterface&MockObject $logger;
	private LockCleanupService $service;
	private Document $document;

	public function setUp(): void {
		$this->documentService = $this->createMock(DocumentService::class);
		$this->lockService = $this->createMock(LockService::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->setupManager = $this->createMock(ISetupManager::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->service = new LockCleanupService(
			$this->documentService,
			$this->lockService,
			$this->rootFolder,
			$this->setupManager,
			$this->logger,
		);
		$this->document = Document::fromRow(['id' => '111', 'context_type' => 'file', 'context_id' => 456]);
	}

	public function testReleasesLockOfDocumentWithoutRecentChanges(): void {
		$this->lockService->method('hasLock')->with(456)->willReturn(true);
		$this->documentService->method('hasRecentChanges')->with('111')->willReturn(false);
		$this->setupManager->expects(self::once())->method('tearDown');
		$file = $this->createMock(File::class);
		$this->rootFolder->expects(self::once())->method('getFirstNodeById')->with(456)->willReturn($file);
		$this->lockService->expects(self::once())->method('unlock')->with($file);

		$this->service->release($this->document);
	}

	public function testSkipsFilesWithoutLock(): void {
		$this->lockService->method('hasLock')->with(456)->willReturn(false);
		$this->documentService->expects(self::never())->method('hasRecentChanges');
		$this->setupManager->expects(self::never())->method('tearDown');
		$this->rootFolder->expects(self::never())->method('getFirstNodeById');
		$this->lockService->expects(self::never())->method('unlock');

		$this->service->release($this->document);
	}

	public function testKeepsLockOfRecentlyChangedDocument(): void {
		$this->lockService->method('hasLock')->willReturn(true);
		$this->documentService->method('hasRecentChanges')->with('111')->willReturn(true);
		$this->rootFolder->expects(self::never())->method('getFirstNodeById');
		$this->lockService->expects(self::never())->method('unlock');

		$this->service->release($this->document);
	}

	public function testSkipsOtherContexts(): void {
		$document = Document::fromRow(['id' => '222', 'context_type' => 'other', 'context_id' => 456]);
		$this->lockService->expects(self::never())->method('hasLock');
		$this->lockService->expects(self::never())->method('unlock');

		$this->service->release($document);
	}

	public function testLogsFailingUnlock(): void {
		$this->lockService->method('hasLock')->willReturn(true);
		$this->documentService->method('hasRecentChanges')->willReturn(false);
		$this->rootFolder->method('getFirstNodeById')->willThrowException(new \Error('No owner'));
		$this->logger->expects(self::once())->method('warning');

		$this->service->release($this->document);
	}
}
