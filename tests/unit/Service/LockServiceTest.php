<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Service\LockService;
use OCP\Files\File;
use OCP\Files\Lock\ILock;
use OCP\Files\Lock\ILockManager;
use OCP\Files\Lock\OwnerLockedException;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\PreConditionNotMetException;
use PHPUnit\Framework\MockObject\MockObject;

class LockServiceTest extends \PHPUnit\Framework\TestCase {
	private ILockManager&MockObject $lockManager;
	private LockService $lockService;
	/** @var array<string, mixed> */
	private array $cached = [];

	public function setUp(): void {
		$this->lockManager = $this->createMock(ILockManager::class);
		$cache = $this->createMock(ICache::class);
		$cache->method('get')->willReturnCallback(fn (string $key) => $this->cached[$key] ?? null);
		$cache->method('set')->willReturnCallback(function (string $key, mixed $value): bool {
			$this->cached[$key] = $value;
			return true;
		});
		$cache->method('remove')->willReturnCallback(function (string $key): bool {
			unset($this->cached[$key]);
			return true;
		});
		$cacheFactory = $this->createMock(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($cache);
		$this->lockService = new LockService($this->lockManager, $cacheFactory);
	}

	private function file(): File {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(456);
		return $file;
	}

	private function lock(int $type, string $owner): ILock {
		$lock = $this->createMock(ILock::class);
		$lock->method('getType')->willReturn($type);
		$lock->method('getOwner')->willReturn($owner);
		return $lock;
	}

	public function testHasLockOfText(): void {
		$this->lockManager->method('getLocks')->with(456)->willReturn([$this->lock(ILock::TYPE_APP, 'text')]);
		self::assertTrue($this->lockService->hasLock(456));
	}

	public function testHasNoLockOfOthers(): void {
		$this->lockManager->method('getLocks')->willReturn([
			$this->lock(ILock::TYPE_APP, 'richdocuments'),
			$this->lock(ILock::TYPE_USER, 'text'),
		]);
		self::assertFalse($this->lockService->hasLock(456));
	}

	public function testHasNoLockWithoutLockProvider(): void {
		$this->lockManager->method('getLocks')->willThrowException(new PreConditionNotMetException());
		self::assertFalse($this->lockService->hasLock(456));
	}

	public function testLockIsNotRequestedAgainRightAway(): void {
		$file = $this->file();
		$this->lockManager->expects(self::once())->method('lock');

		self::assertTrue($this->lockService->lock($file));
		self::assertTrue($this->lockService->lock($file));
	}

	public function testLockIsRequestedAgainAfterUnlock(): void {
		$file = $this->file();
		$this->lockManager->expects(self::exactly(2))->method('lock');

		$this->lockService->lock($file);
		$this->lockService->unlock($file);
		$this->lockService->lock($file);
	}

	public function testFailedLockIsNotRemembered(): void {
		$file = $this->file();
		$this->lockManager->expects(self::exactly(2))->method('lock')
			->willThrowException(new OwnerLockedException($this->createMock(ILock::class)));

		self::assertFalse($this->lockService->lock($file));
		self::assertFalse($this->lockService->lock($file));
	}
}
