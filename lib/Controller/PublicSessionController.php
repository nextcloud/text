<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Middleware\Attribute\RequireDocumentBaseVersionEtag;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\FileService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\PublicShareController;
use OCP\Constants;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\ISession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;

class PublicSessionController extends PublicShareController implements ISessionAwareController {
	use TSessionAwareController;

	private ?IShare $share = null;

	public function __construct(
		string $appName,
		IRequest $request,
		ISession $session,
		private ShareManager $shareManager,
		private ApiService $apiService,
		private DocumentService $documentService,
		private FileService $fileService,
		private IL10N $l10n,
	) {
		parent::__construct($appName, $request, $session);
	}

	private function getShare(): IShare {
		if ($this->share === null) {
			throw new \Exception('Share has not been set yet');
		}

		return $this->share;
	}

	protected function getPasswordHash(): ?string {
		return $this->getShare()->getPassword();
	}

	public function isValidToken(): bool {
		try {
			$this->share = $this->shareManager->getShareByToken($this->getToken());
			return true;
		} catch (ShareNotFound) {
			return false;
		}
	}

	protected function isPasswordProtected(): bool {
		/** @psalm-suppress RedundantConditionGivenDocblockType */
		return $this->getShare()->getPassword() !== null;
	}

	#[NoAdminRequired]
	#[PublicPage]
	public function create(string $token, ?string $filePath = null, ?string $baseVersionEtag = null, ?string $guestName = null): DataResponse {
		$file = $this->fileService->getFileByShareToken($token, $filePath);
		/*
			* Check if we have proper read access (files drop)
			* If not then well 404 it is.
			*/
		try {
			$this->fileService->checkSharePermissions($token, Constants::PERMISSION_READ);
		} catch (NotFoundException) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		} catch (NotPermittedException) {
			return new DataResponse(['error' => $this->l10n->t('This file cannot be displayed as download is disabled by the share')], Http::STATUS_NOT_FOUND);
		}

		return $this->apiService->create($file, $baseVersionEtag, $token, $guestName);
	}

	#[NoAdminRequired]
	#[PublicPage]
	public function close(int $documentId, int $sessionId, string $sessionToken, string $token): DataResponse {
		$file = $this->fileService->getFileByIdFromShare($documentId, $token);
		return $this->apiService->close($documentId, $sessionId, $sessionToken, $file);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function push(int $documentId, int $sessionId, string $sessionToken, int $version, array $steps, string $awareness, string $token, ?int $recoveryAttempt = null): DataResponse {
		return $this->apiService->push($this->getSession(), $this->getDocument(), $version, $steps, $awareness, $recoveryAttempt, $token);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function sync(string $token, int $version = 0): DataResponse {
		return $this->apiService->sync($this->getSession(), $this->getDocument(), $version, $token);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentBaseVersionEtag]
	#[RequireDocumentSession]
	public function save(string $token, int $version, string $autosaveContent, string $documentState, bool $force = false, bool $manualSave = false): DataResponse {
		return $this->apiService->save($this->getSession(), $this->getDocument(), $version, $autosaveContent, $documentState, $force, $manualSave, $token);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentSession]
	public function updateSession(string $guestName): DataResponse {
		return $this->apiService->updateSession($this->getSession(), $guestName);
	}
}
