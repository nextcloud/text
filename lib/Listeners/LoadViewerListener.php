<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2020 Morris Jobke <hey@morrisjobke.de>
 *
 * @author Morris Jobke <hey@morrisjobke.de>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
		$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());

		$this->initialStateProvider->provideState();
	}
}
