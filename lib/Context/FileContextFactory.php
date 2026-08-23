<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\DocumentMapper;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\IL10N;
use OCP\IUser;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

class FileContextFactory implements IContextFactory {

	public function __construct(
		private readonly DocumentMapper $documentMapper,
		private readonly FileService $fileService,
		private readonly IL10N $l10n,
		private readonly LockService $lockService,
		private readonly LoggerInterface $logger,
	) {
	}

	public function build(
		IUser|IShare $auth,
		string $type,
		int $id,
		?File $file = null,
	): FileContext {
		if ($auth instanceof IShare) {
			/*
			* Check if we have proper read access (no files drop)
			* If not then well 404 it is.
			*/
			$this->fileService->checkSharePermissions($auth);
		}
		return new FileContext(
			$this->documentMapper,
			$this->fileService,
			$this->l10n,
			$this->lockService,
			$this->logger,
			$auth,
			$type,
			$id,
			$file,
		);
	}

	/**
	 * @throws NotFoundException if the file cannot be found
	 * @throws \InvalidArgumentException if the share token is for a folder and path is missing
	 */
	public function buildForShareWithPath(
		IShare $share,
		?string $filePath,
	): FileContext {

		$file = $this->fileService->getFileFromShareByPath($share, $filePath);
		return $this->build($share, 'file', $file->getId(), $file);
	}

}
