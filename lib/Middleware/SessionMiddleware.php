<?php

namespace OCA\Text\Middleware;

use OCA\Text\Controller\ASessionAwareController;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use ReflectionException;

class SessionMiddleware extends \OCP\AppFramework\Middleware {

	public function __construct(
		private IRequest $request,
		private SessionService $sessionService,
	) {
	}

	/**
	 * @throws ReflectionException
	 * @throws InvalidSessionException
	 */
	public function beforeController(Controller $controller, string $methodName) {
		if (!$controller instanceof ASessionAwareController) {
			return;
		}

		$reflectionMethod = new \ReflectionMethod($controller, $methodName);

		if (!empty($reflectionMethod->getAttributes(RequireDocumentSession::class))) {
			$this->assertDocumentSession($controller);
		}
	}

	private function assertDocumentSession(ASessionAwareController $controller): void {
		$documentId = (int)$this->request->getParam('documentId');
		$sessionId = (int)$this->request->getParam('sessionId');
		$token = (string)$this->request->getParam('sessionToken');

		$session = $this->sessionService->getValidSession($documentId, $sessionId, $token);
		if (!$session) {
			throw new InvalidSessionException();
		}

		$controller->setSession($session);
	}

	public function afterException($controller, $methodName, \Exception $exception) {
		if ($exception instanceof InvalidSessionException) {
			return new DataResponse([], 403);
		}

		return parent::afterException($controller, $methodName, $exception);
	}
}
