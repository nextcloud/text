<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\Controller;

use OCA\Text\Controller\WorkspaceController;
use OCA\Text\Service\FileService;
use OCA\Text\Service\WorkspaceService;
use OCP\AppFramework\Http;
use OCP\Constants;
use OCP\DirectEditing\IManager as IDirectEditingManager;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class WorkspaceControllerTest extends TestCase {
	private ShareManager&MockObject $shareManager;
	private WorkspaceService&MockObject $workspaceService;
	private FileService&MockObject $fileService;
	private WorkspaceController $controller;

	protected function setUp(): void {
		$this->shareManager = $this->createMock(ShareManager::class);
		$this->workspaceService = $this->createMock(WorkspaceService::class);
		$this->fileService = $this->createMock(FileService::class);
		$this->controller = new WorkspaceController(
			'text',
			$this->createMock(IRequest::class),
			$this->createMock(IRootFolder::class),
			$this->shareManager,
			$this->createMock(IDirectEditingManager::class),
			$this->createMock(IURLGenerator::class),
			$this->workspaceService,
			$this->createMock(IEventDispatcher::class),
			$this->createMock(LoggerInterface::class),
			$this->fileService,
			null,
		);
	}

	public function testPublicFolderForAuthenticatedPasswordShare(): void {
		$share = $this->createPasswordShare();
		$this->fileService->method('isShareAuthenticated')->with($share)->willReturn(true);
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(42);
		$file->method('getName')->willReturn('Readme.md');
		$this->workspaceService->method('getFile')->willReturn($file);

		$response = $this->controller->publicFolder('token');

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
		$this->assertSame(42, $response->getData()['file']['id']);
	}

	public function testPublicFolderForUnauthenticatedPasswordShare(): void {
		$share = $this->createPasswordShare();
		$this->fileService->method('isShareAuthenticated')->with($share)->willReturn(false);
		$this->workspaceService->expects($this->never())->method('getFile');

		$response = $this->controller->publicFolder('token');

		$this->assertSame(Http::STATUS_NOT_FOUND, $response->getStatus());
	}

	private function createPasswordShare(): IShare {
		$share = $this->createMock(IShare::class);
		$share->method('getPassword')->willReturn('hash');
		$share->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$folder = $this->createMock(Folder::class);
		$folder->method('get')->willReturn($folder);
		$share->method('getNode')->willReturn($folder);
		$this->shareManager->method('getShareByToken')->with('token')->willReturn($share);
		return $share;
	}
}
