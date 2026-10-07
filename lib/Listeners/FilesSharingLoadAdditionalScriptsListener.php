<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Files_Sharing\Event\BeforeTemplateRenderedEvent;
use OCA\Text\Service\InitialStateProvider;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\EventDispatcher\IEventListener;
use OCP\IConfig;
use OCP\Util;

/** @implements IEventListener<Event|BeforeTemplateRenderedEvent> */
class FilesSharingLoadAdditionalScriptsListener implements IEventListener {
	public function __construct(
		IConfig $config,
		protected InitialStateProvider $initialStateProvider,
		private readonly IEventDispatcher $eventDispatcher,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeTemplateRenderedEvent) {
			return;
		}

		Util::addScript('text', 'text-public');
		Util::addStyle('text', 'text-public');
		Util::addInitScript('text', 'text-init');
		Util::addStyle('text', 'text-init');

		$this->initialStateProvider->provideState();
		// For the smart picker and link previews, as in the Files app
		$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());
		$node = $event->getShare()->getNode();
		if ($node instanceof \OCP\Files\File) {
			$this->initialStateProvider->provideFileId($node->getId());
		}
	}
}
