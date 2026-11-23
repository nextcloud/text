<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Command\ResetDocument;
use OCA\Text\Db\Document;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Files\Config\ICachedMountInfo;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\File;
use OCP\IUser;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

class ResetDocumentTest extends \PHPUnit\Framework\TestCase {
	private DocumentService&MockObject $documentService;
	private FileService&MockObject $fileService;
	private LockService&MockObject $lockService;
	private ResetDocument $command;

	public function setUp(): void {
		$this->documentService = $this->createMock(DocumentService::class);
		$this->fileService = $this->createMock(FileService::class);
		$this->lockService = $this->createMock(LockService::class);
		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('admin');
		$mount = $this->createMock(ICachedMountInfo::class);
		$mount->method('getUser')->willReturn($user);
		$userMountCache = $this->createMock(IUserMountCache::class);
		$userMountCache->method('getMountsForFileId')->willReturn([$mount]);
		$this->command = new ResetDocument($this->documentService, $userMountCache, $this->fileService, $this->lockService);
	}

	public function testForceResetOfAllDocumentsReleasesTheirLocks(): void {
		$this->documentService->method('getAll')->willReturnCallback(function (): \Generator {
			yield Document::fromRow(['id' => '1', 'context_type' => 'file', 'context_id' => 456]);
			yield Document::fromRow(['id' => '2', 'context_type' => 'other', 'context_id' => 789]);
		});
		$cleared = false;
		$this->documentService->expects(self::once())->method('clearAll')
			->willReturnCallback(function () use (&$cleared): void {
				$cleared = true;
			});
		$file = $this->createMock(File::class);
		$this->fileService->expects(self::once())->method('getFileById')->with(456, 'admin')->willReturn($file);
		$this->lockService->expects(self::once())->method('unlock')->with($file)
			->willReturnCallback(function () use (&$cleared): void {
				self::assertTrue($cleared);
			});

		$result = $this->command->run(new ArrayInput(['--all' => true, '--force' => true]), new BufferedOutput());

		self::assertSame(0, $result);
	}
}
