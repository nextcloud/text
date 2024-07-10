<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\InitialStateProvider;
use OCA\Viewer\Event\LoadViewer;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/** @implements IEventListener<Event|LoadViewer> */
class LoadViewerListener implements IEventListener {
	private InitialStateProvider $initialStateProvider;
	private IEventDispatcher $eventDispatcher;

	public function __construct(InitialStateProvider $initialStateProvider,
		IEventDispatcher $eventDispatcher) {
		$this->initialStateProvider = $initialStateProvider;
		$this->eventDispatcher = $eventDispatcher;
	}

	public function handle(Event $event): void {
		if (!$event instanceof LoadViewer) {
			return;
		}
		Util::addScript('text', 'text-viewer', 'viewer');
		Util::addStyle('text', 'text-viewer');
		$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());

		$this->initialStateProvider->provideState();
	}
}
