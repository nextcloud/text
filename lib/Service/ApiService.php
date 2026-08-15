<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use Exception;
use InvalidArgumentException;
use OCA\NotifyPush\Queue\IQueue;
use OCA\Text\Context\IContext;
use OCA\Text\Context\NewSessionData;
use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Exception\DocumentSaveConflictException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\File;
use OCP\Files\InvalidPathException;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\Lock\LockedException;
use Psr\Log\LoggerInterface;

class ApiService {
	public function __construct(
		private readonly ConfigService $configService,
		private readonly SessionService $sessionService,
		private readonly DocumentService $documentService,
		private readonly FileService $fileService,
		private readonly LoggerInterface $logger,
		private readonly LockService $lockService,
		private readonly IL10N $l10n,
		private readonly ?IQueue $queue,
	) {
	}

	public function create(IContext $context, ?string $baseVersionEtag, ?string $guestName = null): DataResponse {
		$document = $context->buildDocument();
		if (!$document instanceof Document) {
			return new DataResponse(['error' => $document], Http::STATUS_FORBIDDEN);
		}

		try {
			$document = $this->documentService->getOrCreateDocument($document, $context);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new DataResponse(['error' => 'Failed to create the document session'], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
		$documentData = $this->documentService->getDocumentData($document);

		if ($baseVersionEtag !== null && $baseVersionEtag !== $document->getBaseVersionEtag()) {
			$error = $this->l10n->t('Editing session has expired. Please reload the page.');
			return new DataResponse(['error' => $error], Http::STATUS_PRECONDITION_FAILED);
		}

		$sessionInfo = $context->prepareSession($documentData);
		$session = $this->sessionService->initSession($document->id, $guestName);
		$displayName = $this->sessionService->getNameForSession($session);

		$newSession = new NewSessionData(
			documentData: $documentData,
			sessionInfo: $sessionInfo,
			session: $session,
			displayName: $displayName,
		);

		return new DataResponse(
			$newSession->jsonSerialize()
		);
	}

	public function close(int $documentId, int $sessionId, string $sessionToken, File $file): DataResponse {
		$this->sessionService->closeSession($documentId, $sessionId, $sessionToken);
		$this->sessionService->removeInactiveSessionsWithoutSteps($documentId);
		$activeSessions = $this->sessionService->getActiveSessions($documentId);
		if (count($activeSessions) === 0) {
			$this->lockService->unlock($file);
		}
		return new DataResponse([]);
	}

	/**
	 * @throws NotFoundException
	 */
	public function push(Session $session, Document $document, int $version, array $steps, string $awareness, ?int $recoveryAttempt, ?string $token = null): DataResponse {
		try {
			$session = $this->sessionService->updateSessionAwareness($session, $awareness);
		} catch (DoesNotExistException $e) {
			// Session was removed in the meantime. #3875
			return new DataResponse(['error' => $this->l10n->t('Editing session has expired. Please reload the page.')], Http::STATUS_PRECONDITION_FAILED);
		}
		try {
			$result = $this->documentService->addStep($document, $session, $steps, $version, $recoveryAttempt, $token);
			$this->addToPushQueue($document, [$awareness, ...array_values($steps)]);
		} catch (InvalidArgumentException $e) {
			return new DataResponse(['error' => $e->getMessage()], Http::STATUS_UNPROCESSABLE_ENTITY);
		} catch (DoesNotExistException) {
			// Either no write access or session was removed in the meantime (#3875).
			return new DataResponse(['error' => $this->l10n->t('Editing session has expired. Please reload the page.')], Http::STATUS_PRECONDITION_FAILED);
		} catch (NotPermittedException) {
			return new DataResponse(['error' => $this->l10n->t('This document is read-only.')], Http::STATUS_FORBIDDEN);
		}
		return new DataResponse($result);
	}

	private function addToPushQueue(Document $document, array $steps): void {
		if ($this->queue === null || !$this->configService->isNotifyPushSyncEnabled()) {
			return;
		}

		$sessions = $this->sessionService->getActiveSessions($document->id);
		$userIds = array_values(array_filter(array_unique(
			array_map(fn ($session): ?string => $session['userId'], $sessions)
		)));
		foreach ($userIds as $userId) {
			$this->queue->push('notify_custom', [
				'user' => $userId,
				'message' => 'text_steps',
				'body' => [
					'documentId' => $document->getId(),
					'steps' => array_values(array_filter($steps)),
				],
			]);
		}
	}

	public function sync(Session $session, Document $document, int $version = 0, ?string $shareToken = null): DataResponse {
		$documentId = $session->getDocumentId();
		$result = [];
		try {
			$result = [
				'steps' => $this->documentService->getSteps($documentId, $version),
				'sessions' => $this->sessionService->getAllSessions($documentId),
				'document' => $document,
			];

			// ensure file is still present and accessible
			$file = $this->fileService->getFileForSession($session, $shareToken);
			$result['readOnly'] = $this->fileService->isReadOnly($file, $shareToken);
		} catch (NotPermittedException|NotFoundException|InvalidPathException $e) {
			$this->logger->info($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'File not found'
			], Http::STATUS_NOT_FOUND);
		} catch (DoesNotExistException $e) {
			$this->logger->info($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'Document no longer exists'
			], Http::STATUS_NOT_FOUND);
		}

		return new DataResponse($result, Http::STATUS_OK);
	}

	public function save(Session $session, Document $document, int $version, string $autosaveContent, string $documentState, bool $force = false, bool $manualSave = false, ?string $shareToken = null): DataResponse {
		try {
			$file = $this->fileService->getFileForSession($session, $shareToken);
		} catch (NotPermittedException|NotFoundException $e) {
			$this->logger->info($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'File not found'
			], Http::STATUS_NOT_FOUND);
		} catch (DoesNotExistException $e) {
			$this->logger->info($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'Document no longer exists'
			], Http::STATUS_NOT_FOUND);
		}

		$result = [];
		try {
			$result['document'] = $this->documentService->autosave($document, $file, $version, $autosaveContent, $documentState, $force, $manualSave, $shareToken);
		} catch (DocumentSaveConflictException) {
			try {
				$result['outsideChange'] = $file->getContent();
			} catch (LockedException) {
				// Ignore locked exception since it might happen due to an autosave action happening at the same time
			}
		} catch (NotPermittedException) {
			return new DataResponse([
				'error' => $this->l10n->t('Read-only permission cannot save document changes. Please reload the page.')
			], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new DataResponse([
				'message' => 'Failed to autosave document'
			], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		return new DataResponse($result, isset($result['outsideChange']) ? Http::STATUS_CONFLICT : Http::STATUS_OK);
	}

	public function updateSession(Session $session, string $guestName): DataResponse {
		return new DataResponse($this->sessionService->updateSession($session, $guestName));
	}

}
