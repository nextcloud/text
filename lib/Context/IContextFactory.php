<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCP\IUser;
use OCP\Share\IShare;

interface IContextFactory {
	public function build(IUser|IShare $auth, string $type, int $id): IContext;
}
