<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\Service;

use OCA\Text\Service\WorkspaceService;
use OCP\Files\Cache\ICache;
use OCP\Files\Cache\ICacheEntry;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\Storage\IStorage;
use OCP\Files\StorageInvalidException;
use OCP\IL10N;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class WorkspaceServiceTest extends TestCase {
	private IL10N&MockObject $l10n;
	private WorkspaceService $workspaceService;

	protected function setUp(): void {
		parent::setUp();

		$this->l10n = $this->createMock(IL10N::class);
		$this->l10n->method('t')->with('Readme')->willReturn('Readme');

		$this->workspaceService = new WorkspaceService($this->l10n);
	}

	public function testGetFileReturnsFirstMatchingFileInPriorityOrder(): void {
		$folder = $this->createMock(Folder::class);
		$storage = $this->createMock(IStorage::class);
		$cache = $this->createMock(ICache::class);
		$readmeFile = $this->createMock(File::class);

		$folder->method('getStorage')->willReturn($storage);
		$storage->method('getCache')->willReturn($cache);
		$folder->method('getInternalPath')->willReturn('docs');

		$readmeEntry = $this->createMock(ICacheEntry::class);
		$readmeEntry->method('getMimeType')->willReturn('text/markdown');

		$uppercaseEntry = $this->createMock(ICacheEntry::class);
		$uppercaseEntry->method('getMimeType')->willReturn('text/markdown');

		$cache->method('get')->willReturnMap([
			['docs/Readme.md', $readmeEntry],
			['docs/README.md', $uppercaseEntry],
			['docs/readme.md', false],
		]);

		$folder->expects($this->once())
			->method('get')
			->with('Readme.md')
			->willReturn($readmeFile);

		$result = $this->workspaceService->getFile($folder);

		$this->assertSame($readmeFile, $result);
	}

	public function testGetFileSkipsDirectoryCacheEntries(): void {
		$folder = $this->createMock(Folder::class);
		$storage = $this->createMock(IStorage::class);
		$cache = $this->createMock(ICache::class);

		$folder->method('getStorage')->willReturn($storage);
		$storage->method('getCache')->willReturn($cache);
		$folder->method('getInternalPath')->willReturn('docs');

		$directoryEntry = $this->createMock(ICacheEntry::class);
		$directoryEntry->method('getMimeType')->willReturn(ICacheEntry::DIRECTORY_MIMETYPE);

		$cache->method('get')->willReturnMap([
			['docs/Readme.md', $directoryEntry],
			['docs/README.md', false],
			['docs/readme.md', false],
		]);

		$folder->expects($this->never())->method('get');

		$result = $this->workspaceService->getFile($folder);

		$this->assertNull($result);
	}

	public function testGetFileReturnsNullWhenStorageIsInvalid(): void {
		$folder = $this->createMock(Folder::class);

		$folder->method('getStorage')
			->willThrowException(new StorageInvalidException());

		$folder->expects($this->never())->method('getInternalPath');
		$folder->expects($this->never())->method('get');

		$result = $this->workspaceService->getFile($folder);

		$this->assertNull($result);
	}
}
