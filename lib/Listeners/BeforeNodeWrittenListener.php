<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2024 Jonas <jonas@freesources.org>
 *
 * @author Jonas <jonas@freesources.org>
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

use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\DocumentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\BeforeNodeWrittenEvent;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event|BeforeNodeWrittenEvent>
 */
class BeforeNodeWrittenListener implements IEventListener {
	public function __construct(
		private LoggerInterface $logger,
		private DocumentService $documentService
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeNodeWrittenEvent) {
			return;
		}
		$node = $event->getNode();
		if (!$node instanceof File) {
			return;
		}
		if ($this->documentService->isSaveFromText()) {
			return;
		}
		// Reset document session to avoid manual conflict resolution if there's no unsaved steps
		try {
			$this->documentService->resetDocument($node->getId());
		} catch (DocumentHasUnsavedChangesException|NotFoundException $e) {
			// Do not throw during event handling in this is expected to happen
			// DocumentHasUnsavedChangesException: A document editing session is likely ongoing, someone can resolve the conflict
			// NotFoundException: The event was called oin a file that was just created so a NonExistingFile object is used that has no id yet
			$this->logger->debug('Reset document skipped in BeforeNodeWrittenEvent', ['exception' => $e]);
		}
	}
}
