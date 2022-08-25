<?php
/**
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

namespace OCA\Text\Service;

use OCA\Text\Notification\Notifier;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Notification\IManager;

class NotificationService {
	private IManager $manager;
	private ITimeFactory $timeFactory;
	private ?string $userId;

	public function __construct(IManager $manager, ITimeFactory $timeFactory, ?string $userId = null) {
		$this->manager = $manager;
		$this->timeFactory = $timeFactory;
		$this->userId = $userId;
	}

	public function mention(int $fileId, string $userId): bool {
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
			$notification->setDateTime($this->timeFactory->getDateTime());
			$this->manager->notify($notification);
			return true;
		}

		return false;
	}
}
