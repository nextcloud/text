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
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

/**
 * Store a summary as soon as its task finishes, so the next comparison of
 * those texts shows it
 *
 * @template-implements IEventListener<Event|TaskSuccessfulEvent|TaskFailedEvent>
 */
class TaskFinishedListener implements IEventListener {
	public function __construct(
		private readonly ContainerInterface $container,
		private readonly LoggerInterface $logger,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof TaskSuccessfulEvent && !$event instanceof TaskFailedEvent) {
			return;
		}
		$task = $event->getTask();
		// Every app's tasks end here: the service is built only for Text's summaries
		if (VersionSummaryService::summaryIdOf($task) === null) {
			return;
		}
		try {
			$this->container->get(VersionSummaryService::class)->onTaskFinished($task);
		} catch (\Throwable $e) {
			// Core has stored the task; Cleanup stores the summary later
			$this->logger->warning('Could not store a summary of changes', ['exception' => $e]);
		}
	}
}
