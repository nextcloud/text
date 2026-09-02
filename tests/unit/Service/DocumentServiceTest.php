<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\StepMapper;
use OCA\Text\Exception\DocumentSaveConflictException;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\DirectEditing\IManager;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\File;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class DocumentServiceTest extends \PHPUnit\Framework\TestCase {
	private DocumentService $documentService;

	private DocumentMapper $documentMapper;
	private FileService $fileService;
	private ICache $cache;

	public function setUp(): void {
		$this->documentMapper = $this->createMock(DocumentMapper::class);
		$this->fileService = $this->createMock(FileService::class);
		$this->cache = $this->createMock(ICache::class);
		$cacheFactory = $this->createMock(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($this->cache);
		$request = $this->createMock(IRequest::class);
		$request->method('getParam')->willReturn(null);

		$this->fileService->method('isReadOnly')->willReturn(false);

		$this->documentService = new DocumentService(
			$this->documentMapper,
			$this->fileService,
			$this->createMock(StepMapper::class),
			$this->createMock(SessionMapper::class),
			$this->createMock(IAppData::class),
			'admin',
			$this->createMock(IRootFolder::class),
			$cacheFactory,
			$this->createMock(LoggerInterface::class),
			$this->createMock(LockService::class),
			$request,
			$this->createMock(IManager::class),
			$this->createMock(IUserMountCache::class),
			$this->createMock(IConfig::class),
		);
	}

	private function createDocument(string $etag, int $mtime, string $content): Document {
		$document = new Document();
		$document->setId(123);
		$document->setLastSavedVersionEtag($etag);
		$document->setLastSavedVersionTime($mtime);
		$document->setChecksum(DocumentService::computeCheckSum($content));
		return $document;
	}

	private function mockFile(string $etag, int $mtime, string $content): File {
		$file = $this->createMock(File::class);
		$file->method('getEtag')->willReturn($etag);
		$file->method('getMtime')->willReturn($mtime);
		$file->method('getContent')->willReturn($content);
		return $file;
	}

	public function testNoConflictWhenVersionInfoMatches(): void {
		$document = $this->createDocument('etag1', 1000, 'content');
		$file = $this->mockFile('etag1', 1000, 'content');

		$this->documentMapper->expects(self::never())->method('update');
		$this->documentService->assertNoOutsideConflict($document, $file);
	}

	public function testRefreshesVersionInfoWhenContentMatches(): void {
		$document = $this->createDocument('etag1', 1000, 'content');
		$file = $this->mockFile('etag2', 2000, 'content');

		$this->documentMapper->expects(self::never())->method('find');
		$this->documentMapper->expects(self::once())
			->method('update')
			->with($document);

		$this->documentService->assertNoOutsideConflict($document, $file);
		self::assertSame('etag2', $document->getLastSavedVersionEtag());
		self::assertSame(2000, $document->getLastSavedVersionTime());
	}

	public function testConflictWhenFileChangedFromOutside(): void {
		$document = $this->createDocument('etag1', 1000, 'old content');
		$file = $this->mockFile('etag2', 2000, 'outside content');

		$this->expectException(DocumentSaveConflictException::class);
		$this->documentService->assertNoOutsideConflict($document, $file);
	}

	public function testNoConflictWhileSaveLockIsHeld(): void {
		$document = $this->createDocument('etag1', 1000, 'old content');
		$file = $this->mockFile('etag2', 2000, 'new content');

		$this->cache->method('get')
			->with('document-save-lock-123')
			->willReturn(true);
		$this->documentMapper->expects(self::never())->method('find');
		$this->documentMapper->expects(self::never())->method('update');

		$this->documentService->assertNoOutsideConflict($document, $file);
	}

	public function testNoAutosavingWhileSaveIsUnderWay(): void {
		$document = $this->createDocument('etag1', 1000, 'new content');
		$file = $this->mockFile('etag1', 1000, 'old content');
		$this->cache->method('get')
			->with('document-save-lock-123')
			->willReturn(true);
		$this->documentMapper->expects(self::never())->method('update');

		$result = $this->documentService->autosave($document, $file, 1234, 'new content', 'doc state');
		self::assertSame($result, $document);
	}

}
