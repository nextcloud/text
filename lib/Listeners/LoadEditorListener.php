<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Text\Listeners;

use OCA\Text\Event\LoadEditor;
use OCA\Text\Service\InitialStateProvider;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/** @template-implements IEventListener<Event|LoadEditor> */
class LoadEditorListener implements \OCP\EventDispatcher\IEventListener {
	public function __construct(
		private InitialStateProvider $initialStateProvider,
		private IEventDispatcher $eventDispatcher,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof LoadEditor) {
			return;
		}

		$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());

		$this->initialStateProvider->provideState();
		Util::addScript('text', 'text-editor');
		Util::addStyle('text', 'text-editor');
	}
}
