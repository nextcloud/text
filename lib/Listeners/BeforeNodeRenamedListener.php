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
use OCP\Files\Events\Node\BeforeNodeRenamedEvent;
use OCP\Files\File;

/**
 * @template-implements IEventListener<Event|BeforeNodeRenamedEvent>
 */
class BeforeNodeRenamedListener implements IEventListener {
	private AttachmentService $attachmentService;

	public function __construct(AttachmentService $attachmentService) {
		$this->attachmentService = $attachmentService;
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeNodeRenamedEvent) {
			return;
		}
		$source = $event->getSource();
		$target = $event->getTarget();
		if ($source instanceof File
			&& $source->getMimeType() === 'text/markdown'
			&& $target instanceof File
		) {
			$this->attachmentService->moveAttachments($source, $target);
		}
	}
}
