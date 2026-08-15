<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Context\FileContextFactory;
use OCA\Text\Context\IContext;
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
		private FileContextFactory $fileContextFactory,
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
	public function create(?int $fileId = null, ?string $baseVersionEtag = null): DataResponse {
		$type = 'file';
		$id = $fileId;
		$builders = [
			'file' => fn (int $id, string $_type): IContext => $this->fileContextFactory->buildForId($id),
		];
		if ($id === null) {
			return new DataResponse(['error' => 'No valid file argument provided'], Http::STATUS_PRECONDITION_FAILED);
		}

		try {
			$context = $builders[$type]($id, $type);
		} catch (NotFoundException|NotPermittedException $e) {
			$this->logger->error('No permission to access this file', [ 'exception' => $e ]);
			return new DataResponse([
				'error' => $this->l10n->t('File not found')
			], Http::STATUS_NOT_FOUND);
		}

		return $this->apiService->create($context, $baseVersionEtag);
	}

	#[NoAdminRequired]
	#[PublicPage]
	public function close(int $documentId, int $sessionId, string $sessionToken): DataResponse {
		$userId = $this->userSession->getUser()?->getUID();
		if ($userId === null) {
			throw new InvalidSessionException();
		}
		$file = $this->fileService->getFileById($documentId, $userId);
		return $this->apiService->close($documentId, $sessionId, $sessionToken, $file);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function push(int $version, array $steps, string $awareness, ?int $recoveryAttempt = null): DataResponse {
		try {
			$this->loginSessionUser();
			return $this->apiService->push($this->getSession(), $this->getDocument(), $version, $steps, $awareness, $recoveryAttempt);
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
	public function save(int $version, string $autosaveContent, string $documentState, bool $force = false, bool $manualSave = false): DataResponse {
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
