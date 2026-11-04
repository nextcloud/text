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
use OCP\IUser;
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
		$this->service = new ConfigService($this->appConfig, $this->createMock(IUserConfig::class), $this->createMock(IConfig::class), Server::get(IDBConnection::class));
	}

	protected function tearDown(): void {
		$this->appConfig->deleteKey('text', 'version_summaries_enabled');
		$this->appConfig->deleteKey('text', 'version_summaries_hourly_limit');
		$this->appConfig->deleteKey('text', 'version_summaries_user_hourly_limit');
		$this->appConfig->deleteKey('core', 'ai.taskprocessing_guests');
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

	public function testOffersSummariesToSignedInPeopleOnceTurnedOn(): void {
		$user = $this->createMock(IUser::class);
		$user->method('getBackendClassName')->willReturn('Database');

		$this->assertFalse($this->service->isVersionSummariesAvailableFor($user));
		$this->service->setVersionSummariesEnabled(true);
		$this->assertTrue($this->service->isVersionSummariesAvailableFor($user));
		$this->assertFalse($this->service->isVersionSummariesAvailableFor(null));
	}

	public function testOffersSummariesToGuestsOnlyWhereCoreLetsThemUseAi(): void {
		$this->service->setVersionSummariesEnabled(true);
		$guest = $this->createMock(IUser::class);
		$guest->method('getBackendClassName')->willReturn('Guests');

		$this->assertFalse($this->service->isVersionSummariesAvailableFor($guest));
		$this->appConfig->setValueString('core', 'ai.taskprocessing_guests', 'true');
		$this->assertTrue($this->service->isVersionSummariesAvailableFor($guest));
	}

	public function testKeepsOtherCachedValuesWhenReadingFresh(): void {
		$this->appConfig->setValueInt('text', 'version_summaries_hourly_limit', 7, true);
		$this->assertSame(7, $this->service->getVersionSummariesHourlyLimit());
		$qb = Server::get(IDBConnection::class)->getQueryBuilder();
		$qb->update('appconfig')
			->set('configvalue', $qb->createNamedParameter('9'))
			->where($qb->expr()->eq('appid', $qb->createNamedParameter('text')))
			->andWhere($qb->expr()->eq('configkey', $qb->createNamedParameter('version_summaries_hourly_limit')))
			->executeStatement();

		$this->service->isVersionSummariesEnabled(true);

		// Still the value cached for this request: one fresh read empties no cache
		$this->assertSame(7, $this->service->getVersionSummariesHourlyLimit());
	}
}
