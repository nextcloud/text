<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCP\Files\Lock\ILock;

readonly class SessionInfo {
	public function __construct(
		public ?string $content,
		public bool $readOnly,
		public ?ILock $lock,
		public bool $hasOwner,
	) {
	}

	public function jsonSerialize(): array {
		return [
			'content' => $this->content,
			'readOnly' => $this->readOnly,
			'lock' => $this->lock,
			'hasOwner' => $this->hasOwner,
		];
	}
}
