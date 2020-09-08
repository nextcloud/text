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
use OCP\DirectEditing\IManager;
use OCP\IAvatar;
use OCP\IAvatarManager;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IRequest;
use OCP\Security\ISecureRandom;

class SessionService {

	public const SESSION_VALID_TIME = 60*5;

	/** @var SessionMapper */
	private $sessionMapper;

	/** @var ISecureRandom */
	private $secureRandom;

	/** @var ITimeFactory */
	private $timeFactory;

	/** @var IAvatarManager */
	private $avatarManager;

	/** @var string */
	private $userId;

	/** @var Session cache current session in the request */
	private $session = null;

	/** @var ICache */
	private $cache;

	public function __construct(
		SessionMapper $sessionMapper,
		ISecureRandom $secureRandom,
		ITimeFactory $timeFactory,
		IAvatarManager $avatarManager,
		IRequest $request,
		IManager $directManager,
		$userId,
		ICacheFactory $cacheFactory
	) {
		$this->sessionMapper = $sessionMapper;
		$this->secureRandom = $secureRandom;
		$this->timeFactory = $timeFactory;
		$this->avatarManager = $avatarManager;
		$this->userId = $userId;

		$token = $request->getParam('token');
		if ($this->userId === null && $token !== null) {
			try {
				$tokenObject = $directManager->getToken($token);
				$tokenObject->extend();
				$tokenObject->useTokenScope();
				$this->userId = $tokenObject->getUser();
			} catch (\Exception $e) {}
		}

		$this->cache = $cacheFactory->createDistributed('text_sessions');
	}

	public function initSession($documentId, $guestName = null): Session {
		$session = new Session();
		$session->setDocumentId($documentId);
		$userName = $this->userId ? $this->userId : $guestName;
		$session->setUserId($this->userId);
		$session->setToken($this->secureRandom->generate(64));
		$color = $this->avatarManager->getGuestAvatar($userName)->avatarBackgroundColor($userName);
		$color = sprintf("#%02x%02x%02x", $color->r, $color->g, $color->b);
		$session->setColor($color);
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
		// No need to clear the cache here as we already set a TTL
		return $this->sessionMapper->deleteInactive($documentId);
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
			$this->cache->set($token, json_encode($data), self::SESSION_VALID_TIME - 30);
			return $data;
		} catch (DoesNotExistException $e) {
			$this->session = false;
			return false;
		}
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
		return $this->sessionMapper->update($session);
	}
}
