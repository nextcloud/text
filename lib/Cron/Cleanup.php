<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */



namespace OCA\Text\Cron;

use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use Psr\Log\LoggerInterface;

class Cleanup extends TimedJob {
	private SessionService $sessionService;
	private DocumentService $documentService;
	private LoggerInterface $logger;
	private AttachmentService $attachmentService;

	public function __construct(ITimeFactory $time,
		SessionService $sessionService,
		DocumentService $documentService,
		AttachmentService $attachmentService,
		LoggerInterface $logger) {
		parent::__construct($time);
		$this->sessionService = $sessionService;
		$this->documentService = $documentService;
		$this->attachmentService = $attachmentService;
		$this->logger = $logger;
		$this->setInterval(SessionService::SESSION_VALID_TIME);
	}

	protected function run($argument) {
		$this->logger->debug('Run cleanup job for text documents');
		$documents = $this->documentService->getAll();
		foreach ($documents as $document) {
			$allSessions = $this->sessionService->getAllSessions($document->getId());
			if (count($allSessions) > 0) {
				// Do not reset if there are any sessions left
				// Inactive sessions will get removed further down and will trigger a reset next time
				continue;
			}

			if ($this->documentService->hasUnsavedChanges($document)) {
				continue;
			}

			$this->documentService->resetDocument($document->getId());
		}

		$this->logger->debug('Run cleanup job for text sessions');
		$removedSessions = $this->sessionService->removeInactiveSessionsWithoutSteps(null);
		$this->logger->debug('Removed ' . $removedSessions . ' inactive sessions');
	}
}
