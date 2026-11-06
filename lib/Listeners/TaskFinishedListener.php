<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\VersionSummaryService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\TaskProcessing\Events\TaskFailedEvent;
use OCP\TaskProcessing\Events\TaskSuccessfulEvent;

/**
 * Store a summary as soon as its task finishes, so the next comparison of
 * those texts shows it
 *
 * @template-implements IEventListener<Event|TaskSuccessfulEvent|TaskFailedEvent>
 */
class TaskFinishedListener implements IEventListener {
	public function __construct(
		private readonly VersionSummaryService $versionSummaryService,
	) {
	}

	public function handle(Event $event): void {
		if ($event instanceof TaskSuccessfulEvent || $event instanceof TaskFailedEvent) {
			$this->versionSummaryService->onTaskFinished($event->getTask());
		}
	}
}
