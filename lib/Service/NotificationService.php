<?php

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\Notification\Notifier;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Notification\IManager;

class NotificationService {
	public function __construct(
		private readonly IManager $manager,
		private readonly ITimeFactory $timeFactory,
		private readonly ?string $userId = null,
	) {
	}

	public function mention(int $fileId, string $userId): bool {
		if ($userId === $this->userId) {
			// We allow self mentions in documents but do not notify about it
			return false;
		}

		$notification = $this->manager->createNotification();
		$notification->setUser($userId)
			->setApp('text')
			->setSubject(Notifier::TYPE_MENTIONED, [
				Notifier::SUBJECT_MENTIONED_SOURCE_USER => $this->userId,
				Notifier::SUBJECT_MENTIONED_TARGET_USER => $userId,
			])
			->setObject('file', (string)$fileId);
		;

		if ($this->manager->getCount($notification) === 0) {
			$notification->setDateTime(\DateTime::createFromImmutable($this->timeFactory->now()));
			$this->manager->notify($notification);
			return true;
		}

		return false;
	}
}
