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
use OCP\PreConditionNotMetException;

class LockService {

	public function __construct(
		private readonly ILockManager $lockManager,
	) {
	}

	public function runInScope(File $file, callable $callback): void {
		$this->lockManager->runInScope(
			new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			),
			$callback
		);
		return;
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

	public function lock(File $file): bool {
		if (!$this->lockManager->isLockProviderAvailable()) {
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
		return true;
	}

	public function unlock(File $file): void {
		if (!$this->lockManager->isLockProviderAvailable()) {
			return;
		}

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
