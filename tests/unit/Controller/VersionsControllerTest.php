<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Service\VersionAccessService;
use OCP\AppFramework\Http;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class VersionsControllerTest extends TestCase {
	private VersionAccessService&MockObject $versionAccessService;
	private IUserSession&MockObject $userSession;
	private VersionsController $controller;

	protected function setUp(): void {
		parent::setUp();
		$this->versionAccessService = $this->createMock(VersionAccessService::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->controller = new VersionsController(
			'text',
			$this->createMock(IRequest::class),
			$this->versionAccessService,
			$this->createMock(IRootFolder::class),
			$this->userSession,
		);
	}

	private function signIn(): IUser {
		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('alice');
		$this->userSession->method('getUser')->willReturn($user);
		return $user;
	}

	public function testAnswersNotFoundForAFileTheUserCannotCompare(): void {
		$this->signIn();
		$this->versionAccessService->method('resolveFile')->willThrowException(new NotFoundException());
		$this->versionAccessService->expects($this->never())->method('listVersions');

		$response = $this->controller->index(42);

		$this->assertSame(Http::STATUS_NOT_FOUND, $response->getStatus());
		$this->assertSame([], $response->getData());
	}

	public function testAnswersNotFoundWithoutAUser(): void {
		$this->versionAccessService->expects($this->never())->method('resolveFile');

		$this->assertSame(Http::STATUS_NOT_FOUND, $this->controller->index(42)->getStatus());
	}
}
