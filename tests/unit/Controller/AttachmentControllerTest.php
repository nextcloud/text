<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\Controller;

use OCA\Text\Context\ContextManager;
use OCA\Text\Controller\AttachmentController;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\FileService;
use OCP\AppFramework\Http;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\FilesMetadata\IFilesMetadataManager;
use OCP\IL10N;
use OCP\IPreview;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class AttachmentControllerTest extends TestCase {
	private IRequest&MockObject $request;
	private ShareManager&MockObject $shareManager;
	private ContextManager&MockObject $contextManager;
	private FileService&MockObject $fileService;
	private AttachmentController $controller;

	protected function setUp(): void {
		$this->request = $this->createMock(IRequest::class);
		$this->shareManager = $this->createMock(ShareManager::class);
		$this->contextManager = $this->createMock(ContextManager::class);
		$this->fileService = $this->createMock(FileService::class);
		$this->controller = new AttachmentController(
			'text',
			$this->request,
			$this->createMock(IL10N::class),
			$this->createMock(LoggerInterface::class),
			$this->createMock(IMimeTypeDetector::class),
			new AttachmentService(
				$this->createMock(IRootFolder::class),
				$this->shareManager,
				$this->createMock(IPreview::class),
				$this->createMock(IMimeTypeDetector::class),
				$this->createMock(IURLGenerator::class),
				$this->createMock(IFilenameValidator::class),
				$this->createMock(IFilesMetadataManager::class),
				$this->fileService,
			),
			$this->shareManager,
			$this->createMock(DocumentMapper::class),
			$this->contextManager,
			$this->fileService,
		);
	}

	public function testAttachmentListForAuthenticatedPasswordShare(): void {
		$share = $this->createPasswordShare();
		$this->fileService->method('isShareAuthenticated')->with($share)->willReturn(true);
		$this->contextManager->expects($this->once())->method('getContext')->willThrowException(new NotFoundException());

		$this->expectException(NotFoundException::class);
		$this->controller->getAttachmentList(42, 'token');
	}

	public function testAttachmentListForUnauthenticatedPasswordShare(): void {
		$share = $this->createPasswordShare();
		$this->fileService->method('isShareAuthenticated')->with($share)->willReturn(false);
		$this->contextManager->expects($this->never())->method('getContext');

		$this->expectException(InvalidSessionException::class);
		$this->controller->getAttachmentList(42, 'token');
	}

	public function testUploadAttachmentForUnauthenticatedPasswordShare(): void {
		$share = $this->createPasswordShare();
		$this->fileService->method('isShareAuthenticated')->with($share)->willReturn(false);
		// The controller catches all exceptions, so a never() expectation would be swallowed
		$contextRequested = false;
		$this->contextManager->method('getContext')->willReturnCallback(function () use (&$contextRequested): never {
			$contextRequested = true;
			throw new NotFoundException();
		});
		$tmpFile = tempnam(sys_get_temp_dir(), 'text');
		$this->request->method('getUploadedFile')->with('file')->willReturn([
			'tmp_name' => $tmpFile,
			'name' => 'image.png',
			'type' => 'image/png',
			'error' => UPLOAD_ERR_OK,
		]);

		try {
			$response = $this->controller->uploadAttachment('token');
		} finally {
			unlink($tmpFile);
		}

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		$this->assertFalse($contextRequested);
	}

	private function createPasswordShare(): IShare {
		$share = $this->createMock(IShare::class);
		$share->method('getPassword')->willReturn('hash');
		$share->method('getShareType')->willReturn(IShare::TYPE_LINK);
		$share->method('getPermissions')->willReturn(Constants::PERMISSION_READ | Constants::PERMISSION_UPDATE);
		$node = $this->createMock(File::class);
		$node->method('getPermissions')->willReturn(Constants::PERMISSION_READ | Constants::PERMISSION_UPDATE);
		$share->method('getNode')->willReturn($node);
		$this->shareManager->method('getShareByToken')->with('token')->willReturn($share);
		return $share;
	}
}
