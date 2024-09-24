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
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event|BeforeNodeWrittenEvent>
 */
class BeforeNodeWrittenListener implements IEventListener {
	public function __construct(
		private LoggerInterface $logger,
		private DocumentService $documentService,
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
