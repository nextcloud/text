<?php

namespace OCA\Text\Controller;

use OCA\Text\Db\Session;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Http\DataResponse;
use OCP\Collaboration\Collaborators\ISearch;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\IUserSession;
use Test\TestCase;

class UserApiControllerTest extends TestCase {
	/**
	 * @var \PHPUnit\Framework\MockObject\MockObject
	 */
	private $collaboratorSearch;
	/**
	 * @var \PHPUnit\Framework\MockObject\MockObject
	 */
	private $userSession;
	/**
	 * @var \PHPUnit\Framework\MockObject\MockObject
	 */
	private $userManager;
	/**
	 * @var \PHPUnit\Framework\MockObject\MockObject
	 */
	private $sessionService;
	/**
	 * @var UserApiController
	 */
	private $userApiController;
	/**
	 * @var IRequest|\PHPUnit\Framework\MockObject\MockObject
	 */
	private $request;

	protected function setUp(): void {
		parent::setUp();
		$this->request = $this->createMock(IRequest::class);
		$this->collaboratorSearch = $this->createMock(ISearch::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->userApiController = new UserApiController(
			'text',
			$this->request,
			$this->sessionService,
			$this->collaboratorSearch,
			$this->userManager,
			$this->userSession
		);

		$session = new Session();
		$session->setUserId('admin');
		$this->userApiController->setSession($session);
	}

	/**
	 * @dataProvider dataTestUsersIndex
	 */
	public function testUsersIndex(int $documentId, int $sessionId, string $sessionToken, string $filter) {
		$this->sessionService
			->expects($this->once())
			->method('getAllSessions')->willReturn([[
				'userId' => 'admin',
				'displayName' => 'admin',
			]]);
		$this->userManager->expects($this->once())
			->method('getDisplayName')
			->willReturn('Administrator');
		$this->collaboratorSearch
			->expects($this->once())
			->method('search')->willReturn([
				[
					'exact' => [
						'users' => []
					],
					'users' => [
						[
							'label' => 'admin',
							'subline' => '',
							'icon' => 'icon-user',
							'value' => [
								'shareType' => 0,
								'shareWith' => 'admin'
							],
							'shareWithDisplayNameUnique' => 'admin',
							'status' => []
						],
					]
				]
			]);

		$response = $this->userApiController->index(
			$filter
		);
		$this->assertInstanceOf(DataResponse::class, $response);
		$this->assertIsArray($response->getData());
		$this->assertSame(['admin' => 'admin'], $response->getData());
	}

	public function dataTestUsersIndex() {
		return [
			[103, 44, 'token1', 'admin'],
			[103, 44, 'token2', 'admin'],
			[103, 44, 'token3', 'admin'],
		];
	}
}
