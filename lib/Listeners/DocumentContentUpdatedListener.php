<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Context\IContext;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Event\DocumentContentUpdated;
use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\DocumentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\NotFoundException;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event|DocumentContentUpdated>
 */
class DocumentContentUpdatedListener implements IEventListener {

	public function __construct(
		private readonly LoggerInterface $logger,
		private readonly DocumentService $documentService,
		private readonly DocumentMapper $documentMapper,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof DocumentContentUpdated)) {
			return;
		}

		$context = $event->getContext();

		if (!$context instanceof IContext) {
			$this->logger->warning('DocumentContentUpdated called with invalid context', ['context' => $context]);
			return;
		}

		$document = $this->documentMapper->load($context->getType(), $context->getId());
		if (!$document || $this->documentService->isSaveFromText()) {
			return;
		}

		$oldChecksum = $document->getChecksum();
		$updatedDocument = $context->updateDocument($document);
		if (!$updatedDocument) {
			// nothing changed.
			return;
		}

		$newChecksum = $updatedDocument->getChecksum();
		if ($oldChecksum !== null && $newChecksum !== null && $oldChecksum === $newChecksum) {
			// Same content: no need to reset document session. Still update document mtime and etag as they might have changed
			$this->documentMapper->update($updatedDocument);
			return;
		}

		// Reset document session to avoid manual conflict resolution if there's no unsaved steps
		try {
			$this->documentService->resetDocument($document->id, true);
		} catch (DocumentHasUnsavedChangesException|NotFoundException $e) {
			// Do not throw during event handling.
			// DocumentHasUnsavedChangesException: A document editing session is likely ongoing, someone can resolve the conflict
			// NotFoundException: The event was called on a file that was just created so a NonExistingFile object is used that has no id yet
			$this->logger->warning('Reset document skipped in NodeWrittenResetDocumentListener', ['exception' => $e]);
		}
	}
}
