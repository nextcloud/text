<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Cron\Cleanup;
use OCA\Text\Db\Document;
use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockCleanupService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
use OCP\Files\ISetupManager;
use OCP\Files\Node;
use OCP\Files\NotPermittedException;
use OCP\FilesMetadata\IFilesMetadataManager;
use OCP\IPreview;
use OCP\IURLGenerator;
use OCP\Share\IManager;
use Psr\Log\LoggerInterface;

class CleanupTest extends \PHPUnit\Framework\TestCase {
	private Cleanup $cleanup;
	private Document $document;
	private DocumentService $documentService;
	private AttachmentService $attachmentService;
	private SessionService $sessionService;
	private IRootFolder $rootFolder;
	private ISetupManager $setupManager;
	private LoggerInterface $logger;
	private LockCleanupService $lockCleanupService;

	public function setUp(): void {
		$this->document = Document::fromRow([
			'id' => '123456789012345678',
			'context_type' => 'file',
			'context_id' => 123,
			'last_saved_version_time' => 1000,
		]);
		$this->documentService = $this->createMock(DocumentService::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->attachmentService = new AttachmentService(
			$this->rootFolder,
			$this->createMock(IManager::class),
			$this->createMock(IPreview::class),
			$this->createMock(IMimeTypeDetector::class),
			$this->createMock(IURLGenerator::class),
			$this->createMock(IFilenameValidator::class),
			$this->createMock(IFilesMetadataManager::class),
			$this->createMock(FileService::class),
		);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->setupManager = $this->createMock(ISetupManager::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->lockCleanupService = $this->createMock(LockCleanupService::class);
		$this->documentService->expects(self::never())->method('resetDocument');
		$this->documentService->expects(self::once())
			->method('getAllPendingAttachmentCleanup')
			->willReturn((function (): \Generator {
				yield $this->document;
			})());
		$this->cleanup = new class($this->createMock(ITimeFactory::class), $this->sessionService, $this->documentService, $this->attachmentService, $this->logger, $this->setupManager, $this->lockCleanupService) extends Cleanup {
			public function run($argument): void {
				parent::run($argument);
			}
		};
	}

	public function testMarksCleanupOnlyAfterAttachmentsAreCleaned(): void {
		$this->documentService->expects(self::once())
			->method('hasUnsavedChanges')->with($this->document)->willReturn(false);
		$this->setupManager->expects(self::once())->method('tearDown');
		$cleaned = false;
		$this->rootFolder->expects(self::once())
			->method('getFirstNodeById')->with(123)
			->willReturnCallback(function () use (&$cleaned): ?Node {
				$cleaned = true;
				return null;
			});
		$this->documentService->expects(self::once())
			->method('markAttachmentCleanup')->with($this->document)
			->willReturnCallback(function () use (&$cleaned): void {
				self::assertTrue($cleaned);
			});
		$this->sessionService->expects(self::once())->method('removeInactiveSessionsWithoutSteps');
		$this->sessionService->expects(self::once())->method('removeOldSessions');
		$this->sessionService->expects(self::once())->method('removeOrphanedSteps');
		$this->documentService->expects(self::once())->method('cleanupOldDocumentsFolders');

		$this->cleanup->run([]);
	}

	public function testMarksUnsavedChangesWithoutCleanup(): void {
		$this->documentService->expects(self::once())
			->method('hasUnsavedChanges')->with($this->document)->willReturn(true);
		$this->setupManager->expects(self::never())->method('tearDown');
		$this->rootFolder->expects(self::never())->method('getFirstNodeById');
		$this->documentService->expects(self::once())->method('markAttachmentCleanup')->with($this->document);

		$this->cleanup->run([]);
	}

	public function testFailedCleanupRemainsPending(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(false);
		$this->rootFolder->expects(self::once())
			->method('getFirstNodeById')->with(123)
			->willThrowException(new \RuntimeException('Cleanup failed'));
		$this->documentService->expects(self::never())->method('markAttachmentCleanup');
		$this->expectException(\RuntimeException::class);
		$this->expectExceptionMessage('Cleanup failed');

		$this->cleanup->run([]);
	}

	public function testNotPermittedCleanupIsMarkedAndJobContinues(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(false);
		$this->rootFolder->expects(self::once())
			->method('getFirstNodeById')->with(123)
			->willThrowException(new NotPermittedException());
		$this->logger->expects(self::once())->method('warning');
		$this->documentService->expects(self::once())->method('markAttachmentCleanup')->with($this->document);
		$this->sessionService->expects(self::once())->method('removeInactiveSessionsWithoutSteps');
		$this->sessionService->expects(self::once())->method('removeOldSessions');
		$this->sessionService->expects(self::once())->method('removeOrphanedSteps');
		$this->documentService->expects(self::once())->method('cleanupOldDocumentsFolders');

		$this->cleanup->run([]);
	}

	public function testReleasesLocksOfRecentlyOpenedDocumentsBeforeRemovingTheirSessions(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(true);
		$this->cleanup->setLastRun(10000);
		$this->sessionService->expects(self::once())
			->method('getDocumentIdsWithContactSince')->with(10000 - SessionService::SESSION_VALID_TIME - DocumentService::EDIT_LOCK_TIME)
			->willReturn(['111']);
		$document = Document::fromRow(['id' => '111', 'context_type' => 'file', 'context_id' => 456]);
		$this->documentService->method('getDocument')->with('111')->willReturn($document);
		$released = false;
		$this->lockCleanupService->expects(self::once())
			->method('release')->with($document)
			->willReturnCallback(function () use (&$released): void {
				$released = true;
			});
		$this->sessionService->expects(self::once())
			->method('removeInactiveSessionsWithoutSteps')
			->willReturnCallback(function () use (&$released): int {
				self::assertTrue($released);
				return 0;
			});

		$this->cleanup->run([]);
	}

	public function testSkipsMissingDocuments(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(true);
		$this->sessionService->method('getDocumentIdsWithContactSince')->willReturn(['111']);
		$this->documentService->method('getDocument')->with('111')->willReturn(null);
		$this->lockCleanupService->expects(self::never())->method('release');

		$this->cleanup->run([]);
	}
}
