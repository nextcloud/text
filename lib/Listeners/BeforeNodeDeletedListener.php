<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\BeforeNodeDeletedEvent;
use OCP\Files\File;

/**
 * @template-implements IEventListener<Event|BeforeNodeDeletedEvent>
 */
class BeforeNodeDeletedListener implements IEventListener {
	private AttachmentService $attachmentService;
	private DocumentService $documentService;

	public function __construct(AttachmentService $attachmentService,
		DocumentService $documentService) {
		$this->attachmentService = $attachmentService;
		$this->documentService = $documentService;
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeNodeDeletedEvent) {
			return;
		}
		$node = $event->getNode();
		if (!$node instanceof File) {
			return;
		}
		if ($node->getMimeType() === 'text/markdown') {
			$this->attachmentService->deleteAttachments($node);
		}
		$this->documentService->resetDocument($node->getId(), true);
	}
}
