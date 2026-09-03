<?php

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Middleware;

use OC\User\NoUserException;
use OCA\Text\Controller\ISessionAwareController;
use OCA\Text\Exception\AccountDisabledException;
use OCA\Text\Exception\InvalidDocumentBaseVersionEtagException;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Middleware\Attribute\RequireDocumentBaseVersionEtag;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Middleware\Attribute\RequireDocumentSessionOrUserOrShareToken;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Middleware;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\IUserSession;
use ReflectionException;

class SessionMiddleware extends Middleware {

	public function __construct(
		private readonly IRequest $request,
		private readonly SessionService $sessionService,
		private readonly DocumentService $documentService,
		private readonly IUserSession $userSession,
		private readonly IL10N $l10n,
		private readonly IUserManager $userManager,
		private readonly FileService $fileService,
	) {
	}

	/**
	 * @throws ReflectionException
	 * @throws InvalidDocumentBaseVersionEtagException
	 * @throws InvalidSessionException
	 * @throws AccountDisabledException
	 */
	public function beforeController(Controller $controller, string $methodName): void {
		if (!$controller instanceof ISessionAwareController) {
			return;
		}

		$reflectionMethod = new \ReflectionMethod($controller, $methodName);

		if (!empty($reflectionMethod->getAttributes(RequireDocumentSessionOrUserOrShareToken::class))) {
			try {
				$this->assertDocumentSession($controller);
			} catch (InvalidSessionException) {
				$this->assertUserOrShareToken($controller);
			}
		}

		if (!empty($reflectionMethod->getAttributes(RequireDocumentBaseVersionEtag::class))) {
			$this->assertDocumentBaseVersionEtag();
		}

		if (!empty($reflectionMethod->getAttributes(RequireDocumentSession::class))) {
			$this->assertDocumentSession($controller);
		}
	}

	/**
	 * @throws InvalidDocumentBaseVersionEtagException
	 */
	private function assertDocumentBaseVersionEtag(): void {
		$documentId = (int)$this->request->getParam('documentId');
		$baseVersionEtag = $this->request->getParam('baseVersionEtag');

		$document = $this->documentService->getDocument($documentId);
		if ($baseVersionEtag && $document?->getBaseVersionEtag() !== $baseVersionEtag) {
			throw new InvalidDocumentBaseVersionEtagException();
		}
	}

	/**
	 * @throws InvalidSessionException
	 * @throws AccountDisabledException
	 */
	private function assertDocumentSession(ISessionAwareController $controller): void {
		$documentId = (int)$this->request->getParam('documentId');
		$sessionId = (int)$this->request->getParam('sessionId');
		$token = (string)$this->request->getParam('sessionToken');

		$session = $this->sessionService->getValidSession($documentId, $sessionId, $token);
		if (!$session) {
			throw new InvalidSessionException();
		}

		if (!$session->isGuest()) {
			$user = $this->userManager->get($session->getUserId());
			if ($user === null || !$user->isEnabled()) {
				throw new AccountDisabledException();
			}
			$controller->setUser($user);
		}

		$document = $this->documentService->getDocument($documentId);
		if (!$document) {
			throw new InvalidSessionException();
		}

		$controller->setSession($session);
		$controller->setDocumentId($documentId);
		$controller->setDocument($document);
	}

	/**
	 * @throws NotPermittedException
	 * @throws NoUserException
	 * @throws InvalidSessionException
	 */
	private function assertUserOrShareToken(ISessionAwareController $controller): void {
		$documentId = (int)$this->request->getParam('documentId');
		$shareToken = (string)$this->request->getParam('shareToken');
		$user = $this->userSession->getUser();

		$document = $this->documentService->getDocument($documentId);
		if (!$document || $document->getContextType() !== 'file') {
			throw new InvalidSessionException();
		}
		$fileId = $document->getContextId();

		if ($shareToken !== '') {
			$this->fileService->checkFileAccessFromShare($fileId, $shareToken);
			$controller->setDocumentId($documentId);
			return;
		}

		if ($user !== null) {
			$this->fileService->checkFileAccessForUser($fileId, $user->getUID());
			$controller->setUser($user);
			$controller->setDocumentId($documentId);
			return;
		}

		throw new InvalidSessionException();
	}

	public function afterException($controller, $methodName, \Exception $exception): JSONResponse|Response {
		if ($exception instanceof InvalidDocumentBaseVersionEtagException) {
			return new JSONResponse(['error' => $this->l10n->t('Editing session has expired. Please reload the page.')], Http::STATUS_PRECONDITION_FAILED);
		}

		if ($exception instanceof AccountDisabledException) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if ($exception instanceof InvalidSessionException) {
			return new JSONResponse([], 403);
		}

		return parent::afterException($controller, $methodName, $exception);
	}
}
