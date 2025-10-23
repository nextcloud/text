<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCP\DB\Events\AddMissingIndicesEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/**
 * @template-implements IEventListener<Event|AddMissingIndicesEvent>
 */
final class AddMissingIndicesListener implements IEventListener {
	#[\Override]
	public function handle(Event $event): void {
		if (!$event instanceof AddMissingIndicesEvent) {
			return;
		}

		$event->addMissingIndex('text_steps', 'textstep_session', ['session_id']);
	}
}
