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

use OCA\Text\Db\Session;
use OCA\Text\Db\SessionMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\DirectEditing\IManager;
use OCP\IAvatarManager;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\Security\ISecureRandom;

class SessionService {
	public const SESSION_VALID_TIME = 5 * 60;

	private SessionMapper $sessionMapper;
	private ISecureRandom $secureRandom;
	private ITimeFactory $timeFactory;
	private IUserManager $userManager;
	private IAvatarManager $avatarManager;

	/** @var string|null */
	private $userId;

	/** @var Session cache current session in the request */
	private $session = null;

	/** @var ICache */
	private $cache;

	public function __construct(
		SessionMapper $sessionMapper,
		ISecureRandom $secureRandom,
		ITimeFactory $timeFactory,
		IUserManager $userManager,
		IAvatarManager $avatarManager,
		IRequest $request,
		IManager $directManager,
		$userId,
		ICacheFactory $cacheFactory
	) {
		$this->sessionMapper = $sessionMapper;
		$this->secureRandom = $secureRandom;
		$this->timeFactory = $timeFactory;
		$this->userManager = $userManager;
		$this->avatarManager = $avatarManager;
		$this->userId = $userId;

		$token = $request->getParam('token');
		if ($this->userId === null && $token !== null) {
			try {
				$tokenObject = $directManager->getToken($token);
				$tokenObject->extend();
				$tokenObject->useTokenScope();
				$this->userId = $tokenObject->getUser();
			} catch (\Exception $e) {
			}
		}

		$this->cache = $cacheFactory->createDistributed('text_sessions');
	}

	public function initSession($documentId, $guestName = null): Session {
		$session = new Session();
		$session->setDocumentId($documentId);
		$userName = $this->userId ? $this->userId : $guestName;
		$session->setUserId($this->userId);
		$session->setToken($this->secureRandom->generate(64));
		$session->setColor($this->getColorForGuestName($guestName));
		if ($this->userId === null) {
			$session->setGuestName($guestName);
		}
		$session->setLastContact($this->timeFactory->getTime());

		$session = $this->sessionMapper->insert($session);
		$this->cache->set($session->getToken(), json_encode($session), self::SESSION_VALID_TIME);

		return $session;
	}

	public function closeSession(int $documentId, int $sessionId, string $token): void {
		try {
			$session = $this->sessionMapper->find($documentId, $sessionId, $token);
			$this->cache->remove($token);
			$this->sessionMapper->delete($session);
		} catch (DoesNotExistException $e) {
		}
	}

	public function getAllSessions($documentId): array {
		$sessions = $this->sessionMapper->findAll($documentId);
		return array_map(function (Session $session) {
			$result = $session->jsonSerialize();
			if ($session->getUserId() !== null) {
				$result['displayName'] = $this->userManager->getDisplayName($session->getUserId());
			}
			return $result;
		}, $sessions);
	}

	public function getActiveSessions($documentId): array {
		$sessions = $this->sessionMapper->findAllActive($documentId);
		return array_map(function (Session $session) {
			$result = $session->jsonSerialize();
			if ($session->getUserId() !== null) {
				$result['displayName'] = $this->userManager->getDisplayName($session->getUserId());
			}
			return $result;
		}, $sessions);
	}

	public function getNameForSession(Session $session): ?string {
		if ($session->getUserId() !== null) {
			return $this->userManager->getDisplayName($session->getUserId());
		}

		return $session->getGuestName();
	}

	public function findAllInactive() {
		return $this->sessionMapper->findAllInactive();
	}

	public function removeInactiveSessionsWithoutSteps($documentId = -1) {
		// No need to clear the cache here as we already set a TTL
		return $this->sessionMapper->deleteInactiveWithoutSteps($documentId);
	}

	/**
	 * @return bool|Session
	 */
	public function getSession($documentId, $sessionId, $token) {
		if ($this->session !== null) {
			return $this->session;
		}

		$data = $this->cache->get($token);
		if ($data !== null) {
			$session = Session::fromRow(json_decode($data, true));
			if ($session->getId() !== $sessionId || $session->getDocumentId() !== $documentId) {
				$this->cache->remove($token);
				$this->session = false;
				return false;
			}

			return $session;
		}

		try {
			$data = $this->sessionMapper->find($documentId, $sessionId, $token);
			$jsonData = json_encode($data);

			if ($jsonData) {
				$this->cache->set($token, json_encode($data), self::SESSION_VALID_TIME - 30);
				return $data;
			}
		} catch (DoesNotExistException $e) {
		}

		$this->session = false;
		return false;
	}

	public function isValidSession($documentId, $sessionId, $token): bool {
		$session = $this->getSession($documentId, $sessionId, $token);
		if ($session === false) {
			return false;
		}

		$currentTime = $this->timeFactory->getTime();
		if (($currentTime - $session->getLastContact()) >= 30) {
			/*
			 * We need to update the timestamp.
			 * Make sure that the session we got is still in the database
			 */
			try {
				$session = $this->sessionMapper->find($documentId, $sessionId, $token);
			} catch (DoesNotExistException $e) {
				$this->session = false;
				$this->cache->remove($token);
				return false;
			}
			$session->setLastContact($this->timeFactory->getTime());
			$this->sessionMapper->update($session);
			$this->cache->set($token, json_encode($session), self::SESSION_VALID_TIME - 30);
		}
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
		$session->setColor($this->getColorForGuestName($guestName));
		return $this->sessionMapper->update($session);
	}

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $sessionToken
	 * @param $message
	 * @return Session
	 * @throws DoesNotExistException
	 */
	public function updateSessionAwareness(int $documentId, int $sessionId, string $sessionToken, string $message): Session {
		$session = $this->sessionMapper->find($documentId, $sessionId, $sessionToken);
		if (empty($message)) {
			return $session;
		}
		$session->setLastAwarenessMessage($message);
		return $this->sessionMapper->update($session);
	}

	private function getColorForGuestName(string $guestName = null): string {
		$guestName = $this->userId ?? $guestName;
		$uniqueGuestId = !empty($guestName) ? $guestName : $this->secureRandom->generate(12);
		$color = $this->avatarManager->getGuestAvatar($uniqueGuestId)->avatarBackgroundColor($uniqueGuestId);
		return $color->name();
	}

	public function isUserInDocument(int $documentId, string $mention): bool {
		return $this->sessionMapper->isUserInDocument($documentId, $mention);
	}
}
