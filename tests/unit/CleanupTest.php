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
use OCA\Text\Service\VersionSummaryService;
use OCP\AppFramework\Utility\ITimeFactory;
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
	private VersionSummaryService $summaries;

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
		$this->summaries = $this->createMock(VersionSummaryService::class);
		$this->documentService->expects(self::never())->method('resetDocument');
		$this->documentService->expects(self::once())
			->method('getAllPendingAttachmentCleanup')
			->willReturn((function (): \Generator {
				yield $this->document;
			})());
		$this->cleanup = new class($this->createMock(ITimeFactory::class), $this->sessionService, $this->documentService, $this->attachmentService, $this->logger, $this->setupManager, $this->summaries) extends Cleanup {
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

	public function testCleansUpTheSummariesOfChanges(): void {
		$this->summaries->expects(self::once())->method('cleanup');
		$this->documentService->method('hasUnsavedChanges')->willReturn(true);

		$this->cleanup->run([]);
	}

	public static function dataSummaryFailures(): array {
		return [[new \RuntimeException('Deadlock')], [new \TypeError('Bad value')]];
	}

	/**
	 * @dataProvider dataSummaryFailures
	 */
	public function testCleansUpDocumentsWhenTheSummariesCannotBe(\Throwable $failure): void {
		$this->summaries->method('cleanup')->willThrowException($failure);
		$this->logger->expects(self::once())->method('error')->with('Could not clean up summaries of changes');
		// The document cleanup still runs
		$this->documentService->expects(self::once())->method('hasUnsavedChanges')->willReturn(true);
		$this->documentService->expects(self::once())->method('markAttachmentCleanup');

		$this->cleanup->run([]);
	}
}
