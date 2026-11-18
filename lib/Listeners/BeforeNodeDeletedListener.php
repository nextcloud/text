<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockService;
use OCA\Text\Service\VersionAccessService;
use OCA\Text\Service\VersionSummaryService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\BeforeNodeDeletedEvent;
use OCP\Files\File;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event|BeforeNodeDeletedEvent>
 */
class BeforeNodeDeletedListener implements IEventListener {
	public function __construct(
		private readonly AttachmentService $attachmentService,
		private readonly DocumentService $documentService,
		private readonly LockService $lockService,
		private readonly VersionSummaryService $versionSummaryService,
		private readonly LoggerInterface $logger,
	) {
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
		if (in_array($node->getMimeType(), VersionAccessService::MARKDOWN_MIMETYPES, true)) {
			// Cleanup removes what stays: summaries of files in a deleted folder, or of a busy moment
			try {
				$this->versionSummaryService->purgeFile($node->getId());
			} catch (\Throwable $e) {
				$this->logger->warning('Could not remove the summaries of a deleted file', ['exception' => $e]);
			}
		}
		$this->lockService->unlock($node);
		$this->documentService->resetDocument('file', $node->getId(), true);
	}
}
