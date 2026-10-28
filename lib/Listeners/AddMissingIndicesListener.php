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
class AddMissingIndicesListener implements IEventListener {
	public function handle(Event $event): void {
		if (!$event instanceof AddMissingIndicesEvent) {
			return;
		}

		$event->addMissingIndex('text_steps', 'textstep_session', ['session_id']);
		// Fresh PostgreSQL and SQLite installs skip the migration's postSchemaChange, which creates it there
		$event->addMissingIndex('text_steps', 'text_steps_doc_id_id_index', ['document_id', 'id']);
	}
}
