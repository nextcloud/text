<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Settings;

use OCA\Text\Service\ConfigService;
use OCA\Text\Service\VersionSummaryService;
use OCP\AppFramework\Services\IInitialState;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\IProvider;
use OCP\TaskProcessing\TaskTypes\TextToTextChat;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class VersionSummariesSettingsTest extends TestCase {
	private ConfigService&MockObject $config;
	private VersionSummaryService&MockObject $summaries;
	private IManager&MockObject $tasks;
	private IInitialState&MockObject $initialState;
	private LoggerInterface&MockObject $logger;
	private VersionSummariesSettings $settings;

	protected function setUp(): void {
		parent::setUp();
		$this->config = $this->createMock(ConfigService::class);
		$this->config->method('getVersionSummariesHourlyLimit')->willReturn(60);
		$this->config->method('getVersionSummariesUserHourlyLimit')->willReturn(10);
		$this->config->method('getVersionSummariesMaxInputBytes')->willReturn(240_000);
		$this->summaries = $this->createMock(VersionSummaryService::class);
		$this->summaries->method('startedLastHour')->willReturn(3);
		$this->tasks = $this->createMock(IManager::class);
		$this->initialState = $this->createMock(IInitialState::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->settings = new VersionSummariesSettings($this->config, $this->summaries, $this->tasks, $this->initialState, $this->logger);
	}

	/**
	 * @return array<string, mixed> What the view receives
	 */
	private function form(): array {
		$state = [];
		$this->initialState->method('provideInitialState')->willReturnCallback(function (string $key, array $value) use (&$state): void {
			$this->assertSame('version_summaries_settings', $key);
			$state = $value;
		});
		$this->settings->getForm();
		return $state;
	}

	public function testNamesTheProviderThatReceivesTheTexts(): void {
		$this->config->method('isVersionSummariesEnabled')->willReturn(true);
		$provider = $this->createMock(IProvider::class);
		$provider->method('getName')->willReturn('LocalAI');
		$this->tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => []]);
		$this->tasks->method('getPreferredProvider')->with(TextToTextChat::ID)->willReturn($provider);

		$this->assertSame([
			'enabled' => true,
			'provider' => 'LocalAI',
			'hourlyLimit' => 60,
			'userHourlyLimit' => 10,
			'startedLastHour' => 3,
			'maxInputBytes' => 240_000,
			'removalPending' => false,
		], $this->form());
	}

	public function testSaysWhenThereIsNoProvider(): void {
		$this->tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => []]);
		$this->tasks->method('getPreferredProvider')->willThrowException(new \Exception('No provider'));
		$this->logger->expects($this->once())->method('warning');

		$this->assertNull($this->form()['provider']);
	}

	public function testSaysThatSummariesAreStillToBeRemovedAfterTurningOff(): void {
		$this->config->method('isVersionSummariesEnabled')->willReturn(false);
		$this->summaries->method('hasSummaries')->willReturn(true);
		$this->tasks->method('getAvailableTaskTypes')->willReturn([]);

		$form = $this->form();
		$this->assertNull($form['provider']);
		$this->assertTrue($form['removalPending']);
	}
}
