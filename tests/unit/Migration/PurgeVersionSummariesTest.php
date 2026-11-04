<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use OCA\Text\Service\ConfigService;
use OCA\Text\Service\VersionSummaryService;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use Test\TestCase;

class PurgeVersionSummariesTest extends TestCase {
	public function testTurnsSummariesOffAndPurgesWhenTextIsDisabledOrRemoved(): void {
		$events = [];
		$config = $this->createMock(ConfigService::class);
		$config->expects($this->once())->method('setVersionSummariesEnabled')->with(false)->willReturnCallback(function () use (&$events): void {
			$events[] = 'off';
		});
		$service = $this->createMock(VersionSummaryService::class);
		$service->expects($this->once())->method('purgeAll')->with(true)->willReturnCallback(function () use (&$events): bool {
			$events[] = 'purge';
			return true;
		});
		$output = $this->createMock(IOutput::class);
		$output->expects($this->never())->method('warning');

		(new PurgeVersionSummaries($config, $service, $this->connection(true)))->run($output);

		$this->assertSame(['off', 'purge'], $events);
	}

	public function testWarnsWhenTasksStay(): void {
		$service = $this->createMock(VersionSummaryService::class);
		$service->method('purgeAll')->willReturn(false);
		$output = $this->createMock(IOutput::class);
		$output->expects($this->once())->method('warning');

		(new PurgeVersionSummaries($this->createMock(ConfigService::class), $service, $this->connection(true)))->run($output);
	}

	public function testDoesNothingBeforeItsTablesExist(): void {
		$config = $this->createMock(ConfigService::class);
		$config->expects($this->never())->method('setVersionSummariesEnabled');
		$service = $this->createMock(VersionSummaryService::class);
		$service->expects($this->never())->method('purgeAll');

		(new PurgeVersionSummaries($config, $service, $this->connection(false)))->run($this->createMock(IOutput::class));
	}

	private function connection(bool $tablesExist): IDBConnection {
		$connection = $this->createMock(IDBConnection::class);
		$connection->method('tableExists')->with('text_version_summaries')->willReturn($tablesExist);
		return $connection;
	}
}
