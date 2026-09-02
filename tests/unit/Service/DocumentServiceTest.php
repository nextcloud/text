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
	private ICache $cache;

	public function setUp(): void {
		$this->documentMapper = $this->createMock(DocumentMapper::class);
		$this->cache = $this->createMock(ICache::class);
		$cacheFactory = $this->createMock(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($this->cache);
		$request = $this->createMock(IRequest::class);
		$request->method('getParam')->willReturn(null);

		$this->documentService = new DocumentService(
			$this->createMock(ContextManager::class),
			$this->documentMapper,
			$this->createMock(StepMapper::class),
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
		$document->setId(123);
		$document->setLastSavedVersionEtag($etag);
		$document->setLastSavedVersionTime($mtime);
		$document->setChecksum(DocumentService::computeCheckSum($content));
		return $document;
	}

	public function testNoAutosavingWhileSaveIsUnderWay(): void {
		$document = $this->createDocument('etag1', 1000, 'new content');
		$context = $this->createMock(FileContext::class);
		$this->cache->method('get')
			->with('document-save-lock-123')
			->willReturn(true);
		$this->documentMapper->expects(self::never())->method('update');

		$result = $this->documentService->autosave($document, $context, 1234, 'new content', 'doc state');
		self::assertSame($result, $document);
	}

}
