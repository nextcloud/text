<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2021 Julien Veyssier <eneiluj@posteo.net>
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
		private AttachmentService $attachmentService,
		private DocumentService $documentService,
		private LoggerInterface $logger) {
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
