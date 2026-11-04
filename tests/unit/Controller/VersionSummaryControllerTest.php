<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Exception\VersionSummaryException;
use OCA\Text\Service\VersionSummaryService;
use OCP\AppFramework\Http;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class VersionSummaryControllerTest extends TestCase {
	private VersionSummaryService&MockObject $service;
	private IUserSession&MockObject $session;
	private VersionSummaryController $controller;

	protected function setUp(): void {
		parent::setUp();
		$this->service = $this->createMock(VersionSummaryService::class);
		$this->session = $this->createMock(IUserSession::class);
		$this->controller = new VersionSummaryController('text', $this->createMock(IRequest::class), $this->service, $this->session);
	}

	public function testAnswersARefusalWithItsReason(): void {
		$this->session->method('getUser')->willReturn($this->createMock(IUser::class));
		$this->service->method('generate')->willThrowException(new VersionSummaryException('instance_cap', Http::STATUS_TOO_MANY_REQUESTS, 1800003600));

		$response = $this->controller->generate(42, '1000', 'current', 'a', 'b');

		$this->assertSame(Http::STATUS_TOO_MANY_REQUESTS, $response->getStatus());
		$this->assertSame(['error' => 'instance_cap', 'retryAfter' => 1800003600], $response->getData());
	}

	public function testAnswersNotFoundWithoutAUser(): void {
		$this->service->expects($this->never())->method('lookup');

		$this->assertSame(Http::STATUS_NOT_FOUND, $this->controller->lookup(42, '1000', 'current', 'a', 'b')->getStatus());
	}
}
