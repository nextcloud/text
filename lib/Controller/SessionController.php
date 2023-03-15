<?php

declare(strict_types=1);
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

namespace OCA\Text\Controller;

use OCA\Text\Service\ApiService;
use OCA\Text\Service\NotificationService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;

class SessionController extends Controller {
	private ApiService $apiService;
	private SessionService $sessionService;
	private NotificationService $notificationService;
	private IUserManager $userManager;
	private IUserSession $userSession;

	private bool $restoreUser = false;
	private ?IUser $userToRestore = null;

	public function __construct(string $appName, IRequest $request, ApiService $apiService, SessionService $sessionService, NotificationService $notificationService, IUserManager $userManager, IUserSession $userSession) {
		parent::__construct($appName, $request);
		$this->apiService = $apiService;
		$this->sessionService = $sessionService;
		$this->notificationService = $notificationService;
		$this->userManager = $userManager;
		$this->userSession = $userSession;
	}

	/**
	 * @NoAdminRequired
	 */
	public function create(int $fileId = null, string $file = null): DataResponse {
		return $this->apiService->create($fileId, $file, null, null);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function close(int $documentId, int $sessionId, string $sessionToken): DataResponse {
		return $this->apiService->close($documentId, $sessionId, $sessionToken);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function push(int $documentId, int $sessionId, string $sessionToken, int $version, array $steps, string $awareness): DataResponse {
		try {
			$this->loginSessionUser($documentId, $sessionId, $sessionToken);
			return $this->apiService->push($documentId, $sessionId, $sessionToken, $version, $steps, $awareness);
		} finally {
			$this->restoreSessionUser();
		}
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function sync(int $documentId, int $sessionId, string $sessionToken, int $version = 0, string $autosaveContent = null, string $documentState = null, bool $force = false, bool $manualSave = false): DataResponse {
		try {
			$this->loginSessionUser($documentId, $sessionId, $sessionToken);
			return $this->apiService->sync($documentId, $sessionId, $sessionToken, $version, $autosaveContent, $documentState, $force, $manualSave);
		} finally {
			$this->restoreSessionUser();
		}
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * @UserRateThrottle(limit=5, period=120)
	 */
	public function mention(int $documentId, int $sessionId, string $sessionToken, string $mention): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], 403);
		}

		$currentSession = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);

		if ($currentSession->getUserId() === null && !$this->sessionService->isUserInDocument($documentId, $mention)) {
			return new DataResponse([], 403);
		}

		return new DataResponse($this->notificationService->mention($documentId, $mention));
	}

	private function loginSessionUser(int $documentId, int $sessionId, string $sessionToken) {
		$currentSession = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
		if ($currentSession !== false && !$this->userSession->isLoggedIn()) {
			$user = $this->userManager->get($currentSession->getUserId());
			if ($user !== null) {
				$this->restoreUser = true;
				$this->userToRestore = $this->userSession->getUser();
				$this->userSession->setUser($user);
			}
		}
	}

	private function restoreSessionUser(): void {
		if ($this->restoreUser) {
			$this->userSession->setUser($this->userToRestore);
		}
	}
}
