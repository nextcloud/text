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
use Override;

/** @implements IEventListener<Event|RegisterContextEvent> */
class RegisterContextEventListener implements IEventListener {

	public function __construct(
		private readonly FileContextFactory $fileContextFactory,
	) {
	}

	#[Override]
	public function handle(Event $event): void {
		if (!$event instanceof RegisterContextEvent) {
			return;
		}

		$event->getContextManager()->registerContext(
			'file',
			fn (int $id) => $this->fileContextFactory->buildForId($id)
		);
	}
}
