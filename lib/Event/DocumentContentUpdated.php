<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Event;

use OCA\Text\Context\IContext;
use OCP\EventDispatcher\Event;

/**
 * @since 35.0.0
 */
class DocumentContentUpdated extends Event {

	/**
	 * @since 35.0.0
	 */
	public function __construct(
		private readonly IContext $context,
	) {
	}

	/**
	 * @since 35.0.0
	 */
	public function getContext(): IContext {
		return $this->context;
	}
}
