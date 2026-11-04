<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Exception\VersionSummaryException;
use OCA\Text\Service\ConfigService;
use OCA\Text\Service\VersionSummaryService;
use OCP\AppFramework\Http;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class VersionSummaryControllerTest extends TestCase {
	private VersionSummaryService&MockObject $service;
	private ConfigService&MockObject $config;
	private IUserSession&MockObject $session;
	private VersionSummaryController $controller;

	protected function setUp(): void {
		parent::setUp();
		$this->service = $this->createMock(VersionSummaryService::class);
		$this->config = $this->createMock(ConfigService::class);
		$this->session = $this->createMock(IUserSession::class);
		$this->controller = new VersionSummaryController('text', $this->createMock(IRequest::class), $this->service, $this->config, $this->session);
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

	public function testTurnsOffAndSaysWhetherAllIsGone(): void {
		$this->config->method('getVersionSummariesHourlyLimit')->willReturn(60);
		$this->config->method('getVersionSummariesUserHourlyLimit')->willReturn(10);
		$this->service->expects($this->once())->method('turnOff')->willReturn(false);

		$this->assertSame(
			['enabled' => false, 'hourlyLimit' => 60, 'userHourlyLimit' => 10, 'removed' => false],
			$this->controller->updateSettings(false)->getData(),
		);
	}

	public function testKeepsEverythingWhenTurnedOn(): void {
		$this->config->expects($this->once())->method('setVersionSummariesEnabled')->with(true);
		$this->service->expects($this->never())->method('turnOff');

		$this->assertNull($this->controller->updateSettings(true)->getData()['removed']);
	}

	public function testSetsOnlyTheLimitsGiven(): void {
		$this->config->expects($this->never())->method('setVersionSummariesEnabled');
		$this->config->expects($this->never())->method('setVersionSummariesHourlyLimit');
		$this->config->expects($this->once())->method('setVersionSummariesUserHourlyLimit')->with(3);
		$this->service->expects($this->never())->method('turnOff');

		$this->controller->updateSettings(null, null, 3);
	}
}
