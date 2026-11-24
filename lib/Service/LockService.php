<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\AppInfo\Application;
use OCP\Files\File;
use OCP\Files\Lock\ILock;
use OCP\Files\Lock\ILockManager;
use OCP\Files\Lock\LockContext;
use OCP\Files\Lock\NoLockProviderException;
use OCP\Files\Lock\OwnerLockedException;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\PreConditionNotMetException;

class LockService {
	/** Seconds during which Text relies on its cached lock instead of asking the lock provider again */
	private const int LOCK_CACHE_TTL = 60;

	private readonly ICache $lockedFiles;

	public function __construct(
		private readonly ILockManager $lockManager,
		ICacheFactory $cacheFactory,
	) {
		$this->lockedFiles = $cacheFactory->createDistributed('text_locked_files');
	}

	/**
	 * @throws PreConditionNotMetException if another lock scope is already active
	 */
	public function runInScope(File $file, callable $callback): void {
		$this->lockManager->runInScope(
			new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			),
			$callback
		);
	}

	public function getLockByOthers(File $file): ?ILock {
		try {
			$locks = $this->lockManager->getLocks($file->getId());
		} catch (NoLockProviderException|PreConditionNotMetException) {
			return null;
		}
		$lockInfo = array_shift($locks);
		if ($lockInfo && $lockInfo->getType() === ILock::TYPE_APP && $lockInfo->getOwner() === Application::APP_NAME) {
			$lockInfo = null;
		}
		return $lockInfo;
	}

	/**
	 * Whether Text holds a lock on the file
	 */
	public function hasLock(int $fileId): bool {
		try {
			$locks = $this->lockManager->getLocks($fileId);
		} catch (NoLockProviderException|PreConditionNotMetException) {
			return false;
		}
		foreach ($locks as $lock) {
			if ($lock->getType() === ILock::TYPE_APP && $lock->getOwner() === Application::APP_NAME) {
				return true;
			}
		}
		return false;
	}

	public function lock(File $file): bool {
		$key = (string)$file->getId();
		if ($this->lockedFiles->get($key) !== null) {
			return true;
		}
		try {
			$this->lockManager->lock(new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			));
		} catch (NoLockProviderException|PreConditionNotMetException) {
		} catch (OwnerLockedException) {
			return false;
		}
		$this->lockedFiles->set($key, true, self::LOCK_CACHE_TTL);
		return true;
	}

	public function unlock(File $file): void {
		$this->lockedFiles->remove((string)$file->getId());
		try {
			$this->lockManager->unlock(new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			));
		} catch (NoLockProviderException|PreConditionNotMetException) {
		}
	}

}
