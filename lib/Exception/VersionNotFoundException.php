<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Exception;

/**
 * The version asked for is not among the file's retained versions, or cannot be read
 */
class VersionNotFoundException extends \Exception {
}
