<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Service\LockService;
use OCP\Files\Lock\ILock;
use OCP\Files\Lock\ILockManager;
use OCP\PreConditionNotMetException;
use PHPUnit\Framework\MockObject\MockObject;

class LockServiceTest extends \PHPUnit\Framework\TestCase {
	private ILockManager&MockObject $lockManager;
	private LockService $lockService;

	public function setUp(): void {
		$this->lockManager = $this->createMock(ILockManager::class);
		$this->lockService = new LockService($this->lockManager);
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
}
