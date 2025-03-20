<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Files_Versions\Events\VersionRestoredEvent;
use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\DocumentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\File;
use OCP\Files\NotFoundException;

/**
 * @implements IEventListener<Event|VersionRestoredEvent>
 */
class VersionRestoredListener implements IEventListener {
	public function __construct(
		private DocumentService $documentService,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof VersionRestoredEvent)) {
			return;
		}

		$sourceFile = $event->getVersion()->getSourceFile();
		if (!$sourceFile instanceof File) {
			return;
		}

		// Reset document session to avoid manual conflict resolution if there's no unsaved steps
		try {
			$this->documentService->resetDocument($sourceFile->getId());
		} catch (DocumentHasUnsavedChangesException|NotFoundException $e) {
			// Do not throw during event handling in this is expected to happen
			// DocumentHasUnsavedChangesException: A document editing session is likely ongoing, someone can resolve the conflict
			// NotFoundException: The event was called on a file that was just created so a NonExistingFile object is used that has no id yet
		}
	}
}
