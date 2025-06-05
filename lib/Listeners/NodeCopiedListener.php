<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\AttachmentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\NodeCopiedEvent;
use OCP\Files\File;
use OCP\Lock\ILockingProvider;

/**
 * @template-implements IEventListener<Event|NodeCopiedEvent>
 */
class NodeCopiedListener implements IEventListener {
	private $attachmentService;

	public function __construct(AttachmentService $attachmentService) {
		$this->attachmentService = $attachmentService;
	}

	public function handle(Event $event): void {
		if (!$event instanceof NodeCopiedEvent) {
			return;
		}
		$source = $event->getSource();
		$target = $event->getTarget();
		if ($source instanceof File
			&& $source->getMimeType() === 'text/markdown'
			&& $target instanceof File
			&& $target->getMimeType() === 'text/markdown'
		) {
			$fileIdMapping = $this->attachmentService->copyAttachments($source, $target);
			$target->unlock(ILockingProvider::LOCK_SHARED);
			AttachmentService::replaceAttachmentFolderId($source, $target);
			AttachmentService::replaceAttachmentFileIds($target, $fileIdMapping);
			$target->lock(ILockingProvider::LOCK_SHARED);
		}
	}
}
