<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCA\Text\Service\VersionSummaryService;
use OCP\Files\Events\Node\BeforeNodeDeletedEvent;
use OCP\Files\File;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
use OCP\FilesMetadata\IFilesMetadataManager;
use OCP\IPreview;
use OCP\ISession;
use OCP\IURLGenerator;
use OCP\Share\IManager;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class BeforeNodeDeletedListenerTest extends TestCase {
	private VersionSummaryService&MockObject $summaries;
	private DocumentService&MockObject $documents;
	private BeforeNodeDeletedListener $listener;

	protected function setUp(): void {
		parent::setUp();
		$this->summaries = $this->createMock(VersionSummaryService::class);
		// A real one, as it is readonly; no file here has an attachments folder
		$attachments = new AttachmentService(
			$this->createMock(IRootFolder::class),
			$this->createMock(IManager::class),
			$this->createMock(IPreview::class),
			$this->createMock(IMimeTypeDetector::class),
			$this->createMock(IURLGenerator::class),
			$this->createMock(IFilenameValidator::class),
			$this->createMock(IFilesMetadataManager::class),
			$this->createMock(ISession::class),
			$this->createMock(FileService::class),
		);
		$this->documents = $this->createMock(DocumentService::class);
		$this->listener = new BeforeNodeDeletedListener(
			$attachments,
			$this->documents,
			$this->createMock(LockService::class),
			$this->summaries,
			$this->createMock(LoggerInterface::class),
		);
	}

	private function file(int $id, string $mime): File&MockObject {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn($id);
		$file->method('getMimetype')->willReturn($mime);
		$file->method('getMimeType')->willReturn($mime);
		$file->method('getParent')->willThrowException(new \OCP\Files\NotFoundException());
		return $file;
	}

	public static function dataMarkdownTypes(): array {
		return [['text/markdown'], ['text/x-web-markdown']];
	}

	/**
	 * @dataProvider dataMarkdownTypes
	 */
	public function testRemovesTheSummariesOfADeletedFile(string $mime): void {
		$this->summaries->expects($this->once())->method('purgeFile')->with(42);

		$this->listener->handle(new BeforeNodeDeletedEvent($this->file(42, $mime)));
	}

	public static function dataPurgeFailures(): array {
		return [[new \RuntimeException('database gone')], [new \TypeError('unexpected value')]];
	}

	/**
	 * @dataProvider dataPurgeFailures
	 */
	public function testDeletesTheFileWhenItsSummariesCannotBeRemoved(\Throwable $failure): void {
		$this->documents->expects($this->once())->method('resetDocument')->with('file', 42, true);
		$this->summaries->method('purgeFile')->willThrowException($failure);

		$this->listener->handle(new BeforeNodeDeletedEvent($this->file(42, 'text/markdown')));
	}

}
