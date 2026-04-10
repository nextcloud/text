<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Service\AiTagService;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class AiControllerTest extends TestCase {
	/** @var IRequest|MockObject */
	private $request;
	/** @var AiTagService|MockObject */
	private $aiTagService;
	private AiController $controller;

	protected function setUp(): void {
		parent::setUp();
		$this->request = $this->createMock(IRequest::class);
		$this->aiTagService = $this->createMock(AiTagService::class);
		$this->controller = new AiController(
			'text',
			$this->request,
			$this->aiTagService,
		);
	}

	public function testTagFileReturnsEmptyDataResponse(): void {
		$this->aiTagService->expects($this->once())
			->method('tagFileAsAiGenerated')
			->with(42);

		$response = $this->controller->tagFile(42);

		$this->assertInstanceOf(DataResponse::class, $response);
		$this->assertSame([], $response->getData());
	}

	public function testTagFilePassesCorrectFileId(): void {
		$this->aiTagService->expects($this->once())
			->method('tagFileAsAiGenerated')
			->with(99999);

		$this->controller->tagFile(99999);
	}
}
