<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use OCA\Text\Service\VersionSummaryService;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use Test\TestCase;

class PurgeVersionSummariesTest extends TestCase {
	public function testTurnsSummariesOffAndPurgesWhenTextIsDisabledOrRemoved(): void {
		$service = $this->createMock(VersionSummaryService::class);
		// Without the lock once waiting for it failed: nothing tries again while Text is disabled
		$service->expects($this->once())->method('turnOff')->with(true)->willReturn(true);
		$output = $this->createMock(IOutput::class);
		$output->expects($this->never())->method('warning');

		(new PurgeVersionSummaries($service, $this->connection(true)))->run($output);
	}

	public function testWarnsWhenTasksStay(): void {
		$service = $this->createMock(VersionSummaryService::class);
		$service->method('turnOff')->willReturn(false);
		$output = $this->createMock(IOutput::class);
		$output->expects($this->once())->method('warning');

		(new PurgeVersionSummaries($service, $this->connection(true)))->run($output);
	}

	public function testDoesNothingBeforeItsTablesExist(): void {
		$service = $this->createMock(VersionSummaryService::class);
		$service->expects($this->never())->method('turnOff');

		(new PurgeVersionSummaries($service, $this->connection(false)))->run($this->createMock(IOutput::class));
	}

	private function connection(bool $tablesExist): IDBConnection {
		$connection = $this->createMock(IDBConnection::class);
		$connection->method('tableExists')->with('text_version_summaries')->willReturn($tablesExist);
		return $connection;
	}
}
