<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Context\ContextManager;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Middleware\Attribute\RequireDocumentBaseVersionEtag;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\NotificationService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\Attribute\UserRateLimit;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;

class SessionController extends ApiController implements ISessionAwareController {
	use TSessionAwareController;

	private bool $restoreUser = false;
	private ?IUser $userToRestore = null;

	public function __construct(
		string $appName,
		IRequest $request,
		private ApiService $apiService,
		private ContextManager $contextManager,
		private FileService $fileService,
		private SessionService $sessionService,
		private NotificationService $notificationService,
		private IUserManager $userManager,
		private IUserSession $userSession,
		private LoggerInterface $logger,
		private IL10N $l10n,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function create(string $type, int $id, ?string $baseVersionEtag = null): DataResponse {
		try {
			$user = $this->userSession->getUser();
			if ($user === null) {
				throw new NotFoundException('No user found.');
			}
			$context = $this->contextManager->getContext($type, $id, $user);
		} catch (NotFoundException|NotPermittedException $e) {
			$this->logger->error('No context for ' . $type . ' (' . $id . ') ', [ 'exception' => $e ]);
			return new DataResponse([
				'error' => $this->l10n->t('File not found')
			], Http::STATUS_NOT_FOUND);
		}

		return $this->apiService->create($context, $baseVersionEtag);
	}

	#[NoAdminRequired]
	#[PublicPage]
	public function close(int $documentId, int $sessionId, string $sessionToken): DataResponse {
		// We also want this to work with a session that has already been closed.
		// So we cannot rely on RequireDocumentSession to retrieve the user.
		$user = $this->userSession->getUser();
		if ($user === null) {
			throw new InvalidSessionException();
		}
		return $this->apiService->close($documentId, $sessionId, $sessionToken, $user);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function push(int $version, array $steps, string $awareness, ?int $recoveryAttempt = null): DataResponse {
		try {
			$this->loginSessionUser();
			return $this->apiService->push($this->getSession(), $this->getDocument(), $version, $steps, $awareness, $recoveryAttempt, $this->getUser());
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
			return $this->apiService->sync($this->getDocument(), $this->getUser(), $version);
		} finally {
			$this->restoreSessionUser();
		}
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function save(int $version, string $autosaveContent, string $documentState, bool $force = false, bool $manualSave = false): DataResponse {
		try {
			$this->loginSessionUser();
			return $this->apiService->save($this->getDocument(), $this->getUser(), $version, $autosaveContent, $documentState, $force, $manualSave);
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
