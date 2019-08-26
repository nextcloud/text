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
use OCA\Text\Db\DirectMapper;
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
	/** @var Session Current session */
	private $session;

	public function __construct(SessionMapper $sessionMapper, DirectMapper $directMapper, ISecureRandom $secureRandom, ITimeFactory $timeFactory, $userId) {
		$this->sessionMapper = $sessionMapper;
		$this->directMapper = $directMapper;
		$this->secureRandom = $secureRandom;
		$this->timeFactory = $timeFactory;
		$this->userId = $userId;
	}

	public function initSession($documentId, $direct = false, $guestName = null): Session {
		if ($direct) {
			$this->userId = $direct->getUserId();
		}
		$session = new Session();
		$session->setDocumentId($documentId);
		$userName = $this->userId ? $this->userId : $guestName;
		$session->setUserId($userName);
		$session->setToken($this->secureRandom->generate(64));
		$session->setDirect($direct);
		/** @var IAvatarManager $avatarGenerator */
		$avatarGenerator = \OC::$server->query(IAvatarManager::class);
		$color = $avatarGenerator->getGuestAvatar($userName)->avatarBackgroundColor($userName);
		$color = sprintf("#%02x%02x%02x", $color->r, $color->g, $color->b);
		$session->setColor($color);
		if ($this->userId === null) {
			$session->setGuestName($guestName);
		}
		$session->setLastContact($this->timeFactory->getTime());
		$this->session = $this->sessionMapper->insert($session);
		return $this->session;
	}

	public function closeSession(int $documentId, int $sessionId, string $token): void {
		try {
			$session = $this->sessionMapper->find($documentId, $sessionId, $token);
			$this->sessionMapper->delete($session);
		} catch (DoesNotExistException $e) {
		}
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

	public function findAllInactive() {
		return $this->sessionMapper->findAllInactive();
	}

	public function removeInactiveSessions($documentId = -1) {
		return $this->sessionMapper->deleteInactive($documentId);
	}

	public function isDirectToken($token): bool {
		try {
			$this->directMapper->getByToken($token);
		} catch (DoesNotExistException $e) {
			return false;
		}
		return true;
	}

	/**
	 * @return Session
	 */
	public function getSession(): Session {
		return $this->session;
	}

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $token
	 * @return Session
	 * @throws DoesNotExistException
	 */
	public function loadSession($documentId, $sessionId, $token) {
		$this->session = $this->sessionMapper->find($documentId, $sessionId, $token);
		return $this->session;
	}

	public function getDirect($token) {
		try {
			return $this->directMapper->getByToken($token);
		} catch (DoesNotExistException $e) {
		}
		return null;
	}

	public function isDirectSession() {
		if ($this->session !== null) {
			return $this->session->getDirect();
		}
		return false;
	}

	public function clearDirectSession($token) {
		$direct = $this->directMapper->getByToken($token);
		$this->directMapper->delete($direct);
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

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $sessionToken
	 * @param $guestName
	 * @return Session
	 * @throws DoesNotExistException
	 */
	public function updateSession(int $documentId, int $sessionId, string $sessionToken, string $guestName): Session {
		if ($this->userId !== null) {
			throw new \Exception('Logged in users cannot set a guest name');
		}
		$session = $this->sessionMapper->find($documentId, $sessionId, $sessionToken);
		$session->setGuestName($guestName);
		return $this->sessionMapper->update($session);
	}
}
