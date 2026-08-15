<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Files\File;
use OCP\Files\Lock\ILock;
use OCP\IL10N;
use OCP\IUser;
use Override;
use Psr\Log\LoggerInterface;

class FileContext implements IContext {

	public function __construct(
		private readonly FileService $fileService,
		private readonly IL10N $l10n,
		private readonly LockService $lockService,
		private readonly LoggerInterface $logger,
		private readonly File $file,
		private readonly ?string $baseVersionEtag,
		private readonly ?string $token = null,
	) {
	}

	#[Override]
	public function getId(): int {
		return $this->file->getId();
	}

	#[Override]
	public function getType(): string {
		return 'file';
	}

	#[Override]
	public function toString(): string {
		return $this->getType() . ' (' . $this->getId() . ')';
	}

	#[Override]
	public function buildDocument(): Document|string {
		// Block using text for disabled download internal shares
		if ($this->fileService->isDownloadDisabled($this->file)) {
			return $this->l10n->t('This file cannot be displayed as download is disabled by the share');
		}
		$document = new Document();
		$document->setId($this->getId());
		$document->setLastSavedVersion(0);
		$document->setLastSavedVersionTime($this->file->getMTime());
		$document->setLastSavedVersionEtag($this->file->getEtag());
		$document->setChecksum($this->computeChecksum());
		// This is a new document - so it needs a fresh base version etag.
		$document->setBaseVersionEtag(uniqid());
		return $document;
	}

	#[Override]
	public function prepareSession(DocumentData $documentData): SessionInfo|string {
		$document = $documentData->document;
		$documentState = $documentData->documentState;

		if ($this->baseVersionEtag !== null && $this->baseVersionEtag !== $document->getBaseVersionEtag()) {
			return $this->l10n->t('Editing session has expired. Please reload the page.');
		}

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

	private function computeCheckSum(): string {
		return hash('crc32', $this->file->getContent());
	}

	private function isReadOnly(): bool {
		return $this->fileService->isReadOnly($this->file, $this->token);
	}

	private function loadContent(): ?string {
		return $this->fileService->loadContent($this->file);
	}

	private function getLockInfo(): ?ILock {
		return $this->lockService->getLockByOthers($this->file);
	}

	private function getOwner(): ?IUser {
		return $this->file->getOwner();
	}

	private function lock(): bool {
		// Disable file locking for Readme.md files, because in the
		// current setup, this makes it almost impossible to delete these files.
		if (strcasecmp($this->file->getName(), 'Readme.md') !== 0) {
			return $this->lockService->lock($this->file);
		}
		return true;
	}

}
