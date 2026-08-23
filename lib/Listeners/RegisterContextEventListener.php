<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Context\FileContextFactory;
use OCA\Text\Event\RegisterContextEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\NotPermittedException;
use OCP\IUserSession;
use Override;

/** @implements IEventListener<Event|RegisterContextEvent> */
class RegisterContextEventListener implements IEventListener {

	public function __construct(
		private readonly FileContextFactory $fileContextFactory,
		private readonly IUserSession $userSession,
	) {
	}

	#[Override]
	public function handle(Event $event): void {
		if (!$event instanceof RegisterContextEvent) {
			return;
		}

		$event->getContextManager()->registerContext(
			'file',
			function (int $id, string $type, ?string $shareToken) {
				if ($shareToken === null) {
					$user = $this->userSession->getUser();
					if ($user === null) {
						throw new NotPermittedException();
					}
					return $this->fileContextFactory->buildForUser($user, $id);
				} else {
					return $this->fileContextFactory->buildForShare($shareToken, $id);
				}
			}
		);
	}
}
