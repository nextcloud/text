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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\Service;

use Exception;
use InvalidArgumentException;
use OC\Files\Node\File;
use OCA\Files_Sharing\SharedStorage;
use OCA\Text\AppInfo\Application;
use OCA\Text\Exception\DocumentSaveConflictException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\Constants;
use OCP\Files\Lock\ILock;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Lock\LockedException;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

class ApiService {
	private IRequest $request;
	private SessionService $sessionService;
	private DocumentService $documentService;
	private LoggerInterface $logger;
	private AttachmentService $attachmentService;
	private EncodingService $encodingService;
	private IL10N $l10n;

	public function __construct(IRequest $request,
								SessionService $sessionService,
								DocumentService $documentService,
								AttachmentService $attachmentService,
								EncodingService $encodingService,
								LoggerInterface $logger,
								IL10N $l10n
	) {
		$this->request = $request;
		$this->sessionService = $sessionService;
		$this->documentService = $documentService;
		$this->logger = $logger;
		$this->attachmentService = $attachmentService;
		$this->encodingService = $encodingService;
		$this->l10n = $l10n;
	}

	public function create($fileId = null, $filePath = null, $token = null, $guestName = null): DataResponse {
		try {
			/** @var File $file */
			if ($token) {
				$file = $this->documentService->getFileByShareToken($token, $this->request->getParam('filePath'));

				/*
				 * Check if we have proper read access (files drop)
				 * If not then well 404 it is.
				 */
				try {
					$this->documentService->checkSharePermissions($token, Constants::PERMISSION_READ);
				} catch (NotFoundException $e) {
					return new DataResponse([], Http::STATUS_NOT_FOUND);
				} catch (NotPermittedException $e) {
					return new DataResponse($this->l10n->t('This file cannot be displayed as download is disabled by the share'), 404);
				}
			} elseif ($fileId) {
				try {
					$file = $this->documentService->getFileById($fileId);
				} catch (NotFoundException $e) {
					return new DataResponse([], Http::STATUS_NOT_FOUND);
				}
			} else {
				return new DataResponse('No valid file argument provided', Http::STATUS_PRECONDITION_FAILED);
			}

			$storage = $file->getStorage();

			// Block using text for disabled download internal shares
			if ($storage->instanceOfStorage(SharedStorage::class)) {
				/** @var IShare $share */
				$share = $storage->getShare();
				if ($share->getAttributes()->getAttribute('permissions', 'download') === false) {
					return new DataResponse($this->l10n->t('This file cannot be displayed as download is disabled by the share'), 403);
				}
			}

			$readOnly = $this->documentService->isReadOnly($file, $token);

			$this->sessionService->removeInactiveSessionsWithoutSteps($file->getId());
			$document = $this->documentService->getDocument($file);
			$freshSession = $document === null;

			if ($freshSession) {
				$this->logger->info('Create new document of ' . $file->getId());
				$document = $this->documentService->createDocument($file);
			} else {
				$this->logger->info('Keep previous document of ' . $file->getId());
			}
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new DataResponse('Failed to create the document session', 500);
		}

		$session = $this->sessionService->initSession($document->getId(), $guestName);

		if ($freshSession) {
			$this->logger->debug('Starting a fresh editing session for ' . $file->getId());
			$documentState = null;
			$content = $this->loadContent($file);
		} else {
			$this->logger->debug('Loading existing session for ' . $file->getId());
			$content = null;
			try {
				$stateFile = $this->documentService->getStateFile($document->getId());
				$documentState = $stateFile->getContent();
			} catch (NotFoundException $e) {
				$this->logger->debug('State file not found for ' . $file->getId());
				$documentState = ''; // no state saved yet.
				// If there are no steps yet we might still need the content.
				$steps = $this->documentService->getSteps($document->getId(), 0);
				if (empty($steps)) {
					$this->logger->debug('Empty steps, loading content for ' . $file->getId());
					$content = $this->loadContent($file);
				}
			}
		}

		$lockInfo = $this->documentService->getLockInfo($file);
		if ($lockInfo && $lockInfo->getType() === ILock::TYPE_APP && $lockInfo->getOwner() === Application::APP_NAME) {
			$lockInfo = null;
		}

		$isLocked = $this->documentService->lock($file->getId());
		if (!$isLocked) {
			$readOnly = true;
		}

		return new DataResponse([
			'document' => $document,
			'session' => array_merge($session->jsonSerialize(), ['displayName' => $this->sessionService->getNameForSession($session)]),
			'readOnly' => $readOnly,
			'content' => $content,
			'documentState' => $documentState,
			'lock' => $lockInfo,
		]);
	}

	public function close($documentId, $sessionId, $sessionToken): DataResponse {
		$this->sessionService->closeSession($documentId, $sessionId, $sessionToken);
		$this->sessionService->removeInactiveSessionsWithoutSteps($documentId);
		$activeSessions = $this->sessionService->getActiveSessions($documentId);
		if (count($activeSessions) === 0) {
			$this->documentService->unlock($documentId);
		}
		return new DataResponse([]);
	}

	/**
	 * @throws NotFoundException
	 * @throws DoesNotExistException
	 */
	public function push($documentId, $sessionId, $sessionToken, $version, $steps, $awareness, $token = null): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], 403);
		}
		$session = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
		if (!$session) {
			return new DataResponse([], 403);
		}
		try {
			$this->sessionService->updateSessionAwareness($documentId, $sessionId, $sessionToken, $awareness);
		} catch (DoesNotExistException $e) {
			// Session was removed in the meantime. #3875
			return new DataResponse([], 403);
		}
		if (empty($steps)) {
			return new DataResponse([]);
		}
		$file = $this->documentService->getFileForSession($session, $token);
		if ($this->documentService->isReadOnly($file, $token)) {
			return new DataResponse([], 403);
		}
		try {
			$result = $this->documentService->addStep($documentId, $sessionId, $steps, $version);
		} catch (InvalidArgumentException $e) {
			return new DataResponse($e->getMessage(), 422);
		} catch (DoesNotExistException $e) {
			// Session was removed in the meantime. #3875
			return new DataResponse([], 403);
		}
		return new DataResponse($result);
	}

	public function sync($documentId, $sessionId, $sessionToken, $version = 0, $autosaveContent = null, $documentState = null, bool $force = false, bool $manualSave = false, $token = null): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], 403);
		}

		try {
			$result = [
				'steps' => $this->documentService->getSteps($documentId, $version),
				'sessions' => $this->sessionService->getAllSessions($documentId),
				'document' => $this->documentService->get($documentId)
			];

			$session = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
			$file = $this->documentService->getFileForSession($session, $token);
		} catch (NotFoundException $e) {
			$this->logger->info($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'File not found'
			], 404);
		} catch (DoesNotExistException $e) {
			$this->logger->info($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'Document no longer exists'
			], 404);
		}

		try {
			$result['document'] = $this->documentService->autosave($file, $documentId, $version, $autosaveContent, $documentState, $force, $manualSave, $token, $this->request->getParam('filePath'));
		} catch (DocumentSaveConflictException $e) {
			try {
				$result['outsideChange'] = $file->getContent();
			} catch (LockedException $e) {
				// Ignore locked exception since it might happen due to an autosave action happening at the same time
			}
		} catch (NotFoundException $e) {
			return new DataResponse([], 404);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'Failed to autosave document'
			], 500);
		}

		return new DataResponse($result, isset($result['outsideChange']) ? 409 : 200);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function updateSession(int $documentId, int $sessionId, string $sessionToken, string $guestName): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], 403);
		}

		return new DataResponse($this->sessionService->updateSession($documentId, $sessionId, $sessionToken, $guestName));
	}

	private function loadContent(\OCP\Files\File $file): ?string {
		try {
			$content = $file->getContent();
			$content = $this->encodingService->encodeToUtf8($content);
			if ($content === null) {
				$this->logger->warning('Failed to encode file to UTF8. File ID: ' . $file->getId());
			}
		} catch (NotFoundException $e) {
			$this->logger->warning($e->getMessage(), ['exception' => $e]);
			$content = null;
		}
		return $content;
	}
}
