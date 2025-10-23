<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Exception;

use OCP\AppFramework\Http;

final class VersionMismatchException extends \Exception {
	public function getStatus(): int {
		return Http::STATUS_PRECONDITION_FAILED;
	}
}
