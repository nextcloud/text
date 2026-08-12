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

class FileContext implements IContext {

	public function __construct(
		private readonly FileService $fileService,
		private readonly IL10N $l10n,
		private readonly LockService $lockService,
		private readonly File $file,
		private readonly ?string $baseVersionEtag,
		private readonly ?string $token = null,
	) {
	}

	public function check(): ?string {
		// Block using text for disabled download internal shares
		if ($this->fileService->isDownloadDisabled($this->file)) {
			return $this->l10n->t('This file cannot be displayed as download is disabled by the share');
		}
		return null;
	}

	public function checkDocument(Document $document): ?string {
		if ($this->baseVersionEtag !== null && $this->baseVersionEtag !== $document->getBaseVersionEtag()) {
			return $this->l10n->t('Editing session has expired. Please reload the page.');
		}
		return null;
	}

	public function isReadOnly(): bool {
		return $this->fileService->isReadOnly($this->file, $this->token);
	}

	public function getId(): int {
		return $this->file->getId();
	}

	public function getType(): string {
		return 'file';
	}

	public function toString(): string {
		return $this->getType() . ' (' . $this->getId() . ')';
	}

	public function loadContent(): ?string {
		return $this->fileService->loadContent($this->file);
	}

	public function getLockInfo(): ?ILock {
		return $this->lockService->getLockByOthers($this->file);
	}

	public function getOwner(): ?IUser {
		return $this->file->getOwner();
	}

	public function lock(): bool {
		// Disable file locking for Readme.md files, because in the
		// current setup, this makes it almost impossible to delete these files.
		if (strcasecmp($this->file->getName(), 'Readme.md') !== 0) {
			return $this->lockService->lock($this->file);
		}
		return true;
	}

	public function createDocument(): Document {
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

	public function computeCheckSum(): string {
		return hash('crc32', $this->file->getContent());
	}

}
