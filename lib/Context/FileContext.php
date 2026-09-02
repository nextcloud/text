<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Exception\DocumentSaveConflictException;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Files\File;
use OCP\Files\GenericFileException;
use OCP\Files\Lock\ILock;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IUser;
use OCP\Lock\LockedException;
use OCP\Share\IShare;
use Override;
use Psr\Log\LoggerInterface;

class FileContext implements IContext {

	public function __construct(
		private readonly DocumentMapper $documentMapper,
		private readonly FileService $fileService,
		private readonly IL10N $l10n,
		private readonly LockService $lockService,
		private readonly LoggerInterface $logger,
		private readonly IUser|IShare $auth,
		string $type,
		private readonly int $id,
		private ?File $file,
	) {
		if ($type !== 'file') {
			throw new NotFoundException('Incompatible type for file context: ' . $type);
		}
	}

	#[Override]
	public function getId(): int {
		return $this->id;
	}

	#[Override]
	public function getType(): string {
		return 'file';
	}

	#[Override]
	public function toString(): string {
		return $this->getType() . ' (' . $this->getId() . ')';
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	#[Override]
	public function getFile(): File {
		if ($this->file !== null) {
			return $this->file;
		}
		$id = $this->getId();
		if ($this->auth instanceof IUser) {
			$user = $this->auth;
			$this->file = $this->fileService->getFileById($id, $user->getUID());
		} else {
			$share = $this->auth;
			$this->file = $this->fileService->getFileByIdFromShare($id, $share);
		}
		return $this->file;
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	#[Override]
	public function buildDocument(): Document {
		try {
			$file = $this->getFile();
		} catch (NotFoundException|NotPermittedException $e) {
			$this->logger->warning('No permission to access this file', ['exception' => $e]);
			throw new NotFoundException($this->l10n->t('File not found'), $e->getCode(), $e);
		}
		// Block using text for disabled download internal shares
		if ($this->fileService->isDownloadDisabled($file)) {
			throw new NotPermittedException(
				$this->l10n->t('This file cannot be displayed as download is disabled by the share')
			);
		}
		$document = new Document();
		$document->setContextType('file');
		$document->setContextId($this->getId());
		$document->setLastSavedVersion(0);
		$document->setLastSavedVersionTime($file->getMTime());
		$document->setLastSavedVersionEtag($file->getEtag());
		$document->setChecksum($this->computeChecksum());
		// This is a new document - so it needs a fresh base version etag.
		$document->setBaseVersionEtag(uniqid());
		return $document;
	}

	#[Override]
	public function prepareSession(DocumentData $documentData): SessionInfo {
		$document = $documentData->document;
		$documentState = $documentData->documentState;

		$content = null;
		if ($documentState === null) {
			$this->logger->debug('Sending content for ' . $document->toString());
			$content = $this->loadContent();
		}

		$readOnly = $this->isReadOnly();
		$lockInfo = $this->getLockInfo();
		if (!$readOnly) {
			$isLocked = $this->lock();
			if (!$isLocked) {
				$readOnly = true;
			}
		}

		return new SessionInfo(
			content: $content,
			readOnly: $readOnly,
			lock: $lockInfo,
			hasOwner: $this->getOwner() !== null,
		);
	}

	public function isReadOnly(): bool {
		return $this->fileService->isReadOnly($this->getFile(), $this->auth);
	}

	/**
	 * Update the document last saved version metadata to be in line with the data saved in the context.
	 *
	 * @throws DocumentSaveConflictException
	 * @throws GenericFileException if the file changed and reading the content fails.
	 * @throws LockedException if the file changed and a lock prevents reading the content.
	 * @throws NotPermittedException if the file changed and reading is not allowed.
	 * @return Document|null Updated document if there was an update
	 */
	public function updateDocument(Document $document): ?Document {
		$lastMTime = $document->getLastSavedVersionTime();
		$lastEtag = $document->getLastSavedVersionEtag();

		if ($lastMTime <= 0 || $this->isReadOnly()) {
			return null;
		}

		$file = $this->getFile();
		$fileMtime = $file->getMtime();
		$fileEtag = $file->getEtag();

		if ($lastEtag === $fileEtag && $lastMTime === $fileMtime) {
			return null;
		}

		$storedChecksum = $document->getChecksum();
		$fileContent = $file->getContent();
		$fileChecksum = self::computeCheckSum($fileContent);

		if ($storedChecksum !== $fileChecksum) {
			throw new DocumentSaveConflictException($fileContent);
		}

		$document->setLastSavedVersionTime($fileMtime);
		$document->setLastSavedVersionEtag($fileEtag);
		return $document;
	}

	public function loadContent(): ?string {
		return $this->fileService->loadContent($this->getFile());
	}

	public function saveWithLock(string $content, callable $doWhileLocked): void {
		$this->lockService->runInScope($this->getFile(), function () use ($content, $doWhileLocked): void {
			$this->getFile()->putContent($content);
			$doWhileLocked();
		});
	}

	#[Override]
	public function cleanup(): void {
		$this->unlock();
	}

	private function computeCheckSum(?string $content = null): string {
		$content ??= $this->getFile()->getContent();
		return hash('crc32', $content);
	}

	private function getLockInfo(): ?ILock {
		return $this->lockService->getLockByOthers($this->getFile());
	}

	private function getOwner(): ?IUser {
		return $this->getFile()->getOwner();
	}

	private function lock(): bool {
		$file = $this->getFile();
		// Disable file locking for Readme.md files, because in the
		// current setup, this makes it almost impossible to delete these files.
		if (strcasecmp($file->getName(), 'Readme.md') !== 0) {
			return $this->lockService->lock($file);
		}
		return true;
	}

	private function unlock(): void {
		$file = $this->getFile();
		// Disable file locking for Readme.md files, because in the
		// current setup, this makes it almost impossible to delete these files.
		if (strcasecmp($file->getName(), 'Readme.md') !== 0) {
			$this->lockService->unlock($file);
		}
	}

}
