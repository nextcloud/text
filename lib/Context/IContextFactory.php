<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCP\IUser;

interface IContextFactory {
	public function buildForUser( IUser $user, int $id,): IContext;
	public function buildForShare( string $token, int $id,): IContext;
}
