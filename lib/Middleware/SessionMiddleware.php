<?php

namespace OCA\Text\Middleware;

use OC\User\NoUserException;
use OCA\Text\Controller\ISessionAwareController;
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
use OCP\Constants;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\ISession;
use OCP\IUserSession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use ReflectionException;

class SessionMiddleware extends Middleware {

	public function __construct(
		private IRequest $request,
		private SessionService $sessionService,
		private DocumentService $documentService,
		private ISession $session,
		private IUserSession $userSession,
		private IRootFolder $rootFolder,
		private ShareManager $shareManager,
		private IL10N $l10n,
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
	 */
	private function assertDocumentSession(ISessionAwareController $controller): void {
		$documentId = (int)$this->request->getParam('documentId');
		$sessionId = (int)$this->request->getParam('sessionId');
		$token = (string)$this->request->getParam('sessionToken');
		$shareToken = (string)$this->request->getParam('token');

		$session = $this->sessionService->getValidSession($documentId, $sessionId, $token);
		if (!$session) {
			throw new InvalidSessionException();
		}

		$document = $this->documentService->getDocument($documentId);
		if (!$document) {
			throw new InvalidSessionException();
		}

		$controller->setSession($session);
		$controller->setDocumentId($documentId);
		$controller->setDocument($document);
		if (!$shareToken) {
			$controller->setUserId($session->getUserId());
		}
	}

	/**
	 * @throws NotPermittedException
	 * @throws NoUserException
	 * @throws InvalidSessionException
	 */
	private function assertUserOrShareToken(ISessionAwareController $controller): void {
		$documentId = (int)$this->request->getParam('documentId');
		if (null !== $userId = $this->userSession->getUser()?->getUID()) {
			// Check if user has access to document
			if (count($this->rootFolder->getUserFolder($userId)->getById($documentId)) === 0) {
				throw new InvalidSessionException();
			}
			$controller->setUserId($userId);
		} elseif ('' !== $shareToken = (string)$this->request->getParam('shareToken')) {
			try {
				$share = $this->shareManager->getShareByToken($shareToken);
			} catch (ShareNotFound) {
				throw new InvalidSessionException();
			}

			// Check if shareToken has access to document
			if (count($this->rootFolder->getUserFolder($share->getShareOwner())->getById($documentId)) === 0) {
				throw new InvalidSessionException();
			}

			/** @psalm-suppress RedundantConditionGivenDocblockType */
			if ($share->getPassword() !== null) {
				$shareId = $this->session->get('public_link_authenticated');
				if ($share->getId() !== $shareId) {
					throw new InvalidSessionException();
				}
			}

			if (($share->getPermissions() & Constants::PERMISSION_READ) !== Constants::PERMISSION_READ) {
				throw new InvalidSessionException();
			}

			$attributes = $share->getAttributes();
			if ($attributes !== null && $attributes->getAttribute('permissions', 'download') === false) {
				throw new InvalidSessionException();
			}
		} else {
			throw new InvalidSessionException();
		}

		$controller->setDocumentId($documentId);
	}

	public function afterException($controller, $methodName, \Exception $exception): JSONResponse|Response {
		if ($exception instanceof InvalidDocumentBaseVersionEtagException) {
			return new JSONResponse(['error' => $this->l10n->t('Editing session has expired. Please reload the page.')], Http::STATUS_PRECONDITION_FAILED);
		}

		if ($exception instanceof InvalidSessionException) {
			return new JSONResponse([], 403);
		}

		return parent::afterException($controller, $methodName, $exception);
	}
}
