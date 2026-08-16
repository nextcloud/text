<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Event;

use OCA\Text\Context\ContextManager;
use OCP\EventDispatcher\Event;

/**
 * @since 35.0.0
 */
class RegisterContextEvent extends Event {

	/**
	 * @since 35.0.0
	 */
	public function __construct(
		private readonly ContextManager $contextManager,
	) {
	}

	/**
	 * @since 35.0.0
	 */
	public function getContextManager(): ContextManager {
		return $this->contextManager;
	}
}
