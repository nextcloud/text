<?php

declare(strict_types = 1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\SystemTag\ISystemTagObjectMapper;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class AiTagServiceTest extends TestCase {
	private ISystemTagObjectMapper&MockObject $systemTagObjectMapper;
	private IRootFolder&MockObject $rootFolder;
	private LoggerInterface&MockObject $logger;
	private Folder&MockObject $userFolder;
	private AiTagService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->systemTagObjectMapper = $this->createMock(ISystemTagObjectMapper::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->userFolder = $this->createMock(Folder::class);

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
			->method('getFirstNodeById')
			->with(42)
			->willReturn(null);

		$this->systemTagObjectMapper->expects($this->never())
			->method('assignGeneratedByAITag');

		$this->expectException(NotFoundException::class);
		$this->service->tagFileAsAiGenerated(42);
	}

	public function testTagFileAsAiGeneratedTagsWhenAccessible(): void {
		$file = $this->createMock(File::class);
		$this->userFolder->expects($this->once())
			->method('getFirstNodeById')
			->with(42)
			->willReturn($file);

		$this->systemTagObjectMapper->expects($this->once())
			->method('assignGeneratedByAITag')
			->with('42', 'files');

		$this->service->tagFileAsAiGenerated(42);
	}
}
