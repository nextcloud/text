<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\Service;


use OC\Avatar\Avatar;
use OCA\Text\Db\Session;
use OCA\Text\Db\SessionMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IAvatar;
use OCP\IAvatarManager;
use OCP\Security\ISecureRandom;

class SessionService {

	public const SESSION_VALID_TIME = 60*5;

	private $sessionMapper;
	private $secureRandom;
	private $timeFactory;
	private $userId;

	public function __construct(SessionMapper $sessionMapper, ISecureRandom $secureRandom, ITimeFactory $timeFactory, $userId) {
		$this->sessionMapper = $sessionMapper;
		$this->secureRandom = $secureRandom;
		$this->timeFactory = $timeFactory;
		$this->userId = $userId ?? 'Guest';
	}

	public function initSession($documentId): Session {
		$session = new Session();
		$session->setDocumentId($documentId);
		$session->setUserId($this->userId);
		$session->setToken($this->secureRandom->generate(64));
		/** @var IAvatarManager $avatarGenerator */
		$avatarGenerator = \OC::$server->query(IAvatarManager::class);
		$color = $avatarGenerator->getGuestAvatar($this->userId)->avatarBackgroundColor($this->userId);
		$color = sprintf("#%02x%02x%02x", $color->r, $color->g, $color->b);
		$session->setColor($color);
		$session->setGuestName(null);
		$session->setLastContact($this->timeFactory->getTime());
		return $this->sessionMapper->insert($session);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function closeSession($documentId, $sessionId, $token): void {
		$session = $this->sessionMapper->find($documentId, $sessionId, $token);
		// TODO: check for unpersisited changes from session?
		$this->sessionMapper->delete($session);
	}

	public function getActiveSessions($documentId): array {
		$sessions = $this->sessionMapper->findAllActive($documentId);
		return array_map(function(Session $session) {
			$result = $session->jsonSerialize();
			$userManager = \OC::$server->getUserManager();
			$user = $userManager->get($session->getUserId());
			if ($user) {
				$result['displayName'] = $user->getDisplayName();
			}
			return $result;
		}, $sessions);
	}

	public function removeInactiveSessions($documentId) {
		return $this->sessionMapper->deleteInactive($documentId);
	}
	public function isValidSession($documentId, $sessionId, $token) {
		try {
			$session = $this->sessionMapper->find($documentId, $sessionId, $token);
		} catch (DoesNotExistException $e) {
			return false;
		}
		// TODO: move to cache
		$session->setLastContact($this->timeFactory->getTime());
		$this->sessionMapper->update($session);
		return true;
	}

	public function cleanupSession() {
		// find expired sessions
		// remove them
	}
}
