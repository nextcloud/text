<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\DocumentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\BeforeNodeWrittenEvent;
use OCP\Files\File;
use OCP\Files\NotFoundException;

/**
 * @template-implements IEventListener<Event|BeforeNodeWrittenEvent>
 */
class BeforeNodeWrittenListener implements IEventListener {
	private DocumentService $documentService;

	public function __construct(DocumentService $documentService) {
		$this->documentService = $documentService;
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeNodeWrittenEvent) {
			return;
		}
		$node = $event->getNode();
		try {
			if ($node instanceof File && $node->getMimeType() === 'text/markdown') {
				if (!$this->documentService->isSaveFromText()) {
					// Reset document session to avoid manual conflict resolution if there's no unsaved steps
					try {
						$this->documentService->resetDocument($node->getId());
					} catch (DocumentHasUnsavedChangesException) {
						// Do not throw during event handling in this is expected to happen
					}
				}
			}
		} catch (NotFoundException) {
			// This might occur on new files when a NonExistingFile is passed and we cannot access the mimetype
		}
	}
}
