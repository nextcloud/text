<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCP\Files\Lock\ILock;

class SessionInfo {
	// Set explicitely by the ApiService when needed.
	public ?string $content = null;

	/**
	 * @param bool $readOnly Prevent editing
	 * @param bool $canAttachFiles Allow attachment handling
	 * @param ?ILock $lock Lock held by others when locked
	 */
	public function __construct(
		public bool $readOnly,
		public bool $canAttachFiles,
		public ?ILock $lock,
	) {
	}

	public function jsonSerialize(): array {
		return [
			'content' => $this->content,
			'readOnly' => $this->readOnly,
			'lock' => $this->lock,
			'canAttachFiles' => $this->canAttachFiles,
		];
	}
}
