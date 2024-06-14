<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\DirectEditing\TextDirectEditor;
use OCP\DirectEditing\RegisterDirectEditorEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/** @implements IEventListener<Event|RegisterDirectEditorEvent> */
class RegisterDirectEditorEventListener implements IEventListener {
	/** @var TextDirectEditor */
	protected $editor;

	public function __construct(TextDirectEditor $editor) {
		$this->editor = $editor;
	}

	public function handle(Event $event): void {
		if (!$event instanceof RegisterDirectEditorEvent) {
			return;
		}
		$event->register($this->editor);
	}
}
