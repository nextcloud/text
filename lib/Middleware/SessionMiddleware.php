<?php

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Middleware;

use Exception;
use OC\User\NoUserException;
use OCA\Text\Controller\ISessionAwareController;
use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Exception\InvalidDocumentBaseVersionEtagException;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Middleware\Attribute\RequireDocumentBaseVersionEtag;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Middleware\Attribute\RequireDocumentSessionOrUserOrShareToken;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Middleware;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use ReflectionException;
use ReflectionMethod;

class SessionMiddleware extends Middleware {
	public function __construct(
		private IRequest        $request,
		private SessionService  $sessionService,
		private DocumentService $documentService,
		private IUserSession    $userSession,
		private IRootFolder     $rootFolder,
		private ShareManager    $shareManager,
		private IL10N           $l10n,
		private ?Document       $document = null,
		private ?Session        $session = null,
		private ?string         $userId = null,
	) {
	}

	/**
	 * @throws ReflectionException
	 * @throws InvalidDocumentBaseVersionEtagException
	 * @throws InvalidSessionException
	 */
	public function beforeController(Controller $controller, string $methodName): void {
		if (!$controller instanceof ISessionAwareController) {
			return;
		}

		//ASSERTION
		$documentId = $this->getDocumentId();
		$this->document = $this->documentService->getDocument($documentId);

		$reflectionMethod = new ReflectionMethod($controller, $methodName);
		$requiresDocumentBaseVersionEtag = !empty($reflectionMethod->getAttributes(RequireDocumentBaseVersionEtag::class));

		if ($requiresDocumentBaseVersionEtag) {
			$this->assertDocumentBaseVersionEtag();
		}

		$requiresDocumentSession = !empty($reflectionMethod->getAttributes(RequireDocumentSession::class));
		$requiresDocumentSessionOrUserOrShareToken = !empty($reflectionMethod->getAttributes(RequireDocumentSessionOrUserOrShareToken::class));

		if (!$requiresDocumentSession && !$requiresDocumentSessionOrUserOrShareToken) {
			return;
		}

		$this->session = $this->sessionService->getValidSession($documentId, $this->getSessionId(), $this->getSessionToken());

		try {
			$this->assertDocumentSession();

			if (!$this->getToken()) {
				$this->userId = $this->session->getUserId();
			}
		} catch (InvalidSessionException) {
			if (!$requiresDocumentSessionOrUserOrShareToken) {
				throw new InvalidSessionException();
			}

			$this->assertUserOrShareToken();
		}

		//OTHERS
		$this->setControllerData($controller);
	}

	public function afterException($controller, $methodName, Exception $exception): JSONResponse|Response {
		if ($exception instanceof InvalidDocumentBaseVersionEtagException) {
			return new JSONResponse(['error' => $this->l10n->t('Editing session has expired. Please reload the page.')], Http::STATUS_PRECONDITION_FAILED);
		}

		if ($exception instanceof InvalidSessionException) {
			return new JSONResponse([], 403);
		}

		return parent::afterException($controller, $methodName, $exception);
	}

	/**
	 * @throws InvalidDocumentBaseVersionEtagException
	 */
	private function assertDocumentBaseVersionEtag(): void {
		$baseVersionEtag = $this->getBaseVersionEtag();

		if ($baseVersionEtag && $this->document?->getBaseVersionEtag() !== $baseVersionEtag) {
			throw new InvalidDocumentBaseVersionEtagException();
		}
	}

	/**
	 * @throws InvalidSessionException
	 */
	private function assertDocumentSession(): void {
		if (!$this->document || !$this->session) {
			throw new InvalidSessionException();
		}
	}


	/**
	 * @throws InvalidSessionException
	 */
	private function assertUserOrShareToken(): void {
		if (!$this->document) {
			throw new InvalidSessionException();
		}

		$documentId = $this->getDocumentId();

		if (null !== ($userId = $this->getSessionUserId())) {
			$this->assertUserHasAccessToDocument($userId, $documentId);

			$this->userId = $userId;

			return;
		}

		if (null !== ($shareToken = $this->getShareToken())) {
			$this->assertShareTokenHasAccessToDocument($shareToken, $documentId);

			return;
		}

		throw new InvalidSessionException();
	}

	/**
	 * @throws InvalidSessionException
	 */
	private function assertUserHasAccessToDocument(string $userId, int $documentId): void {
		try {
			$userFolder = $this->getUserFolder($userId);
		} catch (NoUserException|NotPermittedException) {
			throw new InvalidSessionException();
		}

		if (count($userFolder->getById($documentId)) === 0) {
			throw new InvalidSessionException();
		}
	}

	/**
	 * @throws InvalidSessionException
	 */
	private function assertShareTokenHasAccessToDocument(string $shareToken, int $documentId): void {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound) {
			throw new InvalidSessionException();
		}

		try {
			$userFolder = $this->getUserFolder($share->getShareOwner());
		} catch (NoUserException|NotPermittedException) {
			throw new InvalidSessionException();
		}

		if (count($userFolder->getById($documentId)) === 0) {
			throw new InvalidSessionException();
		}
	}

	private function getDocumentId(): int {
		return (int)$this->request->getParam('documentId');
	}

	private function getSessionId(): int {
		return (int)$this->request->getParam('sessionId');
	}

	private function getSessionToken(): string {
		return (string)$this->request->getParam('sessionToken');
	}

	private function getToken(): string {
		return (string)$this->request->getParam('token');
	}

	private function getShareToken(): ?string {
		return $this->request->getParam('shareToken');
	}

	private function getBaseVersionEtag(): string {
		return (string)$this->request->getParam('baseVersionEtag');
	}

	private function getSessionUserId(): ?string {
		return $this->userSession->getUser()?->getUID();
	}

	/**
	 * @throws NotPermittedException
	 * @throws NoUserException
	 */
	private function getUserFolder(string $userId): Folder {
		return $this->rootFolder->getUserFolder($userId);
	}

	private function setControllerData(ISessionAwareController $controller): void {
		if ($this->document) {
			$controller->setDocument($this->document);
		}
		if ($this->session) {
			$controller->setSession($this->session);
		}
		if ($this->userId !== null) {
			$controller->setUserId($this->userId);
		}
	}
}
