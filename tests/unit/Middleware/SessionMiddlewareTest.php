<?php

namespace OCA\Text\Tests;

use OCA\Text\Controller\ISessionAwareController;
use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Exception\AccountDisabledException;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Middleware\SessionMiddleware;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use Test\TestCase;

class SessionMiddlewareTest extends TestCase {
	private SessionMiddleware $middleware;
	private IRequest $request;
	private SessionService $sessionService;
	private DocumentService $documentService;
	private IUserSession $userSession;
	private IUserManager $userManager;
	private FileService $fileService;

	protected function setUp(): void {
		parent::setUp();

		$this->request = $this->createMock(IRequest::class);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->documentService = $this->createMock(DocumentService::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->fileService = $this->createMock(FileService::class);

		$this->middleware = new SessionMiddleware(
			$this->request,
			$this->sessionService,
			$this->documentService,
			$this->userSession,
			$this->createMock(IL10N::class),
			$this->userManager,
			$this->fileService,
		);
	}

	public function testUnauthenticatedAccessBlocked(): void {
		$this->expectException(InvalidSessionException::class);

		$this->fileService->method('getDocumentIdFromShare')->with(999, 'token')->willThrowException(new InvalidSessionException());

		$this->invokeMiddleware('token');
	}

	public function testAuthenticatedSingleIdAllowed(): void {
		$this->fileService->method('getDocumentIdFromShare')->with(999, 'token')->willReturn(999);

		$this->invokeMiddleware('token');
		$this->assertTrue(true);
	}

	public function testLoggedInUserWithValidToken(): void {
		$this->fileService->method('getDocumentIdFromShare')->with(999, 'token')->willReturn(999);

		$controller = $this->createMock(ISessionAwareController::class);
		$controller->expects($this->never())->method('setUserId');
		$controller->expects($this->once())->method('setDocumentId');

		$this->invokeMiddleware('token', 'user1', $controller);
	}

	public function testLoggedInUserWithOwnFile(): void {
		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('user1');

		$this->fileService->method('getDocumentIdForUser')->with(999, 'user1')->willReturn(999);

		$controller = $this->createMock(ISessionAwareController::class);
		$controller->expects($this->once())->method('setUserId');
		$controller->expects($this->once())->method('setDocumentId');

		$this->invokeMiddleware(null, 'user1', $controller);
	}

	public function testLoggedInUserMissingFile(): void {
		$this->expectException(InvalidSessionException::class);

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('user1');

		$this->fileService->method('getDocumentIdForUser')->with(999, 'user1')->willThrowException(new InvalidSessionException());

		$this->invokeMiddleware(null, 'user1');
	}

	public function testLoggedInUserWithValidTokenMissingPassword(): void {
		$this->expectException(InvalidSessionException::class);

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('user1');

		$this->fileService->method('getDocumentIdFromShare')->with(999, 'token')->willThrowException(new InvalidSessionException());

		$this->invokeMiddleware('token', 'user1');
	}

	public function testDocumentSessionWithEnabledUserAllowed(): void {
		$session = new Session();
		$session->setUserId('alice');

		$user = $this->createMock(IUser::class);
		$user->method('isEnabled')->willReturn(true);

		$this->sessionService->method('getValidSession')->willReturn($session);
		$this->userManager->method('get')->with('alice')->willReturn($user);
		$this->documentService->method('getDocument')->willReturn($this->createMock(Document::class));

		$controller = $this->createMock(ISessionAwareController::class);
		$controller->expects($this->once())->method('setUserId')->with('alice');

		$this->invokeAssertDocumentSession($controller);
		$this->assertTrue(true);
	}

	public function testDocumentSessionWithDisabledUserBlocked(): void {
		$this->expectException(AccountDisabledException::class);

		$session = new Session();
		$session->setUserId('alice');

		$user = $this->createMock(IUser::class);
		$user->method('isEnabled')->willReturn(false);

		$this->sessionService->method('getValidSession')->willReturn($session);
		$this->userManager->method('get')->with('alice')->willReturn($user);

		$controller = $this->createMock(ISessionAwareController::class);
		$controller->expects($this->never())->method('setUserId');

		$this->invokeAssertDocumentSession($controller);
	}

	public function testDocumentSessionWithNonexistentUserBlocked(): void {
		$this->expectException(AccountDisabledException::class);

		$session = new Session();
		$session->setUserId('alice');

		$this->sessionService->method('getValidSession')->willReturn($session);
		$this->userManager->method('get')->with('alice')->willReturn(null);

		$controller = $this->createMock(ISessionAwareController::class);
		$controller->expects($this->never())->method('setUserId');

		$this->invokeAssertDocumentSession($controller);
	}

	public function testDocumentSessionGuestSessionSkipsUserCheck(): void {
		$session = new Session();

		$this->sessionService->method('getValidSession')->willReturn($session);
		$this->userManager->expects($this->never())->method('get');
		$this->documentService->method('getDocument')->willReturn($this->createMock(Document::class));

		$controller = $this->createMock(ISessionAwareController::class);

		$this->invokeAssertDocumentSession($controller, 'shareToken123');
		$this->assertTrue(true);
	}

	public function testAfterExceptionMapsAccountDisabledToForbidden(): void {
		$controller = $this->createMock(ISessionAwareController::class);

		$response = $this->middleware->afterException($controller, 'push', new AccountDisabledException());

		$this->assertInstanceOf(JSONResponse::class, $response);
		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	private function invokeAssertDocumentSession(ISessionAwareController $controller, ?string $shareToken = null): void {
		$this->request->method('getParam')->willReturnMap([
			['documentId', null, 999],
			['sessionId', null, 1],
			['sessionToken', null, 'sessionToken'],
			['token', null, $shareToken],
		]);

		self::invokePrivate($this->middleware, 'assertDocumentSession', [$controller]);
	}

	private function invokeMiddleware(?string $token, ?string $userName = null, ?ISessionAwareController $controller = null): void {
		$this->request->method('getParam')->willReturnMap([
			['documentId', null, 999],
			['shareToken', null, $token],
		]);

		$user = null;
		if ($userName !== null) {
			$user = $this->createMock(IUser::class);
			$user->method('getUID')->willReturn('user1');
		}
		$this->userSession->method('getUser')->willReturn($user);

		$controller ??= $this->createMock(ISessionAwareController::class);
		self::invokePrivate($this->middleware, 'assertUserOrShareToken', [$controller]);
	}
}
