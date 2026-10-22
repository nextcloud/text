<?php

declare(strict_types = 1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Constants;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\SystemTag\ISystemTagObjectMapper;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class AiTagServiceTest extends TestCase {
	private ISystemTagObjectMapper&MockObject $systemTagObjectMapper;
	private IRootFolder&MockObject $rootFolder;
	private LoggerInterface&MockObject $logger;
	private IUserFolder&MockObject $userFolder;
	private AiTagService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->systemTagObjectMapper = $this->createMock(ISystemTagObjectMapper::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->userFolder = $this->createMock(IUserFolder::class);

		$this->rootFolder->method('getUserFolder')
			->with('testUser')
			->willReturn($this->userFolder);

		$this->service = new AiTagService(
			$this->systemTagObjectMapper,
			$this->rootFolder,
			$this->logger,
			'testUser',
		);
	}

	public function testTagFileAsAiGeneratedThrowsWhenUserMissing(): void {
		$service = new AiTagService(
			$this->systemTagObjectMapper,
			$this->rootFolder,
			$this->logger,
			null,
		);

		$this->systemTagObjectMapper->expects($this->never())
			->method('assignGeneratedByAITag');

		$this->expectException(NotFoundException::class);
		$service->tagFileAsAiGenerated(42);
	}

	public function testTagFileAsAiGeneratedThrowsWhenFileNotAccessible(): void {
		$this->userFolder->expects($this->once())
			->method('getById')
			->with(42)
			->willReturn([]);

		$this->systemTagObjectMapper->expects($this->never())
			->method('assignGeneratedByAITag');

		$this->expectException(NotFoundException::class);
		$this->service->tagFileAsAiGenerated(42);
	}

	public function testTagFileAsAiGeneratedThrowsWhenFileIsReadOnly(): void {
		$file = $this->createMock(File::class);
		$file->method('getPermissions')->willReturn(Constants::PERMISSION_READ);

		$this->userFolder->expects($this->once())
			->method('getById')
			->with(42)
			->willReturn([$file]);

		$this->systemTagObjectMapper->expects($this->never())
			->method('assignGeneratedByAITag');

		$this->expectException(NotPermittedException::class);
		$this->service->tagFileAsAiGenerated(42);
	}

	public function testTagFileAsAiGeneratedTagsWhenUpdateIsAllowed(): void {
		$readOnly = $this->createMock(File::class);
		$readOnly->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$writable = $this->createMock(File::class);
		$writable->method('getPermissions')->willReturn(Constants::PERMISSION_UPDATE);

		$this->userFolder->expects($this->once())
			->method('getById')
			->with(42)
			->willReturn([$readOnly, $writable]);

		$this->systemTagObjectMapper->expects($this->once())
			->method('assignGeneratedByAITag')
			->with('42', 'files');

		$this->service->tagFileAsAiGenerated(42);
	}
}
