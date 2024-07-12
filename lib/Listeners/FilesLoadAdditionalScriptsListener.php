<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Text\Service\InitialStateProvider;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/**
 * @implements IEventListener<Event>
 */
class FilesLoadAdditionalScriptsListener implements IEventListener {
	private InitialStateProvider $initialStateProvider;

	public function __construct(InitialStateProvider $initialStateProvider) {
		$this->initialStateProvider = $initialStateProvider;
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
	}
}
