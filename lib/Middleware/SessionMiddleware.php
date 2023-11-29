<?php

namespace OCA\Text\Middleware;

use OC\User\NoUserException;
use OCA\Text\Controller\ISessionAwareController;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Middleware\Attribute\RequireDocumentSessionOrUserOrShareToken;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Middleware;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use ReflectionException;

class SessionMiddleware extends Middleware {

	public function __construct(
		private IRequest $request,
		private SessionService $sessionService,
		private DocumentService $documentService,
		private IUserSession $userSession,
		private IRootFolder $rootFolder,
		private ShareManager $shareManager,
	) {
	}

	/**
	 * @throws ReflectionException
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

		if (!empty($reflectionMethod->getAttributes(RequireDocumentSession::class))) {
			$this->assertDocumentSession($controller);
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
		} else {
			throw new InvalidSessionException();
		}

		$document = $this->documentService->getDocument($documentId);
		if (!$document) {
			throw new InvalidSessionException();
		}

		$controller->setDocument($document);
	}

	public function afterException($controller, $methodName, \Exception $exception): DataResponse|Response {
		if ($exception instanceof InvalidSessionException) {
			return new DataResponse([], 403);
		}

		return parent::afterException($controller, $methodName, $exception);
	}
}
