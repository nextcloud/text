<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Context\UnauthorizedFileContext;
use OCA\Text\Event\DocumentContentUpdated;
use OCA\Text\Service\FileService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\NodeWrittenEvent;
use OCP\Files\File;
use OCP\Files\NotFoundException;

/**
 * @template-implements IEventListener<Event|NodeWrittenEvent>
 */
class NodeWrittenResetDocumentListener implements IEventListener {

	public function __construct(
		private readonly FileService $fileService,
		private readonly IEventDispatcher $eventDispatcher,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof NodeWrittenEvent)) {
			return;
		}

		$node = $event->getNode();
		if (!$node instanceof File) {
			return;
		}
		try {
			$node->getId();
		} catch (NotFoundException) {
			// Handle non existing node (during creation).
			return;
		}

		$context = new UnauthorizedFileContext($this->fileService, $node);
		$event = new DocumentContentUpdated($context);
		$this->eventDispatcher->dispatchTyped($event);
	}
}
