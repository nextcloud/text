<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use Exception;
use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\BeforeNodeRenamedEvent;
use OCP\Files\File;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event|BeforeNodeRenamedEvent>
 */
class BeforeNodeRenamedListener implements IEventListener {
	public function __construct(
		private readonly AttachmentService $attachmentService,
		private readonly DocumentService $documentService,
		private readonly LoggerInterface $logger,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeNodeRenamedEvent) {
			return;
		}
		$source = $event->getSource();
		$target = $event->getTarget();

		if (!($source instanceof File && $target instanceof File)) {
			return;
		}

		$sourceIsMarkdown = $source->getMimeType() === 'text/markdown';
		$targetIsMarkdown = pathinfo($target->getPath(), PATHINFO_EXTENSION) === 'md'; // NonExistingFile has no `getMimetype()`

		// Reset document state if mimetype changes from/to markdown as this means another editor is loaded
		if ($sourceIsMarkdown xor $targetIsMarkdown) {
			try {
				$this->documentService->resetDocument($source->getId(), true);
			} catch (Exception $e) {
				$this->logger->error($e->getMessage(), ['exception' => $e]);
			}
		}

		if ($sourceIsMarkdown) {
			$this->attachmentService->moveAttachments($source, $target);
		}
	}
}
