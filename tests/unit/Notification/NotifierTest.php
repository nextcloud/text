<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\Notification;

use OCA\Text\Notification\Notifier;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use OCP\Notification\AlreadyProcessedException;
use OCP\Notification\IManager;
use OCP\Notification\INotification;
use OCP\Server;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class NotifierTest extends TestCase {
	private IUserManager&MockObject $userManager;
	private Notifier $notifier;

	protected function setUp(): void {
		parent::setUp();

		$l10n = $this->createMock(IL10N::class);
		$l10n->method('t')->willReturnCallback(fn (string $text, array $parameters = []) => vsprintf($text, $parameters));
		$factory = $this->createMock(IFactory::class);
		$factory->method('get')->willReturn($l10n);

		$urlGenerator = $this->createMock(IURLGenerator::class);
		$urlGenerator->method('getAbsoluteURL')->willReturn('http://localhost/apps/text/img/app-dark.svg');
		$urlGenerator->method('linkToRouteAbsolute')->willReturn('http://localhost/f/42');

		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(42);
		$file->method('getName')->willReturn('doc.md');
		$file->method('getPath')->willReturn('/bob/files/doc.md');
		$userFolder = $this->createMock(Folder::class);
		$userFolder->method('getFirstNodeById')->with(42)->willReturn($file);
		$userFolder->method('getRelativePath')->willReturn('/doc.md');
		$rootFolder = $this->createMock(IRootFolder::class);
		$rootFolder->method('getUserFolder')->with('bob')->willReturn($userFolder);

		$this->userManager = $this->createMock(IUserManager::class);

		$this->notifier = new Notifier(
			$factory,
			$this->userManager,
			$urlGenerator,
			$rootFolder,
			$this->createMock(IEventDispatcher::class),
		);
	}

	private function createMention(array $parameters): INotification {
		return Server::get(IManager::class)->createNotification()
			->setApp('text')
			->setUser('bob')
			->setSubject(Notifier::TYPE_MENTIONED, $parameters + ['targetUser' => 'bob'])
			->setObject('file', '42');
	}

	public function testPrepareUserSource(): void {
		$this->userManager->method('getDisplayName')->with('alice')->willReturn('Alice');

		$notification = $this->notifier->prepare($this->createMention(['sourceUser' => 'alice']), 'en');

		$this->assertSame(
			['type' => 'user', 'id' => 'alice', 'name' => 'Alice'],
			$notification->getRichSubjectParameters()['user'],
		);
		$this->assertSame('Alice has mentioned you in the text document /doc.md', $notification->getParsedSubject());
	}

	public static function dataPrepareGuestSource(): array {
		return [
			'named' => ['Gustav', 'Gustav (guest)'],
			'unnamed' => ['', 'A guest'],
		];
	}

	/**
	 * @dataProvider dataPrepareGuestSource
	 */
	public function testPrepareGuestSource(string $guestName, string $expectedName): void {
		$this->userManager->expects($this->never())->method('getDisplayName');

		$notification = $this->notifier->prepare($this->createMention(['sourceGuest' => $guestName]), 'en');

		$this->assertSame(
			['type' => 'guest', 'id' => 'guest', 'name' => $expectedName],
			$notification->getRichSubjectParameters()['user'],
		);
	}

	public function testPrepareWithoutSourceIsProcessed(): void {
		$this->userManager->expects($this->never())->method('getDisplayName');
		$this->expectException(AlreadyProcessedException::class);

		$this->notifier->prepare($this->createMention(['sourceUser' => null]), 'en');
	}
}
