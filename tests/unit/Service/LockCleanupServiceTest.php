<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Db\Document;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockCleanupService;
use OCA\Text\Service\SessionService;
use OCP\Files\ISetupManager;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;

class LockCleanupServiceTest extends \PHPUnit\Framework\TestCase {
	private SessionService&MockObject $sessionService;
	private DocumentService&MockObject $documentService;
	private ISetupManager&MockObject $setupManager;
	private LoggerInterface&MockObject $logger;
	private LockCleanupService $service;
	private Document $document;

	public function setUp(): void {
		$this->sessionService = $this->createMock(SessionService::class);
		$this->documentService = $this->createMock(DocumentService::class);
		$this->setupManager = $this->createMock(ISetupManager::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->service = new LockCleanupService(
			$this->sessionService,
			$this->documentService,
			$this->setupManager,
			$this->logger,
		);
		$this->document = Document::fromRow(['id' => 111]);
	}

	public function testReleasesLockOfDocumentWithoutActiveSessions(): void {
		$this->documentService->method('hasLock')->with(111)->willReturn(true);
		$this->sessionService->method('hasRecentlyActiveSessions')->with(111)->willReturn(false);
		$this->setupManager->expects(self::once())->method('tearDown');
		$this->documentService->expects(self::once())->method('unlock')->with(111);

		$this->service->release($this->document);
	}

	public function testSkipsFilesWithoutLock(): void {
		$this->documentService->method('hasLock')->with(111)->willReturn(false);
		$this->sessionService->expects(self::never())->method('hasRecentlyActiveSessions');
		$this->setupManager->expects(self::never())->method('tearDown');
		$this->documentService->expects(self::never())->method('unlock');

		$this->service->release($this->document);
	}

	public function testKeepsLockOfDocumentWithActiveSessions(): void {
		$this->documentService->method('hasLock')->willReturn(true);
		$this->sessionService->method('hasRecentlyActiveSessions')->with(111)->willReturn(true);
		$this->documentService->expects(self::never())->method('unlock');

		$this->service->release($this->document);
	}

	public function testLogsFailingUnlock(): void {
		$this->documentService->method('hasLock')->willReturn(true);
		$this->sessionService->method('hasRecentlyActiveSessions')->willReturn(false);
		$this->documentService->method('unlock')->willThrowException(new \Error('No owner'));
		$this->logger->expects(self::once())->method('warning');

		$this->service->release($this->document);
	}
}
