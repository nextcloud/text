<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Context\ContextManager;
use OCA\Text\Context\FileContext;
use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\StepMapper;
use OCA\Text\Service\DocumentService;
use OCP\DirectEditing\IManager;
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
	private StepMapper $stepMapper;
	private ICache $cache;

	public function setUp(): void {
		$this->documentMapper = $this->createMock(DocumentMapper::class);
		$this->stepMapper = $this->createMock(StepMapper::class);
		$this->cache = $this->createMock(ICache::class);
		$cacheFactory = $this->createMock(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($this->cache);
		$request = $this->createMock(IRequest::class);
		$request->method('getParam')->willReturn(null);

		$this->documentService = new DocumentService(
			$this->createMock(ContextManager::class),
			$this->documentMapper,
			$this->stepMapper,
			$this->createMock(SessionMapper::class),
			$this->createMock(IAppData::class),
			'admin',
			$this->createMock(IRootFolder::class),
			$cacheFactory,
			$this->createMock(LoggerInterface::class),
			$request,
			$this->createMock(IManager::class),
			$this->createMock(IConfig::class),
		);
	}

	private function createDocument(string $etag, int $mtime, string $content): Document {
		$document = new Document();
		$document->setLastSavedVersionEtag($etag);
		$document->setLastSavedVersionTime($mtime);
		$document->setChecksum(DocumentService::computeCheckSum($content));
		$document->generateId();
		return $document;
	}

	public function testGetAllPendingAttachmentCleanup(): void {
		$document = $this->createDocument('etag1', 1000, 'content');
		$documents = (static function () use ($document): \Generator {
			yield $document;
		})();
		$this->documentMapper->expects(self::once())
			->method('findAllPendingAttachmentCleanup')->willReturn($documents);

		self::assertSame($documents, $this->documentService->getAllPendingAttachmentCleanup());
	}

	public function testMarksOnlyTheProcessedSavedTimestamp(): void {
		$document = $this->createDocument('etag1', 1000, 'content');
		$document->resetUpdatedFields();
		$this->documentMapper->expects(self::once())
			->method('update')->with($document)->willReturn($document);

		$this->documentService->markAttachmentCleanup($document);

		self::assertSame(1000, $document->getLastAttachmentCleanup());
		self::assertSame(1000, $document->getLastSavedVersionTime());
		self::assertSame(['lastAttachmentCleanup' => true], $document->getUpdatedFields());
	}

	public function testDetectsUnsavedChangesWithStringDocumentId(): void {
		$document = $this->createDocument('etag1', 1000, 'content');
		$document->setLastSavedVersion(3);
		$this->stepMapper->expects(self::once())
			->method('getLatestVersion')->with($document->id)->willReturn(4);

		self::assertTrue($this->documentService->hasUnsavedChanges($document));
	}

	public function testSavedStepsHaveNoUnsavedChanges(): void {
		$document = $this->createDocument('etag1', 1000, 'content');
		$document->setLastSavedVersion(3);
		$this->stepMapper->expects(self::once())
			->method('getLatestVersion')->with($document->id)->willReturn(3);

		self::assertFalse($this->documentService->hasUnsavedChanges($document));
	}

	public function testDocumentWithoutStepsHasNoUnsavedChanges(): void {
		$document = $this->createDocument('etag1', 1000, 'content');
		$this->stepMapper->expects(self::once())
			->method('getLatestVersion')->with($document->id)->willReturn(null);

		self::assertFalse($this->documentService->hasUnsavedChanges($document));
	}

	public function testCannotCheckUnsavedChangesWithoutDocumentId(): void {
		$this->stepMapper->expects(self::never())->method('getLatestVersion');
		$this->expectException(\RuntimeException::class);
		$this->expectExceptionMessage('Document needs an id to check unsaved changes');

		$this->documentService->hasUnsavedChanges(new Document());
	}

	public function testNoAutosavingWhileSaveIsUnderWay(): void {
		$document = $this->createDocument('etag1', 1000, 'new content');
		$context = $this->createMock(FileContext::class);
		$this->cache->method('get')
			->with('document-save-lock-' . $document->id)
			->willReturn(true);
		$this->documentMapper->expects(self::never())->method('update');

		$result = $this->documentService->autosave($document, $context, 1234, 'new content', 'doc state');
		self::assertSame($result, $document);
	}

}
