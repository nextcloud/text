<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Cron\Cleanup;
use OCA\Text\Db\Document;
use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
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
	private SessionService $sessionService;
	private IRootFolder $rootFolder;
	private LoggerInterface $logger;

	public function setUp(): void {
		$this->document = Document::fromRow([
			'id' => 123,
			'last_saved_version_time' => 1000,
		]);
		$this->documentService = $this->createMock(DocumentService::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$attachmentService = new AttachmentService(
			$this->rootFolder,
			$this->createMock(IManager::class),
			$this->createMock(IPreview::class),
			$this->createMock(IMimeTypeDetector::class),
			$this->createMock(IURLGenerator::class),
			$this->createMock(IFilenameValidator::class),
			$this->createMock(IFilesMetadataManager::class),
			$this->createMock(ISession::class),
		);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->documentService->expects(self::once())
			->method('getAllWithNoActiveSession')
			->willReturn((function (): \Generator {
				yield $this->document;
			})());
		$this->cleanup = new class($this->createMock(ITimeFactory::class), $this->sessionService, $this->documentService, $attachmentService, $this->logger) extends Cleanup {
			public function run($argument): void {
				parent::run($argument);
			}
		};
	}

	private function expectRemainingCleanupSteps(): void {
		$this->sessionService->expects(self::once())->method('removeInactiveSessionsWithoutSteps');
		$this->sessionService->expects(self::once())->method('removeOldSessions');
		$this->sessionService->expects(self::once())->method('removeOrphanedSteps');
		$this->documentService->expects(self::once())->method('cleanupOldDocumentsFolders');
	}

	public function testCleansAttachmentsOfResetDocument(): void {
		$this->documentService->expects(self::once())->method('resetDocument')->with(123);
		$this->rootFolder->expects(self::once())
			->method('getFirstNodeById')->with(123)
			->willReturn(null);
		$this->expectRemainingCleanupSteps();

		$this->cleanup->run([]);
	}

	public function testSkipsAttachmentCleanupForUnsavedChanges(): void {
		$this->documentService->expects(self::once())
			->method('resetDocument')->with(123)
			->willThrowException(new DocumentHasUnsavedChangesException());
		$this->rootFolder->expects(self::never())->method('getFirstNodeById');
		$this->expectRemainingCleanupSteps();

		$this->cleanup->run([]);
	}

	public function testNotPermittedCleanupIsLoggedAndJobContinues(): void {
		$this->documentService->expects(self::once())->method('resetDocument')->with(123);
		$this->rootFolder->expects(self::once())
			->method('getFirstNodeById')->with(123)
			->willThrowException(new NotPermittedException());
		$this->logger->expects(self::once())->method('warning');
		$this->expectRemainingCleanupSteps();

		$this->cleanup->run([]);
	}
}
