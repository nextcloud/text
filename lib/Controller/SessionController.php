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

use OCA\Text\Middleware\Attribute\RequireDocumentBaseVersionEtag;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\NotificationService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\Attribute\UserRateLimit;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;

class SessionController extends ApiController implements ISessionAwareController {
	use TSessionAwareController;

	private bool $restoreUser = false;
	private ?IUser $userToRestore = null;

	public function __construct(
		string $appName,
		IRequest $request,
		private ApiService $apiService,
		private SessionService $sessionService,
		private NotificationService $notificationService,
		private IUserManager $userManager,
		private IUserSession $userSession) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function create(?int $fileId = null, ?string $file = null, ?string $baseVersionEtag = null): DataResponse {
		return $this->apiService->create($fileId, $file, $baseVersionEtag, null, null);
	}

	#[NoAdminRequired]
	#[PublicPage]
	public function close(int $documentId, int $sessionId, string $sessionToken): DataResponse {
		return $this->apiService->close($documentId, $sessionId, $sessionToken);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function push(int $version, array $steps, string $awareness): DataResponse {
		try {
			$this->loginSessionUser();
			return $this->apiService->push($this->getSession(), $this->getDocument(), $version, $steps, $awareness);
		} finally {
			$this->restoreSessionUser();
		}
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function sync(int $version = 0): DataResponse {
		try {
			$this->loginSessionUser();
			return $this->apiService->sync($this->getSession(), $this->getDocument(), $version);
		} finally {
			$this->restoreSessionUser();
		}
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function save(int $version = 0, string $autosaveContent = null, string $documentState = null, bool $force = false, bool $manualSave = false): DataResponse {
		try {
			$this->loginSessionUser();
			return $this->apiService->save($this->getSession(), $this->getDocument(), $version, $autosaveContent, $documentState, $force, $manualSave);
		} finally {
			$this->restoreSessionUser();
		}
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentSession]
	#[UserRateLimit(limit: 5, period: 120)]
	public function mention(string $mention): DataResponse {
		if ($this->getSession()->isGuest() && !$this->sessionService->isUserInDocument($this->getDocument()->getId(), $mention)) {
			return new DataResponse([], 403);
		}

		return new DataResponse($this->notificationService->mention($this->getDocument()->getId(), $mention));
	}

	private function loginSessionUser(): void {
		$currentSession = $this->getSession();
		if (!$this->userSession->isLoggedIn()) {
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
