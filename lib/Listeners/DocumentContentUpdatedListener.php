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
		if (!$document) {
			$this->logger->debug('No document for context.', ['context' => $context->toString()]);
			return;
		}

		if ($this->documentService->isSaveFromText()) {
			$this->logger->debug('DocumentContentUpdated triggered by text itself', ['document' => $document->jsonSerialize()]);
			return;
		}

		$context->updateDocument($document);
		if (empty($document->getUpdatedFields())) {
			$this->logger->debug('Nothing changed', ['document' => $document->jsonSerialize()]);
			return;
		}

		if (!isset($document->getUpdatedFields()['checksum'])) {
			// Same content: no need to reset document session. Still update document mtime and etag.
			$this->logger->debug('DocumentContentUpdated with same checksum', ['document' => $document->jsonSerialize()]);
			$this->documentMapper->update($document);
			return;
		}

		// Reset document session to avoid manual conflict resolution if there's no unsaved steps
		try {
			$this->documentService->resetDocument($document->getContextType(), $document->getContextId(), true);
			$this->logger->info('Reset document', ['document' => $document->jsonSerialize()]);
		} catch (DocumentHasUnsavedChangesException|NotFoundException $e) {
			// Do not throw during event handling.
			// DocumentHasUnsavedChangesException: A document editing session is likely ongoing, someone can resolve the conflict
			// NotFoundException: The event was called on a file that was just created so a NonExistingFile object is used that has no id yet
			$this->logger->warning('Reset document skipped in NodeWrittenResetDocumentListener', ['exception' => $e]);
		}
	}
}
