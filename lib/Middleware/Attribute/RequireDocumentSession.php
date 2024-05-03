<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Middleware\Attribute;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD)]
class RequireDocumentSession {
}
