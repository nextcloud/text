<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\DocumentService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\NodeWrittenEvent;
use OCP\Files\File;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event|NodeWrittenEvent>
 */
class NodeWrittenListener implements IEventListener {
	public function __construct(
		private DocumentService $documentService,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof NodeWrittenEvent) {
			return;
		}
		$node = $event->getNode();
		if (!$node instanceof File || !in_array($node->getMimetype(), Application::SUPPORTED_MIMETYPES, true)) {
			return;
		}

		$this->documentService->resetDocumentCache($node->getId());
	}
}
