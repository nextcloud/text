<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\DirectEditing\IToken;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IUserSession;

class FileContextFactory {

	public function __construct(
		private readonly FileService $fileService,
		private readonly IL10N $l10n,
		private readonly LockService $lockService,
		private readonly IUserSession $userSession,
	) {
	}

	/**
	 * @throws NotPermittedException if not logged in
	 * @throws NotFoundException if the file cannot be found
	 */
	public function buildForId(
		int $id,
		?string $baseVersionEtag,
	): FileContext {
		$userId = $this->userSession->getUser()?->getUID();
		if ($userId === null) {
			throw new NotPermittedException();
		}
		$file = $this->fileService->getFileById($id, $userId);
		return new FileContext(
			$this->fileService,
			$this->l10n,
			$this->lockService,
			$file,
			$baseVersionEtag,
		);
	}

	/**
	 * @throws NotFoundException if the file cannot be found
	 * @throws \InvalidArgumentException if the share token is for a folder and path is missing
	 */
	public function buildForShareWithPath(
		string $token,
		?string $filePath,
		?string $baseVersionEtag,
	): FileContext {
		$file = $this->fileService->getFileByShareToken($token, $filePath);
		/*
		* Check if we have proper read access (files drop)
		* If not then well 404 it is.
		*/
		$this->fileService->checkSharePermissions($token);
		return new FileContext(
			$this->fileService,
			$this->l10n,
			$this->lockService,
			$file,
			$baseVersionEtag,
			$token,
		);
	}

	/**
	 * @throws NotFoundException if the file cannot be found
	 */
	public function buildForDirectEditing(IToken $token): FileContext {
		$file = $token->getFile();
		return new FileContext(
			$this->fileService,
			$this->l10n,
			$this->lockService,
			$file,
			null,
		);
	}

}
