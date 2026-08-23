<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\DocumentMapper;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\DirectEditing\IToken;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\IL10N;
use OCP\IUser;
use Psr\Log\LoggerInterface;

class FileContextFactory {

	public function __construct(
		private readonly DocumentMapper $documentMapper,
		private readonly FileService $fileService,
		private readonly IL10N $l10n,
		private readonly LockService $lockService,
		private readonly LoggerInterface $logger,
	) {
	}

	private function build(
		File $file,
		?string $token = null,
	): FileContext {
		return new FileContext(
			$this->documentMapper,
			$this->fileService,
			$this->l10n,
			$this->lockService,
			$this->logger,
			$file,
			$token,
		);
	}

	/**
	 * @throws NotFoundException if the file cannot be found
	 */
	public function buildForUser(
		IUser $user,
		int $id,
	): FileContext {
		$file = $this->fileService->getFileById($id, $user->getUID());
		return $this->build($file);
	}

	/**
	 * @throws NotFoundException if the file cannot be found
	 */
	public function buildForShare(
		string $token,
		int $id,
	): FileContext {
		$file = $this->fileService->getFileByIdFromShare($id, $token);
		/*
		* Check if we have proper read access (files drop)
		* If not then well 404 it is.
		*/
		$this->fileService->checkSharePermissions($token);
		return $this->build($file, $token);
	}

	/**
	 * @throws NotFoundException if the file cannot be found
	 * @throws \InvalidArgumentException if the share token is for a folder and path is missing
	 */
	public function buildForShareWithPath(
		string $token,
		?string $filePath,
	): FileContext {
		$file = $this->fileService->getFileByShareToken($token, $filePath);
		/*
		* Check if we have proper read access (files drop)
		* If not then well 404 it is.
		*/
		$this->fileService->checkSharePermissions($token);
		return $this->build($file, $token);
	}

	/**
	 * @throws NotFoundException if the file cannot be found
	 */
	public function buildForDirectEditing(IToken $token): FileContext {
		$file = $token->getFile();
		return $this->build($file, null);
	}

}
