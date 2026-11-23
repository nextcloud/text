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
use OCA\Text\Service\LockService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\File;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
use OCP\Files\ISetupManager;
use OCP\Files\Node;
use OCP\Files\NotPermittedException;
use OCP\FilesMetadata\IFilesMetadataManager;
use OCP\IPreview;
use OCP\ISession;
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
	private LockService $lockService;

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
			$this->createMock(ISession::class),
			$this->createMock(FileService::class),
		);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->setupManager = $this->createMock(ISetupManager::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->lockService = $this->createMock(LockService::class);
		$this->documentService->expects(self::never())->method('resetDocument');
		$this->documentService->expects(self::once())
			->method('getAllPendingAttachmentCleanup')
			->willReturn((function (): \Generator {
				yield $this->document;
			})());
		$this->cleanup = new class($this->createMock(ITimeFactory::class), $this->sessionService, $this->documentService, $this->attachmentService, $this->logger, $this->setupManager, $this->rootFolder, $this->lockService) extends Cleanup {
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

	public function testUnlocksInactiveDocumentsBeforeRemovingTheirSessions(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(true);
		$this->cleanup->setLastRun(10000);
		$this->sessionService->expects(self::once())
			->method('getDocumentIdsInactiveSince')->with(10000 - 2 * SessionService::SESSION_VALID_TIME)
			->willReturn(['111']);
		$this->documentService->method('getDocument')->with('111')
			->willReturn($this->fileDocument('111', 456));
		$this->sessionService->method('getActiveSessions')->with('111')->willReturn([]);
		$file = $this->createMock(File::class);
		$this->rootFolder->expects(self::once())
			->method('getFirstNodeById')->with(456)->willReturn($file);
		$unlocked = false;
		$this->lockService->expects(self::once())
			->method('unlock')->with($file)
			->willReturnCallback(function () use (&$unlocked): void {
				$unlocked = true;
			});
		$this->sessionService->expects(self::once())
			->method('removeInactiveSessionsWithoutSteps')
			->willReturnCallback(function () use (&$unlocked): int {
				self::assertTrue($unlocked);
				return 0;
			});

		$this->cleanup->run([]);
	}

	public function testKeepsLocksOfDocumentsWithActiveSessions(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(true);
		$this->sessionService->method('getDocumentIdsInactiveSince')->willReturn(['111']);
		$this->documentService->method('getDocument')->willReturn($this->fileDocument('111', 456));
		$this->sessionService->method('getActiveSessions')->with('111')->willReturn([['id' => 1]]);
		$this->rootFolder->expects(self::never())->method('getFirstNodeById');
		$this->lockService->expects(self::never())->method('unlock');

		$this->cleanup->run([]);
	}

	public function testSkipsMissingDocumentsAndOtherContexts(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(true);
		$this->sessionService->method('getDocumentIdsInactiveSince')->willReturn(['111', '222']);
		$this->documentService->method('getDocument')->willReturnMap([
			['111', null],
			['222', Document::fromRow(['id' => '222', 'context_type' => 'other', 'context_id' => 456])],
		]);
		$this->rootFolder->expects(self::never())->method('getFirstNodeById');
		$this->lockService->expects(self::never())->method('unlock');

		$this->cleanup->run([]);
	}

	public function testContinuesAfterFailingUnlock(): void {
		$this->documentService->method('hasUnsavedChanges')->willReturn(true);
		$this->sessionService->method('getDocumentIdsInactiveSince')->willReturn(['111', '222']);
		$this->documentService->method('getDocument')->willReturnMap([
			['111', $this->fileDocument('111', 456)],
			['222', $this->fileDocument('222', 789)],
		]);
		$this->sessionService->method('getActiveSessions')->willReturn([]);
		$file = $this->createMock(File::class);
		$this->rootFolder->method('getFirstNodeById')->willReturnCallback(
			fn (int $id) => $id === 456 ? throw new \Error('No owner') : $file,
		);
		$this->logger->expects(self::once())->method('warning');
		$this->lockService->expects(self::once())->method('unlock')->with($file);
		$this->sessionService->expects(self::once())->method('removeInactiveSessionsWithoutSteps');

		$this->cleanup->run([]);
	}

	private function fileDocument(string $id, int $fileId): Document {
		return Document::fromRow(['id' => $id, 'context_type' => 'file', 'context_id' => $fileId]);
	}
}
