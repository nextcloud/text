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

use OCA\Text\Db\Session;
use OCA\Text\DocumentHasUnsavedChangesException;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use OCP\ILogger;

/**
 * Class Cache
 *
 * @package OCA\Social\Cron
 */
class Cleanup extends TimedJob {

	private $sessionService;
	private $documentService;
	private $logger;


	public function __construct(ITimeFactory $time, SessionService $sessionService, DocumentService $documentService, ILogger $logger) {
		parent::__construct($time);
		$this->sessionService = $sessionService;
		$this->documentService = $documentService;
		$this->logger = $logger;
		$this->setInterval(SessionService::SESSION_VALID_TIME);
	}

	protected function run($argument) {
		$this->logger->debug('Run cleanup job for text sessions');
		$inactive = $this->sessionService->findAllInactive();
		/** @var Session $session */
		foreach ($inactive as $session) {
			$activeSessions = $this->sessionService->getActiveSessions($session->getDocumentId());
			if (count($activeSessions) > 0) {
				continue;
			}

			try {
				$this->logger->debug('Resetting document ' . $session->getDocumentId() . '');
				$this->documentService->resetDocument($session->getDocumentId());
				$this->logger->debug('Resetting document ' . $session->getDocumentId() . '');
			} catch (DocumentHasUnsavedChangesException $e) {
				$this->logger->info('Document ' . $session->getDocumentId() . ' has not been reset, as it has unsaved changes');
			}
		}
		$removedSessions = $this->sessionService->removeInactiveSessions(null);
		$this->logger->info('Removed ' . $removedSessions . ' inactive sessions');
	}



}
