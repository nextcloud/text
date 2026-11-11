<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Files_Versions\Versions\BackendNotFoundException;
use OCA\Files_Versions\Versions\IMetadataVersion;
use OCA\Files_Versions\Versions\IVersion;
use OCA\Files_Versions\Versions\IVersionManager;
use OCA\Text\Model\VersionEnd;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotFoundException;
use OCP\IUser;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Container\ContainerInterface;
use Test\TestCase;

interface TestMetadataVersion extends IVersion, IMetadataVersion {
}

class VersionAccessServiceTest extends TestCase {
	private IRootFolder&MockObject $rootFolder;
	private IVersionManager&MockObject $versionManager;
	private IUserManager&MockObject $userManager;
	private FileService&MockObject $fileService;
	private IUserFolder&MockObject $userFolder;
	private IUser&MockObject $user;
	private ContainerInterface&MockObject $container;
	private VersionAccessService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->versionManager = $this->createMock(IVersionManager::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->fileService = $this->createMock(FileService::class);
		$this->userFolder = $this->createMock(IUserFolder::class);
		$this->user = $this->createMock(IUser::class);

		$this->user->method('getUID')->willReturn('alice');
		$this->userFolder->method('getPath')->willReturn('/alice/files');
		$this->rootFolder->method('getUserFolder')->with('alice')->willReturn($this->userFolder);
		$this->userManager->method('getDisplayName')->willReturnMap([
			['alice', 'Alice'],
			['bob', 'Bob'],
		]);

		$this->container = $this->createMock(ContainerInterface::class);
		$this->container->method('get')->with(IVersionManager::class)->willReturnCallback(fn () => $this->versionManager);
		$this->service = new VersionAccessService(
			$this->rootFolder,
			$this->container,
			$this->userManager,
			$this->fileService,
		);
	}

	/**
	 * A file in the user's files.
	 *
	 * @param list<bool> $encryptedParents Whether each folder above the file, innermost first, is end-to-end encrypted
	 */
	private function file(string $mime = 'text/markdown', bool $readable = true, array $encryptedParents = [false]): File&MockObject {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(42);
		$file->method('getMimetype')->willReturn($mime);
		$file->method('isReadable')->willReturn($readable);
		$file->method('getMTime')->willReturn(3000);
		$file->method('getSize')->willReturn(300);

		$parent = $this->userFolder;
		$path = '/alice/files';
		foreach (array_reverse($encryptedParents) as $index => $encrypted) {
			$path .= '/folder' . $index;
			$folder = $this->createMock(Folder::class);
			$folder->method('getPath')->willReturn($path);
			$folder->method('isEncrypted')->willReturn($encrypted);
			$folder->method('getParent')->willReturn($parent);
			$parent = $folder;
		}
		$file->method('getParent')->willReturn($parent);
		$file->method('getPath')->willReturn($path . '/notes.md');
		return $file;
	}

	private function version(int $revision, int $size, ?string $author = null, string $label = ''): TestMetadataVersion&MockObject {
		$version = $this->createMock(TestMetadataVersion::class);
		$version->method('getRevisionId')->willReturn($revision);
		$version->method('getTimestamp')->willReturn($revision);
		$version->method('getSize')->willReturn($size);
		$version->method('getMetadataValue')->willReturnMap([
			['author', $author],
			['label', $label],
		]);
		return $version;
	}

	public function testResolvesAReadableMarkdownFile(): void {
		$file = $this->file();
		$this->userFolder->method('getFirstNodeById')->with(42)->willReturn($file);

		$this->assertSame($file, $this->service->resolveFile($this->user, 42));
	}

	public function testResolvesMarkdownUnderItsOtherTypeToo(): void {
		$file = $this->file('text/x-web-markdown');
		$this->userFolder->method('getFirstNodeById')->with(42)->willReturn($file);

		$this->assertSame($file, $this->service->resolveFile($this->user, 42));
	}

	public static function dataRefused(): array {
		return [
			'another type' => ['text/plain', true, [false]],
			'not readable' => ['text/markdown', false, [false]],
			'end-to-end encrypted folder' => ['text/markdown', true, [true]],
			'end-to-end encrypted further up' => ['text/markdown', true, [false, false, true]],
		];
	}

	/**
	 * @dataProvider dataRefused
	 * @param list<bool> $encryptedParents
	 */
	public function testRefuses(string $mime, bool $readable, array $encryptedParents): void {
		$file = $this->file($mime, $readable, $encryptedParents);
		$this->userFolder->method('getFirstNodeById')->willReturn($file);
		$this->userFolder->method('getById')->willReturn([$file]);

		$this->expectException(NotFoundException::class);
		$this->service->resolveFile($this->user, 42);
	}

	public function testSendsNothingOfAShareWithoutDownloads(): void {
		$file = $this->file();
		$this->userFolder->method('getFirstNodeById')->willReturn($file);
		$this->userFolder->method('getById')->willReturn([$file]);
		$disabled = false;
		$this->fileService->method('isDownloadDisabled')->with($file)->willReturnCallback(function () use (&$disabled) {
			return $disabled;
		});

		$this->assertSame($file, $this->service->resolveSendableFile($this->user, 42));
		$disabled = true;
		// Its versions are still listed, as in the Versions tab
		$this->assertSame($file, $this->service->resolveFile($this->user, 42));
		$this->expectException(NotFoundException::class);
		$this->service->resolveSendableFile($this->user, 42);
	}

	public function testUsesAnyMountThatAllowsIt(): void {
		// The same file shared twice: read-only without downloads first, then normally
		$hidden = $this->file(readable: false);
		$noDownloads = $this->file();
		$usable = $this->file();
		$this->userFolder->method('getFirstNodeById')->with(42)->willReturn($hidden);
		$this->userFolder->method('getById')->with(42)->willReturn([$hidden, $noDownloads, $usable]);
		$this->fileService->method('isDownloadDisabled')->willReturnCallback(fn (File $file) => $file === $noDownloads);

		$this->assertSame($noDownloads, $this->service->resolveFile($this->user, 42));
		$this->assertSame($usable, $this->service->resolveSendableFile($this->user, 42));
	}

	public function testRefusesWhenNoMountAllowsSending(): void {
		$file = $this->file();
		$this->userFolder->method('getFirstNodeById')->willReturn($file);
		$this->userFolder->method('getById')->willReturn([$file, $this->file()]);
		$this->fileService->method('isDownloadDisabled')->willReturn(true);

		$this->expectException(NotFoundException::class);
		$this->service->resolveSendableFile($this->user, 42);
	}

	public function testRefusesAFileTheUserCannotReach(): void {
		// An unrelated user, or a member removed from a collective
		$this->userFolder->method('getFirstNodeById')->with(42)->willReturn(null);

		$this->expectException(NotFoundException::class);
		$this->service->resolveFile($this->user, 42);
	}

	public function testRefusesAFolder(): void {
		$folder = $this->createMock(Folder::class);
		$this->userFolder->method('getFirstNodeById')->willReturn($folder);
		$this->userFolder->method('getById')->willReturn([$folder]);

		$this->expectException(NotFoundException::class);
		$this->service->resolveFile($this->user, 42);
	}

	public function testListsTheCurrentFileFirstAndVersionsNewestFirst(): void {
		$file = $this->file();
		// As files_versions lists them: the current file is the version with its mtime
		$this->versionManager->method('getVersionsForFile')->with($this->user, $file)->willReturn([
			$this->version(1000, 100, 'alice', 'First draft'),
			$this->version(3000, 300, 'bob'),
			$this->version(2000, 200),
		]);

		$ends = $this->service->listVersions($this->user, $file);

		$this->assertSame(['current', '2000', '1000'], array_map(fn (VersionEnd $end) => $end->id, $ends));
		$this->assertSame([
			'id' => 'current',
			'mtime' => 3000,
			'size' => 300,
			'label' => '',
			'author' => ['id' => 'bob', 'displayName' => 'Bob'],
		], $ends[0]->jsonSerialize());
		$this->assertNull($ends[0]->version);
		$this->assertNull($ends[1]->jsonSerialize()['author']);
		$this->assertSame(['id' => 'alice', 'displayName' => 'Alice'], $ends[2]->jsonSerialize()['author']);
		$this->assertSame('First draft', $ends[2]->label);
	}

	public function testListsOnlyTheCurrentFileWithFilesVersionsDisabled(): void {
		$container = $this->createMock(ContainerInterface::class);
		$container->method('get')->willThrowException(new \OCP\AppFramework\QueryException('IVersionManager'));
		$service = new VersionAccessService($this->rootFolder, $container, $this->userManager, $this->fileService);

		$ends = $service->listVersions($this->user, $this->file());

		$this->assertSame(['current'], array_map(fn (VersionEnd $end) => $end->id, $ends));
	}

	public function testSaysWhetherFilesVersionsIsThere(): void {
		$container = $this->createMock(ContainerInterface::class);
		$container->method('get')->willThrowException(new \OCP\AppFramework\QueryException('IVersionManager'));
		$without = new VersionAccessService($this->rootFolder, $container, $this->userManager, $this->fileService);

		$this->assertTrue($this->service->hasVersions());
		$this->assertFalse($without->hasVersions());
	}

	public function testListsOnlyTheCurrentFileWithoutAVersionsBackend(): void {
		$file = $this->file();
		$this->versionManager->method('getVersionsForFile')->willThrowException(new BackendNotFoundException('No backend'));

		$ends = $this->service->listVersions($this->user, $file);

		$this->assertCount(1, $ends);
		$this->assertSame(VersionEnd::CURRENT, $ends[0]->id);
		$this->assertNull($ends[0]->authorId);
	}

	public function testPassesOnAFailureOfTheVersionsBackend(): void {
		$this->versionManager->method('getVersionsForFile')->willThrowException(new \RuntimeException('Database is gone'));

		$this->expectException(\RuntimeException::class);
		$this->service->listVersions($this->user, $this->file());
	}

	public function testResolvesTheCurrentFileByItsRevisionToo(): void {
		$file = $this->file();
		$versions = [new VersionEnd('current', 3000, 300, '', null, null, null), new VersionEnd('1000', 1000, 100, '', null, null, null)];

		$this->assertSame('current', $this->service->resolveEnd($file, $versions, '3000')->id);
		$this->assertSame('1000', $this->service->resolveEnd($file, $versions, '1000')->id);
		$this->expectException(\OCA\Text\Exception\VersionNotFoundException::class);
		$this->service->resolveEnd($file, $versions, '999');
	}

	public function testReadsAnEndUpToALimit(): void {
		$file = $this->file();
		$file->method('fopen')->willReturnCallback(fn () => $this->stream('# Current'));
		$version = $this->version(1000, 100);
		// Collectives reads its current page as a version backed by the live file too
		$this->versionManager->method('read')->with($version)->willReturnCallback(fn () => $this->stream('# Old'));

		$this->assertSame('# Current', $this->service->read($file, new VersionEnd('current', 3000, 9, '', null, null, null), 9));
		$this->assertNull($this->service->read($file, new VersionEnd('current', 3000, 9, '', null, null, null), 8));
		$this->assertSame('# Old', $this->service->read($file, new VersionEnd('1000', 1000, 5, '', null, null, $version), 100));
	}

	public function testRefusesAVersionItCannotRead(): void {
		$version = $this->version(1000, 100);
		$this->versionManager->method('read')->willReturn(false);

		$this->expectException(\OCA\Text\Exception\VersionNotFoundException::class);
		$this->service->read($this->file(), new VersionEnd('1000', 1000, 5, '', null, null, $version), 100);
	}

	public function testRefusesAVersionThatExpiredSinceItWasListed(): void {
		$version = $this->version(1000, 100);
		$this->versionManager->method('read')->willThrowException(new NotFoundException('expired'));

		$this->expectException(\OCA\Text\Exception\VersionNotFoundException::class);
		$this->service->read($this->file(), new VersionEnd('1000', 1000, 5, '', null, null, $version), 100);
	}

	/**
	 * @return resource
	 */
	private function stream(string $content) {
		$stream = fopen('php://memory', 'r+');
		fwrite($stream, $content);
		rewind($stream);
		return $stream;
	}
}
