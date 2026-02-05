<?php

namespace OCA\Text\Tests;

use OCA\Text\Controller\ISessionAwareController;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Middleware\SessionMiddleware;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\IL10N;
use OCP\IRequest;
use OCP\ISession;
use OCP\IUserSession;
use OCP\Share\IManager;
use OCP\Share\IShare;
use Test\TestCase;

class SessionMiddlewareTest extends TestCase {
	private SessionMiddleware $middleware;
	private IRequest $request;
	private ISession $session;
	private IUserSession $userSession;
	private IRootFolder $rootFolder;
	private IManager $shareManager;

	protected function setUp(): void {
		parent::setUp();

		$this->request = $this->createMock(IRequest::class);
		$this->session = $this->createMock(ISession::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->shareManager = $this->createMock(IManager::class);

		$this->middleware = new SessionMiddleware(
			$this->request,
			$this->createMock(SessionService::class),
			$this->createMock(DocumentService::class),
			$this->session,
			$this->userSession,
			$this->rootFolder,
			$this->shareManager,
			$this->createMock(IL10N::class),
		);
	}

	public function testUnauthenticatedAccessBlocked(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createPasswordProtectedShare('42');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(null);

		$this->invokeMiddleware($share);
	}

	public function testAuthenticatedSingleIdAllowed(): void {
		$share = $this->createPasswordProtectedShare('42');
		$this->session->method('get')->with('public_link_authenticated')->willReturn('42');

		$this->invokeMiddleware($share);
		$this->assertTrue(true);
	}

	public function testAuthenticatedArrayAllowed(): void {
		$share = $this->createPasswordProtectedShare('42');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(['40', '42', '44']);

		$this->invokeMiddleware($share);
		$this->assertTrue(true);
	}

	public function testWrongSingleIdBlocked(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createPasswordProtectedShare('42');
		$this->session->method('get')->with('public_link_authenticated')->willReturn('99');

		$this->invokeMiddleware($share);
	}

	public function testWrongArrayBlocked(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createPasswordProtectedShare('42');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(['10', '20', '30']);

		$this->invokeMiddleware($share);
	}

	private function createPasswordProtectedShare(string $id): IShare {
		$share = $this->createMock(IShare::class);
		$share->method('getId')->willReturn($id);
		$share->method('getPassword')->willReturn('password');
		$share->method('getPermissions')->willReturn(\OCP\Constants::PERMISSION_READ);
		$share->method('getShareOwner')->willReturn('owner');
		$share->method('getAttributes')->willReturn(null);
		return $share;
	}

	private function invokeMiddleware(IShare $share): void {
		$this->request->method('getParam')->willReturnMap([
			['documentId', null, 999],
			['shareToken', null, 'token'],
		]);
		$this->userSession->method('getUser')->willReturn(null);
		$this->shareManager->method('getShareByToken')->willReturn($share);

		$folder = $this->createMock(Folder::class);
		$folder->method('getFirstNodeById')->willReturn($this->createMock(\OCP\Files\File::class));
		$this->rootFolder->method('getUserFolder')->willReturn($folder);

		$controller = $this->createMock(ISessionAwareController::class);
		self::invokePrivate($this->middleware, 'assertUserOrShareToken', [$controller]);
	}
}
