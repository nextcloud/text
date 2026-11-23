<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

/**
 * A context that is locked while it is being edited
 *
 * The lock is released once nobody changed the content for a while,
 * or when the last editing session ends (see IContext::cleanup()).
 */
interface ILockingContext extends IContext {
	/**
	 * Lock the context for changes that are about to be stored.
	 *
	 * Called for every push with changes, so keep it cheap if the context is locked already.
	 *
	 * @return bool false if someone else holds a lock on the context
	 */
	public function lockForEditing(): bool;
}
