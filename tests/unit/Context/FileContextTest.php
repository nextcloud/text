<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Context\FileContext;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Files\File;
use OCP\Files\Lock\ILock;
use OCP\IL10N;
use OCP\IUser;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;

class FileContextTest extends \PHPUnit\Framework\TestCase {
	private FileService&MockObject $fileService;
	private LockService&MockObject $lockService;

	public function setUp(): void {
		$this->fileService = $this->createMock(FileService::class);
		$this->lockService = $this->createMock(LockService::class);
	}

	private function context(string $name): FileContext {
		$file = $this->createMock(File::class);
		$file->method('getName')->willReturn($name);
		return new FileContext(
			$this->fileService,
			$this->createMock(IL10N::class),
			$this->lockService,
			$this->createMock(LoggerInterface::class),
			$this->createMock(IUser::class),
			'file',
			456,
			$file,
		);
	}

	public function testOpeningDoesNotLock(): void {
		$this->fileService->method('isReadOnly')->willReturn(false);
		$this->lockService->expects(self::never())->method('lock');

		self::assertFalse($this->context('notes.md')->prepareSession()->readOnly);
	}

	public function testOpeningFileLockedByOthersIsReadOnly(): void {
		$this->fileService->method('isReadOnly')->willReturn(true);

		self::assertTrue($this->context('notes.md')->prepareSession()->readOnly);
	}

	public function testEditingLocks(): void {
		$this->lockService->expects(self::once())->method('lock')->willReturn(false);

		self::assertFalse($this->context('notes.md')->lockForEditing());
	}

	public function testEditingReadmeDoesNotLock(): void {
		$this->lockService->expects(self::never())->method('lock');

		self::assertTrue($this->context('Readme.md')->lockForEditing());
	}

	public function testGetLockOfOthers(): void {
		$lock = $this->createMock(ILock::class);
		$this->lockService->method('getLockByOthers')->willReturn($lock);

		self::assertSame($lock, $this->context('notes.md')->getLock());
	}
}
