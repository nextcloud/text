<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\VersionSummaryService;
use OCP\TaskProcessing\Events\TaskFailedEvent;
use OCP\TaskProcessing\Events\TaskSuccessfulEvent;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToTextChat;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class TaskFinishedListenerTest extends TestCase {
	private VersionSummaryService&MockObject $service;
	private ContainerInterface&MockObject $container;
	private LoggerInterface&MockObject $logger;
	private TaskFinishedListener $listener;

	protected function setUp(): void {
		parent::setUp();
		$this->service = $this->createMock(VersionSummaryService::class);
		$this->container = $this->createMock(ContainerInterface::class);
		$this->container->method('get')->with(VersionSummaryService::class)->willReturn($this->service);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->listener = new TaskFinishedListener($this->container, $this->logger);
	}

	private function task(string $appId, ?string $customId): Task {
		return new Task(TextToTextChat::ID, ['input' => ''], $appId, null, $customId);
	}

	public function testStoresTheResultOfASummaryTask(): void {
		$task = $this->task('text', 'text-version-summary:' . '7');
		$this->service->expects($this->exactly(2))->method('onTaskFinished')->with($task);

		$this->listener->handle(new TaskSuccessfulEvent($task));
		$this->listener->handle(new TaskFailedEvent($task, 'The provider failed'));
	}

	public function testBuildsNothingForTheTasksOfOthers(): void {
		$this->container->expects($this->never())->method('get');

		$this->listener->handle(new TaskSuccessfulEvent($this->task('assistant', null)));
		$this->listener->handle(new TaskSuccessfulEvent($this->task('text', 'other:7')));
		// A person's own task under a summary's custom id
		$this->listener->handle(new TaskSuccessfulEvent(new Task(TextToTextChat::ID, ['input' => ''], 'text', 'alice', 'text-version-summary:7')));
	}

	public function testLetsCoreStoreTheResultWhenStoringTheSummaryFails(): void {
		$this->service->method('onTaskFinished')->willThrowException(new \RuntimeException('Deadlock'));
		$this->logger->expects($this->once())->method('warning');

		$this->listener->handle(new TaskSuccessfulEvent($this->task('text', 'text-version-summary:' . '7')));
	}
}
