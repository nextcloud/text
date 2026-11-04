<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Exception;

use OCP\AppFramework\Http;

/**
 * A summary of changes that cannot be shown or started, with the reason the user sees
 */
class VersionSummaryException extends \Exception {
	/**
	 * @param Http::STATUS_* $status
	 */
	public function __construct(
		public readonly string $reason,
		public readonly int $status = Http::STATUS_NOT_FOUND,
		public readonly ?int $retryAfter = null,
	) {
		parent::__construct($reason);
	}
}
