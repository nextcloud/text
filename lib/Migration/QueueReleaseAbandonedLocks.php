<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use OCA\Text\Cron\ReleaseAbandonedLocks;
use OCP\BackgroundJob\IJobList;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

readonly class QueueReleaseAbandonedLocks implements IRepairStep {
	public function __construct(
		private IJobList $jobList,
	) {
	}

	public function getName(): string {
		return 'Queue releasing the file locks of documents without active sessions';
	}

	public function run(IOutput $output): void {
		$this->jobList->add(ReleaseAbandonedLocks::class, ['after' => '0']);
	}
}
