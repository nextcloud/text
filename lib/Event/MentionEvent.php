<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Text\Event;

use OCP\EventDispatcher\Event;
use OCP\Files\File;
use OCP\Notification\INotification;

class MentionEvent extends Event {
	public function __construct(
		private INotification $notification,
		private File $file,
	) {
		parent::__construct();
	}

	public function getNotification(): INotification {
		return $this->notification;
	}

	public function getFile(): File {
		return $this->file;
	}
}
