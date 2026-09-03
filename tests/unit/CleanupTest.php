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
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
use OCP\Files\ISetupManager;
use OCP\Files\Node;
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
		$this->documentService->expects(self::never())->method('resetDocument');
		$this->documentService->expects(self::once())
			->method('getAllPendingAttachmentCleanup')
			->willReturn((function (): \Generator {
				yield $this->document;
			})());
		$this->cleanup = new class($this->createMock(ITimeFactory::class), $this->sessionService, $this->documentService, $this->attachmentService, $this->createMock(LoggerInterface::class), $this->setupManager, ) extends Cleanup {
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
}
