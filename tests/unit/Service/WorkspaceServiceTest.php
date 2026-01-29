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

	private function mockFolder(string $internalPath, array $entryNames): Folder&MockObject {
		$folder = $this->createMock(Folder::class);
		$storage = $this->createMock(IStorage::class);
		$cache = $this->createMock(ICache::class);

		$folder->method('getStorage')->willReturn($storage);
		$storage->method('getCache')->willReturn($cache);
		$folder->method('getInternalPath')->willReturn('docs');

		$entries = array_map(function (string $name) {
			$entry = $this->createMock(ICacheEntry::class);
			$entry->method('getName')->willReturn($name);
			return $entry;
		}, $entryNames);

		$cache->expects($this->once())
			->method('getFolderContents')
			->with($internalPath . '/', 'text/markdown')
			->willReturn($entries);

		return $folder;
	}

	public function testGetFileReturnsFirstMatchingFileInPriorityOrder(): void {
		$readmeFile = $this->createMock(File::class);

		// Cache order deliberately does not match priority order :README.md
		// comes back before Readme.md, but Readme.md must still win.
		$folder = $this->mockFolder('docs', ['README.md', 'Readme.md']);

		$folder->expects($this->once())
			->method('get')
			->with('Readme.md')
			->willReturn($readmeFile);

		$result = $this->workspaceService->getFile($folder);

		$this->assertSame($readmeFile, $result);
	}

	public function testGetFileIgnoresMarkdownFilesWithUnsupportedNames(): void {
		// text/markdown files that aren't one of the supported readme names
		// (e.g. picked up by the mimetype filter but not a readme) must be skipped.
		$folder = $this->mockFolder('docs', ['notes.md', 'CHANGELOG.md']);

		$folder->expects($this->never())->method('get');

		$result = $this->workspaceService->getFile($folder);

		$this->assertNull($result);
	}

	public function testGetFileReturnsNullWhenNoSupportedFileExists(): void {
		$folder = $this->mockFolder('docs', []);

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
