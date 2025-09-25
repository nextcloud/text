<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\Db\Session;
use OCA\Text\Db\SessionMapper;
use OCA\Text\YjsMessage;
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
	private ?string $userId;
	private ICache $cache;

	/** @var ?Session cache current session in the request */
	private ?Session $session = null;

	public function __construct(
		SessionMapper $sessionMapper,
		ISecureRandom $secureRandom,
		ITimeFactory $timeFactory,
		IUserManager $userManager,
		IAvatarManager $avatarManager,
		IRequest $request,
		IManager $directManager,
		?string $userId,
		ICacheFactory $cacheFactory,
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

	public function initSession(int $documentId, ?string $guestName = null): Session {
		$session = new Session();
		$session->setDocumentId($documentId);
		$session->setUserId($this->userId);
		$session->setToken($this->secureRandom->generate(64));
		$session->setColor($this->getColor());
		if ($this->userId === null) {
			$session->setGuestName($guestName ?? '');
		}
		$session->setLastContact($this->timeFactory->now()->getTimestamp());

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

	public function getAllSessions(int $documentId): array {
		$sessions = $this->sessionMapper->findAll($documentId);
		return array_map(function (Session $session) {
			$result = $session->jsonSerialize();
			if (!$session->isGuest()) {
				$result['displayName'] = $this->userManager->getDisplayName($session->getUserId());
			}
			return $result;
		}, $sessions);
	}

	public function countAllSessions(int $documentId): int {
		return $this->sessionMapper->countAll($documentId);
	}

	public function getActiveSessions(int $documentId): array {
		$sessions = $this->sessionMapper->findAllActive($documentId);
		return array_map(function (Session $session) {
			$result = $session->jsonSerialize();
			if (!$session->isGuest()) {
				$result['displayName'] = $this->userManager->getDisplayName($session->getUserId());
			}
			return $result;
		}, $sessions);
	}

	public function getNameForSession(Session $session): ?string {
		if (!$session->isGuest()) {
			return $this->userManager->getDisplayName($session->getUserId());
		}

		return $session->getGuestName();
	}

	/** @return Session[] */
	public function findAllInactive(): array {
		return $this->sessionMapper->findAllInactive();
	}

	public function removeInactiveSessionsWithoutSteps(?int $documentId = null): int {
		// No need to clear the cache here as we already set a TTL
		return $this->sessionMapper->deleteInactiveWithoutSteps($documentId);
	}

	public function removeOldSessions(int $ageInSeconds = 7776000): int {
		return $this->sessionMapper->deleteOldSessions($ageInSeconds);
	}

	public function getSession(int $documentId, int $sessionId, string $token): ?Session {
		if ($this->session !== null) {
			return $this->session;
		}

		$data = $this->cache->get($token);
		if ($data !== null) {
			$this->session = Session::fromRow(json_decode($data, true));
			if ($this->session->getId() !== $sessionId || $this->session->getDocumentId() !== $documentId) {
				$this->cache->remove($token);
				$this->session = null;
			}

			return $this->session;
		}

		try {
			$this->session = $this->sessionMapper->find($documentId, $sessionId, $token);
			$this->cache->set($token, json_encode($this->session), self::SESSION_VALID_TIME - 30);
		} catch (DoesNotExistException $e) {
			$this->session = null;
			$this->cache->remove($token);
		}

		return $this->session;
	}

	public function getValidSession(int $documentId, int $sessionId, string $token): ?Session {
		$session = $this->getSession($documentId, $sessionId, $token);
		if ($session === null) {
			return null;
		}

		$currentTime = $this->timeFactory->now()->getTimestamp();
		if (($currentTime - $session->getLastContact()) >= 30) {
			/*
			 * We need to update the timestamp.
			 * Make sure that the session we got is still in the database
			 */
			try {
				$session = $this->sessionMapper->find($documentId, $sessionId, $token);
			} catch (DoesNotExistException $e) {
				$this->session = null;
				$this->cache->remove($token);
				return null;
			}
			$session->setLastContact($this->timeFactory->now()->getTimestamp());
			$this->sessionMapper->update($session);
			$this->cache->set($token, json_encode($session), self::SESSION_VALID_TIME - 30);
			$this->session = $session;
		}

		return $session;
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function updateSession(Session $session, string $guestName): Session {
		if ($this->userId !== null) {
			throw new \Exception('Logged in users cannot set a guest name');
		}
		$session->setGuestName($guestName);
		$session->setColor($this->getColorForGuestName($guestName));
		return $this->sessionMapper->update($session);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function updateSessionAwareness(Session $session, string $message): Session {
		if (empty($message)) {
			return $session;
		}

		$decoded = YjsMessage::fromBase64($message);
		if ($decoded->getYjsMessageType() !== YjsMessage::YJS_MESSAGE_AWARENESS) {
			throw new \ValueError('Message passed was not an awareness message');
		}

		$session->setLastAwarenessMessage($message);
		return $this->sessionMapper->update($session);
	}

	private function getColor(string $guestName = ''): string {
		if ($this->userId === null) {
			return $this->getColorForGuestName($guestName);
		}
		$name = $this->userManager->getDisplayName($this->userId) ?? $this->userId;
		$color = $this->avatarManager->getAvatar($this->userId)->avatarBackgroundColor($name);
		return $color->name();
	}

	private function getColorForGuestName(string $guestName = ''): string {
		$uniqueGuestId = !empty($guestName)
			? $guestName . '(guest)' // make it harder to impersonate users.
			: $this->secureRandom->generate(12);
		$color = $this->avatarManager->getGuestAvatar($uniqueGuestId)->avatarBackgroundColor($uniqueGuestId);
		return $color->name();
	}

	public function isUserInDocument(int $documentId, string $mention): bool {
		return $this->sessionMapper->isUserInDocument($documentId, $mention);
	}
}
