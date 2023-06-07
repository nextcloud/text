<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
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
		private IEventDispatcher $eventDispatcher
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof LoadEditor) {
			return;
		}

		$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());

		$this->initialStateProvider->provideState();
		Util::addScript('text', 'text-editors');
	}
}
