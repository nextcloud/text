<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\Service;

use OCA\Text\Service\NotificationService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Notification\IManager;
use OCP\Notification\INotification;
use OCP\Server;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class NotificationServiceTest extends TestCase {
	private IManager&MockObject $manager;
	private ITimeFactory&MockObject $timeFactory;

	protected function setUp(): void {
		parent::setUp();

		$this->manager = $this->createMock(IManager::class);
		$this->manager->method('createNotification')
			->willReturnCallback(fn () => Server::get(IManager::class)->createNotification());
		$this->manager->method('getCount')->willReturn(0);

		$this->timeFactory = $this->createMock(ITimeFactory::class);
		$this->timeFactory->method('now')->willReturn(new \DateTimeImmutable());
	}

	public static function dataMention(): array {
		return [
			'user' => ['alice', null, ['sourceUser' => 'alice', 'targetUser' => 'bob']],
			'guest' => [null, 'Gustav', ['sourceGuest' => 'Gustav', 'targetUser' => 'bob']],
		];
	}

	/**
	 * @dataProvider dataMention
	 */
	public function testMention(?string $userId, ?string $guestName, array $expectedParameters): void {
		$this->manager->expects($this->once())
			->method('notify')
			->with($this->callback(fn (INotification $n) => $n->getSubjectParameters() === $expectedParameters));

		$service = new NotificationService($this->manager, $this->timeFactory, $userId);
		$this->assertTrue($service->mention(42, 'bob', $guestName));
	}

	public function testMentionWithoutSource(): void {
		$this->manager->expects($this->never())->method('notify');

		$service = new NotificationService($this->manager, $this->timeFactory, null);
		$this->assertFalse($service->mention(42, 'bob'));
	}
}
