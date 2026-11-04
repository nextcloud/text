<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Config\IUserConfig;
use OCP\IAppConfig;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Server;
use Test\TestCase;

/**
 * @group DB
 */
class ConfigServiceTest extends TestCase {
	private IAppConfig $appConfig;
	private ConfigService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->appConfig = Server::get(IAppConfig::class);
		$this->service = new ConfigService($this->appConfig, $this->createMock(IUserConfig::class), $this->createMock(IConfig::class));
	}

	protected function tearDown(): void {
		$this->appConfig->deleteKey('text', 'version_summaries_enabled');
		$this->appConfig->deleteKey('text', 'version_summaries_hourly_limit');
		$this->appConfig->deleteKey('text', 'version_summaries_user_hourly_limit');
		parent::tearDown();
	}

	public function testHasHourlyLimitsForTheInstanceAndEachPerson(): void {
		$this->assertSame([60, 10], [$this->service->getVersionSummariesHourlyLimit(), $this->service->getVersionSummariesUserHourlyLimit()]);

		$this->service->setVersionSummariesHourlyLimit(100);
		$this->service->setVersionSummariesUserHourlyLimit(-3);

		$this->assertSame([100, 0], [$this->service->getVersionSummariesHourlyLimit(), $this->service->getVersionSummariesUserHourlyLimit()]);
	}

	public function testReadsWhatAnotherRequestStoredWhenAskedFresh(): void {
		$this->service->setVersionSummariesEnabled(true);
		$this->assertTrue($this->service->isVersionSummariesEnabled());

		// Another request turns summaries off
		$qb = Server::get(IDBConnection::class)->getQueryBuilder();
		$qb->update('appconfig')
			->set('configvalue', $qb->createNamedParameter('0'))
			->where($qb->expr()->eq('appid', $qb->createNamedParameter('text')))
			->andWhere($qb->expr()->eq('configkey', $qb->createNamedParameter('version_summaries_enabled')))
			->executeStatement();

		$this->assertTrue($this->service->isVersionSummariesEnabled());
		$this->assertFalse($this->service->isVersionSummariesEnabled(true));
	}
}
