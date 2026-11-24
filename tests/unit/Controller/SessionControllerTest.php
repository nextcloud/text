<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Context\ContextManager;
use OCA\Text\Db\Session;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\NotificationService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;

class SessionControllerTest extends \PHPUnit\Framework\TestCase {
	private ApiService&MockObject $apiService;
	private SessionService&MockObject $sessionService;
	private IUserManager&MockObject $userManager;
	private IUserSession&MockObject $userSession;
	private SessionController $controller;

	public function setUp(): void {
		$this->apiService = $this->createMock(ApiService::class);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->controller = new SessionController(
			'text',
			$this->createMock(IRequest::class),
			$this->apiService,
			$this->createMock(ContextManager::class),
			$this->createMock(FileService::class),
			$this->sessionService,
			$this->createMock(NotificationService::class),
			$this->userManager,
			$this->userSession,
			$this->createMock(LoggerInterface::class),
			$this->createMock(IL10N::class),
		);
	}

	public function testCloseOfClosedSessionSucceeds(): void {
		$this->userSession->method('getUser')->willReturn(null);
		$this->sessionService->method('getSession')->with('111', 1, 'token')->willReturn(null);
		$this->apiService->expects(self::never())->method('close');

		$response = $this->controller->close('111', 1, 'token');

		self::assertSame(Http::STATUS_OK, $response->getStatus());
	}

	public function testCloseAsUserOfSession(): void {
		$this->userSession->method('getUser')->willReturn(null);
		$this->sessionService->method('getSession')->willReturn(Session::fromParams(['userId' => 'alice']));
		$user = $this->createMock(IUser::class);
		$user->method('isEnabled')->willReturn(true);
		$this->userManager->method('get')->with('alice')->willReturn($user);
		$response = new DataResponse([]);
		$this->apiService->expects(self::once())
			->method('close')->with('111', 1, 'token', $user)
			->willReturn($response);

		self::assertSame($response, $this->controller->close('111', 1, 'token'));
	}
}
