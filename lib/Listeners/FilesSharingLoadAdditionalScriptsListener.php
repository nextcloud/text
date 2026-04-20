<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Files_Sharing\Event\BeforeTemplateRenderedEvent;
use OCA\Text\Service\InitialStateProvider;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IConfig;
use OCP\Util;

/** @implements IEventListener<Event|BeforeTemplateRenderedEvent> */
class FilesSharingLoadAdditionalScriptsListener implements IEventListener {
	protected InitialStateProvider $initialStateProvider;

	public function __construct(IConfig $config, InitialStateProvider $initialStateProvider) {
		$this->initialStateProvider = $initialStateProvider;
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
		$node = $event->getShare()->getNode();
		if ($node instanceof \OCP\Files\File) {
			$this->initialStateProvider->provideFileId($node->getId());
		}
	}
}
