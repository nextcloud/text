<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Exception;

use OCP\Files\Lock\ILock;

class DocumentLockedException extends \Exception {

	public function __construct(
		private readonly ?ILock $lock,
	) {
		parent::__construct('The document is locked by someone else');
	}

	public function getLock(): ?ILock {
		return $this->lock;
	}
}
