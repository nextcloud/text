<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Model\VersionEnd;
use OCA\Text\Service\VersionAccessService;
use OCP\AppFramework\Http;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class VersionsControllerTest extends TestCase {
	private VersionAccessService&MockObject $versionAccessService;
	private IUserSession&MockObject $userSession;
	private IRootFolder&MockObject $rootFolder;
	private VersionsController $controller;

	protected function setUp(): void {
		parent::setUp();
		$this->versionAccessService = $this->createMock(VersionAccessService::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->controller = new VersionsController(
			'text',
			$this->createMock(IRequest::class),
			$this->versionAccessService,
			$this->rootFolder,
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

	public function testAnswersNotFoundWhenTheVersionsBackendCannotFindTheFile(): void {
		$this->signIn();
		$this->versionAccessService->method('resolveFile')->willReturn($this->createMock(File::class));
		$this->versionAccessService->method('listVersions')->willThrowException(new NotFoundException('No owner'));

		$this->assertSame(Http::STATUS_NOT_FOUND, $this->controller->index(42)->getStatus());
	}

	public function testListsTheVersionsWithThePathOfTheFile(): void {
		$user = $this->signIn();
		$file = $this->createMock(File::class);
		$file->method('getPath')->willReturn('/alice/files/Notes/plan.md');
		$userFolder = $this->createMock(IUserFolder::class);
		$userFolder->method('getRelativePath')->with('/alice/files/Notes/plan.md')->willReturn('/Notes/plan.md');
		$this->rootFolder->method('getUserFolder')->with('alice')->willReturn($userFolder);
		$versions = [new VersionEnd('current', 2000, 30, '', 'alice', 'Alice', null), new VersionEnd('1000', 1000, 20, 'Draft', 'bob', 'Bob', null)];
		$this->versionAccessService->method('resolveFile')->with($user, 42)->willReturn($file);
		$this->versionAccessService->method('listVersions')->with($user, $file)->willReturn($versions);
		$this->versionAccessService->method('hasVersions')->willReturn(true);

		$response = $this->controller->index(42);

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
		$this->assertSame(['fileId' => 42, 'path' => '/Notes/plan.md', 'versions' => $versions, 'versionsAvailable' => true], $response->getData());
	}

	public function testAnswersNotFoundWithoutAUser(): void {
		$this->versionAccessService->expects($this->never())->method('resolveFile');

		$this->assertSame(Http::STATUS_NOT_FOUND, $this->controller->index(42)->getStatus());
	}
}
