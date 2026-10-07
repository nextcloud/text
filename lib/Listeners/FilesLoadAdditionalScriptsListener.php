<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Text\Service\InitialStateProvider;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\EventDispatcher\IEventListener;

/**
 * @implements IEventListener<Event>
 */
class FilesLoadAdditionalScriptsListener implements IEventListener {
	public function __construct(
		private readonly InitialStateProvider $initialStateProvider,
		private readonly IEventDispatcher $eventDispatcher,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof LoadAdditionalScriptsEvent) {
			return;
		}

		\OCP\Util::addInitScript('text', 'text-init');
		\OCP\Util::addScript('text', 'text-files');
		// Add associated styles
		\OCP\Util::addStyle('text', 'text-init');
		\OCP\Util::addStyle('text', 'text-files');

		$this->initialStateProvider->provideState();
		// The viewer no longer has an event of its own to hang this on: the
		// smart picker and link previews of a file opened from here need it
		$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());
	}
}
