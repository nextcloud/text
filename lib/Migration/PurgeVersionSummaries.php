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
use OCP\Migration\IRepairStep;

/**
 * Turn summaries off and remove every summary and its task when Text is
 * disabled or removed. The tables stay: disabling runs this too, and enabling
 * again creates nothing.
 */
class PurgeVersionSummaries implements IRepairStep {
	public function __construct(
		private readonly VersionSummaryService $versionSummaryService,
		private readonly IDBConnection $connection,
	) {
	}

	public function getName(): string {
		return 'Remove the summaries of changes and their tasks';
	}

	public function run(IOutput $output): void {
		// Disabled before its migration ran: there is nothing to remove
		if (!$this->connection->tableExists('text_version_summaries')) {
			return;
		}
		// Cleanup does not run while Text is disabled, so do not leave it to a busy lock
		if (!$this->versionSummaryService->turnOff(true)) {
			$output->warning('Some summary tasks could not be removed; see the log');
		}
	}
}
