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
use OCP\Files\Events\Node\NodeWrittenEvent;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event|BeforeNodeWrittenEvent|NodeWrittenEvent>
 */
class NodeWrittenResetDocumentListener implements IEventListener {
	private array $oldChecksums = [];

	public function __construct(
		private LoggerInterface $logger,
		private DocumentService $documentService,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof BeforeNodeWrittenEvent) && !($event instanceof NodeWrittenEvent)) {
			return;
		}

		$node = $event->getNode();
		if (!$node instanceof File) {
			return;
		}
		if (!$this->documentService->getDocument($node->getId())) {
			return;
		}
		if ($this->documentService->isSaveFromText()) {
			return;
		}

		if ($event instanceof BeforeNodeWrittenEvent) {
			$this->oldChecksums[$node->getId()] = DocumentService::computeCheckSum($node->getContent());
		} else {
			$newChecksum = DocumentService::computeCheckSum($node->getContent());
			$oldChecksum = $this->oldChecksums[$node->getId()] ?? null;
			unset($this->oldChecksums[$node->getId()]);
			if ($oldChecksum !== null && $newChecksum === $oldChecksum) {
				// Same content: no need to reset document session. Still update document mtime and etag as they might have changed
				$this->documentService->updateDocumentVersionInfo($node);
				return;
			}
			// Reset document session to avoid manual conflict resolution if there's no unsaved steps
			try {
				$this->documentService->resetDocument($node->getId(), true);
			} catch (DocumentHasUnsavedChangesException|NotFoundException $e) {
				// Do not throw during event handling.
				// DocumentHasUnsavedChangesException: A document editing session is likely ongoing, someone can resolve the conflict
				// NotFoundException: The event was called on a file that was just created so a NonExistingFile object is used that has no id yet
				$this->logger->warning('Reset document skipped in NodeWrittenResetDocumentListener', ['exception' => $e]);
			}
		}
	}
}
